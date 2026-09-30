import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function fakeFetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: "Isa" }), 600);
  });
}

function AsyncAwaitDemo() {
  const [style, setStyle] = useState("async");
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);

  const runThen = () => {
    setStatus("loading");
    setResult(null);
    fakeFetchUser(1).then((user) => {
      setResult(user);
      setStatus("done");
    });
  };

  const runAsync = async () => {
    setStatus("loading");
    setResult(null);
    const user = await fakeFetchUser(1);
    setResult(user);
    setStatus("done");
  };

  const run = () => (style === "async" ? runAsync() : runThen());

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Both buttons below call the exact same promise-returning function - one
        chains <code>.then()</code>, the other <code>await</code>s it. Same
        600ms delay, same result, different syntax.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {["async", "then"].map((s) => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            className={`px-3 py-1.5 rounded border text-sm font-mono transition-colors ${
              style === s
                ? "bg-accent border-accent text-white"
                : "bg-surface border-line text-heading hover:border-accent"
            }`}
          >
            {s === "async" ? "async/await" : ".then()"}
          </button>
        ))}
      </div>

      <button
        onClick={run}
        disabled={status === "loading"}
        className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50 mb-4"
      >
        {status === "loading" ? "Awaiting..." : "Fetch user"}
      </button>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[60px]">
        {status === "idle" && <p className="text-subtle">No request yet...</p>}
        {status === "loading" && (
          <p className="text-muted">waiting on the promise...</p>
        )}
        {status === "done" && (
          <p className="text-heading-alt">user = {JSON.stringify(result)}</p>
        )}
      </div>

      <CodeBlock>
        {style === "async"
          ? `async function loadUser() {\n  const user = await fakeFetchUser(1);\n  console.log(user);\n}`
          : `function loadUser() {\n  fakeFetchUser(1).then((user) => {\n    console.log(user);\n  });\n}`}
      </CodeBlock>
    </div>
  );
}

export default AsyncAwaitDemo;
