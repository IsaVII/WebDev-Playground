import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function MultiStageBuildDemo() {
  const [multiStage, setMultiStage] = useState(false);

  const layers = multiStage
    ? [
        { name: "nginx:1.27-alpine (base)", size: 8, shipped: true },
        { name: "nginx.conf", size: 0.001, shipped: true },
        { name: "dist/ (built app)", size: 2, shipped: true },
        { name: "node:20-alpine (build stage)", size: 0, shipped: false },
        { name: "node_modules/", size: 0, shipped: false },
        { name: "source files + build tools", size: 0, shipped: false },
      ]
    : [
        { name: "node:20-alpine (base)", size: 130, shipped: true },
        { name: "node_modules/", size: 240, shipped: true },
        { name: "source files", size: 3, shipped: true },
        { name: "dist/ (built app)", size: 2, shipped: true },
      ];

  const shippedSize = layers
    .filter((l) => l.shipped)
    .reduce((sum, l) => sum + l.size, 0);

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        A single-stage image is simplest to write, but everything used to{" "}
        <em>build</em> the app - the compiler, dev dependencies, node_modules
        - ships in the same image as the app itself. A multi-stage build
        keeps that toolchain in an earlier stage that never gets shipped.
      </p>

      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setMultiStage(false)}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            !multiStage
              ? "bg-accent text-white"
              : "bg-surface-alt text-muted hover:text-heading"
          }`}
        >
          Single-stage
        </button>
        <button
          onClick={() => setMultiStage(true)}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            multiStage
              ? "bg-accent text-white"
              : "bg-surface-alt text-muted hover:text-heading"
          }`}
        >
          Multi-stage
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line">
        <div className="space-y-1.5 mb-3">
          {layers.map((layer) => (
            <div
              key={layer.name}
              className={`flex items-center justify-between text-xs font-mono px-2 py-1 rounded ${
                layer.shipped
                  ? "bg-accent/10 text-heading-alt"
                  : "text-subtle line-through opacity-50"
              }`}
            >
              <span>{layer.name}</span>
              <span>
                {layer.shipped
                  ? `${layer.size} MB`
                  : "not in final image"}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-line pt-2">
          <span className="text-sm font-semibold text-heading">
            Final image size
          </span>
          <span className="text-lg font-bold text-accent">
            ≈ {shippedSize} MB
          </span>
        </div>
      </div>

      <CodeBlock>{
        multiStage
          ? `FROM node:20-alpine AS build   # discarded after this stage
RUN npm ci && npm run build

FROM nginx:1.27-alpine          # ← this is the final image
COPY --from=build /app/dist /usr/share/nginx/html`
          : `FROM node:20-alpine             # ← this is also the final image
RUN npm ci && npm run build
CMD ["npx", "serve", "dist"]    # node_modules ships even though
                                 # only "serve" is ever used at runtime`
      }</CodeBlock>
    </div>
  );
}

export default MultiStageBuildDemo;
