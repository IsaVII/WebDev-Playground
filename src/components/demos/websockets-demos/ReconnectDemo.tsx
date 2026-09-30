import { useRef, useState } from "react";
import CodeBlock from "../../CodeBlock";

const BASE_DELAY = 600; // ms, scaled down from a real 1s base for a snappier demo
const MAX_DELAY = 4800;
const SUCCEED_ON_ATTEMPT = 3; // pretend the server comes back after 2 failed tries

// Simulates a dropped connection retrying with exponential backoff -
// delays double each attempt (capped) instead of hammering the server
// immediately after every failure.
function ReconnectDemo() {
  const [status, setStatus] = useState("open"); // open | reconnecting | open-again
  const [attempt, setAttempt] = useState(0);
  const [log, setLog] = useState([]);
  const timerRef = useRef(null);

  const append = (line) => setLog((l) => [...l, line]);

  const scheduleAttempt = (nextAttempt) => {
    const delay = Math.min(BASE_DELAY * 2 ** (nextAttempt - 1), MAX_DELAY);
    append(`waiting ${delay}ms before attempt #${nextAttempt}...`);

    timerRef.current = setTimeout(() => {
      setAttempt(nextAttempt);
      append(`→ new WebSocket(url) [attempt #${nextAttempt}]`);

      if (nextAttempt >= SUCCEED_ON_ATTEMPT) {
        append("onopen fired - reconnected ✓");
        setStatus("open-again");
      } else {
        append("onclose fired again - still down");
        scheduleAttempt(nextAttempt + 1);
      }
    }, delay);
  };

  const simulateDrop = () => {
    clearTimeout(timerRef.current);
    setLog([]);
    setAttempt(0);
    setStatus("reconnecting");
    append("onclose fired unexpectedly - connection lost");
    scheduleAttempt(1);
  };

  const reset = () => {
    clearTimeout(timerRef.current);
    setStatus("open");
    setAttempt(0);
    setLog([]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Reconnecting the instant a socket closes can hammer a server that is
        already struggling. Backing off - waiting longer after each failed
        attempt, up to a cap - gives it room to recover before the next try.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <button
          onClick={simulateDrop}
          disabled={status === "reconnecting"}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Simulate disconnect
        </button>
        <button
          onClick={reset}
          disabled={status === "open"}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          Reset
        </button>
        <span className="text-sm text-muted">
          {status === "open" && "Connected ✓"}
          {status === "reconnecting" && `Reconnecting (attempt ${attempt})...`}
          {status === "open-again" && "Reconnected ✓"}
        </span>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-xs min-h-[140px] overflow-x-auto">
        {log.length === 0 && (
          <p className="text-subtle">Reconnect attempts will appear here...</p>
        )}
        {log.map((entry, i) => (
          <p key={i} className="text-heading-alt whitespace-pre-wrap">
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock>{`let attempt = 0;

function connect() {
  const socket = new WebSocket(url);

  socket.onopen = () => { attempt = 0; };

  socket.onclose = () => {
    const delay = Math.min(1000 * 2 ** attempt, 30000);
    attempt += 1;
    setTimeout(connect, delay);
  };
}`}</CodeBlock>
    </div>
  );
}

export default ReconnectDemo;
