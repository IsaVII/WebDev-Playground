import { useState } from "react";
import CodeBlock from "../../CodeBlock";
import {
  COLUMNS,
  INITIAL_STATE,
  OPERATIONS,
  operation,
  run,
  toCells,
  type OpId,
  type Outcome,
  type TableState,
} from "./sqlOps";

function SqlExplorerDemo() {
  const [selected, setSelected] = useState<OpId>("selectAll");
  const [table, setTable] = useState<TableState>(INITIAL_STATE);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const op = operation(selected);

  const execute = () => {
    const result = run(table, selected);
    setTable(result.state);
    setOutcome(result.outcome);
  };

  const pick = (id: OpId) => {
    setSelected(id);
    setOutcome(null);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Pick a statement, run it, and watch both the table and what JDBC hands
        back. The changes stick, so try running <code>INSERT</code> twice,{" "}
        <code>DELETE ... WHERE</code> twice, or the <code>DELETE</code> with no{" "}
        <code>WHERE</code>.
      </p>

      <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Statement">
        {OPERATIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => pick(o.id)}
            className={`font-mono text-xs px-3 py-1 rounded border ${
              selected === o.id
                ? "bg-accent text-white border-accent"
                : "border-line text-muted hover:text-accent"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-heading-alt mb-1">SQL</p>
      <CodeBlock>{op.sql}</CodeBlock>
      {op.params.length > 0 && (
        <p className="text-xs text-muted mt-1 mb-0">
          Bound values, in order:{" "}
          <code data-testid="bound">{op.params.join(", ")}</code>
        </p>
      )}

      <p className="text-xs text-heading-alt mt-3 mb-1">
        Java - sent with <code>{op.call}()</code>
      </p>
      <CodeBlock>{op.java}</CodeBlock>

      <div className="flex gap-2 mt-4 mb-3">
        <button
          type="button"
          onClick={execute}
          className="bg-accent text-white px-4 py-1 rounded text-sm hover:opacity-90"
        >
          Run
        </button>
        <button
          type="button"
          onClick={() => {
            setTable(INITIAL_STATE);
            setOutcome(null);
          }}
          className="text-xs px-3 py-1 rounded border border-line text-muted hover:text-accent"
        >
          Reset table
        </button>
      </div>

      <p className="text-sm text-heading min-h-6 mt-0 mb-3" role="status">
        {outcome === null && "Press Run to send the statement."}
        {outcome?.kind === "update" && (
          <>
            <code>executeUpdate()</code> returned{" "}
            <strong>{outcome.affected}</strong>{" "}
            {outcome.affected === 1 ? "row" : "rows"} affected
            {outcome.affected === 0 && " - no error, the WHERE just matched nothing"}
          </>
        )}
        {outcome?.kind === "query" && (
          <>
            <code>executeQuery()</code> returned a ResultSet with{" "}
            <strong>{outcome.rows.length}</strong>{" "}
            {outcome.rows.length === 1 ? "row" : "rows"}
          </>
        )}
      </p>

      {outcome?.kind === "query" && (
        <div className="mb-4">
          <p className="text-xs text-heading-alt mb-1">ResultSet</p>
          <Grid columns={outcome.columns} rows={outcome.rows} testId="result" />
        </div>
      )}

      <p className="text-xs text-heading-alt mb-1">
        Table <code>product</code> now
      </p>
      <Grid columns={COLUMNS} rows={table.rows.map(toCells)} testId="table" />
      <p className="text-xs text-muted mt-1 mb-0">
        Next generated id: {table.nextId}
      </p>
    </div>
  );
}

function Grid({
  columns,
  rows,
  testId,
}: {
  columns: string[];
  rows: (string | number | null)[][];
  testId: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="text-xs font-mono border border-line w-full" data-testid={testId}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} className="text-left px-2 py-1 border-b border-line text-heading-alt">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-2 py-1 text-muted">
                (no rows)
              </td>
            </tr>
          )}
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="px-2 py-1 border-b border-line">
                  {cell === null ? <em className="text-muted">NULL</em> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SqlExplorerDemo;
