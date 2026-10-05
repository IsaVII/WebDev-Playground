import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const SCENARIOS = [
  {
    id: "shared-runnable",
    code: `class Counter implements Runnable {
    int count = 0;
    public void run() {
        for (int i = 0; i < 1000; i++) count++;
    }
}

Counter c = new Counter();
Thread a = new Thread(c), b = new Thread(c);
a.start(); b.start();
a.join();  b.join();
System.out.println(c.count);`,
    options: ["Always 2000", "Usually a bit less than 2000", "Always 1000"],
    answer: "Usually a bit less than 2000",
    explanation:
      "Passing the same Runnable to two threads shares its fields. Both threads run count++ on the one Counter object with no lock, so updates get lost.",
  },
  {
    id: "separate-runnables",
    code: `Counter c1 = new Counter();   // same Counter class as above
Counter c2 = new Counter();
Thread a = new Thread(c1), b = new Thread(c2);
a.start(); b.start();
a.join();  b.join();
System.out.println(c1.count + c2.count);`,
    options: ["Always 2000", "Usually a bit less than 2000", "Compile error"],
    answer: "Always 2000",
    explanation:
      "Each thread now increments its own object, so nothing is shared and nothing can race. Giving every thread its own state is the cheapest form of thread safety.",
  },
  {
    id: "wrong-lock",
    code: `void increment() {
    synchronized (new Object()) {
        count++;
    }
}
// two threads each call increment() 1000 times on the same object`,
    options: ["Always 2000", "Usually a bit less than 2000", "Deadlock"],
    answer: "Usually a bit less than 2000",
    explanation:
      "Every call locks a brand-new Object nobody else knows about, so no two threads ever compete for the same monitor. For a lock to mean anything, all threads must synchronize on the same object.",
  },
  {
    id: "reentrant",
    code: `class Greeter {
    synchronized void outer() { inner(); }
    synchronized void inner() { System.out.println("inner"); }
}
new Greeter().outer();`,
    options: [
      "Prints inner",
      "Deadlocks - outer() holds the lock inner() needs",
      "Throws IllegalMonitorStateException",
    ],
    answer: "Prints inner",
    explanation:
      "Java's monitors are reentrant: a thread that already holds a lock can take it again. outer() already owns this, so inner() just carries on. Without reentrancy, calling one synchronized method from another would be impossible.",
  },
  {
    id: "wait-outside",
    code: `Object lock = new Object();
lock.wait();   // inside a method that declares throws InterruptedException`,
    options: [
      "Waits until notified",
      "Throws IllegalMonitorStateException",
      "Compile error",
    ],
    answer: "Throws IllegalMonitorStateException",
    explanation:
      "wait(), notify() and notifyAll() may only be called by a thread that holds the object's monitor - that is, inside synchronized (lock) { ... }. It compiles, then fails at runtime.",
  },
];

function SynchronizedPredictDemo() {
  const [picks, setPicks] = useState<Record<string, string>>({});

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Runnables and locks have a few classic traps. Predict what each snippet
        does.
      </p>

      <div className="space-y-4">
        {SCENARIOS.map((s) => {
          const pick = picks[s.id];
          return (
            <div key={s.id} className="border border-line rounded p-3">
              <CodeBlock>{s.code}</CodeBlock>
              <div className="flex flex-wrap gap-2 mt-2">
                {s.options.map((option) => {
                  const isPick = pick === option;
                  const isRight = pick && option === s.answer;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setPicks((p) => ({ ...p, [s.id]: option }))
                      }
                      className={`text-xs px-3 py-1 rounded border ${
                        isPick && isRight
                          ? "bg-green-500/20 border-green-500 text-green-600"
                          : isPick
                            ? "bg-red-500/20 border-red-500 text-red-600"
                            : "border-line text-muted hover:text-accent"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {pick && (
                <p className="text-xs text-muted mt-2 mb-0">
                  <strong>{s.answer}</strong> - {s.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SynchronizedPredictDemo;
