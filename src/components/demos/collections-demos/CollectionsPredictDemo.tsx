import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const SCENARIOS = [
  {
    id: "no-hashcode",
    code: `class Point {
    int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }
}

Set<Point> points = new HashSet<>();
points.add(new Point(1, 2));
points.add(new Point(1, 2));
System.out.println(points.size());`,
    options: ["1", "2", "Compile error"],
    answer: "2",
    explanation:
      "Point does not override equals() and hashCode(), so each object is only equal to itself. A HashSet finds duplicates through those two methods, so both points are kept. Override both (or make Point a record) to get 1.",
  },
  {
    id: "immutable",
    code: `List<String> names = List.of("Ada", "Linus");
names.add("Grace");`,
    options: [
      "Adds Grace",
      "Throws UnsupportedOperationException",
      "Compile error",
    ],
    answer: "Throws UnsupportedOperationException",
    explanation:
      "List.of, Set.of and Map.of return immutable collections. The code compiles because the List interface has add(), but at runtime every modifying call throws. Wrap in new ArrayList<>(...) when you need a mutable copy.",
  },
  {
    id: "remove-in-loop",
    code: `List<Integer> n = new ArrayList<>(List.of(1, 2, 3, 4));
for (Integer i : n) {
    if (i == 2) n.remove(i);
}`,
    options: [
      "Removes 2 and finishes normally",
      "Throws ConcurrentModificationException",
      "Removes 2 and 3",
    ],
    answer: "Throws ConcurrentModificationException",
    explanation:
      "The for-each loop uses an iterator, which notices that the list was modified behind its back and fails fast on the next step. Use n.removeIf(i -> i == 2) or the iterator's own remove().",
  },
  {
    id: "remove-index",
    code: `List<Integer> l = new ArrayList<>(List.of(10, 20, 30));
l.remove(1);
System.out.println(l);`,
    options: ["[20, 30]", "[10, 30]", "[10, 20, 30]"],
    answer: "[10, 30]",
    explanation:
      "With an int argument, remove(int index) is chosen - it removes the element at index 1, which is 20. To remove the value 1 you would write l.remove(Integer.valueOf(1)).",
  },
  {
    id: "treeset-length",
    code: `Set<String> words =
    new TreeSet<>(Comparator.comparingInt(String::length));
words.add("cat");
words.add("dog");
words.add("bird");
System.out.println(words);`,
    options: ["[bird, cat, dog]", "[cat, bird]", "[cat, dog, bird]"],
    answer: "[cat, bird]",
    explanation:
      "A TreeSet decides 'duplicate' with its comparator, not equals(). \"dog\" has the same length as \"cat\", so compare() returns 0 and it is silently dropped.",
  },
  {
    id: "priority-queue",
    code: `PriorityQueue<Integer> pq = new PriorityQueue<>(List.of(5, 1, 3));
System.out.println(pq);`,
    options: ["[1, 3, 5]", "[1, 5, 3]", "[5, 1, 3]"],
    answer: "[1, 5, 3]",
    explanation:
      "A PriorityQueue is a heap, not a sorted list: only the head is guaranteed to be the smallest. Printing (or iterating) shows the internal array order. Call poll() repeatedly to get the elements in sorted order.",
  },
];

function CollectionsPredictDemo() {
  const [picks, setPicks] = useState<Record<string, string>>({});

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        The collections classes have a few well-known surprises. Predict what
        each snippet does.
      </p>

      <div className="space-y-4">
        {SCENARIOS.map((s) => {
          const pick = picks[s.id];
          return (
            <div key={s.id} className="border border-line rounded p-3">
              <CodeBlock>{s.code}</CodeBlock>
              <div className="flex flex-wrap gap-2 mt-2">
                {s.options.map((option) => {
                  const isPick = pick === option;
                  const isRight = pick && option === s.answer;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setPicks((p) => ({ ...p, [s.id]: option }))
                      }
                      className={`text-xs px-3 py-1 rounded border ${
                        isPick && isRight
                          ? "bg-green-500/20 border-green-500 text-green-600"
                          : isPick
                            ? "bg-red-500/20 border-red-500 text-red-600"
                            : "border-line text-muted hover:text-accent"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {pick && (
                <p className="text-xs text-muted mt-2 mb-0">
                  <strong>{s.answer}</strong> - {s.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CollectionsPredictDemo;
