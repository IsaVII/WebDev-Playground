import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function HeadersCookiesDemo() {
  const [sendAuth, setSendAuth] = useState(false);
  const [log, setLog] = useState([]);
  const [cookieJar, setCookieJar] = useState(null);

  const send = () => {
    const requestHeaders = { Accept: "application/json" };
    if (sendAuth) requestHeaders.Authorization = "Bearer demo-token-123";
    if (cookieJar) requestHeaders.Cookie = cookieJar;

    // The server "decides" what to send back based on what it received -
    // real servers set a fresh Set-Cookie on first contact and read the
    // Cookie header the browser re-attaches automatically after that.
    const responseHeaders = {
      "Content-Type": "application/json",
    };
    if (!cookieJar) {
      responseHeaders["Set-Cookie"] = "session_id=abc123; HttpOnly; Path=/";
    }

    setLog((l) => [
      ...l,
      { direction: "request", headers: { ...requestHeaders } },
      { direction: "response", headers: { ...responseHeaders } },
    ]);

    if (!cookieJar) setCookieJar("session_id=abc123");
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Headers travel alongside the body on both sides of the exchange. The
        first response here sets a cookie via <code>Set-Cookie</code> - watch
        the browser automatically re-attach it as a <code>Cookie</code> header
        on the next request, with no extra code required.
      </p>

      <label className="flex items-center gap-2 mb-4 text-sm text-heading">
        <input
          type="checkbox"
          checked={sendAuth}
          onChange={(e) => setSendAuth(e.target.checked)}
          className="accent-accent"
        />
        Send an Authorization header
      </label>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <button
          onClick={send}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Send request
        </button>
        <span className="text-sm text-muted">
          {cookieJar ? `Cookie jar: ${cookieJar}` : "Cookie jar: empty"}
        </span>
        <button
          onClick={() => {
            setLog([]);
            setCookieJar(null);
          }}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-xs min-h-[120px] overflow-x-auto">
        {log.length === 0 && (
          <p className="text-subtle">Headers will appear here...</p>
        )}
        {log.map((entry, i) => (
          <p key={i} className="mb-2 whitespace-pre-wrap">
            <span className="text-heading-alt font-bold">
              {entry.direction === "request" ? "→ Request" : "← Response"}{" "}
              headers:
            </span>
            <br />
            {Object.entries(entry.headers).map(([key, value]) => (
              <span key={key} className="text-muted block pl-3">
                {key}: {value}
              </span>
            ))}
          </p>
        ))}
      </div>

      <CodeBlock>{`fetch("/api/profile", {
  headers: { Authorization: "Bearer demo-token-123" },
  credentials: "include", // send cookies for this origin along with the request
});`}</CodeBlock>
    </div>
  );
}

export default HeadersCookiesDemo;
