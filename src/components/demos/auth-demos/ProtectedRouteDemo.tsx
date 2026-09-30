import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const SCENARIOS = [
  {
    label: "No Authorization header",
    lines: [
      "GET /profile  (no Authorization header)",
      "requireAuth: header is missing",
      "→ 401 Unauthorized - route handler never runs",
    ],
  },
  {
    label: "Malformed token",
    lines: [
      "GET /profile  Authorization: Bearer not-a-real-token",
      "requireAuth: jwt.verify() throws JsonWebTokenError",
      "→ 401 Unauthorized - route handler never runs",
    ],
  },
  {
    label: "Expired token",
    lines: [
      "GET /profile  Authorization: Bearer eyJhbGciOi... (exp in the past)",
      "requireAuth: jwt.verify() throws TokenExpiredError",
      "→ 401 Unauthorized - client should refresh or re-login",
    ],
  },
  {
    label: "Valid token",
    lines: [
      "GET /profile  Authorization: Bearer eyJhbGciOi...",
      "requireAuth: jwt.verify() succeeds → req.user = { sub: 42, role: 'user' }",
      "next() called → route handler runs with req.user available",
      "→ 200 OK { id: 42, email: 'ada@example.com' }",
    ],
  },
];

function ProtectedRouteDemo() {
  const [log, setLog] = useState([]);

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        An auth middleware runs before the route handler and decides whether the
        request even gets there. It's the same middleware-chain idea as logging
        or body parsing - the only difference is this one can end the request
        early with a 401 instead of calling <code>next()</code>.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {SCENARIOS.map((s) => (
          <button
            key={s.label}
            onClick={() => setLog((l) => [...l, s])}
            className="bg-surface border border-line rounded px-3 py-2 text-xs text-heading-alt hover:border-accent transition-colors"
          >
            {s.label}
          </button>
        ))}
        <button
          onClick={() => setLog([])}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[150px]">
        {log.length === 0 && (
          <p className="text-subtle text-xs">Pick a request above...</p>
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

      <CodeBlock>{`function requireAuth(req, res, next) {
  const header = req.get("Authorization") || "";
  const token = header.replace("Bearer ", "");

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    req.user = jwt.verify(token, SECRET); // throws on bad signature or expiry
    next();                                // only reached if verify() succeeds
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Apply it to any route (or a whole router) that needs a logged-in user:
app.get("/profile", requireAuth, (req, res) => {
  res.json({ id: req.user.sub });
});`}</CodeBlock>
    </div>
  );
}

export default ProtectedRouteDemo;
