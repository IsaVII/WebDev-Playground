import { useRef, useState } from "react";
import CodeBlock from "../../CodeBlock";

const PING_INTERVAL = 900;
const MISSED_LIMIT = 2;

// Simulates a heartbeat loop: the server pings on an interval, the "client"
// pongs back unless the connection has been marked as dropped, and enough
// missed pongs in a row cause the server to give up and close the socket.
function HeartbeatDemo() {
  const [running, setRunning] = useState(false);
  const [dropped, setDropped] = useState(false);
  const [missed, setMissed] = useState(0);
  const [log, setLog] = useState([]);
  const intervalRef = useRef(null);
  const droppedRef = useRef(false);
  const missedRef = useRef(0);

  const append = (line) => setLog((l) => [...l.slice(-7), line]);

  const stop = (finalLine) => {
    clearInterval(intervalRef.current);
    setRunning(false);
    if (finalLine) append(finalLine);
  };

  const start = () => {
    setLog([]);
    setMissed(0);
    setDropped(false);
    droppedRef.current = false;
    missedRef.current = 0;
    setRunning(true);

    intervalRef.current = setInterval(() => {
      append("→ ping");

      if (droppedRef.current) {
        missedRef.current += 1;
        setMissed(missedRef.current);
        if (missedRef.current >= MISSED_LIMIT) {
          stop("✕ no pong twice in a row - closing socket");
          return;
        }
        append("... no pong received");
        return;
      }

      setTimeout(() => append("← pong"), 150);
    }, PING_INTERVAL);
  };

  const simulateDrop = () => {
    droppedRef.current = true;
    setDropped(true);
    append("(network drops - pongs stop arriving)");
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        A connection can die without either side getting a clean close event - a
        laptop goes to sleep, wifi drops. Ping frames sent on an interval,
        answered by an automatic pong, let a server notice a dead socket and
        clean it up instead of holding it open forever.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <button
          onClick={start}
          disabled={running}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Start heartbeat
        </button>
        <button
          onClick={simulateDrop}
          disabled={!running || dropped}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          Simulate network drop
        </button>
        <span className="text-sm text-muted">
          {running
            ? dropped
              ? `Missed ${missed}/${MISSED_LIMIT} pongs`
              : "Alive - pinging..."
            : "Not started"}
        </span>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-xs min-h-[140px] overflow-x-auto">
        {log.length === 0 && (
          <p className="text-subtle">Ping/pong activity will appear here...</p>
        )}
        {log.map((entry, i) => (
          <p key={i} className="text-heading-alt whitespace-pre-wrap">
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock>{`function heartbeat(socket) {
  socket.isAlive = true;
}

socket.on("pong", () => heartbeat(socket));

const interval = setInterval(() => {
  if (!socket.isAlive) return socket.terminate();
  socket.isAlive = false;
  socket.ping();
}, 30000);`}</CodeBlock>
    </div>
  );
}

export default HeartbeatDemo;
