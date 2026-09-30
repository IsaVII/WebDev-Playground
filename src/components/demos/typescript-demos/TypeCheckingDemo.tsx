import { useState } from "react";
import CodeBlock from "../../CodeBlock";

// Contrasts when a bug surfaces in plain JS (only once the buggy line
// actually executes) against TypeScript (immediately, at compile time,
// before anything runs) - both paths are simulated, not executed.
function TypeCheckingDemo() {
  const [mode, setMode] = useState("javascript"); // javascript | typescript
  const [ran, setRan] = useState(false);

  const run = () => setRan(true);
  const switchMode = (next) => {
    setMode(next);
    setRan(false);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Both files below have the same bug: <code>getTotal</code> is called with
        a string where it expects an array. Toggle between plain JavaScript and
        TypeScript to see when that bug actually surfaces.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button
          onClick={() => switchMode("javascript")}
          className={`px-4 py-2 rounded border text-sm font-medium transition-colors ${
            mode === "javascript"
              ? "bg-accent border-accent text-white"
              : "bg-surface border-line text-heading hover:border-accent"
          }`}
        >
          totals.js
        </button>
        <button
          onClick={() => switchMode("typescript")}
          className={`px-4 py-2 rounded border text-sm font-medium transition-colors ${
            mode === "typescript"
              ? "bg-accent border-accent text-white"
              : "bg-surface border-line text-heading hover:border-accent"
          }`}
        >
          totals.ts
        </button>
      </div>

      {mode === "javascript" ? (
        <CodeBlock>{`function getTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

getTotal("not an array"); // looks fine until it runs`}</CodeBlock>
      ) : (
        <CodeBlock>{`function getTotal(items: Item[]) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

getTotal("not an array"); // flagged before it ever runs`}</CodeBlock>
      )}

      <div className="bg-surface rounded p-4 my-4 border border-line font-mono text-xs min-h-[70px]">
        {mode === "typescript" ? (
          <p className="text-red-500">
            ✕ Argument of type &apos;string&apos; is not assignable to parameter
            of type &apos;Item[]&apos;.
            <br />
            <span className="text-subtle">
              (shown in your editor immediately - the file won&apos;t even
              compile)
            </span>
          </p>
        ) : !ran ? (
          <p className="text-subtle">
            Nothing wrong here yet, as far as the editor is concerned...
          </p>
        ) : (
          <p className="text-red-500">
            ✕ Uncaught TypeError: items.reduce is not a function
            <br />
            <span className="text-subtle">
              (only shows up now, because this line finally ran)
            </span>
          </p>
        )}
      </div>

      {mode === "javascript" && (
        <button
          onClick={run}
          disabled={ran}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Run totals.js
        </button>
      )}
    </div>
  );
}

export default TypeCheckingDemo;
