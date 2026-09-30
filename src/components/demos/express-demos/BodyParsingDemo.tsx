import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const REQUESTS = [
  {
    label: "JSON body",
    contentType: "application/json",
    raw: '{"name":"Ada","role":"admin"}',
    needs: "express.json()",
  },
  {
    label: "Form submission",
    contentType: "application/x-www-form-urlencoded",
    raw: "name=Ada&role=admin",
    needs: "express.urlencoded({ extended: true })",
  },
  {
    label: "Plain text",
    contentType: "text/plain",
    raw: "just some text",
    needs: "express.text()",
  },
  {
    label: "No parser installed",
    contentType: "application/json",
    raw: '{"name":"Ada"}',
    needs: null,
  },
];

function BodyParsingDemo() {
  const [installed, setInstalled] = useState({
    "express.json()": true,
    "express.urlencoded({ extended: true })": true,
    "express.text()": false,
  });
  const [log, setLog] = useState([]);

  const toggle = (mw) => setInstalled((s) => ({ ...s, [mw]: !s[mw] }));

  const send = (req) => {
    const lines = [`Content-Type: ${req.contentType}`, `Raw body: ${req.raw}`];
    if (!req.needs) {
      lines.push("No parser can handle this Content-Type");
      lines.push("→ req.body stays undefined");
    } else if (installed[req.needs]) {
      const parsed =
        req.needs === "express.json()"
          ? req.raw
          : req.needs.startsWith("express.urlencoded")
            ? '{ name: "Ada", role: "admin" }'
            : `"${req.raw}"`;
      lines.push(`${req.needs} is mounted → parses it`);
      lines.push(`→ req.body = ${parsed}`);
    } else {
      lines.push(`${req.needs} is NOT mounted`);
      lines.push("→ req.body stays undefined - a common source of bugs");
    }
    setLog((l) => [...l, { label: req.label, lines }]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Express doesn't parse request bodies by default - the raw bytes just sit
        on the request stream. Body-parsing middleware reads that stream based
        on the <code>Content-Type</code> header and turns it into{" "}
        <code>req.body</code>. Toggle which parsers are mounted, then send a
        request to see what happens.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(installed).map((mw) => (
          <button
            key={mw}
            onClick={() => toggle(mw)}
            className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
              installed[mw]
                ? "bg-accent text-white"
                : "bg-surface border border-line text-subtle"
            }`}
          >
            {installed[mw] ? "✓ " : "✗ "}
            {mw}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {REQUESTS.map((req) => (
          <button
            key={req.label}
            onClick={() => send(req)}
            className="bg-surface border border-line rounded px-3 py-2 text-xs text-heading-alt hover:border-accent transition-colors"
          >
            Send: {req.label}
          </button>
        ))}
        <button
          onClick={() => setLog([])}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[130px]">
        {log.length === 0 && (
          <p className="text-subtle text-xs">Send a request above...</p>
        )}
        {log.map((entry, i) => (
          <div key={i} className="mb-3">
            <p className="text-xs text-accent">{entry.label}</p>
            {entry.lines.map((line, j) => (
              <p key={j} className="text-xs text-heading-alt pl-3">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <CodeBlock>{`app.use(express.json());                        // Content-Type: application/json
app.use(express.urlencoded({ extended: true })); // Content-Type: application/x-www-form-urlencoded
app.use(express.text());                         // Content-Type: text/plain

app.post("/users", (req, res) => {
  console.log(req.body); // only populated if a matching parser ran first
});`}</CodeBlock>
    </div>
  );
}

export default BodyParsingDemo;
