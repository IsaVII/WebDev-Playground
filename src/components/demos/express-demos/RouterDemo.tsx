import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const MOUNTS = [
  { prefix: "/api/users", router: "usersRouter", route: "GET /" },
  { prefix: "/api/users", router: "usersRouter", route: "GET /:id" },
  { prefix: "/api/orders", router: "ordersRouter", route: "GET /" },
  { prefix: "/api/orders", router: "ordersRouter", route: "POST /" },
];

function RouterDemo() {
  const [log, setLog] = useState([]);

  const resolve = (mount) => {
    const routePath = mount.route.split(" ")[1];
    const full = mount.prefix + (routePath === "/" ? "" : routePath);
    const method = mount.route.split(" ")[0];
    setLog((l) => [
      ...l,
      `${mount.router}'s "${mount.route}" mounted at "${mount.prefix}"`,
      `→ resolves to ${method} ${full}`,
    ]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        <code>express.Router()</code> creates a self-contained set of routes you
        can build and test in its own file, then mount at a path prefix with{" "}
        <code>app.use(prefix, router)</code>. Every route inside the router is
        relative to that prefix - this is how large apps stay organized instead
        of becoming one giant file of routes.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {MOUNTS.map((mount, i) => (
          <button
            key={i}
            onClick={() => resolve(mount)}
            className="bg-surface border border-line rounded px-3 py-2 text-xs font-mono text-heading-alt hover:border-accent transition-colors"
          >
            {mount.router}: {mount.route}
          </button>
        ))}
        <button
          onClick={() => setLog([])}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[110px]">
        {log.length === 0 && (
          <p className="text-subtle text-xs">Click a router route above...</p>
        )}
        {log.map((entry, i) => (
          <p key={i} className="text-xs text-heading-alt mb-1">
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock>{`// routes/users.js
const router = require("express").Router();
router.get("/", (req, res) => res.json(users));
router.get("/:id", (req, res) => res.json(findUser(req.params.id)));
module.exports = router;

// routes/orders.js
const router = require("express").Router();
router.get("/", (req, res) => res.json(orders));
router.post("/", (req, res) => res.status(201).json(createOrder(req.body)));
module.exports = router;

// app.js
app.use("/api/users", require("./routes/users"));
app.use("/api/orders", require("./routes/orders"));
// router's "/" becomes GET /api/users, "/:id" becomes GET /api/users/:id`}</CodeBlock>
    </div>
  );
}

export default RouterDemo;
