import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const STAGES = [
  {
    name: "Unnormalized",
    note: "One row per order, with a repeating group of items stuffed into a single column. You can't query or constrain individual items.",
    tables: [
      `order(order_id, customer, items)
------------------------------------------------
1001 | Ada Lovelace | "2x Keyboard @40, 1x Mouse @25"
1002 | Alan Turing  | "3x Cable @5"`,
    ],
  },
  {
    name: "1NF",
    note: "Repeating group removed: one row per order line, every cell atomic. But now customer is duplicated on every line of the same order.",
    tables: [
      `order_line(order_id, product, qty, unit_price, customer)
--------------------------------------------------------------
1001 | Keyboard | 2 | 40 | Ada Lovelace
1001 | Mouse    | 1 | 25 | Ada Lovelace
1002 | Cable    | 3 |  5 | Alan Turing`,
    ],
  },
  {
    name: "2NF",
    note: "Key is (order_id, product). customer depends on order_id alone - a partial dependency - so it moves to its own order table.",
    tables: [
      `order(order_id, customer)
---------------------------
1001 | Ada Lovelace
1002 | Alan Turing`,
      `order_line(order_id, product, qty, unit_price)
------------------------------------------------
1001 | Keyboard | 2 | 40
1001 | Mouse    | 1 | 25
1002 | Cable    | 3 |  5`,
    ],
  },
  {
    name: "3NF",
    note: "unit_price is really a fact about the product, not this line (a transitive dependency via product). Move it to a product table; the line keeps only what's specific to it.",
    tables: [
      `order(order_id, customer)`,
      `product(product, unit_price)
------------------------------
Keyboard | 40
Mouse    | 25
Cable    |  5`,
      `order_line(order_id, product, qty)
-----------------------------------
1001 | Keyboard | 2
1001 | Mouse    | 1
1002 | Cable    | 3`,
    ],
  },
];

function NormalizationDemo() {
  const [step, setStep] = useState(0);
  const stage = STAGES[step];

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Step one messy orders table through the normal forms. Each step fixes
        exactly one kind of duplication.
      </p>

      <div className="flex items-center gap-2 mb-4">
        {STAGES.map((s, i) => (
          <button
            key={s.name}
            type="button"
            onClick={() => setStep(i)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              step === i
                ? "bg-accent text-white"
                : "bg-surface text-muted hover:text-heading"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="bg-surface text-muted px-3 py-1 rounded text-sm hover:text-heading disabled:opacity-40"
        >
          ◂ Back
        </button>
        <button
          type="button"
          onClick={() => setStep((s) => Math.min(STAGES.length - 1, s + 1))}
          disabled={step === STAGES.length - 1}
          className="bg-accent text-white px-3 py-1 rounded text-sm hover:opacity-90 disabled:opacity-40"
        >
          Next ▸
        </button>
      </div>

      <p className="text-sm text-muted mb-3">
        <strong className="text-heading-alt">{stage.name}:</strong> {stage.note}
      </p>

      <div className="space-y-3">
        {stage.tables.map((t, i) => (
          <CodeBlock key={i}>{t}</CodeBlock>
        ))}
      </div>
    </div>
  );
}

export default NormalizationDemo;
