import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const SCENARIOS = [
  {
    id: "run",
    code: `Thread t = new Thread(() ->
    System.out.println(Thread.currentThread().getName()));
t.run();`,
    options: ["main", "Thread-0", "Nothing is printed"],
    answer: "main",
    explanation:
      "run() is an ordinary method call, so the task executes right here on the main thread. Only start() creates a new thread - it would have printed Thread-0.",
  },
  {
    id: "twice",
    code: `Thread t = new Thread(() -> System.out.println("hi"));
t.start();
t.join();
t.start();`,
    options: [
      "hi, printed twice",
      "hi, then an IllegalThreadStateException",
      "hi, printed once with no error",
    ],
    answer: "hi, then an IllegalThreadStateException",
    explanation:
      "A Thread object can only be started once, even after it has finished. The second start() throws IllegalThreadStateException - create a new Thread (or use an executor) to run the task again.",
  },
  {
    id: "join",
    code: `int[] result = new int[1];
Thread t = new Thread(() -> result[0] = 42);
t.start();
System.out.println(result[0]);`,
    options: ["Always 42", "0 or 42 - it depends on timing", "Compile error"],
    answer: "0 or 42 - it depends on timing",
    explanation:
      "main carries on immediately after start() and can read the array before the new thread has run. Calling t.join() before the println would guarantee 42.",
  },
  {
    id: "atomic",
    code: `AtomicInteger n = new AtomicInteger();
Runnable r = () -> {
    for (int i = 0; i < 1000; i++) n.incrementAndGet();
};
Thread a = new Thread(r), b = new Thread(r);
a.start(); b.start();
a.join();  b.join();
System.out.println(n.get());`,
    options: ["Always 2000", "Usually a bit less than 2000", "Compile error"],
    answer: "Always 2000",
    explanation:
      "incrementAndGet() is one indivisible read-modify-write, so no update is lost, and join() makes main wait for both threads before reading. With a plain int and n++ it would usually print less.",
  },
];

function ThreadPredictDemo() {
  const [picks, setPicks] = useState<Record<string, string>>({});

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Threads behave differently from sequential code. Predict what each
        snippet does.
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

export default ThreadPredictDemo;
