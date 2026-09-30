import { useEffect, useState } from "react";
import CodeBlock from "../../CodeBlock";

function HooksIntroDemo() {
  const [title, setTitle] = useState("Learning Tool");

  useEffect(() => {
    const previousTitle = document.title;
    document.title = title || "Learning Tool";

    return () => {
      document.title = previousTitle;
    };
  }, [title]);

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        This <code>useEffect</code> runs whenever <code>title</code> changes and
        syncs it to the browser tab. Type below, then check the tab title.
      </p>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Type a tab title..."
        className="bg-surface border border-line rounded px-3 py-2 text-heading w-full mb-4"
      />

      <CodeBlock>{`useEffect(() => {
  document.title = title;
}, [title]);`}</CodeBlock>
    </div>
  );
}

export default HooksIntroDemo;
