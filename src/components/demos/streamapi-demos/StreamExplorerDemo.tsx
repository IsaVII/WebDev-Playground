import { useState } from "react";
import CodeBlock from "../../CodeBlock";
import {
  OPERATIONS,
  TERMINALS,
  finalResult,
  pipelineCode,
  stages,
  type OpId,
  type TerminalId,
} from "./streamOps";

const MAX_OPERATIONS = 5;

const LABELS: Record<OpId, string> = {
  flatMap: "flatMap (split)",
  map: "map (upper)",
  filter: "filter (length > 2)",
  distinct: "distinct",
  sorted: "sorted",
  sortedByLength: "sorted (by length)",
  limit: "limit(4)",
  skip: "skip(2)",
};

const TERMINAL_LABELS: Record<TerminalId, string> = {
  toList: "toList()",
  count: "count()",
  joining: "joining(\", \")",
  groupingBy: "groupingBy(length, counting())",
};

function StreamExplorerDemo() {
  const [ops, setOps] = useState<OpId[]>(["flatMap", "distinct", "sorted"]);
  const [terminal, setTerminal] = useState<TerminalId>("toList");

  const all = stages(ops);

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Add operations in the order you want them. Every stage shows what the
        stream holds <em>after</em> that operation - then the terminal
        operation turns it into a result. Order matters: try moving{" "}
        <code>limit</code> before and after <code>sorted</code>.
      </p>

      <div className="flex flex-wrap gap-2 mb-2" role="group" aria-label="Add operation">
        {OPERATIONS.map((op) => (
          <button
            key={op.id}
            type="button"
            disabled={ops.length >= MAX_OPERATIONS}
            onClick={() => setOps((prev) => [...prev, op.id])}
            className="font-mono text-xs px-3 py-1 rounded border border-line text-muted hover:text-accent disabled:opacity-40"
          >
            + {LABELS[op.id]}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          disabled={ops.length === 0}
          onClick={() => setOps((prev) => prev.slice(0, -1))}
          className="text-xs px-3 py-1 rounded border border-line text-muted hover:text-accent disabled:opacity-40"
        >
          Remove last
        </button>
        <button
          type="button"
          disabled={ops.length === 0}
          onClick={() => setOps([])}
          className="text-xs px-3 py-1 rounded border border-line text-muted hover:text-accent disabled:opacity-40"
        >
          Clear
        </button>
      </div>

      <ol className="space-y-2 mb-4 list-none p-0">
        {all.map((items, index) => (
          <li key={index} className="border border-line rounded p-2">
            <p className="text-xs text-heading-alt mb-1">
              {index === 0 ? "source" : `after ${LABELS[ops[index - 1]]}`}{" "}
              <span className="text-muted">
                - {items.length} {items.length === 1 ? "element" : "elements"}
              </span>
            </p>
            <div className="flex flex-wrap gap-1" data-testid={`stage-${index}`}>
              {items.length === 0 && <span className="text-xs text-muted">(empty)</span>}
              {items.map((item, i) => (
                <span
                  key={i}
                  className="font-mono text-xs px-2 py-0.5 rounded bg-surface border border-line"
                >
                  {item}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap items-center gap-2 mb-3" role="group" aria-label="Terminal operation">
        <span className="text-xs text-heading-alt">Terminal:</span>
        {TERMINALS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTerminal(t.id)}
            className={`font-mono text-xs px-3 py-1 rounded border ${
              terminal === t.id
                ? "bg-accent text-white border-accent"
                : "border-line text-muted hover:text-accent"
            }`}
          >
            {TERMINAL_LABELS[t.id]}
          </button>
        ))}
      </div>

      <CodeBlock>{pipelineCode(ops, terminal)}</CodeBlock>
      <p className="text-sm mt-3 mb-0 text-heading" role="status">
        Result: <code>{finalResult(ops, terminal)}</code>
      </p>
    </div>
  );
}

export default StreamExplorerDemo;
