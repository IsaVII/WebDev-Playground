import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const OPTIONS = {
  checkout: {
    label: "Hosted Checkout",
    where: "On a page Stripe builds and hosts, at checkout.stripe.com",
    pros: [
      "Least code to write and maintain",
      "Stripe handles layout, localization, and new payment methods automatically",
    ],
    cons: [
      "User leaves your site during payment",
      "Harder to fully match your app's look and feel",
    ],
    code: `const session = await stripe.checkout.sessions.create({
  line_items: [{ price: priceId, quantity: 1 }],
  mode: "payment",
  success_url: "https://example.com/success",
  cancel_url: "https://example.com/cancel",
});
window.location = session.url; // full redirect away from your app`,
  },
  elements: {
    label: "Embedded Elements",
    where: "Inside your own page, in card fields Stripe's iframe renders",
    pros: [
      "User never leaves your site or your app's design",
      "Full control over surrounding checkout UI",
    ],
    cons: [
      "More client code to write (loading states, error display)",
      "You own more of the visual polish work yourself",
    ],
    code: `const elements = stripe.elements();
const cardElement = elements.create("card");
cardElement.mount("#card-element"); // renders inside YOUR page

const { error } = await stripe.confirmCardPayment(clientSecret, {
  payment_method: { card: cardElement },
});`,
  },
};

function CheckoutVsElementsDemo() {
  const [choice, setChoice] = useState("checkout");
  const option = OPTIONS[choice];

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Neither strategy lets your server or your own JavaScript see a raw
        card number - the difference is entirely about where the card
        <em> form</em> lives and how much of the surrounding experience you
        control.
      </p>

      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setChoice("checkout")}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            choice === "checkout"
              ? "bg-accent text-white"
              : "bg-surface-alt text-muted hover:text-heading"
          }`}
        >
          Hosted Checkout
        </button>
        <button
          onClick={() => setChoice("elements")}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            choice === "elements"
              ? "bg-accent text-white"
              : "bg-surface-alt text-muted hover:text-heading"
          }`}
        >
          Embedded Elements
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line">
        <p className="text-sm text-heading-alt font-semibold mb-2">
          {option.label}
        </p>
        <p className="text-xs text-muted mb-3">
          Card form lives: {option.where}
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-green-400 mb-1">Pros</p>
            <ul className="list-disc pl-4 text-muted space-y-1">
              {option.pros.map((pro) => (
                <li key={pro}>{pro}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-red-400 mb-1">Trade-offs</p>
            <ul className="list-disc pl-4 text-muted space-y-1">
              {option.cons.map((con) => (
                <li key={con}>{con}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <CodeBlock>{option.code}</CodeBlock>
    </div>
  );
}

export default CheckoutVsElementsDemo;
