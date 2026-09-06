import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function PaymentFlowDemo() {
  const [strategy, setStrategy] = useState("checkout");
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);

  const run = () => {
    setLog([]);
    setRunning(true);

    const checkoutSteps = [
      "POST /create-checkout-session { orderId }",
      "Server creates a Stripe Checkout Session for this order's amount",
      "Response: { url: 'https://checkout.stripe.com/...' }",
      "Browser redirects the user to that Stripe-hosted page",
      "— user enters card details on Stripe's own page, not yours —",
      "Stripe redirects back to your success_url with a session id",
      "— later, separately —",
      "Webhook: checkout.session.completed arrives at your server",
      "✓ Server marks the order paid",
    ];

    const elementsSteps = [
      "POST /create-payment-intent { orderId }",
      "Server creates a PaymentIntent for this order's amount",
      "Response: { clientSecret: 'pi_9f2_secret_...' }",
      "Browser mounts Stripe Elements - card fields render on your page",
      "— user enters card details into fields Stripe's iframe controls —",
      "stripe.confirmCardPayment(clientSecret) runs from your page",
      "— later, separately —",
      "Webhook: payment_intent.succeeded arrives at your server",
      "✓ Server marks the order paid",
    ];

    const steps = strategy === "checkout" ? checkoutSteps : elementsSteps;
    steps.forEach((line, i) => {
      setTimeout(() => {
        setLog((l) => [...l, line]);
        if (i === steps.length - 1) setRunning(false);
      }, i * 350);
    });
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Both strategies keep your server away from raw card data and both end
        with a webhook confirming the result - they only differ in{" "}
        <strong>where</strong> the card form lives.{" "}
        <strong>Hosted Checkout</strong> sends the user to a page Stripe
        builds and controls; <strong>Elements</strong> keeps them on your
        page, with Stripe's iframe rendering just the card fields.
      </p>

      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setStrategy("checkout")}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            strategy === "checkout"
              ? "bg-accent text-white"
              : "bg-surface-alt text-muted hover:text-heading"
          }`}
        >
          Hosted Checkout
        </button>
        <button
          onClick={() => setStrategy("elements")}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            strategy === "elements"
              ? "bg-accent text-white"
              : "bg-surface-alt text-muted hover:text-heading"
          }`}
        >
          Embedded Elements
        </button>
        <button
          onClick={run}
          disabled={running}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50 ml-auto"
        >
          {running ? "Running..." : "Walk through checkout"}
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[220px]">
        {log.length === 0 && (
          <p className="text-subtle text-xs">
            Pick a strategy and walk through it...
          </p>
        )}
        {log.map((entry, i) => (
          <p
            key={i}
            className={`text-xs mb-1 ${
              entry.startsWith("—") ? "text-subtle" : "text-heading-alt"
            }`}
          >
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock>
        {strategy === "checkout"
          ? `// Server: create a session, hand back the URL to redirect to
const session = await stripe.checkout.sessions.create({
  line_items: [{ price: order.priceId, quantity: 1 }],
  mode: "payment",
  success_url: "https://example.com/success?session_id={CHECKOUT_SESSION_ID}",
  cancel_url: "https://example.com/cancel",
});
res.json({ url: session.url }); // browser does window.location = url`
          : `// Client: card fields render on your own page via Stripe's iframe
const { error } = await stripe.confirmCardPayment(clientSecret, {
  payment_method: { card: cardElement },
});
if (error) showError(error.message);
// success is still provisional until the webhook confirms it server-side`}
      </CodeBlock>
    </div>
  );
}

export default PaymentFlowDemo;
