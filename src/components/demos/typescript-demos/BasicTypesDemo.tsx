import { useState } from "react";
import CodeBlock from "../../CodeBlock";

// Simulates what the TypeScript compiler infers for a variable, and what
// happens when a later assignment doesn't match that inferred type - the
// check itself never runs any code, so this is modeled as a lookup rather
// than an actual evaluation.
const SAMPLES = [
  {
    code: 'let city = "Ljusdal";',
    inferred: "string",
    reassign: "42",
    reassignType: "number",
  },
  {
    code: "let count = 12;",
    inferred: "number",
    reassign: '"twelve"',
    reassignType: "string",
  },
  {
    code: "let active = true;",
    inferred: "boolean",
    reassign: '"yes"',
    reassignType: "string",
  },
  {
    code: 'let tags = ["ts", "js"];',
    inferred: "string[]",
    reassign: "[1, 2, 3]",
    reassignType: "number[]",
  },
];

function BasicTypesDemo() {
  const [index, setIndex] = useState(0);
  const [attempted, setAttempted] = useState(false);
  const sample = SAMPLES[index];

  const pick = (i) => {
    setIndex(i);
    setAttempted(false);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Hover-inspect a variable in an editor with TypeScript and you&apos;ll
        see its inferred type, even with no annotation written. Pick a
        declaration below, then try reassigning it to a value of a different
        type.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {SAMPLES.map((s, i) => (
          <button
            key={s.code}
            onClick={() => pick(i)}
            className={`px-3 py-1.5 rounded border text-sm font-mono transition-colors ${
              i === index
                ? "bg-accent border-accent text-white"
                : "bg-surface border-line text-heading hover:border-accent"
            }`}
          >
            {s.code}
          </button>
        ))}
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm">
        <p className="text-heading-alt mb-2">{sample.code}</p>
        <p className="text-muted text-xs mb-3">
          inferred type: <span className="text-accent">{sample.inferred}</span>
        </p>
        <button
          onClick={() => setAttempted(true)}
          className="bg-surface-alt border border-line text-heading px-3 py-1.5 rounded hover:border-accent transition-colors text-xs"
        >
          Try: reassign to {sample.reassign}
        </button>
        {attempted && (
          <p className="text-xs mt-3 text-red-500">
            ✕ Type &apos;{sample.reassignType}&apos; is not assignable to type
            &apos;{sample.inferred}&apos;.
          </p>
        )}
      </div>

      <CodeBlock>{`let count = 12; // inferred as: number

count = "twelve";
// ✕ Type 'string' is not assignable to type 'number'.`}</CodeBlock>
    </div>
  );
}

export default BasicTypesDemo;
