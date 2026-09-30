import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const ENV_VARS = [
  { key: "VITE_API_URL", value: "https://api.example.com", public: true },
  {
    key: "DATABASE_URL",
    value: "postgres://user:pass@db.host/app",
    public: false,
  },
  { key: "STRIPE_SECRET_KEY", value: "sk_live_51H8x...", public: false },
];

function EnvironmentVariablesDemo() {
  const [revealed, setRevealed] = useState({});
  const [log, setLog] = useState([]);

  const toggleReveal = (key) => setRevealed((r) => ({ ...r, [key]: !r[key] }));

  const buildApp = () => {
    const publicVars = ENV_VARS.filter((v) => v.public);
    const secretVars = ENV_VARS.filter((v) => !v.public);
    setLog([
      "npm run build",
      ...publicVars.map(
        (v) =>
          `✓ ${v.key} inlined into the shipped JS bundle - anyone can read it in dev tools`,
      ),
      ...secretVars.map(
        (v) =>
          `✓ ${v.key} stays on the server only - never reaches the browser`,
      ),
    ]);
  };

  const commitEnvFile = () => {
    setLog([
      "git add .env",
      'git commit -m "add config"',
      "git push",
      "✗ Every value above is now in your git history, forever - even if you delete the file in a later commit",
      "✗ Anyone with repo access (or a public repo, anyone at all) can read your secrets",
    ]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Environment variables keep config and secrets out of your source code.
        But not all of them are equally secret - it depends on <em>where</em>{" "}
        they're read, and most frameworks mark the browser-safe ones with a
        prefix like <code>VITE_</code> or <code>NEXT_PUBLIC_</code>.
      </p>

      <div className="bg-surface rounded p-4 mb-4 border border-line">
        <p className="text-sm font-semibold text-accent mb-2">
          Platform dashboard (set here, not in git)
        </p>
        <div className="font-mono text-xs space-y-1">
          {ENV_VARS.map((v) => (
            <div key={v.key} className="flex items-center gap-2">
              <span className="text-heading-alt">{v.key}=</span>
              <span className="text-muted">
                {revealed[v.key] ? v.value : "•".repeat(16)}
              </span>
              <button
                onClick={() => toggleReveal(v.key)}
                className="text-subtle hover:text-accent text-[11px] underline"
              >
                {revealed[v.key] ? "hide" : "reveal"}
              </button>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ml-auto ${
                  v.public
                    ? "bg-accent/20 text-accent"
                    : "bg-red-500/10 text-red-600 dark:text-red-400"
                }`}
              >
                {v.public ? "public (build-time)" : "secret (server-only)"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={buildApp}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Build the frontend
        </button>
        <button
          onClick={commitEnvFile}
          className="bg-surface border border-red-500/50 text-red-600 dark:text-red-400 px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Commit .env to git
        </button>
        <button
          onClick={() => setLog([])}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[110px]">
        {log.length === 0 && (
          <p className="text-subtle text-xs">
            Try building the app, or committing the .env file, to see the
            difference...
          </p>
        )}
        {log.map((entry, i) => (
          <p
            key={i}
            className={`text-xs mb-1 ${
              entry.startsWith("✗")
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

      <CodeBlock>{`# .env.local (add this file to .gitignore - never commit it)
VITE_API_URL=https://api.example.com
DATABASE_URL=postgres://user:pass@db.host/app
STRIPE_SECRET_KEY=sk_live_51H8x...

// In your code:
fetch(import.meta.env.VITE_API_URL)   // fine - meant to be public
db.connect(process.env.DATABASE_URL)  // only ever read on the server

// In the platform's dashboard, add the SAME variables again -
// git never sees the real values, only the .env.local filename.`}</CodeBlock>
    </div>
  );
}

export default EnvironmentVariablesDemo;
