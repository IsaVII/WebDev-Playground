import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const PACKAGES = [
  {
    name: "cors",
    tagline: "Allow requests from other origins",
    effect: [
      "Browser sends: Origin: https://myapp.com",
      "cors() adds: Access-Control-Allow-Origin: https://myapp.com",
      "→ without it, the browser blocks the response (CORS error)",
    ],
  },
  {
    name: "morgan",
    tagline: "Log every request to the console",
    effect: [
      "GET /users 200 12ms - 348 (request logged automatically)",
      "POST /users 201 45ms - 89",
      "→ useful in dev, and pairs with a real logger in production",
    ],
  },
  {
    name: "helmet",
    tagline: "Set security-related HTTP headers",
    effect: [
      "Adds X-Content-Type-Options: nosniff",
      "Adds Strict-Transport-Security header",
      "Removes the X-Powered-By: Express header",
      "→ closes off several common attack vectors with one line",
    ],
  },
  {
    name: "express-rate-limit",
    tagline: "Cap how many requests a client can make",
    effect: [
      "Client makes 101 requests in 15 minutes (limit: 100)",
      "→ 101st request gets 429 Too Many Requests",
      "→ protects against brute-force and abuse",
    ],
  },
];

function ThirdPartyMiddlewareDemo() {
  const [log, setLog] = useState([]);

  const inspect = (pkg) => {
    setLog((l) => [...l, pkg]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Express's built-in middleware is intentionally minimal - almost
        everything else comes from npm. These four are used in the vast majority
        of production Express apps, and each is just{" "}
        <code>app.use(package())</code> away.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {PACKAGES.map((pkg) => (
          <button
            key={pkg.name}
            onClick={() => inspect(pkg)}
            className="bg-surface border border-line rounded px-3 py-2 text-xs text-heading-alt hover:border-accent transition-colors"
          >
            <span className="font-mono">{pkg.name}</span>
            <span className="text-subtle"> - {pkg.tagline}</span>
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
          <p className="text-subtle text-xs">Click a package above...</p>
        )}
        {log.map((pkg, i) => (
          <div key={i} className="mb-3">
            <p className="text-xs text-accent">{pkg.name}</p>
            {pkg.effect.map((line, j) => (
              <p key={j} className="text-xs text-heading-alt pl-3">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <CodeBlock>{`npm install cors morgan helmet express-rate-limit

const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));`}</CodeBlock>
    </div>
  );
}

export default ThirdPartyMiddlewareDemo;
