import { useState } from "react";
import { useDispatch } from "react-redux";
import { incremented } from "../../../redux/counterSlice";
import CodeBlock from "../../CodeBlock";

function MiddlewareDemo() {
  const [logs, setLogs] = useState([]);
  const dispatch = useDispatch();

  const handleClick = () => {
    const timestamp = new Date().toLocaleTimeString();

    // Simulate logging middleware
    const action = incremented();
    setLogs((prev) => [
      ...prev.slice(-4), // Keep last 4 logs
      {
        time: timestamp,
        action: action.type,
        payload: action.payload ?? "none",
      },
    ]);

    dispatch(action);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Middleware sits between <code>dispatch(action)</code> and the reducer,
        intercepting every action. Common uses: logging, crash reporting,
        talking to an API, or routing based on action types.
      </p>

      <button
        onClick={handleClick}
        className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity mb-4"
      >
        Dispatch Action (Watch Logs)
      </button>

      <div className="bg-surface border border-line rounded p-4 mb-4 font-mono text-sm">
        <div className="text-accent mb-2">Action Log (Middleware Output):</div>
        {logs.length === 0 ? (
          <div className="text-muted">No actions dispatched yet...</div>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="text-heading-alt mb-1">
              [{log.time}] {log.action}
              {log.payload !== "none" && ` → ${log.payload}`}
            </div>
          ))
        )}
      </div>

      <CodeBlock>{`// Custom logging middleware
const logger = (store) => (next) => (action) => {
  console.log('dispatching:', action);
  const result = next(action);
  console.log('next state:', store.getState());
  return result;
};

// Add to store
const store = configureStore({
  reducer: { counter: counterReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});`}</CodeBlock>
    </div>
  );
}

export default MiddlewareDemo;
