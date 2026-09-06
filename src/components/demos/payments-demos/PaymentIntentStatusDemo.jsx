import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const STATUS_INFO = {
  requires_payment_method: "Intent created; waiting for card details",
  requires_confirmation: "Card attached; waiting to be confirmed",
  requires_action: "Bank requires extra authentication (3D Secure)",
  succeeded: "Payment complete",
  requires_payment_method_failed: "Card declined - back to needing a method",
};

function PaymentIntentStatusDemo() {
  const [requires3ds, setRequires3ds] = useState(true);
  const [cardDeclines, setCardDeclines] = useState(false);
  const [status, setStatus] = useState("requires_payment_method");
  const [history, setHistory] = useState(["requires_payment_method"]);

  const advance = (status) => {
    setStatus(status);
    setHistory((h) => [...h, status]);
  };

  const reset = () => {
    setStatus("requires_payment_method");
    setHistory(["requires_payment_method"]);
  };

  const attachCard = () => advance("requires_confirmation");

  const confirm = () => {
    if (cardDeclines) {
      advance("requires_payment_method_failed");
      return;
    }
    if (requires3ds) {
      advance("requires_action");
    } else {
      advance("succeeded");
    }
  };

  const completeAuthentication = () => advance("succeeded");

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        A PaymentIntent doesn't jump straight from "created" to "paid" - it
        moves through a small state machine, and{" "}
        <code>requires_action</code> exists specifically for cards that need
        3D Secure (Strong Customer Authentication), which your code has to
        handle as a distinct, expected state rather than an error.
      </p>

      <div className="flex flex-wrap gap-4 mb-4 text-sm text-heading-alt">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={requires3ds}
            onChange={(e) => {
              setRequires3ds(e.target.checked);
              reset();
            }}
          />
          Bank requires 3D Secure
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={cardDeclines}
            onChange={(e) => {
              setCardDeclines(e.target.checked);
              reset();
            }}
          />
          Card gets declined instead
        </label>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line">
        <p className="text-xs text-muted mb-1">Current status</p>
        <p className="font-mono text-sm text-accent mb-1">{status}</p>
        <p className="text-xs text-muted">{STATUS_INFO[status]}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={attachCard}
          disabled={status !== "requires_payment_method"}
          className="bg-accent text-white px-3 py-1 rounded text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Attach card
        </button>
        <button
          onClick={confirm}
          disabled={status !== "requires_confirmation"}
          className="bg-accent text-white px-3 py-1 rounded text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          confirmCardPayment()
        </button>
        <button
          onClick={completeAuthentication}
          disabled={status !== "requires_action"}
          className="bg-accent text-white px-3 py-1 rounded text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Complete 3D Secure
        </button>
        <button
          onClick={reset}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Reset
        </button>
      </div>

      <p className="text-xs text-subtle font-mono mb-4">
        History: {history.join(" → ")}
      </p>

      <CodeBlock>{`const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
  payment_method: { card: cardElement },
});

if (error) {
  // card_declined, insufficient_funds, etc.
  showError(error.message);
} else if (paymentIntent.status === "requires_action") {
  // Stripe.js already opened the 3D Secure challenge automatically here -
  // this branch is really just "keep waiting", not something to build
} else if (paymentIntent.status === "succeeded") {
  showSuccess();
}`}</CodeBlock>
    </div>
  );
}

export default PaymentIntentStatusDemo;
