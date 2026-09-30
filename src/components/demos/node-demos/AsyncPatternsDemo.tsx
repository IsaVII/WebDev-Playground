import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function AsyncPatternsDemo() {
  const [log, setLog] = useState([]);
  const [pattern, setPattern] = useState("callback");

  const runCallback = () => {
    setLog(["Pattern: Callbacks (error-first)"]);
    setTimeout(() => {
      setLog((l) => [
        ...l,
        "readFile('data.txt', callback)",
        "→ callback(null, 'file contents')",
        "✓ Success",
      ]);
    }, 500);
  };

  const runPromise = () => {
    setLog(["Pattern: Promises (.then/.catch)"]);
    setTimeout(() => {
      setLog((l) => [
        ...l,
        "fetchData()",
        "→ .then(data => ...)",
        "→ Data received",
        "✓ Promise resolved",
      ]);
    }, 500);
  };

  const runAsyncAwait = () => {
    setLog(["Pattern: async/await"]);
    setTimeout(() => {
      setLog((l) => [
        ...l,
        "const data = await fetchData()",
        "→ Waiting for promise...",
        "→ Data assigned to variable",
        "✓ Clean, synchronous-looking code",
      ]);
    }, 500);
  };

  const runPromiseAll = () => {
    setLog(["Pattern: Promise.all() - parallel execution"]);
    setTimeout(() => {
      setLog((l) => [
        ...l,
        "Promise.all([fetch1(), fetch2(), fetch3()])",
        "→ All promises running in parallel...",
        "→ [result1, result2, result3]",
        "✓ All completed",
      ]);
    }, 700);
  };

  const runPromiseRace = () => {
    setLog(["Pattern: Promise.race() - first to complete"]);
    setTimeout(() => {
      setLog((l) => [
        ...l,
        "Promise.race([slowAPI(), fastAPI()])",
        "→ fastAPI() resolves first",
        "→ Returns fast result",
        "✓ Completed (other promises ignored)",
      ]);
    }, 500);
  };

  const runErrorHandling = () => {
    setLog(["Pattern: async/await error handling"]);
    setTimeout(() => {
      setLog((l) => [
        ...l,
        "try { await riskyOperation() }",
        "→ Operation failed",
        "catch(err) { ... }",
        "✓ Error caught and handled",
      ]);
    }, 500);
  };

  const patterns = {
    callback: runCallback,
    promise: runPromise,
    asyncAwait: runAsyncAwait,
    promiseAll: runPromiseAll,
    promiseRace: runPromiseRace,
    error: runErrorHandling,
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Node.js started with callbacks, evolved to promises, and now uses
        async/await. Callbacks are error-first <code>(err, data) =&gt; {}</code>
        . Promises chain with <code>.then()</code>. Async/await makes async code
        look synchronous. Use <code>Promise.all()</code> for parallel
        operations.
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={runCallback}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Callbacks
        </button>
        <button
          onClick={runPromise}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Promises
        </button>
        <button
          onClick={runAsyncAwait}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Async/Await
        </button>
        <button
          onClick={runPromiseAll}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Promise.all()
        </button>
        <button
          onClick={runPromiseRace}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Promise.race()
        </button>
        <button
          onClick={runErrorHandling}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Error Handling
        </button>
        <button
          onClick={() => setLog([])}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[120px]">
        {log.length === 0 && (
          <p className="text-subtle text-xs">Output will appear here...</p>
        )}
        {log.map((entry, i) => (
          <p
            key={i}
            className={`text-xs ${entry.startsWith("✓") ? "text-green-400" : "text-heading-alt"}`}
          >
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock>{`// 1. Callbacks (traditional Node.js)
fs.readFile("file.txt", (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});

// 2. Promises
const readFilePromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

readFilePromise("file.txt")
  .then(data => console.log(data))
  .catch(err => console.error(err));

// 3. Async/Await (cleanest)
async function loadFile() {
  try {
    const data = await readFilePromise("file.txt");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// 4. Parallel execution
const [user, posts, comments] = await Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchComments()
]);`}</CodeBlock>
    </div>
  );
}

export default AsyncPatternsDemo;
