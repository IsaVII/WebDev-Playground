import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const CHUNKS = [
  "Once ",
  "upon ",
  "a ",
  "time, ",
  "in ",
  "a ",
  "Node.js ",
  "process...",
];

function StreamDemo() {
  const [received, setReceived] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | streaming | ended

  const startStream = () => {
    setReceived([]);
    setStatus("streaming");

    CHUNKS.forEach((chunk, i) => {
      setTimeout(
        () => {
          setReceived((r) => [...r, chunk]);
          if (i === CHUNKS.length - 1) setStatus("ended");
        },
        (i + 1) * 300,
      );
    });
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        A stream delivers data piece by piece instead of loading everything into
        memory at once. Each <code>&quot;data&quot;</code> event hands you the
        next chunk; <code>&quot;end&quot;</code> fires once there are no more
        chunks left.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <button
          onClick={startStream}
          disabled={status === "streaming"}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === "streaming" ? "Streaming..." : "Start stream"}
        </button>
        <span className="text-sm text-muted">
          {status === "idle" && "Not started"}
          {status === "streaming" &&
            `${received.length} / ${CHUNKS.length} chunks received`}
          {status === "ended" && "Stream ended ✓"}
        </span>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[52px] text-heading-alt">
        {received.length === 0 ? (
          <span className="text-subtle">Output will appear here...</span>
        ) : (
          received.join("")
        )}
      </div>

      <CodeBlock>{`readableStream.on("data", (chunk) => {
  buffer += chunk; // fires once per chunk, as data arrives
});

readableStream.on("end", () => {
  console.log("done:", buffer); // fires once, after the last chunk
});`}</CodeBlock>
    </div>
  );
}

export default StreamDemo;
