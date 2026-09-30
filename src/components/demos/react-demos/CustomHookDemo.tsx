import { useState } from "react";
import CodeBlock from "../../CodeBlock";

// A custom hook is just a function that calls other hooks and follows the
// "useSomething" naming convention - the stateful logic lives here once,
// instead of being copy-pasted into every component that needs it.
function useCounter(initial = 0, step = 1) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount((c) => c + step);
  const decrement = () => setCount((c) => c - step);
  const reset = () => setCount(initial);
  return { count, increment, decrement, reset };
}

function CounterWidget({ label, step }) {
  const { count, increment, decrement, reset } = useCounter(0, step);

  return (
    <div className="bg-surface rounded p-4 border border-line flex-1 min-w-[160px]">
      <p className="text-sm text-subtle mb-2">
        {label} (step {step})
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={decrement}
          className="bg-surface-alt border border-line text-heading w-8 h-8 rounded hover:border-accent transition-colors"
          aria-label={`Decrement ${label}`}
        >
          −
        </button>
        <span className="text-xl font-bold text-heading-alt w-8 text-center tabular-nums">
          {count}
        </span>
        <button
          onClick={increment}
          className="bg-accent text-white w-8 h-8 rounded hover:opacity-90 transition-opacity"
          aria-label={`Increment ${label}`}
        >
          +
        </button>
        <button
          onClick={reset}
          className="text-xs text-subtle hover:text-accent transition-colors ml-auto"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function CustomHookDemo() {
  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Both widgets below call the same <code>useCounter</code> hook, each with
        a different <code>step</code>. Every call gets its own independent{" "}
        <code>count</code>, the same way two calls to <code>useState</code>{" "}
        inside one component never share a value.
      </p>

      <div className="flex flex-wrap gap-4 mb-4">
        <CounterWidget label="Counter A" step={1} />
        <CounterWidget label="Counter B" step={5} />
      </div>

      <CodeBlock>{`function useCounter(initial = 0, step = 1) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount((c) => c + step);
  const decrement = () => setCount((c) => c - step);
  const reset = () => setCount(initial);
  return { count, increment, decrement, reset };
}

const a = useCounter(0, 1);
const b = useCounter(0, 5); // independent from a`}</CodeBlock>
    </div>
  );
}

export default CustomHookDemo;
