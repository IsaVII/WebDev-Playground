import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function Column({ title, children, active }) {
  return (
    <div
      className={`bg-surface rounded p-4 border ${
        active ? "border-accent" : "border-line"
      }`}
    >
      <h5 className="text-heading-alt font-semibold mb-2 text-sm uppercase tracking-wide">
        {title}
      </h5>
      {children}
    </div>
  );
}

function StagingCommitDemo() {
  const [modified, setModified] = useState(false);
  const [staged, setStaged] = useState(false);
  const [commits, setCommits] = useState(["Initial commit"]);

  const editFile = () => setModified(true);

  const addFile = () => {
    setStaged(true);
    setModified(false);
  };

  const commit = () => {
    setCommits((c) => [...c, "Update index.js"]);
    setStaged(false);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Changes move through three places: edit a file in the{" "}
        <strong>working directory</strong>, stage it with <code>git add</code>,
        then record it with <code>git commit</code>.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={editFile}
          disabled={modified || staged}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Edit index.js
        </button>
        <button
          onClick={addFile}
          disabled={!modified}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          git add index.js
        </button>
        <button
          onClick={commit}
          disabled={!staged}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          git commit -m &quot;Update index.js&quot;
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Column title="Working Directory" active={modified}>
          {modified ? (
            <p className="text-sm font-mono text-heading-alt">
              index.js (modified)
            </p>
          ) : (
            <p className="text-sm text-subtle">Clean - nothing edited</p>
          )}
        </Column>
        <Column title="Staging Area" active={staged}>
          {staged ? (
            <p className="text-sm font-mono text-heading-alt">
              index.js (staged)
            </p>
          ) : (
            <p className="text-sm text-subtle">Empty</p>
          )}
        </Column>
        <Column title="Repository">
          <ol className="text-sm space-y-1">
            {commits.map((c, i) => (
              <li key={i} className="text-heading-alt font-mono">
                {i + 1}. {c}
              </li>
            ))}
          </ol>
        </Column>
      </div>

      <CodeBlock>{`git add index.js
git commit -m "Update index.js"`}</CodeBlock>
    </div>
  );
}

export default StagingCommitDemo;
