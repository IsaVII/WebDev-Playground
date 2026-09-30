import { useState } from "react";
import CodeBlock from "../../CodeBlock";

let nextId = 4;

function ListRenderingDemo() {
  const [items, setItems] = useState([
    { id: 1, text: "Learn JSX" },
    { id: 2, text: "Learn hooks" },
    { id: 3, text: "Ship something" },
  ]);
  const [draft, setDraft] = useState("");

  const addItem = () => {
    if (!draft.trim()) return;
    setItems((list) => [...list, { id: nextId++, text: draft.trim() }]);
    setDraft("");
  };

  const removeItem = (id) => {
    setItems((list) => list.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Each row comes from <code>items.map()</code>, keyed by the item&apos;s
        own <code>id</code> - not its position in the array - so React can still
        tell rows apart correctly after one in the middle is removed. The
        empty-state message below is plain JavaScript: a ternary, not anything
        React-specific.
      </p>

      <div className="flex gap-2 mb-4">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="Add an item..."
          className="bg-surface border border-line rounded px-3 py-2 text-heading flex-1"
        />
        <button
          onClick={addItem}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Add
        </button>
      </div>

      <ul className="bg-surface rounded p-4 mb-2 border border-line space-y-2 min-h-[60px]">
        {items.length === 0 ? (
          <li className="text-subtle text-sm list-none">
            No items yet - add one above.
          </li>
        ) : (
          items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-2 text-heading-alt"
            >
              <span>{item.text}</span>
              <button
                onClick={() => removeItem(item.id)}
                className="text-xs text-subtle hover:text-accent transition-colors"
                aria-label={`Remove ${item.text}`}
              >
                remove
              </button>
            </li>
          ))
        )}
      </ul>
      <p className="text-xs text-muted mb-4">
        {items.length} item{items.length === 1 ? "" : "s"}
      </p>

      <CodeBlock>{`{items.length === 0 ? (
  <p>No items yet.</p>
) : (
  <ul>
    {items.map((item) => (
      <li key={item.id}>{item.text}</li>
    ))}
  </ul>
)}`}</CodeBlock>
    </div>
  );
}

export default ListRenderingDemo;
