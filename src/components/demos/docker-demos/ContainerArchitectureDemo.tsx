import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const SERVICES = {
  client: {
    label: "client",
    subtitle: "React, built + nginx",
    port: "5173 → 80",
    detail:
      "A static bundle - built once with npm run build - served by nginx. It has no runtime dependency on Node at all; the browser talks to it over HTTP on the port mapped in docker-compose.yml.",
    code: `services:\n  client:\n    build: .\n    ports:\n      - "5173:80"`,
  },
  api: {
    label: "api",
    subtitle: "Node/Express",
    port: "4000 → 4000",
    detail:
      "A long-running Node process. Requests from the browser go to the client's own origin in production (nginx or a reverse proxy forwards /api to this container); requests from the api to the database go over Compose's private network, using the db service's name as the hostname.",
    code: `services:\n  api:\n    build: ./server\n    environment:\n      DATABASE_URL: postgres://app:app@db:5432/app`,
  },
  db: {
    label: "db",
    subtitle: "PostgreSQL",
    port: "5432 (internal only)",
    detail:
      "Not published to the host with ports: at all in most setups - only the api container needs to reach it, over the internal network, so there's nothing to expose to the outside world. Its data lives in a named volume, not the container's own writable layer.",
    code: `services:\n  db:\n    image: postgres:16-alpine\n    volumes:\n      - db_data:/var/lib/postgresql/data`,
  },
};

function ContainerArchitectureDemo() {
  const [active, setActive] = useState("api");
  const service = SERVICES[active];

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Three containers, one docker-compose.yml, one private network. Click
        a service to see what it actually is and how the others reach it.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        {["client", "api", "db"].map((key, i) => (
          <div key={key} className="flex items-center gap-3">
            <button
              onClick={() => setActive(key)}
              className={`px-4 py-3 rounded-lg border text-sm font-mono transition-colors ${
                active === key
                  ? "bg-accent text-white border-accent"
                  : "bg-surface border-line text-heading-alt hover:border-accent"
              }`}
            >
              {SERVICES[key].label}
            </button>
            {i < 2 && (
              <span className="text-subtle text-xs font-mono">⇄</span>
            )}
          </div>
        ))}
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line">
        <div className="flex items-center justify-between mb-2">
          <p className="font-mono text-sm text-accent">
            {service.label}{" "}
            <span className="text-subtle">- {service.subtitle}</span>
          </p>
          <span className="text-[10px] px-2 py-0.5 rounded bg-accent/15 text-accent font-mono">
            {service.port}
          </span>
        </div>
        <p className="text-muted text-sm leading-relaxed">{service.detail}</p>
      </div>

      <CodeBlock>{service.code}</CodeBlock>
    </div>
  );
}

export default ContainerArchitectureDemo;
