import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function PathDemo() {
  const [os, setOs] = useState("unix");
  const [log, setLog] = useState([]);

  const examples = {
    unix: {
      sep: "/",
      paths: ["src/components/Button.jsx", "/home/user/project/file.txt"],
    },
    windows: {
      sep: "\\",
      paths: [
        "src\\components\\Button.jsx",
        "C:\\Users\\dev\\project\\file.txt",
      ],
    },
  };

  const join = () => {
    const result =
      os === "unix" ? "src/utils/helpers.js" : "src\\utils\\helpers.js";
    setLog((l) => [
      ...l,
      `path.join("src", "utils", "helpers.js")`,
      `→ "${result}"`,
      "✓ Uses correct separator for OS",
    ]);
  };

  const resolve = () => {
    const result =
      os === "unix"
        ? "/home/user/project/src/file.js"
        : "C:\\Users\\dev\\project\\src\\file.js";
    setLog((l) => [
      ...l,
      `path.resolve("src", "file.js")`,
      `→ "${result}"`,
      "✓ Absolute path from current directory",
    ]);
  };

  const dirname = () => {
    const input = examples[os].paths[0];
    const result = os === "unix" ? "src/components" : "src\\components";
    setLog((l) => [...l, `path.dirname("${input}")`, `→ "${result}"`]);
  };

  const basename = () => {
    const input = examples[os].paths[0];
    setLog((l) => [...l, `path.basename("${input}")`, `→ "Button.jsx"`]);
  };

  const extname = () => {
    const input = examples[os].paths[0];
    setLog((l) => [...l, `path.extname("${input}")`, `→ ".jsx"`]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        The <code>path</code> module handles file paths correctly across
        operating systems - Windows uses backslashes <code>\</code>, Unix uses
        forward slashes <code>/</code>. Always use <code>path.join()</code> or{" "}
        <code>path.resolve()</code> instead of string concatenation.
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-2 bg-surface border border-line rounded px-3 py-2">
          <span className="text-sm text-muted">OS:</span>
          <button
            onClick={() => {
              setOs("unix");
              setLog([]);
            }}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              os === "unix"
                ? "bg-accent text-white"
                : "bg-surface-alt text-muted hover:text-heading"
            }`}
          >
            Unix/Mac
          </button>
          <button
            onClick={() => {
              setOs("windows");
              setLog([]);
            }}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              os === "windows"
                ? "bg-accent text-white"
                : "bg-surface-alt text-muted hover:text-heading"
            }`}
          >
            Windows
          </button>
        </div>
        <button
          onClick={join}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          path.join()
        </button>
        <button
          onClick={resolve}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          path.resolve()
        </button>
        <button
          onClick={dirname}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          path.dirname()
        </button>
        <button
          onClick={basename}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          path.basename()
        </button>
        <button
          onClick={extname}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          path.extname()
        </button>
        <button
          onClick={() => setLog([])}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[100px]">
        {log.length === 0 && (
          <p className="text-subtle text-xs">Output will appear here...</p>
        )}
        {log.map((entry, i) => (
          <p key={i} className="text-xs text-heading-alt">
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock>{`const path = require("path");

// Join path segments with correct separator
path.join("src", "utils", "file.js");
// Unix: "src/utils/file.js"
// Windows: "src\\\\utils\\\\file.js"

// Get absolute path
path.resolve("src", "file.js");
// → "/home/user/project/src/file.js"

// Extract parts
path.dirname("/src/utils/helper.js");  // "/src/utils"
path.basename("/src/utils/helper.js"); // "helper.js"
path.extname("/src/utils/helper.js");  // ".js"

// Cross-platform special paths
__dirname;  // current file's directory
__filename; // current file's full path`}</CodeBlock>
    </div>
  );
}

export default PathDemo;
