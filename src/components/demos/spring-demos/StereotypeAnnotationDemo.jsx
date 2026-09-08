import { useState } from "react";

const CLASSES = [
  {
    id: "web",
    label: "class CustomerEndpoints { maps URLs, returns JSON }",
    answer: "@RestController",
  },
  {
    id: "logic",
    label: "class BillingRules { runs the business logic, @Transactional }",
    answer: "@Service",
  },
  {
    id: "data",
    label: "interface OrderStore extends JpaRepository<Order, Long>",
    answer: "@Repository",
  },
  {
    id: "config",
    label: "class AppConfig { @Bean methods that build objects by hand }",
    answer: "@Configuration",
  },
  {
    id: "misc",
    label: "class SlugGenerator { a helper bean with no clear layer }",
    answer: "@Component",
  },
];

const OPTIONS = [
  "@RestController",
  "@Service",
  "@Repository",
  "@Configuration",
  "@Component",
];

function StereotypeAnnotationDemo() {
  const [picks, setPicks] = useState({});
  const [checked, setChecked] = useState(false);

  const allPicked = CLASSES.every((c) => picks[c.id]);
  const score = CLASSES.filter((c) => picks[c.id] === c.answer).length;

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Every one of these is <code>@Component</code> under the hood - but the
        specific stereotype signals the class&apos;s role (and{" "}
        <code>@Repository</code> also translates persistence exceptions).
        Match each class to the annotation it should carry.
      </p>

      <div className="space-y-3">
        {CLASSES.map((c) => {
          const right = checked && picks[c.id] === c.answer;
          const wrong = checked && picks[c.id] && picks[c.id] !== c.answer;
          return (
            <div
              key={c.id}
              className={`rounded border p-3 ${
                right
                  ? "border-green-500 bg-green-500/10"
                  : wrong
                    ? "border-red-500 bg-red-500/10"
                    : "border-line"
              }`}
            >
              <p className="font-mono text-xs text-heading-alt mb-2">{c.label}</p>
              <select
                value={picks[c.id] || ""}
                onChange={(e) => {
                  setChecked(false);
                  setPicks((p) => ({ ...p, [c.id]: e.target.value }));
                }}
                className="bg-surface border border-line rounded px-2 py-1 text-sm"
              >
                <option value="">choose...</option>
                {OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              {checked && wrong && (
                <span className="text-xs text-muted ml-2">
                  → {c.answer}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={!allPicked}
          className="bg-accent text-white px-4 py-1 rounded text-sm hover:opacity-90 disabled:opacity-40"
        >
          Check
        </button>
        {checked && (
          <span className="text-sm font-semibold text-heading">
            {score} / {CLASSES.length}
          </span>
        )}
      </div>
    </div>
  );
}

export default StereotypeAnnotationDemo;
