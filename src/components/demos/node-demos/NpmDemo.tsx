import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function NpmDemo() {
  const [dependencies, setDependencies] = useState({});
  const [scripts, setScripts] = useState([]);
  const [log, setLog] = useState([]);

  const installPackage = (name, version) => {
    setDependencies((prev) => ({ ...prev, [name]: version }));
    setLog((l) => [
      ...l,
      `npm install ${name}`,
      `✓ Added ${name}@${version} to package.json`,
      `✓ Saved ${name} to node_modules/`,
    ]);
  };

  const runScript = (scriptName, command) => {
    setLog((l) => [...l, `npm run ${scriptName}`, `> ${command}`, "✓ Done"]);
  };

  const initProject = () => {
    setLog([
      "npm init -y",
      "✓ Created package.json with defaults",
      "✓ Project initialized",
    ]);
    setScripts(["start", "test", "build"]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        npm manages your project&apos;s dependencies and scripts.{" "}
        <code>package.json</code> declares what you need;{" "}
        <code>npm install</code> downloads it all; <code>npm run</code> executes
        custom scripts. Dependencies use semantic versioning (^1.2.3 =
        compatible updates).
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={initProject}
          disabled={scripts.length > 0}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          npm init
        </button>
        <button
          onClick={() => installPackage("express", "^4.18.2")}
          disabled={scripts.length === 0}
          className="bg-surface border border-line text-heading px-3 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          install express
        </button>
        <button
          onClick={() => installPackage("lodash", "^4.17.21")}
          disabled={scripts.length === 0}
          className="bg-surface border border-line text-heading px-3 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          install lodash
        </button>
        <button
          onClick={() => runScript("start", "node server.js")}
          disabled={scripts.length === 0}
          className="bg-surface border border-line text-heading px-3 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          npm run start
        </button>
        <button
          onClick={() => {
            setLog([]);
            setDependencies({});
            setScripts([]);
          }}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-surface rounded p-4 border border-line">
          <p className="text-sm font-semibold text-accent mb-2">package.json</p>
          <pre className="text-xs text-heading-alt overflow-auto">
            {JSON.stringify(
              {
                name: "my-node-app",
                version: "1.0.0",
                scripts: {
                  start: "node server.js",
                  test: "jest",
                  build: "webpack",
                },
                dependencies: Object.keys(dependencies).length
                  ? dependencies
                  : { "(empty)": "install packages" },
              },
              null,
              2,
            )}
          </pre>
        </div>
        <div className="bg-surface rounded p-4 border border-line font-mono text-sm">
          <p className="text-sm font-semibold text-accent mb-2">Terminal</p>
          {log.length === 0 && (
            <p className="text-subtle text-xs">Output will appear here...</p>
          )}
          {log.map((entry, i) => (
            <p key={i} className="text-xs text-heading-alt">
              {entry}
            </p>
          ))}
        </div>
      </div>

      <CodeBlock>{`// package.json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2"  // ^ allows minor/patch updates
  }
}

// Terminal
npm install              // Install all dependencies
npm install express      // Add express to dependencies
npm run start            // Run the "start" script`}</CodeBlock>
    </div>
  );
}

export default NpmDemo;
