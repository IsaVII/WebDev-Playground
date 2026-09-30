import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const TRIGGERS = [
  { id: "feature", label: "Push to a feature branch" },
  { id: "pr", label: "Open a pull request into main" },
  { id: "main", label: "Push (merge) to main" },
];

function GithubActionsDemo() {
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);

  const trigger = (triggerId) => {
    setLog([]);
    setRunning(true);

    const lines = [];
    if (triggerId === "feature") {
      lines.push(
        "Event: push to feature/add-login",
        "No workflow matches this branch - nothing runs",
      );
    } else {
      lines.push(
        triggerId === "pr"
          ? "Event: pull_request → main"
          : "Event: push → main",
        'Job "build-and-test" starts on a fresh ubuntu-latest VM',
        "actions/checkout@v4 - pulls your repo onto the VM",
        "actions/setup-node@v4 - installs Node 20",
        "npm ci - installs dependencies",
        "npm run lint ✓",
        "npm test ✓",
        "npm run build ✓",
      );
      if (triggerId === "pr") {
        lines.push(
          "✓ Checks passed - shown directly on the pull request",
          'Job "deploy" is skipped - the if: condition only allows pushes to main',
        );
      } else {
        lines.push(
          'Job "deploy" starts - needs: build-and-test passed, and this is main',
          "npx vercel deploy --prod (using the VERCEL_TOKEN secret)",
          "✓ Deployed to production",
        );
      }
    }

    lines.forEach((line, i) => {
      setTimeout(() => {
        setLog((l) => [...l, line]);
        if (i === lines.length - 1) setRunning(false);
      }, i * 350);
    });
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        A GitHub Actions workflow is a YAML file in{" "}
        <code>.github/workflows/</code> that says what event starts it (
        <code>on:</code>), and what jobs/steps run when it does. Pick an event
        to see which jobs actually fire.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {TRIGGERS.map((t) => (
          <button
            key={t.id}
            onClick={() => trigger(t.id)}
            disabled={running}
            className="px-3 py-2 rounded text-sm bg-surface border border-line text-heading hover:border-accent transition-colors disabled:opacity-50"
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[190px]">
        {log.length === 0 && (
          <p className="text-subtle text-xs">Pick an event above...</p>
        )}
        {log.map((entry, i) => (
          <p
            key={i}
            className={`text-xs mb-1 ${
              entry.startsWith("✓")
                ? "text-green-600 dark:text-green-400"
                : "text-heading-alt"
            }`}
          >
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock showLineNumbers>
        {[
          "on:",
          "  push:",
          "    branches: [main]",
          "  pull_request:",
          "    branches: [main]",
          "",
          "jobs:",
          "  build-and-test:",
          "    runs-on: ubuntu-latest",
          "    steps:",
          "      - uses: actions/checkout@v4",
          "      - uses: actions/setup-node@v4",
          "      - run: npm ci",
          "      - run: npm run lint",
          "      - run: npm test",
          "      - run: npm run build",
          "",
          "  deploy:",
          "    needs: build-and-test",
          "    if: github.ref == 'refs/heads/main'",
          "    runs-on: ubuntu-latest",
          "    steps:",
          "      - run: npx vercel deploy --prod",
        ]}
      </CodeBlock>
    </div>
  );
}

export default GithubActionsDemo;
