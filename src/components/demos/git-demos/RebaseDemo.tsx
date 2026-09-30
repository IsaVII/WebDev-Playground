import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const MAIN = ["Initial commit", "Fix header bug"];
const FEATURE_ORIGINAL = [
  "Initial commit",
  "Add login form",
  "Style login form",
];

function RebaseDemo() {
  const [rebased, setRebased] = useState(false);

  const rebase = () => setRebased(true);
  const reset = () => setRebased(false);

  const featureCommits = rebased
    ? [...MAIN, "Add login form (replayed)", "Style login form (replayed)"]
    : FEATURE_ORIGINAL;

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        <code>feature</code> branched off before <code>main</code> got a new
        commit. Rebasing replays feature&apos;s commits on top of main&apos;s
        current tip, rewriting their hashes but keeping history linear - instead
        of the merge commit a <code>git merge</code> would create.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={rebase}
          disabled={rebased}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          git rebase main
        </button>
        <button
          onClick={reset}
          disabled={!rebased}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          Reset demo
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-surface rounded p-4 border border-line">
          <h5 className="text-heading-alt font-semibold mb-2 text-sm uppercase tracking-wide">
            main
          </h5>
          <ol className="text-sm space-y-1">
            {MAIN.map((c, i) => (
              <li key={i} className="text-heading-alt font-mono">
                {i + 1}. {c}
              </li>
            ))}
          </ol>
        </div>
        <div className="bg-surface rounded p-4 border border-line">
          <h5 className="text-heading-alt font-semibold mb-2 text-sm uppercase tracking-wide">
            feature {rebased && "(rebased)"}
          </h5>
          <ol className="text-sm space-y-1">
            {featureCommits.map((c, i) => (
              <li key={i} className="text-heading-alt font-mono">
                {i + 1}. {c}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="text-sm text-muted mt-4">
        {rebased
          ? "feature now sits directly on top of main's latest commit - a straight line, no merge commit."
          : "feature and main have diverged - feature was branched before main's latest commit."}
      </p>

      <CodeBlock>{`git checkout feature
git rebase main`}</CodeBlock>
    </div>
  );
}

export default RebaseDemo;
