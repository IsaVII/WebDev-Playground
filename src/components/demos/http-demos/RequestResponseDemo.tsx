import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const STAGES = [
  {
    delay: 0,
    text: "1. DNS lookup - resolve api.example.com to an IP address",
  },
  {
    delay: 400,
    text: "2. TCP + TLS handshake - open a secure connection to the server",
  },
  {
    delay: 800,
    text: '3. Request sent - "GET /users/7 HTTP/1.1" plus headers',
  },
  {
    delay: 1300,
    text: "4. Server processes the request (reads a database, etc.)",
  },
  {
    delay: 2000,
    text: '5. Response received - "200 OK" plus headers and a JSON body',
  },
];

function RequestResponseDemo() {
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);

  const run = () => {
    setLog([]);
    setRunning(true);

    STAGES.forEach((stage, i) => {
      setTimeout(() => {
        setLog((l) => [...l, stage.text]);
        if (i === STAGES.length - 1) setRunning(false);
      }, stage.delay);
    });
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        A single <code>fetch()</code> call hides several steps happening one
        after another. Click through them below to see what your one line of
        JavaScript is actually waiting on.
      </p>

      <button
        onClick={run}
        disabled={running}
        className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50 mb-4"
      >
        {running ? "In flight..." : "Send a request"}
      </button>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[150px]">
        {log.length === 0 && (
          <p className="text-subtle">Steps will appear here...</p>
        )}
        {log.map((entry, i) => (
          <p key={i} className="text-heading-alt mb-1">
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock>{`const response = await fetch("https://api.example.com/users/7");
const user = await response.json();`}</CodeBlock>
    </div>
  );
}

export default RequestResponseDemo;
