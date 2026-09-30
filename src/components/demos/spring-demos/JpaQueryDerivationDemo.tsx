import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const PRESETS = [
  "findByEmail",
  "findByLastNameAndAgeGreaterThan",
  "findByStatusOrderByCreatedAtDesc",
  "findByActiveTrueAndNameContainingIgnoreCase",
  "countByStatus",
  "findTop3ByOrderByTotalDesc",
];

const KEYWORDS = [
  ["And", "condition && condition"],
  ["Or", "condition || condition"],
  ["GreaterThan / LessThan", "field > ?  /  field < ?"],
  ["Between", "field between ? and ?"],
  ["Like / Containing", "field like %?%"],
  ["IgnoreCase", "lower(field) = lower(?)"],
  ["True / False", "field = true / false"],
  ["OrderBy...Asc/Desc", "order by field"],
  ["Top / First N", "limit N"],
];

// Very small parser: turn a derived-query method name into rough JPQL.
function derive(name) {
  const m = name.match(/^(find|read|get|query|count|exists)(\w*?)By(.+)$/);
  if (!m) {
    return {
      ok: false,
      msg: "Not a derived query - must be find/read/get/query/count/exists + 'By' + properties.",
    };
  }
  const [, verb, distinctOrTop, rest] = m;
  let body = rest;
  let orderBy = "";
  const ob = body.match(/(.*)OrderBy(.+)$/);
  if (ob) {
    body = ob[1];
    orderBy = ob[2]
      .replace(/(Asc|Desc)/g, (d) => ` ${d.toLowerCase()}`)
      .replace(/([a-z])([A-Z])/g, "$1, $2")
      .toLowerCase();
  }
  const conditions = body
    .split(/And|Or/)
    .filter(Boolean)
    .map((part) =>
      part
        .replace(/GreaterThan/, " > ?")
        .replace(/LessThan/, " < ?")
        .replace(/Containing/, " like %?%")
        .replace(/IgnoreCase/, "")
        .replace(/True/, " = true")
        .replace(/False/, " = false")
        .replace(/([a-z])([A-Z])/g, "$1.$2")
        .toLowerCase(),
    );
  const connector = body.includes("Or") ? " or " : " and ";
  const where = conditions.length
    ? `\nwhere ${conditions.map((c) => (/[<>?=]/.test(c) ? c : `${c} = ?`)).join(connector)}`
    : "";
  const select = verb === "count" ? "select count(e)" : "select e";
  const limit = /^Top(\d+)|^First(\d+)/.exec(distinctOrTop);
  return {
    ok: true,
    jpql:
      `${select} from Entity e${where}` +
      (orderBy ? `\norder by ${orderBy}` : "") +
      (limit ? `\n-- + limit ${limit[1] || limit[2]}` : ""),
  };
}

function JpaQueryDerivationDemo() {
  const [name, setName] = useState("findByLastNameAndAgeGreaterThan");
  const result = derive(name);

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Spring Data parses a repository method <em>name</em> into a query at
        startup. Type one and see the JPQL it stands for.
      </p>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        spellCheck={false}
        className="w-full bg-surface border border-line rounded px-3 py-2 font-mono text-sm mb-3"
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setName(p)}
            className="px-2 py-1 rounded text-xs bg-surface text-muted hover:text-heading font-mono"
          >
            {p}
          </button>
        ))}
      </div>

      {result.ok ? (
        <CodeBlock>{result.jpql}</CodeBlock>
      ) : (
        <p className="text-sm text-red-500">{result.msg}</p>
      )}

      <p className="text-xs uppercase tracking-wide text-subtle mt-4 mb-1">
        Keyword cheat sheet
      </p>
      <ul className="text-xs text-muted grid gap-1 sm:grid-cols-2 list-none p-0 m-0">
        {KEYWORDS.map(([k, v]) => (
          <li key={k}>
            <span className="font-mono text-heading-alt">{k}</span> - {v}
          </li>
        ))}
      </ul>
      <p className="text-xs text-subtle mt-3">
        When the name gets longer than this, switch to
        <code> @Query(&quot;select ...&quot;)</code>.
      </p>
    </div>
  );
}

export default JpaQueryDerivationDemo;
