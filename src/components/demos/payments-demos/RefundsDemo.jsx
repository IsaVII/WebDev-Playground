import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const ORIGINAL_AMOUNT = 5000; // $50.00 in cents

function formatCents(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

function RefundsDemo() {
  const [refunded, setRefunded] = useState(0);
  const [partialInput, setPartialInput] = useState("15.00");
  const [disputeOpen, setDisputeOpen] = useState(false);
  const [log, setLog] = useState([]);

  const remaining = ORIGINAL_AMOUNT - refunded;

  const fullRefund = () => {
    setRefunded(ORIGINAL_AMOUNT);
    setLog((l) => [
      ...l,
      `Refund created for ${formatCents(ORIGINAL_AMOUNT - refunded)} - you initiated this`,
    ]);
  };

  const partialRefund = () => {
    const cents = Math.round(parseFloat(partialInput || "0") * 100);
    const amount = Math.min(cents, remaining);
    if (amount <= 0) return;
    setRefunded((r) => r + amount);
    setLog((l) => [...l, `Partial refund created for ${formatCents(amount)} - you initiated this`]);
  };

  const openDispute = () => {
    setDisputeOpen(true);
    setLog((l) => [
      ...l,
      "Dispute opened by the customer's bank - funds held pending your evidence",
    ]);
  };

  const reset = () => {
    setRefunded(0);
    setDisputeOpen(false);
    setLog([]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        A refund is a flow you start, for a reason you choose, up to the full
        charged amount. A dispute is the opposite direction entirely - the
        customer's bank reverses the charge on their behalf, your Stripe
        balance is debited immediately, and you have a limited window to
        submit evidence if you want to contest it.
      </p>

      <div className="bg-surface rounded p-4 mb-4 border border-line">
        <p className="text-xs text-muted mb-1">Original charge</p>
        <p className="font-mono text-sm text-heading-alt mb-2">
          {formatCents(ORIGINAL_AMOUNT)}
        </p>
        <p className="text-xs text-muted mb-1">Refunded so far</p>
        <p className="font-mono text-sm text-heading-alt mb-2">
          {formatCents(refunded)} of {formatCents(ORIGINAL_AMOUNT)}
        </p>
        {disputeOpen && (
          <p className="text-xs text-red-400 font-mono">
            ⚠ Dispute open - evidence due within the deadline
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-surface border border-line rounded p-3">
          <p className="text-xs text-muted mb-2">You initiate</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={fullRefund}
              disabled={remaining === 0}
              className="bg-accent text-white px-3 py-1 rounded text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Full refund
            </button>
            <div className="flex gap-2">
              <input
                value={partialInput}
                onChange={(e) => setPartialInput(e.target.value)}
                className="w-20 bg-surface-alt border border-line rounded px-2 py-1 text-sm text-heading-alt"
              />
              <button
                onClick={partialRefund}
                disabled={remaining === 0}
                className="bg-surface-alt border border-line rounded px-3 py-1 text-sm text-heading-alt hover:border-accent transition-colors disabled:opacity-50"
              >
                Partial refund
              </button>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-line rounded p-3">
          <p className="text-xs text-muted mb-2">Bank initiates</p>
          <button
            onClick={openDispute}
            disabled={disputeOpen}
            className="bg-surface-alt border border-line rounded px-3 py-1 text-sm text-heading-alt hover:border-accent transition-colors disabled:opacity-50"
          >
            Simulate a chargeback
          </button>
        </div>
      </div>

      <div className="bg-surface rounded p-3 mb-4 border border-line font-mono text-xs min-h-[70px] space-y-1">
        {log.length === 0 && (
          <p className="text-subtle">No refunds or disputes yet...</p>
        )}
        {log.map((entry, i) => (
          <p key={i} className="text-heading-alt">
            {entry}
          </p>
        ))}
      </div>

      <button
        onClick={reset}
        className="text-sm text-subtle hover:text-accent transition-colors mb-4 block"
      >
        Reset
      </button>

      <CodeBlock>{`// You initiate - full or partial, up to the original amount
await stripe.refunds.create({
  payment_intent: order.paymentIntentId,
  amount: 1500, // omit "amount" entirely for a full refund
});

// The bank initiates - you only ever react to this via a webhook
if (event.type === "charge.dispute.created") {
  const dispute = event.data.object;
  // gather evidence and respond before dispute.evidence_details.due_by
}`}</CodeBlock>
    </div>
  );
}

export default RefundsDemo;
