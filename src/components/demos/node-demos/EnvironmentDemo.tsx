import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function EnvironmentDemo() {
  const [env, setEnv] = useState({
    NODE_ENV: "development",
    PORT: "3000",
    DB_HOST: "localhost",
  });
  const [log, setLog] = useState([]);

  const readEnv = (key) => {
    const value = env[key];
    if (value) {
      setLog((l) => [...l, `process.env.${key} → "${value}"`]);
    } else {
      setLog((l) => [...l, `process.env.${key} → undefined`]);
    }
  };

  const changeEnv = (newEnv) => {
    setEnv({ ...env, NODE_ENV: newEnv });
    setLog((l) => [
      ...l,
      `Environment changed to: ${newEnv}`,
      "✓ App reconfigured",
    ]);
  };

  const checkProduction = () => {
    const isProd = env.NODE_ENV === "production";
    setLog((l) => [
      ...l,
      `process.env.NODE_ENV === "production" → ${isProd}`,
      isProd ? "✓ Using production settings" : "✓ Using development settings",
    ]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        <code>process.env</code> gives you access to environment variables -
        configuration values like database URLs, API keys, or the current
        environment (dev/production). Load them from a <code>.env</code> file
        with the <code>dotenv</code> package, or set them in your shell before
        running Node.
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={() => readEnv("NODE_ENV")}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Read NODE_ENV
        </button>
        <button
          onClick={() => readEnv("PORT")}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Read PORT
        </button>
        <button
          onClick={checkProduction}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Check isProd
        </button>
        <button
          onClick={() =>
            changeEnv(
              env.NODE_ENV === "production" ? "development" : "production",
            )
          }
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Toggle Env
        </button>
        <button
          onClick={() => setLog([])}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-surface rounded p-4 border border-line">
          <p className="text-sm font-semibold text-accent mb-2">.env file</p>
          <pre className="text-xs text-heading-alt font-mono">
            {Object.entries(env)
              .map(([key, value]) => `${key}=${value}`)
              .join("\n")}
          </pre>
        </div>
        <div className="bg-surface rounded p-4 border border-line font-mono text-sm">
          <p className="text-sm font-semibold text-accent mb-2">Console</p>
          {log.length === 0 && (
            <p className="text-subtle text-xs">Output will appear here...</p>
          )}
          {log.map((entry, i) => (
            <p key={i} className="text-xs text-heading-alt">
              {entry}
            </p>
          ))}
        </div>
      </div>

      <CodeBlock>{`// .env file (NOT committed to git)
NODE_ENV=production
PORT=8080
DB_HOST=db.example.com
API_KEY=secret_key_here

// app.js
require("dotenv").config(); // Load .env into process.env

const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  console.log("Running in production mode");
}

// Terminal
NODE_ENV=production node app.js  // Set env vars inline`}</CodeBlock>
    </div>
  );
}

export default EnvironmentDemo;
