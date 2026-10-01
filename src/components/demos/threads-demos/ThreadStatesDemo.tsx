import { useState } from "react";

const ITEMS = [
  {
    id: "new",
    label: "Thread t = new Thread(task);  (start() has not been called yet)",
    answer: "NEW",
    explanation:
      "The Thread object exists but no OS thread has been created. It stays NEW until start() is called.",
  },
  {
    id: "runnable",
    label: "t.start() was called and the thread is executing code or waiting for CPU time",
    answer: "RUNNABLE",
    explanation:
      "RUNNABLE covers both 'running right now' and 'ready to run, waiting for the scheduler'. Java does not distinguish the two.",
  },
  {
    id: "blocked",
    label: "The thread wants to enter a synchronized block whose lock another thread holds",
    answer: "BLOCKED",
    explanation:
      "BLOCKED specifically means waiting to acquire a monitor lock. As soon as the lock is released it becomes RUNNABLE again.",
  },
  {
    id: "waiting",
    label: "The thread called other.join() with no timeout",
    answer: "WAITING",
    explanation:
      "join(), Object.wait() and LockSupport.park() with no timeout put the thread in WAITING until another thread acts - here, until the other thread finishes.",
  },
  {
    id: "timed",
    label: "The thread is inside Thread.sleep(500)",
    answer: "TIMED_WAITING",
    explanation:
      "Anything that waits with a time limit - sleep(ms), join(ms), wait(ms) - is TIMED_WAITING. It wakes on its own when the time is up.",
  },
  {
    id: "terminated",
    label: "run() returned normally (or threw an uncaught exception)",
    answer: "TERMINATED",
    explanation:
      "A finished thread is TERMINATED for good. It cannot be restarted - calling start() again throws IllegalThreadStateException.",
  },
];

const OPTIONS = [
  "NEW",
  "RUNNABLE",
  "BLOCKED",
  "WAITING",
  "TIMED_WAITING",
  "TERMINATED",
];

function ThreadStatesDemo() {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const allPicked = ITEMS.every((item) => picks[item.id]);
  const score = ITEMS.filter((item) => picks[item.id] === item.answer).length;

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        For each situation, pick the <code>Thread.State</code> that{" "}
        <code>thread.getState()</code> would report.
      </p>

      <div className="space-y-3">
        {ITEMS.map((item) => {
          const right = checked && picks[item.id] === item.answer;
          const wrong = checked && picks[item.id] && picks[item.id] !== item.answer;
          return (
            <div
              key={item.id}
              className={`rounded border p-3 ${
                right
                  ? "border-green-500 bg-green-500/10"
                  : wrong
                    ? "border-red-500 bg-red-500/10"
                    : "border-line"
              }`}
            >
              <p className="text-xs text-heading-alt mb-2">{item.label}</p>
              <div className="flex flex-wrap gap-2">
                {OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setChecked(false);
                      setPicks((p) => ({ ...p, [item.id]: option }));
                    }}
                    className={`font-mono text-xs px-3 py-1 rounded border ${
                      picks[item.id] === option
                        ? "bg-accent text-white border-accent"
                        : "border-line text-muted hover:text-accent"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {checked && wrong && (
                <p className="text-xs text-muted mt-2 mb-0">
                  → {item.answer}: {item.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={!allPicked}
          className="bg-accent text-white px-4 py-1 rounded text-sm hover:opacity-90 disabled:opacity-40"
        >
          Check
        </button>
        {checked && (
          <span className="text-sm font-semibold text-heading">
            {score} / {ITEMS.length}
          </span>
        )}
      </div>
    </div>
  );
}

export default ThreadStatesDemo;
