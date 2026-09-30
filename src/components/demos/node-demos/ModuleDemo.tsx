import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function ModuleDemo() {
  const [log, setLog] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const requireModule = () => {
    if (loaded) {
      setLog((l) => [
        ...l,
        'require("./mathUtils") -> returns the cached exports object, mathUtils.js does not run again',
      ]);
      return;
    }

    setLoaded(true);
    setLog((l) => [
      ...l,
      "mathUtils.js runs once, top to bottom...",
      "module.exports = { add } -> that exports object gets cached",
    ]);
  };

  const callAdd = () => {
    setLog((l) => [...l, "mathUtils.add(2, 3) -> 5"]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        The first <code>require</code> call runs the target file and caches
        whatever it exports. Every call after that reuses the same cached object
        instead of re-running the file - try requiring twice.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <button
          onClick={requireModule}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          require(&quot;./mathUtils&quot;)
        </button>
        <button
          onClick={callAdd}
          disabled={!loaded}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          mathUtils.add(2, 3)
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
          <p className="text-subtle">Output will appear here...</p>
        )}
        {log.map((entry, i) => (
          <p key={i} className="text-heading-alt">
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock>{`// mathUtils.js
function add(a, b) {
  return a + b;
}
module.exports = { add };

// app.js
const { add } = require("./mathUtils");
add(2, 3); // 5`}</CodeBlock>
    </div>
  );
}

export default ModuleDemo;
