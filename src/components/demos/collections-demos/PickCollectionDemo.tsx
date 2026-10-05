import { useState } from "react";

const ITEMS = [
  {
    id: "list",
    label: "Keep items in the order they were added, with fast access by index",
    answer: "ArrayList",
    explanation:
      "ArrayList is backed by an array, so get(i) is instant and appending is cheap. It is the default List - LinkedList is rarely faster in practice.",
  },
  {
    id: "seen",
    label: "Remember which user ids have already been seen. No duplicates, order does not matter",
    answer: "HashSet",
    explanation:
      "A HashSet rejects duplicates and checks membership in roughly constant time using hashCode() and equals().",
  },
  {
    id: "dedupe",
    label: "Remove duplicates from a list but keep the order the items first appeared in",
    answer: "LinkedHashSet",
    explanation:
      "LinkedHashSet is a HashSet that also remembers insertion order, so new LinkedHashSet<>(list) dedupes without reshuffling.",
  },
  {
    id: "sorted",
    label: "A collection of unique words that must always come out alphabetically",
    answer: "TreeSet",
    explanation:
      "TreeSet keeps its elements sorted (by compareTo or a Comparator) and has no duplicates. Operations cost O(log n) instead of O(1).",
  },
  {
    id: "lookup",
    label: "Look up a customer by id as fast as possible",
    answer: "HashMap",
    explanation:
      "HashMap gives roughly constant-time get and put by key. It makes no promise about iteration order.",
  },
  {
    id: "wordcount",
    label: "Word counts that must be printed in alphabetical key order",
    answer: "TreeMap",
    explanation:
      "TreeMap keeps its keys sorted, so iterating it (or its keySet) walks the keys alphabetically. It also offers firstKey, floorKey, subMap and similar.",
  },
  {
    id: "stack",
    label: "A stack (push and pop) or a plain first-in-first-out queue",
    answer: "ArrayDeque",
    explanation:
      "ArrayDeque is the modern choice for both stacks and queues. The old Stack class is synchronized legacy, and LinkedList is slower and uses more memory.",
  },
  {
    id: "priority",
    label: "Always hand out the task with the highest priority next, whatever order tasks arrive in",
    answer: "PriorityQueue",
    explanation:
      "PriorityQueue is a heap: poll() always returns the smallest element according to its Comparator. Only the head is guaranteed to be in order, not the iteration.",
  },
];

const OPTIONS = [
  "ArrayList",
  "HashSet",
  "LinkedHashSet",
  "TreeSet",
  "HashMap",
  "TreeMap",
  "ArrayDeque",
  "PriorityQueue",
];

function PickCollectionDemo() {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const allPicked = ITEMS.every((item) => picks[item.id]);
  const score = ITEMS.filter((item) => picks[item.id] === item.answer).length;

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        For each requirement, pick the collection class that fits best. Each
        class is the right answer exactly once.
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

export default PickCollectionDemo;
