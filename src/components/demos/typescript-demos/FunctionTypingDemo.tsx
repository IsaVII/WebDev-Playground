import { useState } from "react";
import CodeBlock from "../../CodeBlock";

// Checks a chosen pair of arguments against a fixed function signature,
// standing in for what tsc reports at the call site rather than anything
// that actually executes.
const ARG_OPTIONS = [
  { label: "5", value: 5, type: "number" },
  { label: '"5"', value: "5", type: "string" },
  { label: "true", value: true, type: "boolean" },
];

function checkCall(a, b) {
  const errors = [];
  if (a.type !== "number") {
    errors.push(
      `Argument of type '${a.type}' is not assignable to parameter of type 'number'.`,
    );
  }
  if (b.type !== "number") {
    errors.push(
      `Argument of type '${b.type}' is not assignable to parameter of type 'number'.`,
    );
  }
  return errors;
}

function FunctionTypingDemo() {
  const [aIndex, setAIndex] = useState(0);
  const [bIndex, setBIndex] = useState(0);
  const a = ARG_OPTIONS[aIndex];
  const b = ARG_OPTIONS[bIndex];
  const errors = checkCall(a, b);

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Typing a function&apos;s parameters means every call site gets checked
        against that signature. Pick two arguments for{" "}
        <code>add(a: number, b: number): number</code> and see which
        combinations TypeScript accepts.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted">a:</span>
          {ARG_OPTIONS.map((opt, i) => (
            <button
              key={opt.label}
              onClick={() => setAIndex(i)}
              className={`px-3 py-1 rounded border text-sm font-mono transition-colors ${
                i === aIndex
                  ? "bg-accent border-accent text-white"
                  : "bg-surface border-line text-heading hover:border-accent"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted">b:</span>
          {ARG_OPTIONS.map((opt, i) => (
            <button
              key={opt.label}
              onClick={() => setBIndex(i)}
              className={`px-3 py-1 rounded border text-sm font-mono transition-colors ${
                i === bIndex
                  ? "bg-accent border-accent text-white"
                  : "bg-surface border-line text-heading hover:border-accent"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-xs min-h-[90px]">
        <p className="text-heading-alt">
          add({a.label}, {b.label})
        </p>
        {errors.length === 0 ? (
          <p className="text-accent mt-2">✓ compiles - returns number</p>
        ) : (
          errors.map((err, i) => (
            <p key={i} className="text-red-500 mt-2">
              ✕ {err}
            </p>
          ))
        )}
      </div>

      <CodeBlock>{`function add(a: number, b: number): number {
  return a + b;
}

add(5, 5);   // ✓ 10
add("5", 5); // ✕ Argument of type 'string' is not
             //   assignable to parameter of type 'number'.`}</CodeBlock>
    </div>
  );
}

export default FunctionTypingDemo;
