import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const GOTCHAS = [
  {
    title: "A bind mount hides the image's node_modules",
    broken: `# docker-compose.yml
services:
  api:
    build: ./server
    volumes:
      - ./server:/app   # wipes out /app/node_modules
                         # with the host's own folder`,
    fixed: `# docker-compose.yml
services:
  api:
    build: ./server
    volumes:
      - ./server:/app
      - api_node_modules:/app/node_modules  # named volume
volumes:                                    # wins over the bind
  api_node_modules:                         # mount above it`,
    note: "A bind mount for live-reload during development also overlays whatever's already at that path inside the container - including the node_modules the image just installed. Adding a named volume specifically for node_modules keeps the image's copy in place.",
  },
  {
    title: "The api starts before Postgres is ready",
    broken: `depends_on:
  - db   # only waits for the container to START,
         # not for Postgres to accept connections`,
    fixed: `depends_on:
  db:
    condition: service_healthy   # waits for db's
                                  # healthcheck to pass`,
    note: "A plain depends_on list only sequences container start order. Postgres can take a moment after starting before it's ready to accept connections - condition: service_healthy makes Compose actually wait for that.",
  },
  {
    title: "A committed .env ships secrets in the image",
    broken: `# no .dockerignore
COPY . .   # includes .env - now the DB password
           # is baked into an image layer forever`,
    fixed: `# .dockerignore
.env

# docker-compose.yml
api:
  env_file: .env   # injected at runtime, never
                    # copied into the image itself`,
    note: "Anything COPY . . picks up becomes part of an image layer permanently - even a later COPY --from that leaves it out, or deleting the file in a following RUN, doesn't remove it from the layer history. Excluding it in .dockerignore is the only fix.",
  },
  {
    title: "The container exits immediately after starting",
    broken: `CMD ["npm", "run", "dev"]
# but the base image's WORKDIR has no package.json,
# or the dev server binds to localhost, not 0.0.0.0`,
    fixed: `# server.js
app.listen(4000, "0.0.0.0")   // reachable from
                               // outside the container

# Dockerfile
WORKDIR /app
COPY . .`,
    note: "A server that binds to localhost/127.0.0.1 only accepts connections from inside its own container - port mapping in compose can't fix a service that was never listening on an address the outside can reach.",
  },
];

function DockerGotchasDemo() {
  const [openIndex, setOpenIndex] = useState(0);
  const [showFixed, setShowFixed] = useState(false);

  const gotcha = GOTCHAS[openIndex];

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        These are the four mistakes that catch almost everyone the first
        time they containerize a Node/React app. Pick one, then toggle
        between the broken version and the fix.
      </p>

      <div className="flex flex-col gap-2 mb-4">
        {GOTCHAS.map((g, i) => (
          <button
            key={g.title}
            onClick={() => {
              setOpenIndex(i);
              setShowFixed(false);
            }}
            className={`text-left px-3 py-2 rounded text-sm transition-colors ${
              openIndex === i
                ? "bg-accent text-white"
                : "bg-surface text-heading-alt hover:bg-surface-alt border border-line"
            }`}
          >
            {i + 1}. {g.title}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowFixed(false)}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            !showFixed
              ? "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/40"
              : "bg-surface-alt text-muted hover:text-heading"
          }`}
        >
          Broken
        </button>
        <button
          onClick={() => setShowFixed(true)}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            showFixed
              ? "bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/40"
              : "bg-surface-alt text-muted hover:text-heading"
          }`}
        >
          Fixed
        </button>
      </div>

      <CodeBlock>{showFixed ? gotcha.fixed : gotcha.broken}</CodeBlock>

      <p className="text-muted text-sm leading-relaxed mt-4">{gotcha.note}</p>
    </div>
  );
}

export default DockerGotchasDemo;
