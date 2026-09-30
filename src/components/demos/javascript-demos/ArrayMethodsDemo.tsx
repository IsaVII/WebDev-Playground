import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const PRICES = [12, 45, 8, 30, 19, 4];

// These actually run against PRICES - none of them touch the original
// array, they each return something new.
const OPERATIONS = {
  map: {
    label: "map",
    run: () => PRICES.map((p) => p * 2),
    code: "prices.map((p) => p * 2)",
  },
  filter: {
    label: "filter",
    run: () => PRICES.filter((p) => p > 15),
    code: "prices.filter((p) => p > 15)",
  },
  reduce: {
    label: "reduce",
    run: () => PRICES.reduce((sum, p) => sum + p, 0),
    code: "prices.reduce((sum, p) => sum + p, 0)",
  },
};

function ArrayMethodsDemo() {
  const [op, setOp] = useState("map");
  const current = OPERATIONS[op];
  const result = current.run();

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Same array, three different transformations - each one returns a new
        value instead of changing <code>prices</code> in place.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {Object.keys(OPERATIONS).map((key) => (
          <button
            key={key}
            onClick={() => setOp(key)}
            className={`px-3 py-1.5 rounded border text-sm font-mono transition-colors ${
              op === key
                ? "bg-accent border-accent text-white"
                : "bg-surface border-line text-heading hover:border-accent"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm">
        <p className="text-muted mb-2">prices = [{PRICES.join(", ")}]</p>
        <p className="text-heading-alt">
          {current.code} →{" "}
          <span className="text-accent">
            {Array.isArray(result) ? `[${result.join(", ")}]` : result}
          </span>
        </p>
      </div>

      <CodeBlock>{`const prices = [${PRICES.join(", ")}];

${current.code};
// → ${Array.isArray(result) ? `[${result.join(", ")}]` : result}`}</CodeBlock>
    </div>
  );
}

export default ArrayMethodsDemo;
