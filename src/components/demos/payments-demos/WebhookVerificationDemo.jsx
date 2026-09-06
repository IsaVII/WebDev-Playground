import { useState } from "react";
import CodeBlock from "../../CodeBlock";

// A tiny illustrative signature - NOT real HMAC-SHA256, just enough to show
// "signature depends on the exact bytes + a shared secret" for the demo.
function fakeSign(payload, secret) {
  let h = 0;
  const combined = payload + secret;
  for (let i = 0; i < combined.length; i++) {
    h = (Math.imul(31, h) + combined.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

const SECRET = "whsec_9f2a1c";
const ORIGINAL_PAYLOAD =
  '{"type":"payment_intent.succeeded","data":{"amount":2000}}';

function WebhookVerificationDemo() {
  const [payload, setPayload] = useState(ORIGINAL_PAYLOAD);
  const [receivedSignature, setReceivedSignature] = useState(
    fakeSign(ORIGINAL_PAYLOAD, SECRET),
  );
  const [result, setResult] = useState(null);

  const tamper = () => {
    setPayload(
      '{"type":"payment_intent.succeeded","data":{"amount":999999}}',
    );
    // signature is left as-is, matching an attacker who can't re-sign
    // without knowing SECRET
  };

  const reset = () => {
    setPayload(ORIGINAL_PAYLOAD);
    setReceivedSignature(fakeSign(ORIGINAL_PAYLOAD, SECRET));
    setResult(null);
  };

  const verify = () => {
    const expected = fakeSign(payload, SECRET);
    setResult(expected === receivedSignature);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Anyone can POST to a public webhook URL, so the payload alone proves
        nothing. Stripe signs every webhook with a secret only you and Stripe
        know - your server recomputes the signature from the raw body and
        compares it, rejecting anything that doesn't match exactly.
      </p>

      <div className="bg-surface border border-line rounded p-3 mb-4">
        <p className="text-xs text-muted mb-2">Incoming webhook request</p>
        <textarea
          value={payload}
          onChange={(e) => {
            setPayload(e.target.value);
            setResult(null);
          }}
          rows={2}
          className="w-full bg-surface-alt border border-line rounded px-2 py-1 text-xs font-mono mb-2 text-heading-alt"
        />
        <p className="text-xs font-mono text-heading-alt break-all">
          stripe-signature header: {receivedSignature}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={verify}
          className="bg-accent text-white px-3 py-1 rounded text-sm hover:opacity-90 transition-opacity"
        >
          stripe.webhooks.constructEvent()
        </button>
        <button
          onClick={tamper}
          className="bg-surface border border-line rounded px-3 py-1 text-sm text-heading-alt hover:border-accent transition-colors"
        >
          Tamper with the payload
        </button>
        <button
          onClick={reset}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Reset
        </button>
      </div>

      {result !== null && (
        <p
          className={`text-xs font-mono mb-4 ${
            result ? "text-green-400" : "text-red-400"
          }`}
        >
          {result
            ? "✓ Signature matches - event trusted, order marked paid"
            : "✗ Signature mismatch - 400 rejected, order NOT updated"}
        </p>
      )}

      <CodeBlock>{`app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const signature = req.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,          // the raw, unparsed bytes
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch {
    return res.status(400).send("Webhook signature verification failed");
  }

  // Only reachable once the signature has been proven valid
  handleEvent(event);
});`}</CodeBlock>
    </div>
  );
}

export default WebhookVerificationDemo;
