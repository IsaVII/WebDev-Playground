const express = require("express");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

// 1. Create a PaymentIntent for this order - amount is set on the server
//    (never trust an amount sent from the client), and an idempotency key
//    means retrying this request can't create a second charge
app.post("/create-payment-intent", express.json(), async (req, res) => {
  const { orderId } = req.body;
  const order = await db.orders.findById(orderId);
  const intent = await stripe.paymentIntents.create(
    { amount: order.amountCents, currency: "usd", metadata: { orderId } },
    { idempotencyKey: `order_${orderId}` },
  );
  res.json({ clientSecret: intent.client_secret });
});

// 2. Webhooks need the RAW request body to verify the signature - this
//    route must come before any app.use(express.json()) that would parse
//    and reserialize the body before the signature check sees it
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const signature = req.get("stripe-signature");
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch {
      return res.status(400).send("Webhook signature verification failed");
    }

    // 3. The webhook, not the browser, is what actually confirms payment
    if (event.type === "payment_intent.succeeded") {
      const { orderId } = event.data.object.metadata;
      db.orders.update(orderId, { status: "paid" });
    }

    if (event.type === "payment_intent.payment_failed") {
      const { orderId } = event.data.object.metadata;
      db.orders.update(orderId, { status: "payment_failed" });
    }

    res.json({ received: true });
  },
);

// 4. Refunding is a separate flow from the original charge
app.post("/orders/:id/refund", express.json(), async (req, res) => {
  const order = await db.orders.findById(req.params.id);
  await stripe.refunds.create({ payment_intent: order.paymentIntentId });
  await db.orders.update(order.id, { status: "refunded" });
  res.json({ status: "refunded" });
});

module.exports = app;
