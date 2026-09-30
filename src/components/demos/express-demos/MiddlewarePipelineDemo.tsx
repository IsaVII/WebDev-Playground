import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const PIPELINE = [
  { name: "express.json()", desc: "parses the body, calls next()" },
  { name: "logger", desc: "logs the request, calls next()" },
  { name: "requireAuth", desc: "checks a token before allowing through" },
  { name: "GET /orders", desc: "the route handler itself" },
];

function MiddlewarePipelineDemo() {
  const [authed, setAuthed] = useState(true);
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);

  const run = () => {
    setLog([]);
    setRunning(true);

    const steps = [];
    steps.push(`→ Request: GET /orders`);
    steps.push(`express.json() ran, req.body is ready → next()`);
    steps.push(`logger ran: "GET /orders" → next()`);

    if (!authed) {
      steps.push(
        `requireAuth: no valid token → next(new Error("Unauthorized"))`,
      );
      steps.push(
        `⨯ Chain short-circuits - jumps straight to the error handler`,
      );
      steps.push(`✗ 401 Unauthorized sent. GET /orders handler never ran.`);
    } else {
      steps.push(`requireAuth: token OK → next()`);
      steps.push(`GET /orders handler ran → res.json(orders)`);
      steps.push(`✓ 200 OK sent`);
    }

    steps.forEach((line, i) => {
      setTimeout(() => {
        setLog((l) => [...l, line]);
        if (i === steps.length - 1) setRunning(false);
      }, i * 450);
    });
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Middleware runs in the exact order it was registered. Each function
        either calls <code>next()</code> to pass control along, or ends the
        response itself - and calling <code>next(err)</code> instead skips every
        remaining normal middleware and jumps straight to the error handler.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {PIPELINE.map((step) => (
          <div
            key={step.name}
            className="bg-surface border border-line rounded px-3 py-2 text-xs font-mono text-heading-alt"
            title={step.desc}
          >
            {step.name}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setAuthed(true)}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            authed
              ? "bg-accent text-white"
              : "bg-surface-alt text-muted hover:text-heading"
          }`}
        >
          Valid token
        </button>
        <button
          onClick={() => setAuthed(false)}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            !authed
              ? "bg-accent text-white"
              : "bg-surface-alt text-muted hover:text-heading"
          }`}
        >
          No token
        </button>
        <button
          onClick={run}
          disabled={running}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50 ml-auto"
        >
          {running ? "Running..." : "Send request"}
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[150px]">
        {log.length === 0 && (
          <p className="text-subtle text-xs">
            Pick a token state and send a request...
          </p>
        )}
        {log.map((entry, i) => (
          <p key={i} className="text-xs text-heading-alt mb-1">
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock>{`app.use(express.json());
app.use(logger);
app.use(requireAuth);          // calls next(err) if there's no valid token

app.get("/orders", (req, res) => {
  res.json(orders);            // only reached if every middleware above called next()
});

app.use((err, req, res, next) => {
  res.status(401).json({ error: err.message });
});`}</CodeBlock>
    </div>
  );
}

export default MiddlewarePipelineDemo;
