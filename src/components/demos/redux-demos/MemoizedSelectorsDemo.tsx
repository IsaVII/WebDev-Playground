import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import CodeBlock from "../../CodeBlock";

function MemoizedSelectorsDemo() {
  const [renderCount, setRenderCount] = useState(0);

  // Non-memoized selector - creates a new array on every call
  const expensiveSelector = (state) => {
    return state.activityLog.entries
      .filter((entry) => entry.action.includes("incremented"))
      .map((entry) => entry.action);
  };

  // This will cause re-renders even when the filtered data hasn't changed
  const filteredActions = useSelector(expensiveSelector);

  // Memoized version using useMemo
  const memoizedFilteredActions = useSelector(
    (state) => state.activityLog.entries,
  );

  const memoizedResult = useMemo(
    () =>
      memoizedFilteredActions
        .filter((entry) => entry.action.includes("incremented"))
        .map((entry) => entry.action),
    [memoizedFilteredActions],
  );

  // Track renders
  useMemo(() => {
    setRenderCount((c) => c + 1);
  }, [filteredActions]);

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Selectors that return new arrays or objects on every call cause
        unnecessary re-renders. Use <code>createSelector</code> from Reselect or{" "}
        <code>useMemo</code> to memoize expensive computations.
      </p>

      <div className="bg-surface border border-line rounded p-4 mb-4">
        <div className="text-sm mb-2">
          <span className="text-muted">Component rendered: </span>
          <span className="text-accent font-bold">{renderCount} times</span>
        </div>
        <div className="text-sm mb-2">
          <span className="text-muted">Filtered actions count: </span>
          <span className="text-heading-alt font-bold">
            {memoizedResult.length}
          </span>
        </div>
      </div>

      <CodeBlock>{`// ❌ Bad: Returns new array every time, causing re-renders
const selectFiltered = (state) => 
  state.items.filter(item => item.active);

// ✅ Good: Memoized with createSelector (from Reselect)
import { createSelector } from '@reduxjs/toolkit';

const selectItems = (state) => state.items;
const selectActiveItems = createSelector(
  [selectItems],
  (items) => items.filter(item => item.active)
);

// Only recalculates when items array changes reference`}</CodeBlock>
    </div>
  );
}

export default MemoizedSelectorsDemo;
