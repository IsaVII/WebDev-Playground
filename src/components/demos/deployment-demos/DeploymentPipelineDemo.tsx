import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const STAGES = ["Push", "Install", "Lint", "Test", "Build", "Deploy", "Live"];

function DeploymentPipelineDemo() {
  const [testsPass, setTestsPass] = useState(true);
  const [log, setLog] = useState([]);
  const [activeStage, setActiveStage] = useState(-1);
  const [failedAt, setFailedAt] = useState(null);
  const [running, setRunning] = useState(false);

  const run = () => {
    setLog([]);
    setActiveStage(-1);
    setFailedAt(null);
    setRunning(true);

    const lines = [
      "→ git push origin main",
      "Platform detects the push and starts a new build",
      "npm ci - installing dependencies from package-lock.json",
      "npm run lint - checking code style",
      testsPass
        ? "npm test - all tests passed ✓"
        : "npm test - 1 test failed ✗",
    ];

    if (testsPass) {
      lines.push(
        "npm run build - bundling for production",
        "Uploading build output to the hosting platform",
        "✓ Live at https://your-app.vercel.app",
      );
    } else {
      lines.push(
        "⨯ Pipeline stopped - build & deploy steps are skipped",
        "✗ Previous production deployment is left untouched",
      );
    }

    lines.forEach((line, i) => {
      setTimeout(() => {
        setLog((l) => [...l, line]);
        // Stage index: Push(0) Install(1) Lint(2) Test(3) Build(4) Deploy(5) Live(6)
        const stageForLine = [0, 0, 1, 2, 3, 4, 5, 6];
        setActiveStage(stageForLine[i] ?? 6);
        if (!testsPass && i === 4) setFailedAt(3);
        if (i === lines.length - 1) setRunning(false);
      }, i * 450);
    });
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        A push doesn&apos;t go straight to your users - it runs through a
        pipeline of stages first, and a failure at any stage stops everything
        after it. Toggle whether the test suite passes and run the pipeline to
        see the difference.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {STAGES.map((stage, i) => {
          const isFailed = failedAt !== null && i === failedAt;
          const isSkipped = failedAt !== null && i > failedAt;
          const isDone = !isSkipped && i <= activeStage && !isFailed;
          return (
            <div
              key={stage}
              className={`px-3 py-2 rounded text-xs font-mono border transition-colors ${
                isFailed
                  ? "border-red-500 text-red-600 dark:text-red-400 bg-surface"
                  : isSkipped
                    ? "border-line text-subtle bg-surface opacity-50"
                    : isDone
                      ? "border-accent bg-accent text-white"
                      : "border-line text-heading-alt bg-surface"
              }`}
            >
              {stage}
              {isFailed ? " ✗" : isDone ? " ✓" : ""}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setTestsPass(true)}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            testsPass
              ? "bg-accent text-white"
              : "bg-surface-alt text-muted hover:text-heading"
          }`}
        >
          Tests pass
        </button>
        <button
          onClick={() => setTestsPass(false)}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            !testsPass
              ? "bg-accent text-white"
              : "bg-surface-alt text-muted hover:text-heading"
          }`}
        >
          Tests fail
        </button>
        <button
          onClick={run}
          disabled={running}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50 ml-auto"
        >
          {running ? "Running..." : "Push to main"}
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[170px]">
        {log.length === 0 && (
          <p className="text-subtle text-xs">
            Pick whether tests pass, then push...
          </p>
        )}
        {log.map((entry, i) => (
          <p
            key={i}
            className={`text-xs mb-1 ${
              entry.startsWith("✗") || entry.startsWith("⨯")
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

      <CodeBlock>{`// Every stage has to succeed before the next one runs
git push origin main
  → npm ci             (clean, reproducible install)
  → npm run lint        (fails the pipeline on style errors)
  → npm test             (fails the pipeline on a broken test)
  → npm run build          (only reached if tests passed)
  → upload + deploy          (only reached if build succeeded)

// A failure at any stage leaves the last successful
// deployment running untouched - broken code never goes live.`}</CodeBlock>
    </div>
  );
}

export default DeploymentPipelineDemo;
