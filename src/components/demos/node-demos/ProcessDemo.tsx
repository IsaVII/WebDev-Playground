import { useState, useEffect } from "react";
import CodeBlock from "../../CodeBlock";

function ProcessDemo() {
  const [log, setLog] = useState([]);
  const [info, setInfo] = useState({
    platform: "linux",
    version: "v18.17.0",
    uptime: 0,
    memory: "45.2 MB",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setInfo((prev) => ({
        ...prev,
        uptime: prev.uptime + 1,
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const showArgs = () => {
    setLog((l) => [
      ...l,
      "process.argv",
      "→ ['/usr/bin/node', '/app/server.js', '--port', '3000']",
      "✓ Command-line arguments",
    ]);
  };

  const showEnv = () => {
    setLog((l) => [
      ...l,
      "process.env.NODE_ENV",
      `→ "production"`,
      "process.env.PORT",
      `→ "8080"`,
    ]);
  };

  const showCwd = () => {
    setLog((l) => [
      ...l,
      "process.cwd()",
      `→ "/home/user/my-app"`,
      "✓ Current working directory",
    ]);
  };

  const showPlatform = () => {
    setLog((l) => [
      ...l,
      "process.platform",
      `→ "${info.platform}"`,
      "process.version",
      `→ "${info.version}"`,
      "process.arch",
      `→ "x64"`,
    ]);
  };

  const showMemory = () => {
    setLog((l) => [
      ...l,
      "process.memoryUsage()",
      "→ { rss: 47452160, heapTotal: 18874368, heapUsed: 8123456 }",
      "✓ Memory stats in bytes",
    ]);
  };

  const showUptime = () => {
    setLog((l) => [
      ...l,
      "process.uptime()",
      `→ ${info.uptime} seconds`,
      "✓ Process runtime",
    ]);
  };

  const exitProcess = () => {
    setLog((l) => [
      ...l,
      "process.exit(0)",
      "⚠️ Process would terminate here",
      "Code 0 = success, non-zero = error",
    ]);
  };

  const onExit = () => {
    setLog((l) => [
      ...l,
      'process.on("exit", callback)',
      "✓ Cleanup handler registered",
      "→ Runs before process terminates",
    ]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        The global <code>process</code> object provides info about the current
        Node.js process: command-line arguments, environment variables,
        platform, memory usage, uptime, and exit handlers. Use{" "}
        <code>process.env</code> for config, <code>process.argv</code> for CLI
        args.
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={showArgs}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          process.argv
        </button>
        <button
          onClick={showEnv}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          process.env
        </button>
        <button
          onClick={showCwd}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          process.cwd()
        </button>
        <button
          onClick={showPlatform}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Platform Info
        </button>
        <button
          onClick={showMemory}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Memory Usage
        </button>
        <button
          onClick={showUptime}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Uptime
        </button>
        <button
          onClick={onExit}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Exit Handler
        </button>
        <button
          onClick={exitProcess}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          process.exit()
        </button>
        <button
          onClick={() => setLog([])}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-surface rounded p-4 border border-line">
          <p className="text-sm font-semibold text-accent mb-2">Process Info</p>
          <div className="space-y-1 text-xs font-mono text-heading-alt">
            <p>Platform: {info.platform}</p>
            <p>Version: {info.version}</p>
            <p>Uptime: {info.uptime}s</p>
            <p>Memory: {info.memory}</p>
          </div>
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
                    : entry.startsWith("⚠️")
                      ? "text-yellow-400"
                      : "text-heading-alt"
                }`}
              >
                {entry}
              </p>
            ))}
          </div>
        </div>
      </div>

      <CodeBlock>{`// Command-line arguments
process.argv; // ["node", "script.js", "arg1", "arg2"]

// Environment variables
process.env.NODE_ENV;  // "production"
process.env.PORT;      // "8080"

// Platform & version
process.platform;  // "linux", "darwin", "win32"
process.version;   // "v18.17.0"
process.arch;      // "x64", "arm64"

// Current directory
process.cwd();     // "/home/user/project"

// Memory usage
process.memoryUsage();
// { rss: 47452160, heapTotal: 18874368, heapUsed: 8123456 }

// Uptime
process.uptime();  // 123.456 (seconds)

// Exit process
process.exit(0);   // 0 = success, 1 = error

// Exit handlers
process.on("exit", (code) => {
  console.log(\`Exiting with code \${code}\`);
});

process.on("SIGINT", () => {
  console.log("Ctrl+C pressed, cleaning up...");
  process.exit(0);
});`}</CodeBlock>
    </div>
  );
}

export default ProcessDemo;
