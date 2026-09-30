import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function PerformancePatternsDemo() {
  const [updates, setUpdates] = useState(0);
  const [batchedUpdates, setBatchedUpdates] = useState(0);

  const multipleDispatches = () => {
    // Simulate 3 separate dispatches (3 re-renders)
    setUpdates((u) => u + 1);
    setTimeout(() => setUpdates((u) => u + 1), 10);
    setTimeout(() => setUpdates((u) => u + 1), 20);
  };

  const batchedDispatches = () => {
    // Simulate batched update (1 re-render)
    setBatchedUpdates((u) => u + 3);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Redux re-renders components on every dispatch. Use batching, memoized
        selectors, and proper component structure to minimize unnecessary
        renders and keep your app fast.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-surface border border-line rounded p-4">
          <div className="text-sm mb-3 text-accent">Multiple Dispatches:</div>
          <div className="text-3xl font-bold text-heading-alt mb-3 tabular-nums">
            {updates}
          </div>
          <button
            onClick={multipleDispatches}
            className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors w-full"
          >
            +3 (separate)
          </button>
          <div className="text-xs text-muted mt-2">
            Triggers 3 separate re-renders
          </div>
        </div>

        <div className="bg-surface border border-line rounded p-4">
          <div className="text-sm mb-3 text-accent">Batched Updates:</div>
          <div className="text-3xl font-bold text-green-400 mb-3 tabular-nums">
            {batchedUpdates}
          </div>
          <button
            onClick={batchedDispatches}
            className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity w-full"
          >
            +3 (batched)
          </button>
          <div className="text-xs text-muted mt-2">
            Triggers 1 re-render (optimized)
          </div>
        </div>
      </div>

      <CodeBlock>{`// ❌ Bad: Multiple dispatches = multiple re-renders
dispatch(setUser(user));
dispatch(setLoading(false));
dispatch(setError(null));

// ✅ Good: Batch into single action
dispatch(loginSuccess({ user, loading: false, error: null }));

// ✅ Good: Use React.unstable_batchedUpdates
import { unstable_batchedUpdates } from 'react-dom';

unstable_batchedUpdates(() => {
  dispatch(action1());
  dispatch(action2());
  dispatch(action3());
}); // Only 1 re-render

// ✅ Good: Memoize selectors to prevent re-renders
const selectExpensiveData = createSelector(
  [(state) => state.items],
  (items) => items.filter(/* expensive calculation */)
);

// ✅ Good: Split large components reading different state slices
// Instead of one component reading everything,
// have smaller components each reading only what they need`}</CodeBlock>
    </div>
  );
}

export default PerformancePatternsDemo;
