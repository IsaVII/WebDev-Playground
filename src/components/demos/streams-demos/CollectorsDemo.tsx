import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const PEOPLE = [
  { name: "Ada", dept: "Eng", age: 32 },
  { name: "Alan", dept: "Eng", age: 28 },
  { name: "Grace", dept: "Ops", age: 41 },
  { name: "Linus", dept: "Eng", age: 45 },
  { name: "Radia", dept: "Ops", age: 29 },
];

const COLLECTORS = {
  "groupingBy(dept)": {
    code: `people.stream().collect(
    groupingBy(Person::dept))`,
    resultType: "Map<String, List<Person>>",
    run: () => {
      const m = {};
      for (const p of PEOPLE) (m[p.dept] ??= []).push(p.name);
      return Object.entries(m)
        .map(([k, v]) => `${k} = [${v.join(", ")}]`)
        .join("\n");
    },
  },
  "partitioningBy(age >= 30)": {
    code: `people.stream().collect(
    partitioningBy(p -> p.age() >= 30))`,
    resultType: "Map<Boolean, List<Person>>",
    run: () => {
      const t = PEOPLE.filter((p) => p.age >= 30).map((p) => p.name);
      const f = PEOPLE.filter((p) => p.age < 30).map((p) => p.name);
      return `true  = [${t.join(", ")}]\nfalse = [${f.join(", ")}]`;
    },
  },
  "toMap(name -> age)": {
    code: `people.stream().collect(
    toMap(Person::name, Person::age))`,
    resultType: "Map<String, Integer>",
    run: () =>
      PEOPLE.map((p) => `${p.name} = ${p.age}`).join("\n"),
  },
  "groupingBy(dept, counting())": {
    code: `people.stream().collect(
    groupingBy(Person::dept, counting()))`,
    resultType: "Map<String, Long>",
    run: () => {
      const m = {};
      for (const p of PEOPLE) m[p.dept] = (m[p.dept] ?? 0) + 1;
      return Object.entries(m)
        .map(([k, v]) => `${k} = ${v}`)
        .join("\n");
    },
  },
};

function CollectorsDemo() {
  const [key, setKey] = useState("groupingBy(dept)");
  const active = COLLECTORS[key];

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Five people, four collectors. Each turns the stream back into a
        different <code>Map</code> - notice how a downstream collector
        (<code>counting()</code>) changes the value type.
      </p>

      <CodeBlock>{`List<Person> people = List.of(
${PEOPLE.map((p) => `    new Person("${p.name}", "${p.dept}", ${p.age})`).join(",\n")}
);`}</CodeBlock>

      <div className="flex flex-wrap gap-2 my-4">
        {Object.keys(COLLECTORS).map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setKey(name)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              key === name
                ? "bg-accent text-white"
                : "bg-surface text-muted hover:text-heading"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <CodeBlock>{active.code}</CodeBlock>

      <div className="bg-surface rounded p-4 mt-3 border border-line text-sm">
        <p className="text-xs text-subtle mb-1">
          returns <span className="font-mono text-accent">{active.resultType}</span>
        </p>
        <pre className="font-mono text-heading-alt whitespace-pre-wrap m-0">
          {active.run()}
        </pre>
      </div>
    </div>
  );
}

export default CollectorsDemo;
