import { useState } from "react";

const ITEMS = [
  {
    id: "primitive",
    label: "int count = 3;  (a local variable in a method)",
    answer: "Stack",
    explanation:
      "Primitives declared as local variables live directly in the method's stack frame - there's no object to point to.",
  },
  {
    id: "reference",
    label: 'String name = "Ada";  (the variable `name` itself)',
    answer: "Stack",
    explanation:
      "The variable is a reference and references are local variables too, so they sit on the stack - even though the String object it points to lives on the heap.",
  },
  {
    id: "object",
    label: 'new Customer("Ada")  (the object created by `new`)',
    answer: "Heap",
    explanation:
      "Every object created with `new` is allocated on the heap, no matter where the `new` expression appears.",
  },
  {
    id: "array",
    label: "int[] scores = new int[10];  (the array itself)",
    answer: "Heap",
    explanation:
      "Arrays are objects in Java, so the array's storage lives on the heap - only the `scores` reference variable is on the stack.",
  },
  {
    id: "field",
    label: "a `health` field inside a Player object",
    answer: "Heap",
    explanation:
      "Instance fields are stored as part of their object, so they live wherever that object lives - on the heap.",
  },
  {
    id: "frame",
    label: "the parameters of a method call in progress",
    answer: "Stack",
    explanation:
      "Each in-progress method call gets its own frame on the stack holding its parameters and local variables; the frame disappears when the method returns.",
  },
];

const OPTIONS = ["Stack", "Heap"];

function StackOrHeapDemo() {
  const [picks, setPicks] = useState({});
  const [checked, setChecked] = useState(false);

  const allPicked = ITEMS.every((item) => picks[item.id]);
  const score = ITEMS.filter((item) => picks[item.id] === item.answer).length;

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        For each one, decide where it actually lives at runtime: the stack or
        the heap.
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
              <p className="font-mono text-xs text-heading-alt mb-2">
                {item.label}
              </p>
              <div className="flex gap-2">
                {OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setChecked(false);
                      setPicks((p) => ({ ...p, [item.id]: option }));
                    }}
                    className={`text-xs px-3 py-1 rounded border ${
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
                <p className="text-xs text-muted mt-2 mb-0">
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

export default StackOrHeapDemo;
