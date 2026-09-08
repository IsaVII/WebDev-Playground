import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const SOURCE = [1, 2, 3, 4, 5, 6, 7, 8];

const OPS = {
  "filter(even)": { kind: "filter", fn: (n) => n % 2 === 0, label: "filter(n -> n % 2 == 0)" },
  "map(*10)": { kind: "map", fn: (n) => n * 10, label: "map(n -> n * 10)" },
  "limit(2)": { kind: "limit", n: 2, label: "limit(2)" },
};

function runPipeline(active) {
  // Element-at-a-time trace: each source element is pushed through the whole
  // chain before the next one is pulled. limit short-circuits.
  const trace = [];
  let emitted = 0;
  const limitOp = active.find((k) => OPS[k].kind === "limit");
  const limit = limitOp ? OPS[limitOp].n : Infinity;

  for (const start of SOURCE) {
    if (emitted >= limit) {
      trace.push({ start, steps: ["(short-circuited - limit reached, source not pulled)"], out: null });
      break;
    }
    let value = start;
    const steps = [];
    let dropped = false;
    for (const key of active) {
      const op = OPS[key];
      if (op.kind === "filter") {
        if (!op.fn(value)) {
          steps.push(`${key}: ${value} dropped`);
          dropped = true;
          break;
        }
        steps.push(`${key}: ${value} passes`);
      } else if (op.kind === "map") {
        const next = op.fn(value);
        steps.push(`${key}: ${value} -> ${next}`);
        value = next;
      } else if (op.kind === "limit") {
        steps.push(`limit: emit #${emitted + 1}`);
      }
    }
    if (!dropped) emitted += 1;
    trace.push({ start, steps, out: dropped ? null : value });
  }
  return trace;
}

function StreamPipelineDemo() {
  const [active, setActive] = useState(["filter(even)", "map(*10)"]);
  const [trace, setTrace] = useState(null);

  const toggle = (key) => {
    setTrace(null);
    setActive((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const code = `Stream.of(1,2,3,4,5,6,7,8)
${active.map((k) => `    .${OPS[k].label}`).join("\n") || "    // (no intermediate ops)"}
    .forEach(System.out::println);   // <- terminal op: nothing runs without it`;

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Toggle the intermediate operations, then run. Watch how each source
        element is pulled through the <em>whole</em> chain before the next one
        - and how <code>limit</code> stops the source early.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(OPS).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => toggle(key)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              active.includes(key)
                ? "bg-accent text-white"
                : "bg-surface text-muted hover:text-heading"
            }`}
          >
            {key}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setTrace(runPipeline(active))}
          className="ml-auto bg-accent text-white px-4 py-1 rounded text-sm hover:opacity-90"
        >
          Run pipeline
        </button>
      </div>

      <CodeBlock>{code}</CodeBlock>

      {trace && (
        <div className="bg-surface rounded p-4 mt-4 border border-line font-mono text-xs space-y-2">
          {trace.map((row, i) => (
            <div key={i}>
              <span className="text-accent">element {row.start}: </span>
              {row.steps.map((s, j) => (
                <span key={j} className="text-heading-alt">
                  {s}
                  {j < row.steps.length - 1 ? "  →  " : ""}
                </span>
              ))}
              {row.out !== null && (
                <span className="text-green-500"> ⇒ printed {row.out}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StreamPipelineDemo;
