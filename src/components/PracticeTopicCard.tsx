import { useState } from "react";
import { useProgress } from "../context/ProgressContext";

function PracticeTopicCard({ topicKey, title, description, demo }) {
  const [open, setOpen] = useState(false);
  const { isSubtopicDone, toggleSubtopic } = useProgress();
  const done = isSubtopicDone(topicKey, title);

  return (
    <div
      className={`bg-surface-alt border-l-4 rounded transition-all duration-300 hover:bg-surface-alt-hover ${
        done ? "border-green-500" : "border-accent"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left p-6 flex items-start justify-between gap-4"
        aria-expanded={open}
        disabled={!demo}
      >
        <span className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={done}
            onChange={() => toggleSubtopic(topicKey, title)}
            onClick={(event) => event.stopPropagation()}
            aria-label={`Mark ${title} as ${done ? "not done" : "done"}`}
            title={done ? "Mark as not done" : "Mark as done"}
            className="w-4 h-4 mt-1 accent-accent cursor-pointer shrink-0"
          />
          <span className="block">
            <span className="flex items-center gap-2 m-0 mb-2 text-heading font-semibold">
              {title}
              {done && (
                <span className="text-green-600 text-xs font-bold">
                  ✓ Done
                </span>
              )}
            </span>
            <span className="block text-sm text-muted">{description}</span>
          </span>
        </span>

        {demo && (
          <span className="shrink-0 mt-1 text-sm font-medium text-accent whitespace-nowrap">
            {open ? "Hide ✕" : "Try it ▸"}
          </span>
        )}
      </button>

      {open && demo && <div className="px-6 pb-6">{demo}</div>}
    </div>
  );
}

export default PracticeTopicCard;
