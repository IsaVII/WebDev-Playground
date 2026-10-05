import { useState } from "react";

const ITEMS = [
  {
    id: "filter",
    label: "Keep only the orders worth more than 100",
    answer: "filter",
    explanation:
      "filter takes a Predicate and lets through only the elements it accepts. The elements themselves are unchanged and there are usually fewer of them.",
  },
  {
    id: "map",
    label: "Turn each order into its total, one number per order",
    answer: "map",
    explanation:
      "map applies a Function to every element and produces exactly one output per input - the count stays the same, the type may change (use mapToInt to get an IntStream).",
  },
  {
    id: "flatmap",
    label: "Each order holds a list of items; get one flat stream of all the items",
    answer: "flatMap",
    explanation:
      "map would give a stream of lists. flatMap takes a function that returns a stream per element and joins them all into one, so one element can become zero, one or many.",
  },
  {
    id: "distinct",
    label: "Drop repeated customer names, keeping the first of each",
    answer: "distinct",
    explanation:
      "distinct uses equals() and hashCode() to remove duplicates, keeping the first occurrence and the original order.",
  },
  {
    id: "sorted",
    label: "Put the orders in date order",
    answer: "sorted",
    explanation:
      "sorted() uses the natural order (Comparable); sorted(comparator) uses any order you give it. It has to see every element before it can emit the first.",
  },
  {
    id: "limit",
    label: "Take only the first 10 results, and stop reading the source after that",
    answer: "limit",
    explanation:
      "limit(n) is short-circuiting: once n elements have passed, the rest of the source is never read. It is what makes Stream.iterate or generate usable.",
  },
  {
    id: "reduce",
    label: "Combine all the totals into one single number",
    answer: "reduce",
    explanation:
      "reduce repeatedly combines two values into one - reduce(0, Integer::sum) adds everything up. For sums on primitive streams, mapToInt(...).sum() is simpler and faster.",
  },
  {
    id: "anymatch",
    label: "Find out whether at least one order is overdue, stopping at the first one found",
    answer: "anyMatch",
    explanation:
      "anyMatch(predicate) returns a boolean and short-circuits on the first match. allMatch and noneMatch work the same way for the other two questions.",
  },
];

const OPTIONS = [
  "filter",
  "map",
  "flatMap",
  "distinct",
  "sorted",
  "limit",
  "reduce",
  "anyMatch",
];

function PickOperationDemo() {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const allPicked = ITEMS.every((item) => picks[item.id]);
  const score = ITEMS.filter((item) => picks[item.id] === item.answer).length;

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        For each requirement, pick the stream operation that does it. Each
        operation is the right answer exactly once.
      </p>

      <div className="space-y-3">
        {ITEMS.map((item) => {
          const right = checked && picks[item.id] === item.answer;
          const wrong = checked && picks[item.id] && picks[item.id] !== item.answer;
          return (
            <div
              key={item.id}
              className={`rounded border p-3 ${
                right
                  ? "border-green-500 bg-green-500/10"
                  : wrong
                    ? "border-red-500 bg-red-500/10"
                    : "border-line"
              }`}
            >
              <p className="text-xs text-heading-alt mb-2">{item.label}</p>
              <div className="flex flex-wrap gap-2">
                {OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setChecked(false);
                      setPicks((p) => ({ ...p, [item.id]: option }));
                    }}
                    className={`font-mono text-xs px-3 py-1 rounded border ${
                      picks[item.id] === option
                        ? "bg-accent text-white border-accent"
                        : "border-line text-muted hover:text-accent"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {checked && wrong && (
                <p className="text-xs text-muted mt-2 mb-0 text-left">
                  → {item.answer}: {item.explanation}
                </p>
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
            {score} / {ITEMS.length}
          </span>
        )}
      </div>
    </div>
  );
}

export default PickOperationDemo;
