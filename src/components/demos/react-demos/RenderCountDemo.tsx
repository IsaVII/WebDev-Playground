import { memo, useState } from "react";
import CodeBlock from "../../CodeBlock";

function RenderCounter({ label, renders }) {
  return (
    <div className="bg-surface rounded p-4 border border-line flex-1 min-w-[140px]">
      <p className="text-sm text-subtle mb-1">{label}</p>
      <p className="text-2xl font-mono font-bold text-heading-alt tabular-nums">
        {renders}
      </p>
      <p className="text-xs text-muted">renders</p>
    </div>
  );
}

// memo() makes React skip calling this function again whenever its props
// haven't changed since the last render - so if the props it's handed
// never change, it only ever runs once, no matter how often its parent
// re-renders.
const MemoRenderCounter = memo(RenderCounter);

function RenderCountDemo() {
  const [tick, setTick] = useState(0);

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Click the button below a few times. The plain child is handed a prop
        that changes on every click, so its render count climbs right along with
        it. The <code>memo</code>-wrapped child is handed the exact same props
        every time, so React skips calling it again after the first render - its
        count never moves.
      </p>

      <div className="flex flex-wrap gap-4 mb-4">
        <RenderCounter label="Without memo" renders={tick + 1} />
        <MemoRenderCounter label="With React.memo" renders={1} />
      </div>

      <button
        onClick={() => setTick((t) => t + 1)}
        className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity mb-4"
      >
        Trigger parent re-render ({tick})
      </button>

      <CodeBlock>{`const Child = memo(function Child({ label, renders }) {
  return <p>{label}: {renders}</p>;
});

// A prop that changes every click forces a real re-render:
<Child label="Without memo" renders={tick} />

// The exact same props every time let memo bail out entirely:
<Child label="With memo" renders={1} />`}</CodeBlock>
    </div>
  );
}

export default RenderCountDemo;
