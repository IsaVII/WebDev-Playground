import { useRef, useState } from "react";
import CodeBlock from "../../CodeBlock";

// Simulates the WebSocket event lifecycle (open, message, close) without
// needing a real server to connect to, so the demo works the same
// whether or not this environment has outbound network access.
function WebSocketDemo() {
  const [state, setState] = useState("closed"); // closed | connecting | open
  const [log, setLog] = useState([]);
  const timersRef = useRef([]);

  const track = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
  };

  const connect = () => {
    setState("connecting");
    setLog((l) => [...l, 'new WebSocket("wss://example.com/chat")']);
    track(() => {
      setState("open");
      setLog((l) => [...l, "socket.onopen fired - connection is live"]);
    }, 500);
  };

  const sendMessage = () => {
    const outgoing = `Hello #${log.length}`;
    setLog((l) => [...l, `→ socket.send("${outgoing}")`]);
    track(() => {
      setLog((l) => [...l, `← onmessage: "echo: ${outgoing}"`]);
    }, 400);
  };

  const disconnect = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setState("closed");
    setLog((l) => [...l, "socket.close() - onclose fired"]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Unlike a fetch request, a WebSocket stays open - after one handshake,
        either side can send messages at any time, with no new request/ response
        cycle needed for each one.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <button
          onClick={connect}
          disabled={state !== "closed"}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Connect
        </button>
        <button
          onClick={sendMessage}
          disabled={state !== "open"}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          Send message
        </button>
        <button
          onClick={disconnect}
          disabled={state === "closed"}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          Close
        </button>
        <span className="text-sm text-muted">
          {state === "closed" && "Disconnected"}
          {state === "connecting" && "Connecting..."}
          {state === "open" && "Connected ✓"}
        </span>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-xs min-h-[120px] overflow-x-auto">
        {log.length === 0 && (
          <p className="text-subtle">Socket events will appear here...</p>
        )}
        {log.map((entry, i) => (
          <p key={i} className="text-heading-alt whitespace-pre-wrap">
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock>{`const socket = new WebSocket("wss://example.com/chat");

socket.onopen = () => socket.send("hello");
socket.onmessage = (event) => console.log("received:", event.data);
socket.onclose = () => console.log("connection closed");`}</CodeBlock>
    </div>
  );
}

export default WebSocketDemo;
