import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function ChildProcessDemo() {
  const [log, setLog] = useState([]);
  const [processes, setProcesses] = useState([]);

  const exec = () => {
    const pid = Math.floor(Math.random() * 10000);
    setLog((l) => [
      ...l,
      'exec("ls -la")',
      "Waiting for command to complete...",
      "stdout: total 48",
      "stdout: drwxr-xr-x  12 user  staff  384 Jan 1 12:00 .",
      "stdout: -rw-r--r--   1 user  staff  256 Jan 1 12:00 file.txt",
      `✓ Process exited with code 0`,
    ]);
  };

  const spawn = () => {
    const pid = Math.floor(Math.random() * 10000);
    setProcesses((p) => [...p, { pid, name: "node script.js" }]);
    setLog((l) => [
      ...l,
      'spawn("node", ["script.js"])',
      `Child process started (PID: ${pid})`,
      "stdout: Starting...",
      "stdout: Processing item 1",
      "stdout: Processing item 2",
      "✓ Streaming output as it arrives",
    ]);
  };

  const fork = () => {
    const pid = Math.floor(Math.random() * 10000);
    setProcesses((p) => [...p, { pid, name: "worker.js" }]);
    setLog((l) => [
      ...l,
      'fork("worker.js")',
      `Worker process forked (PID: ${pid})`,
      "→ Sent: { task: 'processData' }",
      "← Received: { result: 'done' }",
      "✓ IPC channel established",
    ]);
  };

  const kill = () => {
    if (processes.length === 0) {
      setLog((l) => [...l, "❌ No child processes running"]);
      return;
    }
    const removed = processes[0];
    setProcesses((p) => p.slice(1));
    setLog((l) => [
      ...l,
      `child.kill() → PID ${removed.pid}`,
      "✓ Process terminated",
    ]);
  };

  const execFile = () => {
    setLog((l) => [
      ...l,
      'execFile("./script.sh", ["arg1", "arg2"])',
      "Executing binary directly (no shell)...",
      "stdout: Processing arg1",
      "stdout: Processing arg2",
      "✓ Completed successfully",
    ]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        The <code>child_process</code> module lets you run other programs from
        Node.js. Use <code>exec()</code> for simple shell commands,{" "}
        <code>spawn()</code> for streaming output, <code>fork()</code> for
        running Node.js scripts with IPC, and <code>execFile()</code> for
        executing binaries directly.
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={exec}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          exec()
        </button>
        <button
          onClick={spawn}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          spawn()
        </button>
        <button
          onClick={fork}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          fork()
        </button>
        <button
          onClick={execFile}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          execFile()
        </button>
        <button
          onClick={kill}
          disabled={processes.length === 0}
          className="bg-surface border border-line text-heading px-3 py-2 rounded hover:border-accent transition-colors disabled:opacity-50"
        >
          .kill()
        </button>
        <button
          onClick={() => {
            setLog([]);
            setProcesses([]);
          }}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-surface rounded p-4 border border-line">
          <p className="text-sm font-semibold text-accent mb-2">
            Running Processes ({processes.length})
          </p>
          {processes.length === 0 ? (
            <p className="text-subtle text-xs">No child processes</p>
          ) : (
            <div className="space-y-1">
              {processes.map((p) => (
                <p key={p.pid} className="text-xs text-heading-alt font-mono">
                  PID {p.pid}: {p.name}
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="bg-surface rounded p-4 border border-line font-mono text-sm">
          <p className="text-sm font-semibold text-accent mb-2">Output</p>
          {log.length === 0 && (
            <p className="text-subtle text-xs">Output will appear here...</p>
          )}
          <div className="space-y-0.5 max-h-[200px] overflow-auto">
            {log.map((entry, i) => (
              <p
                key={i}
                className={`text-xs ${
                  entry.startsWith("✓")
                    ? "text-green-400"
                    : entry.startsWith("❌")
                      ? "text-red-400"
                      : "text-heading-alt"
                }`}
              >
                {entry}
              </p>
            ))}
          </div>
        </div>
      </div>

      <CodeBlock>{`const { exec, spawn, fork, execFile } = require("child_process");

// exec: Run shell commands, buffer full output
exec("ls -la", (err, stdout, stderr) => {
  if (err) return console.error(err);
  console.log(stdout);
});

// spawn: Stream output as it arrives
const child = spawn("node", ["script.js"]);
child.stdout.on("data", (data) => {
  console.log(\`stdout: \${data}\`);
});
child.on("close", (code) => {
  console.log(\`Exited with code \${code}\`);
});

// fork: Run Node.js with IPC channel
const worker = fork("worker.js");
worker.send({ task: "process" });
worker.on("message", (msg) => {
  console.log("From worker:", msg);
});

// execFile: Run binary directly (no shell)
execFile("./script.sh", ["arg"], (err, stdout) => {
  console.log(stdout);
});

// Terminate child process
child.kill("SIGTERM");`}</CodeBlock>
    </div>
  );
}

export default ChildProcessDemo;
