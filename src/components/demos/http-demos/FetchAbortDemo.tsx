import { useRef, useState } from "react";
import CodeBlock from "../../CodeBlock";

// Stands in for a slow fetch() without depending on network access. It
// uses a *real* AbortController signal the same way fetch does: it
// listens for the "abort" event and rejects with a DOMException named
// "AbortError", exactly like the browser's own fetch implementation.
function slowRequest(signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => resolve({ id: 7, name: "Ada Lovelace" }),
      3000,
    );

    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("The operation was aborted.", "AbortError"));
    });
  });
}

function FetchAbortDemo() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | aborted | error
  const [result, setResult] = useState(null);
  const controllerRef = useRef(null);

  const start = async () => {
    const controller = new AbortController();
    controllerRef.current = controller;
    setStatus("loading");
    setResult(null);

    try {
      const data = await slowRequest(controller.signal);
      setResult(data);
      setStatus("success");
    } catch (error) {
      if (error.name === "AbortError") {
        setStatus("aborted");
      } else {
        setStatus("error");
      }
    }
  };

  const abort = () => {
    controllerRef.current?.abort();
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        This request takes 3 seconds. Start it, then click Abort before it
        finishes - <code>AbortController</code> lets you cancel a fetch that's
        no longer needed, like when a user navigates away or types a new search
        before the last one returned.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <button
          onClick={start}
          disabled={status === "loading"}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === "loading" ? "Loading..." : "Start slow request"}
        </button>
        <button
          onClick={abort}
          disabled={status !== "loading"}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          Abort
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[60px] text-heading-alt">
        {status === "idle" && <span className="text-subtle">Not started</span>}
        {status === "loading" && "Waiting for the response..."}
        {status === "success" && `200 OK: ${JSON.stringify(result)}`}
        {status === "aborted" && (
          <span className="text-amber-600 dark:text-amber-400">
            AbortError: The operation was aborted.
          </span>
        )}
        {status === "error" && (
          <span className="text-red-600 dark:text-red-400">
            Request failed.
          </span>
        )}
      </div>

      <CodeBlock>{`const controller = new AbortController();

fetch("/api/users/7", { signal: controller.signal })
  .then((res) => res.json())
  .catch((err) => {
    if (err.name === "AbortError") console.log("cancelled");
  });

// Later, e.g. when the component unmounts or the user types again:
controller.abort();`}</CodeBlock>
    </div>
  );
}

export default FetchAbortDemo;
