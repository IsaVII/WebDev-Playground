import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const ROUTES = [
  { method: "GET", path: "/users", handler: "list all users" },
  { method: "GET", path: "/users/:id", handler: "get one user by id" },
  { method: "POST", path: "/users", handler: "create a user" },
  { method: "DELETE", path: "/users/:id", handler: "delete a user" },
];

const REQUESTS = [
  { method: "GET", url: "/users" },
  { method: "GET", url: "/users/42" },
  { method: "GET", url: "/users/42?fields=name,email" },
  { method: "POST", url: "/users" },
  { method: "DELETE", url: "/users/42" },
  { method: "GET", url: "/comments" },
];

function matchRoute(req) {
  for (const route of ROUTES) {
    if (route.method !== req.method) continue;
    const routeParts = route.path.split("/").filter(Boolean);
    const reqPath = req.url.split("?")[0];
    const reqParts = reqPath.split("/").filter(Boolean);
    if (routeParts.length !== reqParts.length) continue;

    const params = {};
    const isMatch = routeParts.every((part, i) => {
      if (part.startsWith(":")) {
        params[part.slice(1)] = reqParts[i];
        return true;
      }
      return part === reqParts[i];
    });

    if (isMatch) return { route, params };
  }
  return null;
}

function RoutingDemo() {
  const [log, setLog] = useState([]);

  const send = (req) => {
    const result = matchRoute(req);
    const query = req.url.includes("?")
      ? Object.fromEntries(new URLSearchParams(req.url.split("?")[1]))
      : {};

    if (!result) {
      setLog((l) => [
        ...l,
        {
          req,
          lines: [
            `No route matches ${req.method} ${req.url}`,
            "→ 404 Not Found",
          ],
        },
      ]);
      return;
    }

    const lines = [
      `Matched: ${result.route.method} ${result.route.path} (${result.route.handler})`,
    ];
    if (Object.keys(result.params).length) {
      lines.push(`req.params = ${JSON.stringify(result.params)}`);
    }
    if (Object.keys(query).length) {
      lines.push(`req.query = ${JSON.stringify(query)}`);
    }
    setLog((l) => [...l, { req, lines }]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Express matches a request's method and path against the routes you've
        defined, top to bottom - the first match wins. Segments starting with{" "}
        <code>:</code> are captured into <code>req.params</code>; anything after{" "}
        <code>?</code> is parsed into <code>req.query</code>.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {REQUESTS.map((req) => (
          <button
            key={req.method + req.url}
            onClick={() => send(req)}
            className="bg-surface border border-line rounded px-3 py-2 text-xs font-mono text-heading-alt hover:border-accent transition-colors"
          >
            {req.method} {req.url}
          </button>
        ))}
        <button
          onClick={() => setLog([])}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[120px]">
        {log.length === 0 && (
          <p className="text-subtle text-xs">Click a request above...</p>
        )}
        {log.map((entry, i) => (
          <div key={i} className="mb-3">
            <p className="text-xs text-accent">
              {entry.req.method} {entry.req.url}
            </p>
            {entry.lines.map((line, j) => (
              <p key={j} className="text-xs text-heading-alt pl-3">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <CodeBlock>{`app.get("/users", (req, res) => res.json(users));

app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  res.json(user);
});

// GET /users/42?fields=name,email
// req.params -> { id: "42" }
// req.query  -> { fields: "name,email" }`}</CodeBlock>
    </div>
  );
}

export default RoutingDemo;
