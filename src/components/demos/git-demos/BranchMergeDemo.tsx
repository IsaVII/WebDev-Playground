import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function BranchMergeDemo() {
  const [main, setMain] = useState(["Initial commit"]);
  const [feature, setFeature] = useState(null);
  const [current, setCurrent] = useState("main");
  const [merged, setMerged] = useState(false);

  const createBranch = () => {
    setFeature([...main]);
    setCurrent("feature");
  };

  const commitOnFeature = () => {
    setFeature((f) => [...f, "Add login form"]);
  };

  const checkout = (branch) => setCurrent(branch);

  const merge = () => {
    setMain((m) => [...m, "Merge branch 'feature'"]);
    setMerged(true);
    setCurrent("main");
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        A branch is just a pointer. Creating one lets you commit without
        touching <code>main</code>; merging brings those commits back in.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={createBranch}
          disabled={!!feature}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          git checkout -b feature
        </button>
        <button
          onClick={commitOnFeature}
          disabled={!feature || current !== "feature" || merged}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          Commit on feature
        </button>
        <button
          onClick={() => checkout("main")}
          disabled={!feature || merged}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          git checkout main
        </button>
        <button
          onClick={() => checkout("feature")}
          disabled={!feature || merged}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          git checkout feature
        </button>
        <button
          onClick={merge}
          disabled={!feature || feature.length <= main.length || merged}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          git merge feature
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div
          className={`bg-surface rounded p-4 border ${
            current === "main" ? "border-accent" : "border-line"
          }`}
        >
          <h5 className="text-heading-alt font-semibold mb-2 text-sm uppercase tracking-wide">
            main {current === "main" && "(HEAD)"}
          </h5>
          <ol className="text-sm space-y-1">
            {main.map((c, i) => (
              <li key={i} className="text-heading-alt font-mono">
                {i + 1}. {c}
              </li>
            ))}
          </ol>
        </div>
        <div
          className={`bg-surface rounded p-4 border ${
            current === "feature" ? "border-accent" : "border-line"
          }`}
        >
          <h5 className="text-heading-alt font-semibold mb-2 text-sm uppercase tracking-wide">
            feature {current === "feature" && "(HEAD)"}
          </h5>
          {feature ? (
            <ol className="text-sm space-y-1">
              {feature.map((c, i) => (
                <li key={i} className="text-heading-alt font-mono">
                  {i + 1}. {c}
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-subtle">Not created yet</p>
          )}
        </div>
      </div>

      <CodeBlock>{`git checkout -b feature
git commit -m "Add login form"
git checkout main
git merge feature`}</CodeBlock>
    </div>
  );
}

export default BranchMergeDemo;
