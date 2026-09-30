import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const FILE_CONTENTS = "Node.js: a JavaScript runtime built on V8.";

function FileSystemDemo() {
  const [status, setStatus] = useState("idle"); // idle | reading | done
  const [content, setContent] = useState("");

  const readFile = () => {
    setStatus("reading");
    setContent("");

    // Simulates the disk I/O delay - the real fs.readFile hands control
    // back to the event loop immediately and calls this callback later,
    // once the data is actually ready.
    setTimeout(() => {
      setContent(FILE_CONTENTS);
      setStatus("done");
    }, 1200);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        <code>fs.readFile</code> doesn&apos;t block the rest of the program
        while the disk is read - it returns immediately and calls your callback
        later, once the data is ready.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <button
          onClick={readFile}
          disabled={status === "reading"}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === "reading" ? "Reading..." : 'fs.readFile("notes.txt")'}
        </button>
        <span className="text-sm text-muted">
          {status === "idle" && "Nothing read yet"}
          {status === "reading" &&
            "The rest of the program keeps running while this waits ⏳"}
          {status === "done" && "Callback fired ✓"}
        </span>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[52px] text-heading-alt">
        {content ? (
          `"${content}"`
        ) : (
          <span className="text-subtle">File contents will appear here...</span>
        )}
      </div>

      <CodeBlock>{`fs.readFile("notes.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data); // runs later, once the file is read
});

console.log("this logs first"); // runs immediately`}</CodeBlock>
    </div>
  );
}

export default FileSystemDemo;
