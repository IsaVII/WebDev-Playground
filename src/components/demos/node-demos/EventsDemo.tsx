import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function EventsDemo() {
  const [log, setLog] = useState([]);
  const [listeners, setListeners] = useState([]);

  const emit = (eventName, data) => {
    const matchingListeners = listeners.filter((l) => l.event === eventName);
    setLog((l) => [
      ...l,
      `emitter.emit("${eventName}", ${JSON.stringify(data)})`,
    ]);

    matchingListeners.forEach((listener) => {
      setLog((l) => [
        ...l,
        `→ Listener ${listener.id} called: received ${JSON.stringify(data)}`,
      ]);
    });

    if (matchingListeners.length === 0) {
      setLog((l) => [...l, "  (no listeners registered)"]);
    }
  };

  const addListener = (eventName) => {
    const id = listeners.length + 1;
    setListeners((prev) => [...prev, { id, event: eventName }]);
    setLog((l) => [
      ...l,
      `emitter.on("${eventName}", listener${id})`,
      `✓ Listener ${id} added`,
    ]);
  };

  const removeListener = (eventName) => {
    const removed = listeners.find((l) => l.event === eventName);
    if (removed) {
      setListeners((prev) => prev.filter((l) => l.id !== removed.id));
      setLog((l) => [
        ...l,
        `emitter.off("${eventName}", listener${removed.id})`,
        "✓ Removed",
      ]);
    }
  };

  const once = (eventName) => {
    setLog((l) => [
      ...l,
      `emitter.once("${eventName}", listener)`,
      "✓ One-time listener added",
    ]);
    // Simulate immediate trigger
    setTimeout(() => {
      setLog((l) => [
        ...l,
        `emit("${eventName}") → listener called once`,
        "✓ Listener removed",
      ]);
    }, 500);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        The <code>EventEmitter</code> class lets you build event-driven
        architectures. Objects can emit named events and other code can listen
        for them. Use <code>on()</code> to subscribe, <code>emit()</code> to
        fire, and <code>off()</code> to unsubscribe. Many Node.js APIs (streams,
        servers) extend EventEmitter.
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={() => addListener("data")}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          .on(&quot;data&quot;)
        </button>
        <button
          onClick={() => emit("data", { value: 42 })}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          .emit(&quot;data&quot;)
        </button>
        <button
          onClick={() => addListener("error")}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          .on(&quot;error&quot;)
        </button>
        <button
          onClick={() => emit("error", { message: "Oops!" })}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          .emit(&quot;error&quot;)
        </button>
        <button
          onClick={() => once("ready")}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          .once(&quot;ready&quot;)
        </button>
        <button
          onClick={() => removeListener("data")}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          .off(&quot;data&quot;)
        </button>
        <button
          onClick={() => {
            setLog([]);
            setListeners([]);
          }}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-surface rounded p-4 border border-line">
          <p className="text-sm font-semibold text-accent mb-2">
            Listeners ({listeners.length})
          </p>
          {listeners.length === 0 ? (
            <p className="text-subtle text-xs">No listeners registered</p>
          ) : (
            <div className="space-y-1">
              {listeners.map((l) => (
                <p key={l.id} className="text-xs text-heading-alt font-mono">
                  listener{l.id} → &quot;{l.event}&quot;
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="bg-surface rounded p-4 border border-line font-mono text-sm">
          <p className="text-sm font-semibold text-accent mb-2">Events</p>
          {log.length === 0 && (
            <p className="text-subtle text-xs">Output will appear here...</p>
          )}
          <div className="space-y-0.5 max-h-[200px] overflow-auto">
            {log.map((entry, i) => (
              <p
                key={i}
                className={`text-xs ${entry.startsWith("✓") ? "text-green-400" : "text-heading-alt"}`}
              >
                {entry}
              </p>
            ))}
          </div>
        </div>
      </div>

      <CodeBlock>{`const EventEmitter = require("events");
const emitter = new EventEmitter();

// Subscribe to events
emitter.on("data", (payload) => {
  console.log("Received:", payload);
});

// Emit events
emitter.emit("data", { id: 1, value: 42 });

// One-time listener
emitter.once("ready", () => {
  console.log("Ready! (fires once)");
});

// Unsubscribe
const handler = (data) => console.log(data);
emitter.on("data", handler);
emitter.off("data", handler); // Remove specific listener

// Extend EventEmitter
class MyServer extends EventEmitter {
  start() {
    this.emit("started");
  }
}`}</CodeBlock>
    </div>
  );
}

export default EventsDemo;
