import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function TemplateLiteralDemo() {
  const [name, setName] = useState("Isa");
  const [count, setCount] = useState(3);

  const message = `Hey ${name}, you have ${count} task${count === 1 ? "" : "s"} left.`;

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Template literals embed real expressions with <code>${"{...}"}</code> -
        edit the fields below and the string rebuilds itself live, including the
        small ternary that picks singular vs plural.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <label className="text-sm text-muted flex items-center gap-2">
          name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-surface border border-line rounded px-2 py-1 text-heading font-mono text-sm w-28"
          />
        </label>
        <label className="text-sm text-muted flex items-center gap-2">
          count
          <input
            type="number"
            min="0"
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 0)}
            className="bg-surface border border-line rounded px-2 py-1 text-heading font-mono text-sm w-20"
          />
        </label>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm">
        <p className="text-heading-alt">{message}</p>
      </div>

      <CodeBlock>{`const message = \`Hey \${name}, you have \${count} task\${count === 1 ? "" : "s"} left.\`;
// "${message}"`}</CodeBlock>
    </div>
  );
}

export default TemplateLiteralDemo;
