import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const user = { name: "Isa", role: "admin", theme: "dark" };
const coords = [10, 20, 30];

function sum(first, ...rest) {
  return `first = ${first}, rest = [${rest.join(", ")}]`;
}

// These all run against the real objects/arrays above.
const EXAMPLES = {
  object: {
    label: "Object destructuring",
    run: () => {
      const { name, role } = user;
      return `name = "${name}", role = "${role}"`;
    },
    code: `const { name, role } = user;\n// name = "${user.name}", role = "${user.role}"`,
  },
  array: {
    label: "Array destructuring",
    run: () => {
      const [x, y] = coords;
      return `x = ${x}, y = ${y}`;
    },
    code: `const [x, y] = coords;\n// x = ${coords[0]}, y = ${coords[1]}`,
  },
  rest: {
    label: "Rest parameters",
    run: () => sum(1, 2, 3, 4),
    code: `function sum(first, ...rest) { ... }\nsum(1, 2, 3, 4);\n// first = 1, rest = [2, 3, 4]`,
  },
  spread: {
    label: "Spread merge",
    run: () => JSON.stringify({ ...user, theme: "light" }),
    code: `const merged = { ...user, theme: "light" };\n// ${JSON.stringify({ ...user, theme: "light" })}`,
  },
};

function DestructuringDemo() {
  const [key, setKey] = useState("object");
  const current = EXAMPLES[key];

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Destructuring pulls values out by position or name; spread and rest use
        the same <code>...</code> syntax to go the other way - expanding a value
        out or collecting several arguments into one array.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {Object.entries(EXAMPLES).map(([k, ex]) => (
          <button
            key={k}
            onClick={() => setKey(k)}
            className={`px-3 py-1.5 rounded border text-sm font-mono transition-colors ${
              key === k
                ? "bg-accent border-accent text-white"
                : "bg-surface border-line text-heading hover:border-accent"
            }`}
          >
            {ex.label}
          </button>
        ))}
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm">
        <p className="text-heading-alt">{current.run()}</p>
      </div>

      <CodeBlock>{current.code}</CodeBlock>
    </div>
  );
}

export default DestructuringDemo;
