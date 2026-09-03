import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function ComposeNetworkingDemo() {
  const [host, setHost] = useState("db");
  const [log, setLog] = useState([]);

  const connect = () => {
    if (host === "db") {
      setLog([
        `Connecting to postgres://app:app@db:5432/app ...`,
        "Compose's internal DNS resolves \"db\" to the db container's address on the private network",
        "✓ Connected",
      ]);
    } else if (host === "localhost") {
      setLog([
        `Connecting to postgres://app:app@localhost:5432/app ...`,
        "Inside the api container, \"localhost\" means the api container itself, not the host machine and not the db container",
        "✗ ECONNREFUSED - nothing is listening on localhost:5432 in here",
      ]);
    } else {
      setLog([
        `Connecting to postgres://app:app@127.0.0.1:5432/app ...`,
        "Same problem as localhost - 127.0.0.1 is still this container's own loopback address",
        "✗ ECONNREFUSED - nothing is listening on 127.0.0.1:5432 in here",
      ]);
    }
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Every container gets its own network namespace, so{" "}
        <code>localhost</code> inside the <strong>api</strong> container
        refers to the api container, not the host machine and not the db
        container. Compose gives every service a hostname you can actually
        use instead: its service name.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {["db", "localhost", "127.0.0.1"].map((option) => (
          <button
            key={option}
            onClick={() => {
              setHost(option);
              setLog([]);
            }}
            className={`px-3 py-1 rounded text-sm font-mono transition-colors ${
              host === option
                ? "bg-accent text-white"
                : "bg-surface-alt text-muted hover:text-heading"
            }`}
          >
            {option}
          </button>
        ))}
        <button
          onClick={connect}
          className="bg-heading-alt text-surface px-4 py-1 rounded text-sm hover:opacity-90 transition-opacity ml-auto"
        >
          Connect from the api container
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-xs min-h-[100px]">
        {log.length === 0 && (
          <p className="text-subtle">
            Pick a hostname the api container will try to connect to...
          </p>
        )}
        {log.map((line, i) => (
          <p
            key={i}
            className={`mb-1 ${
              line.startsWith("✗")
                ? "text-red-600 dark:text-red-400"
                : line.startsWith("✓")
                  ? "text-green-600 dark:text-green-400"
                  : "text-heading-alt"
            }`}
          >
            {line}
          </p>
        ))}
      </div>

      <CodeBlock>{`# .env used by the api service
DATABASE_URL=postgres://app:app@db:5432/app
#                                 ^^ the db service's name in
#                                    docker-compose.yml - not
#                                    localhost, not 127.0.0.1

# Only the host machine reaches containers via localhost - and only
# for ports that service actually publishes with "ports:" in compose.
# Container-to-container traffic always uses the service name.`}</CodeBlock>
    </div>
  );
}

export default ComposeNetworkingDemo;
