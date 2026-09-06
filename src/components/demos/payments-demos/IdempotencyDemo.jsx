import { useState } from "react";
import CodeBlock from "../../CodeBlock";

let nextChargeId = 1;

function IdempotencyDemo() {
  const [useKey, setUseKey] = useState(true);
  const [charges, setCharges] = useState([]);
  const [seenKeys, setSeenKeys] = useState(new Set());

  const IDEMPOTENCY_KEY = "order_7421";

  const clickPayNow = () => {
    // Simulates a user double-clicking "Pay" or the request being retried
    // after the client never saw the first response (a real timeout/retry,
    // not just a UI double-click, is the actual failure mode this guards
    // against).
    if (useKey && seenKeys.has(IDEMPOTENCY_KEY)) {
      setCharges((c) => [
        ...c,
        {
          id: c[0]?.id ?? nextChargeId,
          note: "same charge returned - no new charge created",
          duplicate: true,
        },
      ]);
      return;
    }

    const id = nextChargeId++;
    setSeenKeys((s) => new Set(s).add(IDEMPOTENCY_KEY));
    setCharges((c) => [...c, { id, note: "new charge created", duplicate: false }]);
  };

  const reset = () => {
    setCharges([]);
    setSeenKeys(new Set());
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        A slow network can make a client retry a charge request that actually
        succeeded the first time - without an idempotency key, that retry
        looks like a brand new charge to Stripe. With one, Stripe recognizes
        the key it already processed and returns the original result instead
        of charging again.
      </p>

      <label className="flex items-center gap-2 mb-4 text-sm text-heading-alt">
        <input
          type="checkbox"
          checked={useKey}
          onChange={(e) => {
            setUseKey(e.target.checked);
            reset();
          }}
        />
        Send an idempotency key with each request
      </label>

      <div className="flex gap-2 mb-4">
        <button
          onClick={clickPayNow}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Click "Pay $20" (simulate a retried request)
        </button>
        <button
          onClick={reset}
          className="text-sm text-subtle hover:text-accent transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-xs min-h-[130px] space-y-1">
        {charges.length === 0 && (
          <p className="text-subtle">
            Click "Pay $20" more than once to simulate a retried request...
          </p>
        )}
        {charges.map((charge, i) => (
          <p
            key={i}
            className={charge.duplicate ? "text-green-400" : "text-heading-alt"}
          >
            Charge ch_{charge.id} - {charge.note}
          </p>
        ))}
        {!useKey && charges.length > 1 && (
          <p className="text-red-400 mt-2">
            ✗ {charges.length} separate charges created for one $20 purchase
          </p>
        )}
      </div>

      <CodeBlock>{`// Without a key, a retried request is indistinguishable from a new charge
await stripe.paymentIntents.create({ amount: 2000, currency: "usd" });

// With a key, Stripe recognizes the retry and returns the original result
await stripe.paymentIntents.create(
  { amount: 2000, currency: "usd" },
  { idempotencyKey: \`order_\${orderId}\` }, // same key every retry
);`}</CodeBlock>
    </div>
  );
}

export default IdempotencyDemo;
