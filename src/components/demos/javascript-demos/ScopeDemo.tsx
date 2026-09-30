import { useState } from "react";
import CodeBlock from "../../CodeBlock";

// These really run - var is function-scoped, so all three timers close
// over the *same* i, which is 3 by the time any of them fire. let creates
// a fresh binding per iteration, so each timer keeps its own value.
function runVarLoop(onLog) {
  for (var i = 0; i < 3; i++) {
    setTimeout(() => onLog(i), (i + 1) * 150);
  }
}

function runLetLoop(onLog) {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => onLog(i), (i + 1) * 150);
  }
}

function ScopeDemo() {
  const [mode, setMode] = useState("let");
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);

  const run = () => {
    setLog([]);
    setRunning(true);

    const onLog = (value) => {
      setLog((l) => {
        const next = [...l, value];
        if (next.length === 3) setRunning(false);
        return next;
      });
    };

    if (mode === "var") runVarLoop(onLog);
    else runLetLoop(onLog);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Same loop, one declaration swapped. <code>var</code> is function-scoped,
        so every callback below shares one <code>i</code> - by the time the
        timers fire, the loop has already finished and <code>i</code> is 3.{" "}
        <code>let</code> creates a fresh binding every iteration, so each
        callback keeps its own value.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {["let", "var"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded border text-sm font-mono transition-colors ${
              mode === m
                ? "bg-accent border-accent text-white"
                : "bg-surface border-line text-heading hover:border-accent"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <button
        onClick={run}
        disabled={running}
        className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50 mb-4"
      >
        {running ? "Running..." : "Run the loop"}
      </button>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[60px]">
        {log.length === 0 && (
          <p className="text-subtle">Output will appear here...</p>
        )}
        {log.length > 0 && (
          <p className="text-heading-alt">logged: {log.join(", ")}</p>
        )}
      </div>

      <CodeBlock>{`for (${mode} i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// ${mode === "var" ? "logs: 3, 3, 3" : "logs: 0, 1, 2"}`}</CodeBlock>
    </div>
  );
}

export default ScopeDemo;
