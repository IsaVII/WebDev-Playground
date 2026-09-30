import { useState } from "react";
import CodeBlock from "../../CodeBlock";

// A tiny illustrative token generator - NOT how Stripe actually does it,
// just enough to show "raw card number goes in, an opaque reference comes
// out, and only the reference ever leaves the browser" for the demo.
function fakeTokenize(cardNumber) {
  let h = 0;
  for (let i = 0; i < cardNumber.length; i++) {
    h = (Math.imul(31, h) + cardNumber.charCodeAt(i)) | 0;
  }
  return `tok_${(h >>> 0).toString(16).padStart(8, "0")}`;
}

function TokenizationDemo() {
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [token, setToken] = useState(null);
  const [sentToServer, setSentToServer] = useState(null);

  const collectCard = () => {
    // In a real integration this call is made by Stripe.js/Elements,
    // running in an iframe the processor controls - your own JavaScript
    // never has the raw digits in a variable it could read or send.
    const tok = fakeTokenize(cardNumber.replace(/\s/g, ""));
    setToken(tok);
    setSentToServer(null);
  };

  const sendToServer = () => {
    if (!token) return;
    setSentToServer(token);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Stripe.js (or Elements) collects the card number in fields it
        controls and exchanges it for a token before your code ever runs -
        your server's <code>/create-payment-intent</code> route only ever
        receives that token, never the digits themselves.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-surface border border-line rounded p-3">
          <p className="text-xs text-muted mb-2">
            1. Card field (owned by Stripe.js)
          </p>
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full bg-surface-alt border border-line rounded px-2 py-1 text-sm mb-2 text-heading-alt font-mono"
            placeholder="Card number"
          />
          <button
            onClick={collectCard}
            className="bg-accent text-white px-3 py-1 rounded text-sm hover:opacity-90 transition-opacity"
          >
            stripe.createToken()
          </button>
          {token && (
            <p className="text-xs font-mono text-heading-alt mt-2 break-all">
              token: {token}
            </p>
          )}
        </div>

        <div className="bg-surface border border-line rounded p-3">
          <p className="text-xs text-muted mb-2">2. Your server</p>
          <button
            onClick={sendToServer}
            disabled={!token}
            className="bg-accent text-white px-3 py-1 rounded text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            POST /create-payment-intent
          </button>
          {sentToServer && (
            <div className="text-xs mt-2 space-y-1">
              <p className="text-green-400">
                ✓ Server received: {"{"} token: "{sentToServer}" {"}"}
              </p>
              <p className="text-subtle">
                The card number was never in this request body.
              </p>
            </div>
          )}
        </div>
      </div>

      <CodeBlock>{`// Client: Stripe.js owns the card input and does the tokenizing
const { token } = await stripe.createToken(cardElement);

// Only the token is ever sent to your own backend
await fetch("/create-payment-intent", {
  method: "POST",
  body: JSON.stringify({ token: token.id }), // no card number here
});`}</CodeBlock>
    </div>
  );
}

export default TokenizationDemo;
