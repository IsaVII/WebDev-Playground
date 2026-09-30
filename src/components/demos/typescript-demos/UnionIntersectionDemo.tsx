import { useState } from "react";
import CodeBlock from "../../CodeBlock";

// Shows type narrowing: a value typed as a union only exposes the
// operations common to every member of the union until a typeof check
// narrows it down to one branch, at which point type-specific operations
// become available.
const VALUES = [
  { label: '"hello"', value: "hello", type: "string" },
  { label: "42", value: 42, type: "number" },
];

function FunctionOf(id) {
  return VALUES.find((v) => v.label === id);
}

function UnionIntersectionDemo() {
  const [selected, setSelected] = useState(VALUES[0].label);
  const current = FunctionOf(selected);

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        A value typed <code>string | number</code> could be either, so
        TypeScript only allows operations that are safe for both - until you
        check <code>typeof</code>, which narrows it down inside that branch.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {VALUES.map((v) => (
          <button
            key={v.label}
            onClick={() => setSelected(v.label)}
            className={`px-3 py-1.5 rounded border text-sm font-mono transition-colors ${
              selected === v.label
                ? "bg-accent border-accent text-white"
                : "bg-surface border-line text-heading hover:border-accent"
            }`}
          >
            id = {v.label}
          </button>
        ))}
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-xs">
        <p className="text-heading-alt">
          function describe(id: string | number) {"{"}
        </p>
        <p className="pl-4 text-muted">if (typeof id === "string") {"{"}</p>
        <p
          className={`pl-8 ${current.type === "string" ? "text-accent" : "text-subtle"}`}
        >
          {current.type === "string"
            ? `✓ this branch runs - id.toUpperCase() → "${current.value.toUpperCase()}"`
            : "(skipped for this value)"}
        </p>
        <p className="pl-4 text-muted">
          {"}"} else {"{"}
        </p>
        <p
          className={`pl-8 ${current.type === "number" ? "text-accent" : "text-subtle"}`}
        >
          {current.type === "number"
            ? `✓ this branch runs - id.toFixed(2) → "${current.value.toFixed(2)}"`
            : "(skipped for this value)"}
        </p>
        <p className="pl-4 text-muted">{"}"}</p>
        <p className="text-heading-alt">{"}"}</p>
      </div>

      <CodeBlock>{`function describe(id: string | number) {
  if (typeof id === "string") {
    return id.toUpperCase(); // narrowed to string here
  }
  return id.toFixed(2);      // narrowed to number here
}`}</CodeBlock>
    </div>
  );
}

export default UnionIntersectionDemo;
