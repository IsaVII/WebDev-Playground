import { useDispatch, useSelector } from "react-redux";
import { decremented, incremented } from "../../../redux/counterSlice";
import CodeBlock from "../../CodeBlock";

function StoreCounterDemo() {
  const value = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const incrementIfOdd = () => {
    // Reading state before deciding whether to dispatch at all.
    if (value % 2 !== 0) {
      dispatch(incremented());
    }
  };

  const incrementAsync = () => {
    // Dispatching after a delay - the store doesn't care when an action
    // arrives, only that it eventually does.
    setTimeout(() => dispatch(incremented()), 1000);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Every button below dispatches a plain action object to the same store.{" "}
        <code>state.counter.value</code> is currently <strong>{value}</strong>.
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={() => dispatch(decremented())}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors"
        >
          −1
        </button>
        <button
          onClick={() => dispatch(incremented())}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          +1
        </button>
        <button
          onClick={incrementIfOdd}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors"
        >
          +1 if odd
        </button>
        <button
          onClick={incrementAsync}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors"
        >
          +1 async
        </button>
      </div>

      <CodeBlock>{`incrementButton.addEventListener('click', () => {
  dispatch(incremented());
});

// only dispatch conditionally
if (value % 2 !== 0) dispatch(incremented());

// or after a delay
setTimeout(() => dispatch(incremented()), 1000);`}</CodeBlock>
    </div>
  );
}

export default StoreCounterDemo;
