import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function EventLoopDemo() {
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);

  const run = () => {
    setLog([]);
    setRunning(true);

    // This really does run in the order the event loop dictates - all
    // synchronous lines first, then queued microtasks (the promise),
    // and only then macrotasks (the timer) - even with a 0ms delay.
    setLog((l) => [...l, "1. console.log (sync) - runs immediately"]);

    setTimeout(() => {
      setLog((l) => [...l, "4. setTimeout callback (macrotask) - runs last"]);
      setRunning(false);
    }, 0);

    Promise.resolve().then(() => {
      setLog((l) => [
        ...l,
        "3. Promise .then (microtask) - runs before any timer",
      ]);
    });

    setLog((l) => [...l, "2. console.log (sync) - still runs immediately"]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Click run and watch the order entries appear in - not the order
        they&apos;re written in. Every synchronous line finishes first, then
        every queued microtask (promises), and only then macrotasks (timers),
        even a <code>setTimeout(fn, 0)</code>.
      </p>

      <button
        onClick={run}
        disabled={running}
        className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50 mb-4"
      >
        {running ? "Running..." : "Run the code below"}
      </button>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[120px]">
        {log.length === 0 && (
          <p className="text-subtle">Output will appear here...</p>
        )}
        {log.map((entry, i) => (
          <p key={i} className="text-heading-alt">
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock>{`console.log("1. sync");
setTimeout(() => console.log("4. timeout"), 0);
Promise.resolve().then(() => console.log("3. promise"));
console.log("2. sync");`}</CodeBlock>
    </div>
  );
}

export default EventLoopDemo;
