import { useState } from "react";
import { schedule, totalTime } from "./threadPoolSchedule";

// Six tasks, submitted in this order; durations are in arbitrary time units.
const TASKS = [
  { name: "A", duration: 3 },
  { name: "B", duration: 2 },
  { name: "C", duration: 4 },
  { name: "D", duration: 1 },
  { name: "E", duration: 2 },
  { name: "F", duration: 3 },
];

const POOL_SIZES = [1, 2, 3, 4, 5, 6];

const DURATIONS = TASKS.map((t) => t.duration);
const SEQUENTIAL = DURATIONS.reduce((a, b) => a + b, 0);
const LONGEST = Math.max(...DURATIONS);

function ThreadPoolDemo() {
  const [poolSize, setPoolSize] = useState(2);

  const scheduled = schedule(DURATIONS, poolSize);
  const total = totalTime(scheduled);
  const workers = Array.from({ length: poolSize }, (_, w) => w);

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Six tasks are submitted to{" "}
        <code>Executors.newFixedThreadPool(n)</code> in order A-F. Each task
        goes to the first worker that is free. Choose the pool size.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs text-muted">Pool size:</span>
        {POOL_SIZES.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setPoolSize(n)}
            aria-pressed={poolSize === n}
            className={`text-xs px-3 py-1 rounded border ${
              poolSize === n
                ? "bg-accent text-white border-accent"
                : "border-line text-muted hover:text-accent"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {workers.map((w) => (
          <div key={w} className="flex items-center gap-2">
            <span className="font-mono text-xs text-muted w-24 shrink-0">
              worker-{w + 1}
            </span>
            <div className="relative h-8 flex-1 bg-surface border border-line rounded">
              {scheduled
                .filter((t) => t.worker === w)
                .map((t) => (
                  <div
                    key={t.index}
                    className="absolute top-0 bottom-0 bg-accent text-white text-xs flex items-center justify-center rounded border border-surface-alt"
                    style={{
                      left: `${(t.start / total) * 100}%`,
                      width: `${((t.end - t.start) / total) * 100}%`,
                    }}
                    title={`Task ${TASKS[t.index].name}: ${t.start} to ${t.end}`}
                  >
                    {TASKS[t.index].name}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-heading-alt mt-4 mb-1">
        All tasks finished after <strong>{total}</strong> time units - one
        thread alone would need {SEQUENTIAL}.
      </p>
      <p className="text-xs text-muted m-0">
        {total === LONGEST
          ? `More workers cannot help any further: the longest single task (${LONGEST}) is now the floor.`
          : poolSize === 1
            ? "With one worker the tasks simply queue up and run one after another."
            : "Tasks wait in the queue until a worker frees up, so extra workers help until they outnumber the work."}
      </p>
    </div>
  );
}

export default ThreadPoolDemo;
