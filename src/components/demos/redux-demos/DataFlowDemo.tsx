import { useDispatch, useSelector } from "react-redux";
import { liked } from "../../../redux/likeSlice";
import CodeBlock from "../../CodeBlock";

function DataFlowDemo() {
  const count = useSelector((state) => state.like.count);
  const dispatch = useDispatch();

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Clicking the button dispatches a plain action object. The store runs the
        reducer, calculates the new state, and this component re-renders because
        it reads that state with <code>useSelector</code>.
      </p>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => dispatch(liked())}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Like ❤️
        </button>
        <span className="text-3xl font-bold text-heading-alt tabular-nums">
          {count}
        </span>
      </div>

      <CodeBlock>{`// 1. UI dispatches an action
dispatch({ type: "like/liked" });

// 2. Reducer calculates new state
liked: (state) => { state.count += 1 }

// 3. Component reads the new state
const count = useSelector(state => state.like.count);`}</CodeBlock>
    </div>
  );
}

export default DataFlowDemo;
