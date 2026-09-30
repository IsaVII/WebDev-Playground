import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const ORIGINAL = ["A: Initial commit", "B: Add feature", "C: Broken commit"];

function ResetRevertDemo() {
  const [commits, setCommits] = useState(ORIGINAL);
  const [staged, setStaged] = useState(false);
  const [message, setMessage] = useState("");

  const reset = (mode) => {
    if (mode === "soft") {
      setCommits(ORIGINAL.slice(0, 2));
      setStaged(true);
      setMessage(
        "git reset --soft B: HEAD moves to B, but C's changes stay staged - nothing is lost.",
      );
    } else {
      setCommits(ORIGINAL.slice(0, 2));
      setStaged(false);
      setMessage(
        "git reset --hard B: HEAD moves to B and C's changes are discarded completely.",
      );
    }
  };

  const revert = () => {
    setCommits((c) => [...c, 'D: Revert "Broken commit"']);
    setStaged(false);
    setMessage(
      "git revert C: a new commit D undoes C's changes - history stays intact, safe for shared branches.",
    );
  };

  const restore = () => {
    setCommits(ORIGINAL);
    setStaged(false);
    setMessage("");
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Both undo a commit, but differently: <code>reset</code> moves{" "}
        <code>HEAD</code> backwards and rewrites local history - <em>never</em>{" "}
        do this on a branch others have already pulled. <code>revert</code> adds
        a new commit that undoes the old one, so it's safe to share.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => reset("soft")}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors"
        >
          git reset --soft B
        </button>
        <button
          onClick={() => reset("hard")}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors"
        >
          git reset --hard B
        </button>
        <button
          onClick={revert}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          git revert C
        </button>
        <button
          onClick={restore}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Reset demo
        </button>
      </div>

      <div className="bg-surface rounded p-4 border border-line mb-4">
        <h5 className="text-heading-alt font-semibold mb-2 text-sm uppercase tracking-wide">
          Commit history
        </h5>
        <ol className="text-sm space-y-1">
          {commits.map((c, i) => (
            <li key={i} className="text-heading-alt font-mono">
              {c}
            </li>
          ))}
        </ol>
        {staged && (
          <p className="text-sm text-muted mt-2">
            (Commit C's changes are now staged, waiting to be re-committed.)
          </p>
        )}
      </div>

      {message && <p className="text-sm text-muted mb-4">{message}</p>}

      <CodeBlock>{`git reset --soft <commit>   # keep changes, staged
git reset --hard <commit>   # discard changes entirely
git revert <commit>         # undo safely with a new commit`}</CodeBlock>
    </div>
  );
}

export default ResetRevertDemo;
