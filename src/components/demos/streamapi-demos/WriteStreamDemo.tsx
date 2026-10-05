import { useState } from "react";

const SCENARIOS = [
  {
    id: "adults",
    task: "From a List<Person>, get the names of everyone aged 18 or over, in alphabetical order.",
    options: [
      "people.stream().filter(p -> p.age() >= 18).map(Person::name).sorted().toList()",
      "people.stream().filter(p -> p.age() >= 18).sorted().toList()",
      "people.stream().map(Person::name).filter(p -> p.age() >= 18).toList()",
    ],
    answer:
      "people.stream().filter(p -> p.age() >= 18).map(Person::name).sorted().toList()",
    explanation:
      "Filter on the Person first, then map to the name, then sort the Strings. The second option returns Persons and sorted() would throw ClassCastException unless Person is Comparable. The third does not compile: after map the elements are Strings, which have no age().",
  },
  {
    id: "sum",
    task: "Add up the salary of every Employee (salary is an int).",
    options: [
      "employees.stream().mapToInt(Employee::salary).sum()",
      "employees.stream().map(Employee::salary).sum()",
      "employees.stream().count()",
    ],
    answer: "employees.stream().mapToInt(Employee::salary).sum()",
    explanation:
      "sum() exists on IntStream, LongStream and DoubleStream - get one with mapToInt. A plain Stream<Integer> has no sum(), and count() only counts the elements.",
  },
  {
    id: "group",
    task: "Count how many employees work in each department.",
    options: [
      "employees.stream().collect(Collectors.groupingBy(Employee::department, Collectors.counting()))",
      "employees.stream().collect(Collectors.toMap(Employee::department, e -> 1))",
      "employees.stream().collect(Collectors.groupingBy(Employee::department)).size()",
    ],
    answer:
      "employees.stream().collect(Collectors.groupingBy(Employee::department, Collectors.counting()))",
    explanation:
      "groupingBy with a downstream counting() collector gives a Map<String, Long>. The toMap version throws IllegalStateException on the second employee of a department (duplicate key) unless you add a merge function. The last option only counts how many departments there are.",
  },
  {
    id: "join",
    task: "Produce the single String \"Ann, Bob, Cy\" from a List<String> of names.",
    options: [
      "names.stream().collect(Collectors.joining(\", \"))",
      "names.stream().toList().toString()",
      "names.stream().reduce(\", \")",
    ],
    answer: "names.stream().collect(Collectors.joining(\", \"))",
    explanation:
      "Collectors.joining is made for this and handles the separators (plus an optional prefix and suffix). toString() on a List adds square brackets, and reduce(\", \") treats the String as a binary operator, so it does not even compile.",
  },
  {
    id: "flatten",
    task: "Each Order has a List<Item> via items(). Get a Stream<Item> of every item in every order.",
    options: [
      "orders.stream().flatMap(o -> o.items().stream())",
      "orders.stream().map(o -> o.items().stream())",
      "orders.stream().map(Order::items)",
    ],
    answer: "orders.stream().flatMap(o -> o.items().stream())",
    explanation:
      "flatMap merges the per-order streams into one. The map versions give a Stream<Stream<Item>> and a Stream<List<Item>> - still one element per order.",
  },
];

function WriteStreamDemo() {
  const [picks, setPicks] = useState<Record<string, string>>({});

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Pick the pipeline that does what the requirement says. Only one of
        the three does it correctly.
      </p>

      <div className="space-y-4">
        {SCENARIOS.map((s) => {
          const pick = picks[s.id];
          return (
            <div key={s.id} className="border border-line rounded p-3">
              <p className="text-sm text-heading-alt mb-2 text-left">{s.task}</p>
              <div className="space-y-1">
                {s.options.map((option) => {
                  const isPick = pick === option;
                  const isRight = option === s.answer;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setPicks((p) => ({ ...p, [s.id]: option }))
                      }
                      className={`block w-full text-left font-mono text-xs px-3 py-1 rounded border break-all ${
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
                <p className="text-xs text-muted mt-2 mb-0 text-left">
                  <strong>{pick === s.answer ? "Correct." : "Not quite."}</strong>{" "}
                  {s.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WriteStreamDemo;
