import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const RESOLUTIONS = {
  mine: 'const greeting = "Welcome back!";',
  theirs: 'const greeting = "Hello, friend!";',
  both: 'const greeting = "Welcome back! Hello, friend!";',
};

function ConflictResolutionDemo() {
  const [conflict, setConflict] = useState(false);
  const [resolution, setResolution] = useState(null);
  const [committed, setCommitted] = useState(false);

  const merge = () => {
    setConflict(true);
    setResolution(null);
    setCommitted(false);
  };

  const resolve = (choice) => {
    setResolution(choice);
  };

  const finish = () => {
    setConflict(false);
    setCommitted(true);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Both branches edited the same line of <code>greeting.js</code>. Git
        can't guess which version you want, so it marks the conflict in the file
        and pauses the merge until you resolve it.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={merge}
          disabled={conflict}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          git merge feature
        </button>
      </div>

      {conflict && (
        <>
          <CodeBlock>{`<<<<<<< HEAD
const greeting = "Welcome back!";
=======
const greeting = "Hello, friend!";
>>>>>>> feature`}</CodeBlock>

          <p className="text-sm text-muted my-4">
            Choose how to resolve it, then stage and commit the merge:
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => resolve("mine")}
              className={`px-4 py-2 rounded border transition-colors ${
                resolution === "mine"
                  ? "bg-accent border-accent text-white"
                  : "bg-surface border-line text-heading hover:border-accent"
              }`}
            >
              Keep mine (HEAD)
            </button>
            <button
              onClick={() => resolve("theirs")}
              className={`px-4 py-2 rounded border transition-colors ${
                resolution === "theirs"
                  ? "bg-accent border-accent text-white"
                  : "bg-surface border-line text-heading hover:border-accent"
              }`}
            >
              Keep theirs (feature)
            </button>
            <button
              onClick={() => resolve("both")}
              className={`px-4 py-2 rounded border transition-colors ${
                resolution === "both"
                  ? "bg-accent border-accent text-white"
                  : "bg-surface border-line text-heading hover:border-accent"
              }`}
            >
              Keep both
            </button>
          </div>

          {resolution && (
            <>
              <div className="bg-surface rounded p-4 border border-line mb-4 font-mono text-sm text-heading-alt">
                {RESOLUTIONS[resolution]}
              </div>
              <button
                onClick={finish}
                className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors"
              >
                git add greeting.js &amp;&amp; git commit
              </button>
            </>
          )}
        </>
      )}

      {committed && (
        <p className="text-sm text-muted mt-4">
          Merge complete - once a conflicted file is edited and staged,{" "}
          <code>git commit</code> finishes the merge with no extra flags needed.
        </p>
      )}
    </div>
  );
}

export default ConflictResolutionDemo;
