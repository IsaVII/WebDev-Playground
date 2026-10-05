import { useState } from "react";

const ITEMS = [
  {
    id: "extend",
    label: "The class already has to extend another class (say, a Spring base class)",
    answer: "implements Runnable",
    explanation:
      "Java has single inheritance. A class that extends Thread can never extend anything else, while any class can implement Runnable.",
  },
  {
    id: "lambda",
    label: "You want to write the task inline as a lambda: () -> doWork()",
    answer: "implements Runnable",
    explanation:
      "Runnable has exactly one abstract method, so a lambda can stand in for it. Thread is a class, not an interface, so it cannot be written as a lambda.",
  },
  {
    id: "pool",
    label: "The task will be handed to an ExecutorService with submit() or execute()",
    answer: "implements Runnable",
    explanation:
      "Executors run tasks, not threads - they own the threads and just call your run(). Passing a Thread subclass would work (Thread implements Runnable) but would waste the Thread machinery and invite confusion.",
  },
  {
    id: "run",
    label: "You define the work by writing a run() method",
    answer: "Both",
    explanation:
      "Either way the work is the run() method. Thread itself implements Runnable, and its default run() calls the Runnable you passed to the constructor.",
  },
  {
    id: "start",
    label: "Nothing happens concurrently until someone calls start() on a Thread",
    answer: "Both",
    explanation:
      "A Runnable is only a description of a task. Whether you subclass Thread or wrap a Runnable in new Thread(...), it is start() that creates the new thread.",
  },
  {
    id: "state",
    label: "The task needs to call its own getName() or setPriority() without an extra lookup",
    answer: "extends Thread",
    explanation:
      "A Thread subclass is a Thread, so those methods are inherited. A Runnable has to call Thread.currentThread() first. Needing this is rare, and the shortcut is rarely worth losing the other benefits.",
  },
];

const OPTIONS = ["extends Thread", "implements Runnable", "Both"];

function RunnableChoiceDemo() {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const allPicked = ITEMS.every((item) => picks[item.id]);
  const score = ITEMS.filter((item) => picks[item.id] === item.answer).length;

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        For each situation, which way of defining the task fits - or do both
        work the same way?
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

export default RunnableChoiceDemo;
