import { useState } from "react";
import CodeBlock from "../../CodeBlock";

// Simulates a request-style message/response pair over an already-open
// socket, so the shape of "send JSON, get JSON back" is clear without
// needing a real server.
const ACTIONS = [
  {
    type: "get-time",
    label: "Get server time",
    respond: () => ({ type: "time", value: new Date().toLocaleTimeString() }),
  },
  {
    type: "get-user",
    label: "Get user profile",
    respond: () => ({ type: "user", id: 7, name: "Isa", role: "admin" }),
  },
  {
    type: "chat-message",
    label: "Send chat message",
    respond: () => ({ type: "chat-ack", delivered: true }),
  },
];

function MessageExchangeDemo() {
  const [entries, setEntries] = useState([]);
  const [pending, setPending] = useState(false);

  const send = (action) => {
    if (pending) return;
    const outgoing = { type: action.type, requestId: entries.length };
    setEntries((e) => [...e, { direction: "out", payload: outgoing }]);
    setPending(true);

    setTimeout(() => {
      const incoming = { ...action.respond(), requestId: outgoing.requestId };
      setEntries((e) => [...e, { direction: "in", payload: incoming }]);
      setPending(false);
    }, 450);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Every message is just a frame of text or binary data - JSON is a
        convention, not part of the protocol. Both sides agree on a shape (like
        a <code>type</code> field) so incoming messages can be routed without a
        request/response cycle telling them what to expect.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        {ACTIONS.map((action) => (
          <button
            key={action.type}
            onClick={() => send(action)}
            disabled={pending}
            className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-xs min-h-[140px] overflow-x-auto">
        {entries.length === 0 && (
          <p className="text-subtle">
            Sent and received frames will appear here...
          </p>
        )}
        {entries.map((entry, i) => (
          <p
            key={i}
            className={`whitespace-pre-wrap ${
              entry.direction === "out" ? "text-heading-alt" : "text-accent"
            }`}
          >
            {entry.direction === "out" ? "→ send: " : "← message: "}
            {JSON.stringify(entry.payload)}
          </p>
        ))}
      </div>

      <CodeBlock>{`socket.send(JSON.stringify({ type: "get-user" }));

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.type === "user") {
    renderProfile(message);
  }
};`}</CodeBlock>
    </div>
  );
}

export default MessageExchangeDemo;
