import { useState } from "react";
import CodeBlock from "../../CodeBlock";

let nextId = 1;

function PreviewRollbackDemo() {
  const [history, setHistory] = useState([
    { id: 0, commit: "a1b2c3d", label: "Initial deploy", isProd: true },
  ]);
  const [preview, setPreview] = useState(null);
  const [log, setLog] = useState([]);

  const openPr = () => {
    const id = nextId++;
    const commit = Math.random().toString(16).slice(2, 9);
    setPreview({ id, commit });
    setLog((l) => [
      ...l,
      `Opened PR #${id} → preview deployed`,
      `Preview URL: https://myapp-git-pr-${id}.vercel.app`,
    ]);
  };

  const mergePr = () => {
    if (!preview) return;
    setHistory((h) => [
      ...h.map((d) => ({ ...d, isProd: false })),
      {
        id: preview.id,
        commit: preview.commit,
        label: `PR #${preview.id} merged`,
        isProd: true,
      },
    ]);
    setLog((l) => [
      ...l,
      `PR #${preview.id} merged to main`,
      `✓ ${preview.commit} promoted to production - no separate "prod build" step needed`,
    ]);
    setPreview(null);
  };

  const rollback = (deployment) => {
    setHistory((h) => h.map((d) => ({ ...d, isProd: d.id === deployment.id })));
    setLog((l) => [
      ...l,
      `⏪ Rolled back production to ${deployment.commit} (${deployment.label})`,
      "✓ Instant - re-points to a build that already ran, no rebuild needed",
    ]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Every deploy is kept, not just the latest one. That's what makes two
        things possible: a pull request gets its own throwaway URL to review
        before merging, and a bad production deploy can be undone by re-pointing
        at a previous one instead of rushing out a fix.
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={openPr}
          disabled={!!preview}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Open a pull request
        </button>
        <button
          onClick={mergePr}
          disabled={!preview}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          Merge it
        </button>
      </div>

      {preview && (
        <div className="bg-surface rounded p-3 mb-4 border border-line font-mono text-xs">
          <span className="text-accent">Preview:</span> https://myapp-git-pr-
          {preview.id}.vercel.app
        </div>
      )}

      <p className="text-sm font-semibold text-heading-alt mb-2">
        Deployment history
      </p>
      <div className="space-y-2 mb-4">
        {[...history].reverse().map((d) => (
          <div
            key={d.id}
            className={`flex items-center gap-3 rounded p-3 border text-sm ${
              d.isProd
                ? "border-accent bg-surface"
                : "border-line bg-surface opacity-70"
            }`}
          >
            <span className="font-mono text-xs text-heading-alt">
              {d.commit}
            </span>
            <span className="text-muted">{d.label}</span>
            {d.isProd && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/20 text-accent">
                production
              </span>
            )}
            {!d.isProd && (
              <button
                onClick={() => rollback(d)}
                className="ml-auto text-xs text-subtle hover:text-accent underline"
              >
                Roll back to this
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[70px]">
        {log.length === 0 && (
          <p className="text-subtle text-xs">
            Open a pull request to see a preview deployment appear...
          </p>
        )}
        {log.map((entry, i) => (
          <p key={i} className="text-xs text-heading-alt mb-1">
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock>{`// Nothing you have to configure - most hosts do this by default:
// - every PR/branch → its own preview URL, torn down when the PR closes
// - every push to main → promoted to the production URL
// - production always points at ONE specific previous build,
//   so "rollback" is just re-pointing it, not a new deploy`}</CodeBlock>
    </div>
  );
}

export default PreviewRollbackDemo;
