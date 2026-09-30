import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const MAIN = ["Initial commit", "Add navbar"];
const HOTFIX = ["Initial commit", "Add navbar", "Fix crash on logout"];

function CherryPickDemo() {
  const [main, setMain] = useState(MAIN);
  const [picked, setPicked] = useState(false);

  const cherryPick = () => {
    setMain((m) => [...m, "Fix crash on logout (cherry-picked)"]);
    setPicked(true);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        <code>hotfix</code> has one commit main needs urgently, but the rest of
        hotfix isn't ready. <code>git cherry-pick</code> copies just that one
        commit onto main, as a new commit with the same changes.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={cherryPick}
          disabled={picked}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          git cherry-pick &lt;hotfix-hash&gt;
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-surface rounded p-4 border border-line">
          <h5 className="text-heading-alt font-semibold mb-2 text-sm uppercase tracking-wide">
            main
          </h5>
          <ol className="text-sm space-y-1">
            {main.map((c, i) => (
              <li key={i} className="text-heading-alt font-mono">
                {i + 1}. {c}
              </li>
            ))}
          </ol>
        </div>
        <div className="bg-surface rounded p-4 border border-line">
          <h5 className="text-heading-alt font-semibold mb-2 text-sm uppercase tracking-wide">
            hotfix
          </h5>
          <ol className="text-sm space-y-1">
            {HOTFIX.map((c, i) => (
              <li
                key={i}
                className={`font-mono ${
                  i === HOTFIX.length - 1
                    ? "text-accent font-semibold"
                    : "text-heading-alt"
                }`}
              >
                {i + 1}. {c}
                {i === HOTFIX.length - 1 && " ←"}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="text-sm text-muted mt-4">
        {picked
          ? "main now has the fix, without pulling in any other work-in-progress commits from hotfix."
          : "Pick just the highlighted commit from hotfix and apply it to main."}
      </p>

      <CodeBlock>{`git log hotfix          # find the commit hash you need
git checkout main
git cherry-pick <hash>`}</CodeBlock>
    </div>
  );
}

export default CherryPickDemo;
