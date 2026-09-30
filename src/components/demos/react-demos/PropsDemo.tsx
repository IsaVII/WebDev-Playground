import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function Greeting({ name, color }) {
  return (
    <p className="text-xl" style={{ color }}>
      Hello, <strong>{name || "friend"}</strong>! 👋
    </p>
  );
}

function PropsDemo() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#3b82f6");

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        <code>Greeting</code> never touches this state directly, it only reads
        the <code>name</code> and <code>color</code> props it's handed by its
        parent.
      </p>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="bg-surface border border-line rounded px-3 py-2 text-heading flex-1 min-w-[140px]"
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-12 h-10 rounded border border-line cursor-pointer"
          aria-label="Pick a color"
        />
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line">
        <Greeting name={name} color={color} />
      </div>

      <CodeBlock>{`function Greeting({ name, color }) {
  return <p style={{ color }}>Hello, {name}!</p>;
}

<Greeting name={name} color={color} />`}</CodeBlock>
    </div>
  );
}

export default PropsDemo;
