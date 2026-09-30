import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const GOOD_ORDER = [
  { step: "COPY package.json package-lock.json ./", cost: 0, dependsOnDeps: true },
  { step: "RUN npm ci", cost: 18, dependsOnDeps: true },
  { step: "COPY . .", cost: 0, dependsOnDeps: false },
  { step: "RUN npm run build", cost: 6, dependsOnDeps: false },
];

const BAD_ORDER = [
  { step: "COPY . .", cost: 0, dependsOnDeps: false },
  { step: "RUN npm ci", cost: 18, dependsOnDeps: true },
  { step: "RUN npm run build", cost: 6, dependsOnDeps: false },
];

function LayerCachingDemo() {
  const [goodOrder, setGoodOrder] = useState(true);
  const [changed, setChanged] = useState("source");
  const [result, setResult] = useState(null);

  const steps = goodOrder ? GOOD_ORDER : BAD_ORDER;

  const rebuild = () => {
    // In the good order, only a dependency change invalidates the
    // "COPY manifests" layer (and everything after it). In the bad
    // order, COPY . . comes first, so ANY file change - deps or not -
    // invalidates every layer below it, including npm ci.
    let invalidatedFrom;
    if (goodOrder) {
      invalidatedFrom = changed === "deps" ? 0 : 2;
    } else {
      invalidatedFrom = 0;
    }

    const outcome = steps.map((s, i) => ({
      ...s,
      cacheHit: i < invalidatedFrom,
    }));

    const wastedSeconds = outcome
      .filter((s) => !s.cacheHit)
      .reduce((sum, s) => sum + s.cost, 0);

    setResult({ outcome, wastedSeconds });
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Docker caches each Dockerfile instruction as its own layer and
        reuses it on the next build - until that instruction, or an earlier
        one it depends on, changes. Instruction <em>order</em> decides how
        much a small change ends up invalidating.
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setGoodOrder(true);
              setResult(null);
            }}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              goodOrder
                ? "bg-accent text-white"
                : "bg-surface-alt text-muted hover:text-heading"
            }`}
          >
            Manifests copied first
          </button>
          <button
            onClick={() => {
              setGoodOrder(false);
              setResult(null);
            }}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              !goodOrder
                ? "bg-accent text-white"
                : "bg-surface-alt text-muted hover:text-heading"
            }`}
          >
            COPY . . copied first
          </button>
        </div>

        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => {
              setChanged("source");
              setResult(null);
            }}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              changed === "source"
                ? "bg-heading-alt text-surface"
                : "bg-surface-alt text-muted hover:text-heading"
            }`}
          >
            Edited a component
          </button>
          <button
            onClick={() => {
              setChanged("deps");
              setResult(null);
            }}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              changed === "deps"
                ? "bg-heading-alt text-surface"
                : "bg-surface-alt text-muted hover:text-heading"
            }`}
          >
            Added a dependency
          </button>
        </div>
      </div>

      <button
        onClick={rebuild}
        className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity mb-4"
      >
        Rebuild
      </button>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-xs min-h-[150px]">
        {!result && (
          <p className="text-subtle">
            Pick an order and what changed, then rebuild...
          </p>
        )}
        {result &&
          result.outcome.map((s, i) => (
            <div key={i} className="flex items-center justify-between mb-1.5">
              <span className={s.cacheHit ? "text-subtle" : "text-heading-alt"}>
                {s.step}
              </span>
              <span
                className={
                  s.cacheHit
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }
              >
                {s.cacheHit ? "CACHED" : `RUN (~${s.cost}s)`}
              </span>
            </div>
          ))}
        {result && (
          <p className="text-heading-alt mt-2 pt-2 border-t border-line">
            {result.wastedSeconds === 0
              ? "Nothing had to rerun - build finished almost instantly."
              : `~${result.wastedSeconds}s spent rerunning steps that a better instruction order could have skipped.`}
          </p>
        )}
      </div>

      <CodeBlock>{`# Manifests first: npm ci only reruns when deps actually change
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# COPY . . first: ANY file change invalidates every layer after it,
# including npm ci - editing one component reruns the entire install
COPY . .
RUN npm ci`}</CodeBlock>
    </div>
  );
}

export default LayerCachingDemo;
