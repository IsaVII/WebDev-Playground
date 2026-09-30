import { useDispatch, useSelector } from "react-redux";
import { incremented } from "../../../redux/counterSlice";
import CodeBlock from "../../CodeBlock";

function ExtraReducersDemo() {
  const counter = useSelector((state) => state.counter.value);
  const activityLog = useSelector((state) => state.activityLog.entries);
  const dispatch = useDispatch();

  // Get the last few log entries
  const recentLogs = activityLog.slice(-3);

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        A slice can listen to actions from <em>other</em> slices using{" "}
        <code>extraReducers</code>. This lets one action update multiple parts
        of state without coupling the slices together.
      </p>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => dispatch(incremented())}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Increment Counter
        </button>
        <span className="text-2xl font-bold text-heading-alt tabular-nums">
          {counter}
        </span>
      </div>

      <div className="bg-surface border border-line rounded p-4 mb-4">
        <div className="text-accent text-sm mb-2">
          Activity Log (listening to counter actions):
        </div>
        {recentLogs.length === 0 ? (
          <div className="text-muted text-sm">No activity yet...</div>
        ) : (
          recentLogs.map((entry, i) => (
            <div key={i} className="text-heading-alt text-sm mb-1 font-mono">
              [{entry.timestamp}] {entry.action}
            </div>
          ))
        )}
      </div>

      <CodeBlock>{`// activityLogSlice.js listens to actions from counterSlice
import { incremented } from './counterSlice';

const activityLogSlice = createSlice({
  name: 'activityLog',
  initialState: { entries: [] },
  reducers: {},
  extraReducers: (builder) => {
    // Listen to another slice's action
    builder.addCase(incremented, (state, action) => {
      state.entries.push({
        action: action.type,
        timestamp: new Date().toISOString(),
      });
    });
  },
});`}</CodeBlock>
    </div>
  );
}

export default ExtraReducersDemo;
