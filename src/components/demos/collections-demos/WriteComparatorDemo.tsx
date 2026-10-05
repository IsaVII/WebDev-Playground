import { useState } from "react";

const SCENARIOS = [
  {
    id: "oldest",
    task: "Sort people by age, oldest first.",
    options: [
      "Comparator.comparingInt(Person::age)",
      "Comparator.comparingInt(Person::age).reversed()",
      "Comparator.comparing(Person::name)",
    ],
    answer: "Comparator.comparingInt(Person::age).reversed()",
    explanation:
      "comparingInt sorts ascending (youngest first); .reversed() flips it. The first option is the opposite order, and the third sorts by something else entirely.",
  },
  {
    id: "ties",
    task: "Sort by last name, and when last names are equal, by first name.",
    options: [
      "Comparator.comparing(Person::last).thenComparing(Person::first)",
      "Comparator.comparing(Person::first).thenComparing(Person::last)",
      "Comparator.comparing(Person::last)",
    ],
    answer: "Comparator.comparing(Person::last).thenComparing(Person::first)",
    explanation:
      "thenComparing is only consulted when the earlier comparator says 0, so the order of the calls is the order of priority. The last option leaves people with the same last name in whatever order they started in.",
  },
  {
    id: "overflow",
    task: "Compare two scores that can be any int, including very large or negative ones.",
    options: [
      "(a, b) -> a.score() - b.score()",
      "Integer.compare(a.score(), b.score())",
      "(a, b) -> a.score() > b.score() ? 1 : -1",
    ],
    answer: "Integer.compare(a.score(), b.score())",
    explanation:
      "Subtraction can overflow (Integer.MAX_VALUE - -1 is a negative number) and gives the wrong sign. The ternary never returns 0 for equal scores, which breaks the Comparator contract and can make sort throw. Integer.compare, or comparingInt, is always right.",
  },
  {
    id: "nulls",
    task: "Sort by name alphabetically, with people who have no name (null) at the end.",
    options: [
      "Comparator.comparing(Person::name)",
      "Comparator.comparing(Person::name, Comparator.nullsLast(Comparator.naturalOrder()))",
      "Comparator.comparing(Person::name).reversed()",
    ],
    answer:
      "Comparator.comparing(Person::name, Comparator.nullsLast(Comparator.naturalOrder()))",
    explanation:
      "A plain comparing(...) calls compareTo on the key and throws NullPointerException on null. nullsLast wraps the key comparator so null is handled explicitly - it takes the key comparator as a second argument.",
  },
  {
    id: "treeset",
    task: "Keep people sorted by name in a TreeSet, but two different people who share a name (different emails) must both stay.",
    options: [
      "new TreeSet<>(Comparator.comparing(Person::name))",
      "new TreeSet<>(Comparator.comparing(Person::name).thenComparing(Person::email))",
      "new HashSet<>(Comparator.comparing(Person::name))",
    ],
    answer:
      "new TreeSet<>(Comparator.comparing(Person::name).thenComparing(Person::email))",
    explanation:
      "A TreeSet treats compare() == 0 as 'the same element' and silently drops the second one - it never calls equals(). Adding email as a tiebreaker makes the two people different. HashSet has no constructor taking a Comparator and is not sorted anyway.",
  },
];

function WriteComparatorDemo() {
  const [picks, setPicks] = useState<Record<string, string>>({});

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Pick the code that does what the requirement says. A <code>Person</code>{" "}
        has <code>name</code>, <code>first</code>, <code>last</code>,{" "}
        <code>email</code>, <code>age</code> and <code>score</code>.
      </p>

      <div className="space-y-4">
        {SCENARIOS.map((s) => {
          const pick = picks[s.id];
          return (
            <div key={s.id} className="border border-line rounded p-3">
              <p className="text-sm text-heading-alt mb-2">{s.task}</p>
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
                      className={`block w-full text-left font-mono text-xs px-3 py-1 rounded border ${
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

export default WriteComparatorDemo;
