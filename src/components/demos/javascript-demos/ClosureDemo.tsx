import { useState } from "react";
import CodeBlock from "../../CodeBlock";

// Each call to createCounter() gets its own private `count` - nothing
// outside the returned function can read or set it directly.
function createCounter() {
  let count = 0;
  return () => ++count;
}

function ClosureDemo() {
  const [counters] = useState(() => [createCounter(), createCounter()]);
  const [values, setValues] = useState([0, 0]);

  const bump = (index) => {
    setValues((v) =>
      v.map((val, i) => (i === index ? counters[index]() : val)),
    );
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Every call to <code>createCounter()</code> closes over its own{" "}
        <code>count</code> variable. Bump each counter below and watch them stay
        completely independent of one another.
      </p>

      <div className="flex flex-wrap items-center gap-6 mb-4">
        {values.map((val, i) => (
          <div
            key={i}
            className="bg-surface rounded p-4 border border-line text-center"
          >
            <p className="text-xs text-muted mb-2">counter {i + 1}</p>
            <p className="text-2xl font-mono text-heading-alt mb-3">{val}</p>
            <button
              onClick={() => bump(i)}
              className="bg-accent text-white px-3 py-1.5 rounded hover:opacity-90 transition-opacity text-sm"
            >
              +1
            </button>
          </div>
        ))}
      </div>

      <CodeBlock>{`function createCounter() {
  let count = 0;
  return () => ++count; // closes over count
}

const a = createCounter();
const b = createCounter();
a(); a(); // 1, 2
b();      // 1 - a's count never touched b's`}</CodeBlock>
    </div>
  );
}

export default ClosureDemo;
