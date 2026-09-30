import { useDispatch, useSelector } from "react-redux";
import { decremented, incremented } from "../../../redux/counterSlice";
import CodeBlock from "../../CodeBlock";

function ValueDisplay() {
  // Only reads state - this component never dispatches anything.
  const value = useSelector((state) => state.counter.value);
  return (
    <div className="bg-surface rounded p-4 border border-line flex-1 min-w-[120px]">
      <p className="text-sm text-subtle mb-1">useSelector only</p>
      <p className="text-2xl font-bold text-heading-alt tabular-nums">
        {value}
      </p>
    </div>
  );
}

function Controls() {
  // Only dispatches actions - this component never reads state.
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-3 flex-1 min-w-[120px]">
      <p className="text-sm text-subtle mr-1">useDispatch only</p>
      <button
        onClick={() => dispatch(decremented())}
        className="bg-surface border border-line text-heading w-10 h-10 rounded hover:border-accent transition-colors"
      >
        −
      </button>
      <button
        onClick={() => dispatch(incremented())}
        className="bg-accent text-white w-10 h-10 rounded hover:opacity-90 transition-opacity"
      >
        +
      </button>
    </div>
  );
}

function HooksSeparationDemo() {
  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        <code>ValueDisplay</code> and <code>Controls</code> share no props at
        all - each connects to the same store independently through its own
        hook, yet clicking a button in one updates the other.
      </p>

      <div className="flex flex-wrap gap-4 mb-4">
        <ValueDisplay />
        <Controls />
      </div>

      <CodeBlock>{`function ValueDisplay() {
  const value = useSelector(state => state.counter.value);
  return <p>{value}</p>;
}

function Controls() {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(incremented())}>+</button>;
}`}</CodeBlock>
    </div>
  );
}

export default HooksSeparationDemo;
