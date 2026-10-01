import { useState } from "react";

type Mode = "unsafe" | "safe";

interface ThreadView {
  status: string;
  /** The thread's private copy of the counter, or null before it has read. */
  tmp: number | null;
}

interface Step {
  note: string;
  counter: number;
  lock: "A" | "B" | null;
  a: ThreadView;
  b: ThreadView;
}

// Each snapshot is the state after one thing happens. Both threads run
// `count++`, i.e. read -> add 1 -> write, on one shared counter that starts
// at 0, so the correct final value is 2.
const STEPS: Record<Mode, Step[]> = {
  unsafe: [
    {
      note: "Both threads are about to run count++ on the shared counter.",
      counter: 0,
      lock: null,
      a: { status: "ready", tmp: null },
      b: { status: "ready", tmp: null },
    },
    {
      note: "Thread A reads count and gets 0 into its own local copy.",
      counter: 0,
      lock: null,
      a: { status: "read 0", tmp: 0 },
      b: { status: "ready", tmp: null },
    },
    {
      note: "The scheduler switches to Thread B before A has written anything. B also reads 0.",
      counter: 0,
      lock: null,
      a: { status: "paused", tmp: 0 },
      b: { status: "read 0", tmp: 0 },
    },
    {
      note: "Thread A resumes, computes 0 + 1 and writes 1 back to the shared counter.",
      counter: 1,
      lock: null,
      a: { status: "wrote 1", tmp: 0 },
      b: { status: "paused", tmp: 0 },
    },
    {
      note: "Thread B still holds its stale 0. It computes 0 + 1 and writes 1 - overwriting A's update.",
      counter: 1,
      lock: null,
      a: { status: "done", tmp: 0 },
      b: { status: "wrote 1", tmp: 0 },
    },
    {
      note: "Both threads ran count++ once, yet the counter is 1, not 2. One increment was lost - a race condition.",
      counter: 1,
      lock: null,
      a: { status: "done", tmp: 0 },
      b: { status: "done", tmp: 0 },
    },
  ],
  safe: [
    {
      note: "Both threads are about to run count++, this time inside synchronized(counter).",
      counter: 0,
      lock: null,
      a: { status: "ready", tmp: null },
      b: { status: "ready", tmp: null },
    },
    {
      note: "Thread A acquires the lock on the counter and enters the synchronized block.",
      counter: 0,
      lock: "A",
      a: { status: "has lock", tmp: null },
      b: { status: "ready", tmp: null },
    },
    {
      note: "Thread A reads count and gets 0.",
      counter: 0,
      lock: "A",
      a: { status: "read 0", tmp: 0 },
      b: { status: "ready", tmp: null },
    },
    {
      note: "Thread B tries to enter the block but the lock is taken, so it is BLOCKED and cannot read the stale value.",
      counter: 0,
      lock: "A",
      a: { status: "read 0", tmp: 0 },
      b: { status: "BLOCKED", tmp: null },
    },
    {
      note: "Thread A writes 1 and leaves the block, releasing the lock.",
      counter: 1,
      lock: null,
      a: { status: "done", tmp: 0 },
      b: { status: "BLOCKED", tmp: null },
    },
    {
      note: "Thread B acquires the lock and now reads the up-to-date value, 1.",
      counter: 1,
      lock: "B",
      a: { status: "done", tmp: 0 },
      b: { status: "read 1", tmp: 1 },
    },
    {
      note: "Thread B writes 2 and releases the lock. The counter is 2 - exactly right, on every run.",
      counter: 2,
      lock: null,
      a: { status: "done", tmp: 0 },
      b: { status: "done", tmp: 1 },
    },
  ],
};

function ThreadCard({ name, view }: { name: string; view: ThreadView }) {
  const blocked = view.status === "BLOCKED";
  return (
    <div
      className={`bg-surface border rounded p-3 ${
        blocked ? "border-red-500" : "border-line"
      }`}
    >
      <p className="text-sm font-semibold text-heading-alt m-0 mb-1">
        {name}
        <span className="text-xs text-subtle font-normal ml-2">own stack</span>
      </p>
      <p className="font-mono text-xs text-muted m-0">
        tmp = {view.tmp === null ? "-" : view.tmp}
      </p>
      <p
        className={`font-mono text-xs m-0 ${
          blocked ? "text-red-600" : "text-muted"
        }`}
      >
        {view.status}
      </p>
    </div>
  );
}

function RaceConditionDemo() {
  const [mode, setMode] = useState<Mode>("unsafe");
  const [index, setIndex] = useState(0);
  const steps = STEPS[mode];
  const step = steps[index];
  const last = index === steps.length - 1;

  const switchMode = (next: Mode) => {
    setMode(next);
    setIndex(0);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Two threads each run <code>count++</code> once on a shared counter
        that starts at 0. The right answer is 2.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {(["unsafe", "safe"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => switchMode(m)}
            className={`text-xs px-3 py-1 rounded border ${
              mode === m
                ? "bg-accent text-white border-accent"
                : "border-line text-muted hover:text-accent"
            }`}
          >
            {m === "unsafe" ? "No synchronization" : "synchronized"}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.min(steps.length - 1, i + 1))}
          disabled={last}
          className="bg-accent text-white px-4 py-1 rounded text-sm hover:opacity-90 disabled:opacity-40"
        >
          Next step ▸
        </button>
        <button
          type="button"
          onClick={() => setIndex(0)}
          className="text-sm text-subtle hover:text-accent ml-auto"
        >
          Reset
        </button>
      </div>

      <p className="text-sm text-heading-alt mb-4 min-h-[3em]">{step.note}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ThreadCard name="Thread A" view={step.a} />
        <div className="bg-surface border border-dashed border-line rounded p-3">
          <p className="text-sm font-semibold text-heading-alt m-0 mb-1">
            Counter
            <span className="text-xs text-subtle font-normal ml-2">
              shared heap object
            </span>
          </p>
          <p className="font-mono text-xs text-muted m-0">
            count = {step.counter}
          </p>
          {mode === "safe" && (
            <p className="font-mono text-xs text-muted m-0">
              lock held by: {step.lock ? `Thread ${step.lock}` : "nobody"}
            </p>
          )}
        </div>
        <ThreadCard name="Thread B" view={step.b} />
      </div>

      {last && (
        <p
          className={`text-sm font-semibold mt-4 mb-0 ${
            step.counter === 2 ? "text-green-600" : "text-red-600"
          }`}
        >
          Final count = {step.counter}
          {step.counter === 2 ? " ✓" : " - expected 2"}
        </p>
      )}
    </div>
  );
}

export default RaceConditionDemo;
