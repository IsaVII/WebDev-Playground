import { Link } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";

function TopicCard({ topic, isCheatSheet = false }) {
  const { isTopicDone, toggleTopicWithSubtopics, getTopicSubtopicCount } =
    useProgress();
  const done = isTopicDone(topic.key);
  const completedSubtopics = getTopicSubtopicCount(topic.key);

  return (
    <Link
      to={topic.route}
      className={`block ${
        done ? "bg-surface-alt" : "bg-surface"
      } border rounded-lg p-4 no-underline text-inherit hover-lift shadow-bloom ${
        done ? "border-accent" : "border-line"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-2">
          {!isCheatSheet && (
            <input
              type="checkbox"
              checked={done}
              onChange={() => toggleTopicWithSubtopics(topic.key)}
              onClick={(event) => event.stopPropagation()}
              aria-label={`Mark ${topic.title} as ${done ? "not done" : "done"}`}
              title={done ? "Mark as not done" : "Mark as done"}
              className="w-4 h-4 mt-1 accent-accent cursor-pointer shrink-0"
            />
          )}

          <h3 className={`m-0 ${isCheatSheet ? "pl-0" : "pl-2"} text-heading`}>
            {topic.title}
          </h3>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <div
            className="text-white rounded-full text-xs font-bold uppercase px-2 py-1"
            style={{
              backgroundColor: `var(--difficulty-${topic.difficulty.toLowerCase()})`,
            }}
          >
            {topic.difficulty}
          </div>
          {topic.comingSoon && (
            <div className="bg-surface-muted text-subtle rounded-full text-[10px] font-bold uppercase px-2 py-0.5">
              Coming Soon
            </div>
          )}
        </div>
      </div>
      <p className="text-muted my-4">{topic.description}</p>
      <div className="flex gap-4 text-sm text-subtle items-center">
        <span>⏱️ {topic.estimatedTime}</span>
        {done ? (
          <span className="text-accent font-semibold">✓ Completed</span>
        ) : (
          completedSubtopics > 0 && (
            <span>
              {completedSubtopics} sub-topic
              {completedSubtopics === 1 ? "" : "s"} done
            </span>
          )
        )}
      </div>
    </Link>
  );
}

export default TopicCard;
