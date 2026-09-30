import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const SAMPLE_QUOTES = [
  "Talk is cheap. Show me the code.",
  "Programs must be written for people to read.",
];

function HttpServerDemo() {
  const [quotes, setQuotes] = useState([
    "Node.js runs JavaScript outside the browser.",
  ]);
  const [log, setLog] = useState([]);

  const get = () => {
    setLog((l) => [...l, `GET /quotes -> 200 ${JSON.stringify(quotes)}`]);
  };

  const post = () => {
    const quote = SAMPLE_QUOTES[quotes.length % SAMPLE_QUOTES.length];
    setQuotes((q) => [...q, quote]);
    setLog((l) => [...l, `POST /quotes { "quote": "${quote}" } -> 201 Saved`]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Each button simulates a client sending a request to the server from the
        example above. The handler branches on <code>req.method</code> and{" "}
        <code>req.url</code> to decide how to respond.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <button
          onClick={get}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors"
        >
          Send GET /quotes
        </button>
        <button
          onClick={post}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Send POST /quotes
        </button>
        <button
          onClick={() => setLog([])}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-xs min-h-[100px] overflow-x-auto">
        {log.length === 0 && (
          <p className="text-subtle">Requests will appear here...</p>
        )}
        {log.map((entry, i) => (
          <p key={i} className="text-heading-alt whitespace-pre-wrap">
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock>{`if (req.method === "GET" && req.url === "/quotes") {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(quotes));
}`}</CodeBlock>
    </div>
  );
}

export default HttpServerDemo;
