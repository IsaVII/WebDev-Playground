import { useState } from "react";
import CodeBlock from "../../CodeBlock";
import {
  INITIAL_MODEL,
  NAME,
  OPERATIONS,
  STATE_DESCRIPTIONS,
  isDirty,
  money,
  operation,
  run,
  type EntityState,
  type Model,
  type OpId,
  type Result,
} from "./lifecycle";

const STATES: { id: EntityState; label: string }[] = [
  { id: "transient", label: "Transient" },
  { id: "managed", label: "Managed" },
  { id: "detached", label: "Detached" },
  { id: "removed", label: "Removed" },
];

interface LogEntry {
  call: string;
  sql: string;
}

function LifecycleDemo() {
  const [model, setModel] = useState<Model>(INITIAL_MODEL);
  const [last, setLast] = useState<{ op: OpId; result: Result } | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);

  const call = (id: OpId) => {
    const result = run(model, id);
    setModel(result.model);
    setLast({ op: id, result });
    if (result.sql.length > 0) {
      const label = operation(id).label;
      setLog((entries) => [...entries, ...result.sql.map((sql) => ({ call: label, sql }))]);
    }
  };

  const reset = () => {
    setModel(INITIAL_MODEL);
    setLast(null);
    setLog([]);
  };

  const statusColor =
    last?.result.kind === "error"
      ? "text-red-600"
      : last?.result.kind === "info"
        ? "text-muted"
        : "text-heading";

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        You hold one <code>Product</code> object, <code>p</code>. Call methods on
        the session and watch which state it is in, what SQL Hibernate sends and
        when. Try changing the price <em>before</em> and <em>after</em> persist,
        then commit - or detach it first.
      </p>

      <CodeBlock>{`Product p = new Product("${NAME}", new BigDecimal("${money(INITIAL_MODEL.price)}"));`}</CodeBlock>

      <div className="flex flex-wrap gap-2 mt-4" role="group" aria-label="Lifecycle state">
        {STATES.map((s) => (
          <span
            key={s.id}
            aria-current={model.state === s.id ? "true" : undefined}
            className={`text-xs px-3 py-1 rounded border ${
              model.state === s.id
                ? "bg-accent text-white border-accent"
                : "border-line text-muted"
            }`}
          >
            {s.label}
          </span>
        ))}
      </div>
      <p className="text-xs text-muted mt-1 mb-4" data-testid="state-description">
        {STATE_DESCRIPTIONS[model.state]}
      </p>

      <div className="flex flex-wrap gap-2 mb-3" role="group" aria-label="Operation">
        {OPERATIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => call(o.id)}
            className="font-mono text-xs px-3 py-1 rounded border border-line text-muted hover:text-accent"
          >
            {o.label}
          </button>
        ))}
        <button
          type="button"
          onClick={reset}
          className="text-xs px-3 py-1 rounded border border-line text-muted hover:text-accent"
        >
          Reset
        </button>
      </div>

      {last && (
        <>
          <p className="text-xs text-heading-alt mb-1">Last call</p>
          <CodeBlock>{operation(last.op).java}</CodeBlock>
        </>
      )}

      <p className={`text-sm min-h-6 mt-3 mb-3 ${statusColor}`} role="status">
        {last === null ? "Press a button to make a call." : last.result.note}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs text-heading-alt mb-1">
            Java object <code>p</code>
          </p>
          <ul className="text-xs font-mono border border-line rounded p-2 mt-0 mb-0 list-none" data-testid="object">
            <li>id: {model.id ?? "null"}</li>
            <li>price: {money(model.price)}</li>
            <li>in the session: {model.state === "managed" || model.state === "removed" ? "yes" : "no"}</li>
            <li>changed since loaded: {isDirty(model) ? "yes" : "no"}</li>
          </ul>
        </div>

        <div>
          <p className="text-xs text-heading-alt mb-1">
            Table <code>product</code> (as far as Hibernate has written)
          </p>
          <table className="text-xs font-mono border border-line w-full" data-testid="db">
            <thead>
              <tr>
                {["id", "name", "price"].map((c) => (
                  <th key={c} className="text-left px-2 py-1 border-b border-line text-heading-alt">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {model.row === null ? (
                <tr>
                  <td colSpan={3} className="px-2 py-1 text-muted">
                    (no rows)
                  </td>
                </tr>
              ) : (
                <tr>
                  <td className="px-2 py-1">{model.row.id}</td>
                  <td className="px-2 py-1">{NAME}</td>
                  <td className="px-2 py-1">{money(model.row.price)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-heading-alt mt-4 mb-1">SQL sent so far</p>
      {log.length === 0 ? (
        <p className="text-xs text-muted mt-0 mb-0" data-testid="sql-log">
          (nothing sent yet)
        </p>
      ) : (
        <ol className="text-xs font-mono mt-0 mb-0 pl-5 text-left" data-testid="sql-log">
          {log.map((entry, i) => (
            <li key={i}>
              {entry.sql} <span className="text-muted">&nbsp;← {entry.call}</span>
            </li>
          ))}
        </ol>
      )}
      <p className="text-xs text-muted mt-2 mb-0">
        Values are filled in for readability; Hibernate really sends <code>?</code> placeholders.
      </p>
    </div>
  );
}

export default LifecycleDemo;
