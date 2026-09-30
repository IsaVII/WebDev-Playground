import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const FILES = [
  { name: "src/App.jsx", pattern: null },
  { name: "node_modules/react/index.js", pattern: "node_modules/" },
  { name: "dist/bundle.js", pattern: "dist/" },
  { name: ".env", pattern: ".env" },
];

const PATTERNS = ["node_modules/", "dist/", ".env"];

function matches(file, ignored) {
  return file.pattern && ignored.includes(file.pattern);
}

function GitignoreDemo() {
  const [ignored, setIgnored] = useState([]);

  const addPattern = (pattern) => {
    setIgnored((i) => (i.includes(pattern) ? i : [...i, pattern]));
  };

  const removePattern = (pattern) => {
    setIgnored((i) => i.filter((p) => p !== pattern));
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        A <code>.gitignore</code> file lists patterns for files Git should never
        track - build output, dependencies, secrets. Add a pattern and watch it
        disappear from <code>git status</code> below.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {PATTERNS.map((pattern) => (
          <button
            key={pattern}
            onClick={() =>
              ignored.includes(pattern)
                ? removePattern(pattern)
                : addPattern(pattern)
            }
            className={`px-4 py-2 rounded border font-mono text-sm transition-colors ${
              ignored.includes(pattern)
                ? "bg-accent border-accent text-white"
                : "bg-surface border-line text-heading hover:border-accent"
            }`}
          >
            {ignored.includes(pattern) ? "− " : "+ "}
            {pattern}
          </button>
        ))}
      </div>

      <div className="bg-surface rounded p-4 border border-line">
        <h5 className="text-heading-alt font-semibold mb-2 text-sm uppercase tracking-wide">
          git status (untracked files)
        </h5>
        <ol className="text-sm space-y-1">
          {FILES.map((file) => {
            const hidden = matches(file, ignored);
            return (
              <li
                key={file.name}
                className={`font-mono ${
                  hidden ? "text-subtle line-through" : "text-heading-alt"
                }`}
              >
                {file.name}
                {hidden && " (ignored)"}
              </li>
            );
          })}
        </ol>
      </div>

      <CodeBlock>{`# .gitignore
${ignored.length ? ignored.join("\n") : "# no patterns added yet"}`}</CodeBlock>
    </div>
  );
}

export default GitignoreDemo;
