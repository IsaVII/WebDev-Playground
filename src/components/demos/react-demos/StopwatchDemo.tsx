import { useEffect, useState } from "react";
import CodeBlock from "../../CodeBlock";

function StopwatchDemo() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [running]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        The effect starts an interval whenever <code>running</code> is true, and
        its cleanup function clears that interval whenever <code>running</code>{" "}
        changes or the component unmounts.
      </p>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-3xl font-mono font-bold text-heading-alt tabular-nums">
          {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </span>

        <button
          onClick={() => setRunning((r) => !r)}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          {running ? "Pause" : "Start"}
        </button>

        <button
          onClick={() => {
            setRunning(false);
            setSeconds(0);
          }}
          className="text-sm text-subtle hover:text-accent transition-colors"
        >
          Reset
        </button>
      </div>

      <CodeBlock>{`useEffect(() => {
  if (!running) return;
  const id = setInterval(() => setSeconds(s => s + 1), 1000);
  return () => clearInterval(id); // cleanup
}, [running]);`}</CodeBlock>
    </div>
  );
}

export default StopwatchDemo;
