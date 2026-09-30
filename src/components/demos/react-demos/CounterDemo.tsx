import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function CounterDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Every click updates <code>count</code> in state, and React re-renders
        this component with the new value automatically.
      </p>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setCount((c) => c - 1)}
          className="bg-surface border border-line text-heading w-10 h-10 rounded hover:border-accent transition-colors"
          aria-label="Decrement"
        >
          −
        </button>

        <span className="text-3xl font-bold text-heading-alt w-12 text-center tabular-nums">
          {count}
        </span>

        <button
          onClick={() => setCount((c) => c + 1)}
          className="bg-accent text-white w-10 h-10 rounded hover:opacity-90 transition-opacity"
          aria-label="Increment"
        >
          +
        </button>

        <button
          onClick={() => setCount(0)}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Reset
        </button>
      </div>

      <CodeBlock>{`const [count, setCount] = useState(0);

<button onClick={() => setCount(c => c + 1)}>+</button>`}</CodeBlock>
    </div>
  );
}

export default CounterDemo;
