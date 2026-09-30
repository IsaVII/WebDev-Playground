import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const CLIENTS = ["Isa", "Priya", "Marcus"];

// Simulates a server holding several open sockets and fanning one message
// out to all of them, which is the part a single-client demo can't show.
function BroadcastDemo() {
  const [sender, setSender] = useState(CLIENTS[0]);
  const [text, setText] = useState("hello everyone!");
  const [logs, setLogs] = useState(() =>
    Object.fromEntries(CLIENTS.map((name) => [name, []])),
  );

  const broadcast = () => {
    if (!text.trim()) return;
    const message = { user: sender, text };

    setLogs((prev) => {
      const next = {};
      for (const name of CLIENTS) {
        const received = name !== sender;
        next[name] = [
          ...prev[name],
          {
            message,
            note: received
              ? "received via broadcast"
              : "sent (not echoed back)",
          },
        ];
      }
      return next;
    });
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        The server keeps every open socket in a collection. When one client
        sends a message, the server loops over that collection and calls{" "}
        <code>send()</code> on each one - the sender is usually skipped so they
        don&apos;t see their own message echoed back.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          className="bg-surface border border-line text-heading rounded px-3 py-2"
        >
          {CLIENTS.map((name) => (
            <option key={name} value={name}>
              Send as {name}
            </option>
          ))}
        </select>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-surface border border-line text-heading rounded px-3 py-2 flex-1 min-w-[160px]"
          placeholder="Message text"
        />
        <button
          onClick={broadcast}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Broadcast
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {CLIENTS.map((name) => (
          <div
            key={name}
            className="bg-surface rounded p-3 border border-line font-mono text-xs min-h-[130px] overflow-x-auto"
          >
            <p className="text-heading-alt font-sans font-semibold mb-2">
              {name}&apos;s client
            </p>
            {logs[name].length === 0 && (
              <p className="text-subtle">No messages yet...</p>
            )}
            {logs[name].map((entry, i) => (
              <p key={i} className="text-muted whitespace-pre-wrap mb-1">
                {entry.message.user}: {entry.message.text}
                <br />
                <span className="text-subtle">({entry.note})</span>
              </p>
            ))}
          </div>
        ))}
      </div>

      <CodeBlock>{`wss.on("connection", (socket) => {
  clients.add(socket);

  socket.on("message", (raw) => {
    for (const client of clients) {
      if (client !== socket && client.readyState === client.OPEN) {
        client.send(raw);
      }
    }
  });
});`}</CodeBlock>
    </div>
  );
}

export default BroadcastDemo;
