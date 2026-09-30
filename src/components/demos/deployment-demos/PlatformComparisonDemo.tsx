import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const NEEDS = [
  {
    id: "static",
    label: "A static frontend (React/Vue build output)",
    recommend: "vercel",
    reasoning:
      "Vercel, Netlify, or Render's static site hosting all handle this equally well - it's just files on a CDN. Vercel and Netlify tend to have the fastest git-based deploy workflow for frontend-only projects.",
  },
  {
    id: "serverless",
    label: "Frontend + a few small API routes",
    recommend: "vercel",
    reasoning:
      "Vercel and Netlify both run small backend functions as serverless functions alongside your frontend, deployed from the same repo - no separate server to manage. Great for an API route or two, not a full backend.",
  },
  {
    id: "server",
    label: "A full always-on backend (Express, a database, background jobs)",
    recommend: "render",
    reasoning:
      "Render runs a real, persistent Node/Express process instead of short-lived functions, and hosts a managed Postgres/Redis instance alongside it. Vercel and Netlify are optimized for serverless/edge, not long-running servers.",
  },
];

const PLATFORMS = [
  {
    id: "vercel",
    name: "Vercel",
    bestFor: "Frontend frameworks (Next.js especially)",
    serverless: "✓ Built-in",
    longRunning: "✗ Not supported",
    database: "✗ (use an external provider)",
  },
  {
    id: "netlify",
    name: "Netlify",
    bestFor: "Static sites & JAMstack",
    serverless: "✓ Built-in (Functions)",
    longRunning: "✗ Not supported",
    database: "✗ (use an external provider)",
  },
  {
    id: "render",
    name: "Render",
    bestFor: "Full backends & databases",
    serverless: "△ Limited",
    longRunning: "✓ Native support",
    database: "✓ Managed Postgres/Redis",
  },
];

function PlatformComparisonDemo() {
  const [selectedNeed, setSelectedNeed] = useState(null);
  const need = NEEDS.find((n) => n.id === selectedNeed);

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Vercel, Netlify, and Render all deploy straight from a git repo, but
        they&apos;re not interchangeable - what they run under the hood is
        different. Pick what you&apos;re deploying to see which fits best.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {NEEDS.map((n) => (
          <button
            key={n.id}
            onClick={() => setSelectedNeed(n.id)}
            className={`px-3 py-2 rounded text-sm text-left transition-colors ${
              selectedNeed === n.id
                ? "bg-accent text-white"
                : "bg-surface border border-line text-heading hover:border-accent"
            }`}
          >
            {n.label}
          </button>
        ))}
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line min-h-[70px]">
        {!need && (
          <p className="text-subtle text-xs">
            Choose what you&apos;re deploying above...
          </p>
        )}
        {need && (
          <p className="text-sm text-heading-alt">
            <strong className="text-accent">
              {PLATFORMS.find((p) => p.id === need.recommend).name}
            </strong>{" "}
            - {need.reasoning}
          </p>
        )}
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-line">
              <th className="p-2 text-muted font-semibold"></th>
              {PLATFORMS.map((p) => (
                <th
                  key={p.id}
                  className={`p-2 font-semibold ${
                    need?.recommend === p.id
                      ? "text-accent"
                      : "text-heading-alt"
                  }`}
                >
                  {p.name}
                  {need?.recommend === p.id ? " ★" : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-heading-alt">
            <tr className="border-b border-line">
              <td className="p-2 text-muted">Best for</td>
              {PLATFORMS.map((p) => (
                <td key={p.id} className="p-2">
                  {p.bestFor}
                </td>
              ))}
            </tr>
            <tr className="border-b border-line">
              <td className="p-2 text-muted">Serverless functions</td>
              {PLATFORMS.map((p) => (
                <td key={p.id} className="p-2">
                  {p.serverless}
                </td>
              ))}
            </tr>
            <tr className="border-b border-line">
              <td className="p-2 text-muted">Long-running server</td>
              {PLATFORMS.map((p) => (
                <td key={p.id} className="p-2">
                  {p.longRunning}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-2 text-muted">Database hosting</td>
              {PLATFORMS.map((p) => (
                <td key={p.id} className="p-2">
                  {p.database}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <CodeBlock>{`// Same idea everywhere: connect the repo, point at a branch,
// tell the platform how to build and where the output lives.

Build command:   npm run build
Output directory: dist          // "build" for Create React App, ".next" for Next.js
Install command: npm ci          // auto-detected on all three platforms`}</CodeBlock>
    </div>
  );
}

export default PlatformComparisonDemo;
