import { useState } from "react";
import CodeBlock from "../../CodeBlock";

// Illustrates how a generic function's type parameter T is filled in per
// call by showing the same identity-style function called with different
// input types and the output type it produces each time.
const INPUTS = [
  { label: '"hello"', value: '"hello"', type: "string" },
  { label: "42", value: "42", type: "number" },
  { label: "true", value: "true", type: "boolean" },
  { label: "{ id: 1 }", value: "{ id: 1 }", type: "{ id: number }" },
];

function GenericsDemo() {
  const [index, setIndex] = useState(0);
  const input = INPUTS[index];

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        <code>{"function wrapInArray<T>(value: T): T[]"}</code> doesn&apos;t
        commit to one type - <code>T</code> is a placeholder that gets filled in
        by whatever you actually pass. Pick a value below and see what
        TypeScript infers <code>T</code> to be.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {INPUTS.map((opt, i) => (
          <button
            key={opt.label}
            onClick={() => setIndex(i)}
            className={`px-3 py-1.5 rounded border text-sm font-mono transition-colors ${
              i === index
                ? "bg-accent border-accent text-white"
                : "bg-surface border-line text-heading hover:border-accent"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-xs">
        <p className="text-heading-alt">wrapInArray({input.value})</p>
        <p className="text-muted mt-2">
          T inferred as: <span className="text-accent">{input.type}</span>
        </p>
        <p className="text-muted">
          return type: <span className="text-accent">{input.type}[]</span>
        </p>
        <p className="text-heading-alt mt-2">→ [{input.value}]</p>
      </div>

      <CodeBlock>{`function wrapInArray<T>(value: T): T[] {
  return [value];
}

wrapInArray("hello"); // T = string,  returns string[]
wrapInArray(42);       // T = number,  returns number[]
wrapInArray(true);     // T = boolean, returns boolean[]`}</CodeBlock>
    </div>
  );
}

export default GenericsDemo;
