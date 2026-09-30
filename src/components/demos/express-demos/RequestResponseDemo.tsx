import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function RequestResponseDemo() {
  const [log, setLog] = useState([]);

  const actions = [
    {
      label: "res.json(data)",
      run: () => [
        `res.json({ id: 1, name: "Ada" })`,
        `→ Content-Type: application/json`,
        `→ 200 {"id":1,"name":"Ada"}`,
      ],
    },
    {
      label: "res.status(201).json(data)",
      run: () => [
        `res.status(201).json({ id: 2, name: "Grace" })`,
        `→ 201 Created {"id":2,"name":"Grace"}`,
      ],
    },
    {
      label: "res.status(404).send(text)",
      run: () => [
        `res.status(404).send("User not found")`,
        `→ 404 Not Found  "User not found"`,
      ],
    },
    {
      label: "res.redirect(url)",
      run: () => [`res.redirect("/login")`, `→ 302 Found  Location: /login`],
    },
    {
      label: "req.headers / req.get()",
      run: () => [
        `req.get("Authorization")`,
        `→ "Bearer eyJhbGciOi..."`,
        `req.headers["content-type"]`,
        `→ "application/json"`,
      ],
    },
  ];

  const run = (action) => {
    setLog((l) => [...l, { label: action.label, lines: action.run() }]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        <code>req</code> is where the incoming request lives (params, query,
        body, headers); <code>res</code> is what you use to build the reply.
        Most response methods are chainable - <code>res.status(x).json(y)</code>{" "}
        sets the status code, then sends the body.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => run(action)}
            className="bg-accent text-white px-3 py-2 rounded text-xs font-mono hover:opacity-90 transition-opacity"
          >
            {action.label}
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
          <p className="text-subtle text-xs">Click a method above...</p>
        )}
        {log.map((entry, i) => (
          <div key={i} className="mb-3">
            {entry.lines.map((line, j) => (
              <p
                key={j}
                className={`text-xs ${j === 0 ? "text-heading-alt" : "text-accent pl-3"}`}
              >
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <CodeBlock>{`app.post("/users", (req, res) => {
  const { name } = req.body;         // parsed body
  const token = req.get("Authorization"); // one header
  const user = createUser(name);
  res.status(201).json(user);        // status + JSON body, chained
});`}</CodeBlock>
    </div>
  );
}

export default RequestResponseDemo;
