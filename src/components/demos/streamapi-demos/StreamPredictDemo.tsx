import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const SCENARIOS = [
  {
    id: "lazy",
    code: `Stream.of(1, 2, 3)
    .peek(x -> System.out.print("saw " + x + " "))
    .map(x -> x * 2);`,
    options: ["saw 1 saw 2 saw 3", "Nothing is printed", "Compile error"],
    answer: "Nothing is printed",
    explanation:
      "Intermediate operations are lazy: they only describe the pipeline. Without a terminal operation (count, toList, forEach...) no element is ever pulled through, so peek never runs.",
  },
  {
    id: "reuse",
    code: `Stream<String> s = List.of("x", "y").stream();
s.count();
s.forEach(System.out::println);`,
    options: ["x then y", "Prints nothing", "Throws IllegalStateException"],
    answer: "Throws IllegalStateException",
    explanation:
      "A stream can be consumed once. After the terminal operation count() it is closed, and using it again throws IllegalStateException (\"stream has already been operated upon or closed\"). Call list.stream() again for a fresh one.",
  },
  {
    id: "short",
    code: `Stream.of(1, 2, 3, 4)
    .filter(x -> {
        System.out.print(x + " ");
        return x % 2 == 0;
    })
    .findFirst();`,
    options: ["1 2 3 4", "1 2", "2"],
    answer: "1 2",
    explanation:
      "Elements travel through the pipeline one at a time, and findFirst stops as soon as it has its answer. 1 fails the filter, 2 passes - and 3 and 4 are never looked at.",
  },
  {
    id: "range",
    code: `System.out.println(IntStream.range(1, 5).sum());`,
    options: ["15", "10", "9"],
    answer: "10",
    explanation:
      "range(start, end) excludes the end: it is 1+2+3+4. rangeClosed(1, 5) includes it and gives 15.",
  },
  {
    id: "tomap",
    code: `Stream.of("a", "b", "a")
    .collect(Collectors.toMap(s -> s, s -> 1));`,
    options: [
      "{a=1, b=1}",
      "{a=2, b=1}",
      "Throws IllegalStateException (duplicate key a)",
    ],
    answer: "Throws IllegalStateException (duplicate key a)",
    explanation:
      "toMap does not merge duplicate keys on its own. Pass a merge function as the third argument - toMap(s -> s, s -> 1, Integer::sum) gives {a=2, b=1} - or use groupingBy with counting().",
  },
  {
    id: "tolist",
    code: `List<Integer> r = Stream.of(3, 1, 2).sorted().toList();
r.add(4);`,
    options: [
      "r becomes [1, 2, 3, 4]",
      "Throws UnsupportedOperationException",
      "Compile error",
    ],
    answer: "Throws UnsupportedOperationException",
    explanation:
      "Stream.toList() (Java 16+) returns an unmodifiable list. collect(Collectors.toList()) gives an ordinary ArrayList you may change - but you rarely need to.",
  },
  {
    id: "source",
    code: `List<String> names = new ArrayList<>(List.of("ann", "bob"));
names.stream().map(String::toUpperCase).toList();
System.out.println(names);`,
    options: ["[ANN, BOB]", "[ann, bob]", "[]"],
    answer: "[ann, bob]",
    explanation:
      "A stream never changes its source. map produced a new list of upper-case strings that was thrown away - names is untouched.",
  },
];

function StreamPredictDemo() {
  const [picks, setPicks] = useState<Record<string, string>>({});

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Streams have rules that surprise people at first. Predict what each
        snippet does.
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
                <p className="text-xs text-muted mt-2 mb-0 text-left">
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

export default StreamPredictDemo;
