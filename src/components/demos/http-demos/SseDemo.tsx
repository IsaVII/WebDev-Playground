import { useRef, useState } from "react";
import CodeBlock from "../../CodeBlock";

// Simulates an EventSource pushing periodic events, standing in for a
// real server "text/event-stream" connection so the demo works offline.
function SseDemo() {
  const [events, setEvents] = useState([]);
  const [subscribed, setSubscribed] = useState(false);
  const intervalRef = useRef(null);
  const countRef = useRef(0);

  const subscribe = () => {
    setSubscribed(true);
    setEvents([]);
    countRef.current = 0;

    intervalRef.current = setInterval(() => {
      countRef.current += 1;
      setEvents((e) => [
        ...e,
        `event: price-update\ndata: { "symbol": "NODE", "price": ${(100 + countRef.current * 1.3).toFixed(2)} }`,
      ]);
    }, 700);
  };

  const unsubscribe = () => {
    clearInterval(intervalRef.current);
    setSubscribed(false);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Server-Sent Events give you a one-way stream from server to client over
        a single long-lived HTTP connection - simpler than a WebSocket when the
        client never needs to send anything back, like a live price ticker or a
        notifications feed.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <button
          onClick={subscribe}
          disabled={subscribed}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Subscribe
        </button>
        <button
          onClick={unsubscribe}
          disabled={!subscribed}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          Unsubscribe
        </button>
        <span className="text-sm text-muted">
          {subscribed ? "Listening..." : "Not subscribed"}
        </span>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-xs min-h-[130px] overflow-x-auto">
        {events.length === 0 && (
          <p className="text-subtle">Events will appear here...</p>
        )}
        {events.map((entry, i) => (
          <pre key={i} className="text-heading-alt whitespace-pre-wrap mb-2">
            {entry}
          </pre>
        ))}
      </div>

      <CodeBlock>{`const source = new EventSource("/api/prices");

source.onmessage = (event) => {
  const update = JSON.parse(event.data);
  console.log(update);
};

// Later, when the page no longer needs updates:
source.close();`}</CodeBlock>
    </div>
  );
}

export default SseDemo;
