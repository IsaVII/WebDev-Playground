import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function ErrorHandlingDemo() {
  const [log, setLog] = useState([]);
  const [uncaughtHandler, setUncaughtHandler] = useState(false);

  const syncError = () => {
    try {
      setLog((l) => [...l, "try { ... }"]);
      throw new Error("Sync error occurred");
    } catch (err) {
      setLog((l) => [
        ...l,
        `catch → Error: ${err.message}`,
        "✓ Error handled gracefully",
      ]);
    }
  };

  const asyncError = async () => {
    try {
      setLog((l) => [...l, "async function with try/catch"]);
      await Promise.reject(new Error("Async operation failed"));
    } catch (err) {
      setLog((l) => [
        ...l,
        `catch → Error: ${err.message}`,
        "✓ Promise rejection caught",
      ]);
    }
  };

  const unhandledRejection = () => {
    setLog((l) => [
      ...l,
      "Promise.reject() without .catch()",
      "⚠️ UnhandledPromiseRejection",
      uncaughtHandler
        ? "✓ Caught by process handler"
        : "❌ Would crash in production",
    ]);
  };

  const customError = () => {
    class ValidationError extends Error {
      constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.statusCode = 400;
      }
    }

    try {
      throw new ValidationError("Invalid email format");
    } catch (err) {
      setLog((l) => [
        ...l,
        `${err.name}: ${err.message}`,
        `Status code: ${err.statusCode}`,
        "✓ Custom error with metadata",
      ]);
    }
  };

  const errorFirst = () => {
    // Simulating Node.js callback pattern
    const callback = (err, data) => {
      if (err) {
        setLog((l) => [
          ...l,
          `Callback received error: ${err.message}`,
          "✓ Handled in callback",
        ]);
        return;
      }
      setLog((l) => [...l, `Success: ${data}`]);
    };

    // Simulate error
    callback(new Error("File not found"), null);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Handle errors with try/catch for sync code and async/await. Use
        error-first callbacks for traditional Node patterns. Always catch
        promise rejections - unhandled ones can crash your process. Add global
        handlers for uncaught exceptions and unhandled rejections.
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={syncError}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Sync Error
        </button>
        <button
          onClick={asyncError}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Async Error
        </button>
        <button
          onClick={customError}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Custom Error
        </button>
        <button
          onClick={errorFirst}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Error-First Callback
        </button>
        <button
          onClick={unhandledRejection}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Unhandled Rejection
        </button>
        <button
          onClick={() => setUncaughtHandler(!uncaughtHandler)}
          className={`px-3 py-2 rounded text-sm transition-colors ${
            uncaughtHandler
              ? "bg-green-600 text-white"
              : "bg-surface border border-line text-muted"
          }`}
        >
          {uncaughtHandler ? "Handler: ON" : "Handler: OFF"}
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
            className={`text-xs ${
              entry.startsWith("✓")
                ? "text-green-400"
                : entry.startsWith("⚠️") || entry.startsWith("❌")
                  ? "text-yellow-400"
                  : "text-heading-alt"
            }`}
          >
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock>{`// Sync error handling
try {
  throw new Error("Something went wrong");
} catch (err) {
  console.error("Caught:", err.message);
}

// Async error handling
async function fetchData() {
  try {
    await riskyOperation();
  } catch (err) {
    console.error("Async error:", err);
  }
}

// Error-first callback (traditional Node pattern)
fs.readFile("file.txt", (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});

// Global handlers (production safety net)
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  process.exit(1); // Crash gracefully
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled rejection:", reason);
});`}</CodeBlock>
    </div>
  );
}

export default ErrorHandlingDemo;
