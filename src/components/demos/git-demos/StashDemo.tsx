import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function StashDemo() {
  const [workingChanges, setWorkingChanges] = useState(false);
  const [stashes, setStashes] = useState([]);

  const makeChanges = () => setWorkingChanges(true);

  const stash = () => {
    setStashes((s) => [...s, "WIP: unfinished search filter"]);
    setWorkingChanges(false);
  };

  const pop = () => {
    setStashes((s) => s.slice(0, -1));
    setWorkingChanges(true);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Need to switch branches but aren&apos;t ready to commit?{" "}
        <code>git stash</code> shelves your uncommitted changes and gives you a
        clean working directory; <code>git stash pop</code> brings them back.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={makeChanges}
          disabled={workingChanges}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Make uncommitted changes
        </button>
        <button
          onClick={stash}
          disabled={!workingChanges}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          git stash
        </button>
        <button
          onClick={pop}
          disabled={stashes.length === 0 || workingChanges}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          git stash pop
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-surface rounded p-4 border border-line">
          <h5 className="text-heading-alt font-semibold mb-2 text-sm uppercase tracking-wide">
            Working Directory
          </h5>
          {workingChanges ? (
            <p className="text-sm font-mono text-heading-alt">
              search.js (modified, uncommitted)
            </p>
          ) : (
            <p className="text-sm text-subtle">Clean</p>
          )}
        </div>
        <div className="bg-surface rounded p-4 border border-line">
          <h5 className="text-heading-alt font-semibold mb-2 text-sm uppercase tracking-wide">
            Stash
          </h5>
          {stashes.length === 0 ? (
            <p className="text-sm text-subtle">Empty</p>
          ) : (
            <ol className="text-sm space-y-1">
              {stashes.map((s, i) => (
                <li key={i} className="text-heading-alt font-mono">
                  stash@{"{"}
                  {stashes.length - 1 - i}
                  {"}"}: {s}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <CodeBlock>{`git stash
# ...switch branches, fix something else...
git stash pop`}</CodeBlock>
    </div>
  );
}

export default StashDemo;
