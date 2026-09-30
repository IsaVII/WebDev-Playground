import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function CorsDemo() {
  const [serverAllows, setServerAllows] = useState(true);
  const [usePut, setUsePut] = useState(false);
  const [log, setLog] = useState([]);

  const send = () => {
    const entries = [];
    const origin = "https://my-app.com";
    const allowHeader = serverAllows
      ? `Access-Control-Allow-Origin: ${origin}`
      : "Access-Control-Allow-Origin: https://someone-else.com";

    if (usePut) {
      entries.push(
        `→ Preflight: OPTIONS /api/data (browser sends this automatically before a PUT)`,
      );
      entries.push(`← ${allowHeader}`);
      if (!serverAllows) {
        entries.push(
          `✕ Preflight rejected - the real PUT request is never sent`,
        );
        setLog((l) => [...l, ...entries]);
        return;
      }
      entries.push(`✓ Preflight approved - browser proceeds`);
    }

    entries.push(`→ ${usePut ? "PUT" : "GET"} /api/data  (Origin: ${origin})`);
    entries.push(`← ${allowHeader}`);
    entries.push(
      serverAllows
        ? "✓ Origin matches - browser hands the response to your JavaScript"
        : "✕ Origin doesn't match - browser blocks your JavaScript from reading the response",
    );

    setLog((l) => [...l, ...entries]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        CORS is enforced by the <em>browser</em>, not the server - the response
        actually arrives either way, but the browser only lets your script read
        it if the server's <code>Access-Control-Allow-Origin</code> header
        matches. Methods other than GET/POST with simple headers (like PUT) also
        trigger a preflight <code>OPTIONS</code> check first.
      </p>

      <div className="flex flex-wrap gap-6 mb-4 text-sm text-heading">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={serverAllows}
            onChange={(e) => setServerAllows(e.target.checked)}
            className="accent-accent"
          />
          Server allows my-app.com
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={usePut}
            onChange={(e) => setUsePut(e.target.checked)}
            className="accent-accent"
          />
          Use PUT (triggers a preflight)
        </label>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={send}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Send cross-origin request
        </button>
        <button
          onClick={() => setLog([])}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-xs min-h-[130px] overflow-x-auto">
        {log.length === 0 && (
          <p className="text-subtle">Console output will appear here...</p>
        )}
        {log.map((entry, i) => (
          <p
            key={i}
            className={`whitespace-pre-wrap ${
              entry.startsWith("✕")
                ? "text-red-600 dark:text-red-400"
                : entry.startsWith("✓")
                  ? "text-green-600 dark:text-green-400"
                  : "text-heading-alt"
            }`}
          >
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock>{`// Server opts specific origins in - the browser enforces the rest:
res.setHeader("Access-Control-Allow-Origin", "https://my-app.com");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");`}</CodeBlock>
    </div>
  );
}

export default CorsDemo;
