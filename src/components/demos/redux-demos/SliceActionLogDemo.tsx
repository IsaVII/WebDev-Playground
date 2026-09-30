import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementedByAmount } from "../../../redux/counterSlice";
import CodeBlock from "../../CodeBlock";

function SliceActionLogDemo() {
  const [amount, setAmount] = useState(5);
  const value = useSelector((state) => state.counter.value);
  const entries = useSelector((state) => state.activityLog.entries);
  const dispatch = useDispatch();

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        <code>createSlice</code> generates the <code>incrementedByAmount</code>{" "}
        action creator for you. Every action dispatched anywhere on this page -
        including from the other demos - gets logged below, since the store runs
        its reducers for every single action.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="bg-surface border border-line rounded px-3 py-2 text-heading w-24"
        />
        <button
          onClick={() => dispatch(incrementedByAmount(amount))}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Dispatch incrementedByAmount
        </button>
        <span className="text-2xl font-bold text-heading-alt tabular-nums ml-auto">
          {value}
        </span>
      </div>

      <div className="bg-surface rounded p-4 border border-line mb-4 max-h-40 overflow-y-auto">
        {entries.length === 0 ? (
          <p className="text-sm text-subtle">No actions dispatched yet.</p>
        ) : (
          <ul className="text-sm font-mono text-muted space-y-1">
            {entries.map((entry, index) => (
              <li key={index}>
                <span className="text-subtle">
                  {entry.timestamp || entry.at}
                </span>{" "}
                — {entry.action || entry.type}
              </li>
            ))}
          </ul>
        )}
      </div>

      <CodeBlock>{`const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    incrementedByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

dispatch(incrementedByAmount(5));
// => { type: "counter/incrementedByAmount", payload: 5 }`}</CodeBlock>
    </div>
  );
}

export default SliceActionLogDemo;
