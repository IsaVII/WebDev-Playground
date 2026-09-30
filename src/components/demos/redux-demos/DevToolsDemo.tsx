import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function DevToolsDemo() {
  const [actions, setActions] = useState([
    { type: "@@INIT", timestamp: "00:00.000" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dispatchAction = () => {
    const newAction = {
      type: "counter/incremented",
      timestamp: new Date().toTimeString().slice(0, 8),
    };
    setActions((prev) => [...prev, newAction]);
    setSelectedIndex(actions.length);
  };

  const jumpToAction = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        The Redux DevTools Extension gives you superpowers: inspect every action
        and state change, time-travel backward and forward through your app's
        history, and export/import state for debugging.
      </p>

      <button
        onClick={dispatchAction}
        className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity mb-4"
      >
        Dispatch Action
      </button>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-surface border border-line rounded p-4">
          <div className="text-accent text-sm mb-3">Action History:</div>
          <div className="max-h-40 overflow-y-auto space-y-1">
            {actions.map((action, index) => (
              <div
                key={index}
                onClick={() => jumpToAction(index)}
                className={`text-xs p-2 rounded cursor-pointer transition-colors ${
                  index === selectedIndex
                    ? "bg-accent text-white"
                    : "bg-surface-alt text-heading hover:bg-surface"
                }`}
              >
                <div className="font-mono">{action.type}</div>
                <div className="text-muted text-[10px]">{action.timestamp}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-line rounded p-4">
          <div className="text-accent text-sm mb-3">
            Current State (Action #{selectedIndex}):
          </div>
          <pre className="text-xs text-heading-alt font-mono overflow-x-auto">
            {`{
  counter: {
    value: ${selectedIndex}
  },
  user: {
    isLoggedIn: false
  }
}`}
          </pre>
        </div>
      </div>

      <CodeBlock>{`// DevTools are enabled by default with configureStore
const store = configureStore({
  reducer: { counter: counterReducer },
  // DevTools automatically included
});

// Install the browser extension:
// Chrome: Redux DevTools
// Firefox: Redux DevTools

// Features:
// - Inspect every action and resulting state
// - Time-travel: jump to any previous action
// - Diff view: see what changed between states
// - Export/import state for bug reports
// - Trace: see which component dispatched an action
// - Skip/block actions for testing`}</CodeBlock>
    </div>
  );
}

export default DevToolsDemo;
