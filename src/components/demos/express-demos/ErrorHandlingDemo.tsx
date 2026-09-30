import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const SCENARIOS = [
  {
    label: "Sync error, thrown directly",
    lines: [
      "route handler: throw new Error('boom')",
      "Express catches synchronous throws automatically",
      "→ jumps to the error-handling middleware",
      "→ 500 { error: 'boom' }",
    ],
  },
  {
    label: "Async error, no try/catch",
    lines: [
      "route handler (async): await db.find() rejects",
      "Express does NOT automatically catch rejected promises",
      "→ nothing calls next(err) - the request just hangs",
      "→ client eventually times out",
    ],
  },
  {
    label: "Async error, forwarded manually",
    lines: [
      "route handler: .catch(next) on the promise",
      "the rejection is passed into next(err) explicitly",
      "→ jumps to the error-handling middleware",
      "→ 500 { error: 'Database unavailable' }",
    ],
  },
  {
    label: "Custom status via next(err)",
    lines: [
      "route handler: next({ status: 404, message: 'Not found' })",
      "→ jumps to the error-handling middleware",
      "→ 404 { error: 'Not found' }",
    ],
  },
];

function ErrorHandlingDemo() {
  const [log, setLog] = useState([]);

  const run = (scenario) => {
    setLog((l) => [...l, scenario]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Express automatically catches errors <em>thrown synchronously</em>{" "}
        inside a route handler and routes them to your error middleware. It does{" "}
        <strong>not</strong> automatically catch a rejected promise in an{" "}
        <code>async</code> handler - you have to forward those to{" "}
        <code>next(err)</code> yourself, or the request hangs.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {SCENARIOS.map((s) => (
          <button
            key={s.label}
            onClick={() => run(s)}
            className="bg-surface border border-line rounded px-3 py-2 text-xs text-heading-alt hover:border-accent transition-colors"
          >
            {s.label}
          </button>
        ))}
        <button
          onClick={() => setLog([])}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[140px]">
        {log.length === 0 && (
          <p className="text-subtle text-xs">Pick a scenario above...</p>
        )}
        {log.map((entry, i) => (
          <div key={i} className="mb-3">
            <p className="text-xs text-accent">{entry.label}</p>
            {entry.lines.map((line, j) => (
              <p key={j} className="text-xs text-heading-alt pl-3">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <CodeBlock>{`// Sync errors are caught automatically:
app.get("/a", (req, res) => {
  throw new Error("boom"); // Express catches this for you
});

// Async errors are NOT - forward them yourself:
app.get("/b", async (req, res, next) => {
  try {
    const data = await db.find();
    res.json(data);
  } catch (err) {
    next(err); // without this, the request just hangs
  }
});

// One error handler, registered last, catches everything forwarded to next():
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});`}</CodeBlock>
    </div>
  );
}

export default ErrorHandlingDemo;
