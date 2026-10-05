import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const BLOCKS = "B blocks until A is done";
const PARALLEL = "B runs at the same time";

const SCENARIOS = [
  {
    id: "same-instance",
    code: `// Account has: synchronized void deposit(int)
//              synchronized int getBalance()
Account acc = new Account();

// Thread A:            // Thread B:
acc.deposit(10);        acc.getBalance();`,
    answer: BLOCKS,
    explanation:
      "Both are synchronized instance methods on the same object, so both need acc's monitor. Only one thread can hold it - even though one method reads and the other writes.",
  },
  {
    id: "two-instances",
    code: `Account acc1 = new Account();
Account acc2 = new Account();

// Thread A:            // Thread B:
acc1.deposit(10);       acc2.deposit(10);`,
    answer: PARALLEL,
    explanation:
      "A synchronized instance method locks this - and these are two different objects with two different monitors. Locking is per object, not per method or per class.",
  },
  {
    id: "static-vs-instance",
    code: `// Account has: synchronized void deposit(int)
//              static synchronized void register()

// Thread A:            // Thread B:
acc.deposit(10);        Account.register();`,
    answer: PARALLEL,
    explanation:
      "The instance method locks acc; the static method locks the Account.class object. Different monitors, so they do not exclude each other - protect shared static state with static synchronized methods only.",
  },
  {
    id: "two-static",
    code: `// Account has: static synchronized void register()
//              static synchronized int count()

// Thread A:            // Thread B:
Account.register();     Account.count();`,
    answer: BLOCKS,
    explanation:
      "Every static synchronized method of a class locks the same thing: its Class object. There is only one Account.class, so they take turns.",
  },
  {
    id: "block-vs-method",
    code: `// Account has: synchronized void deposit(int)

// Thread A:            // Thread B:
acc.deposit(10);        synchronized (acc) {
                            // ...anything
                        }`,
    answer: BLOCKS,
    explanation:
      "synchronized (acc) takes acc's monitor, and a synchronized instance method takes this - which is acc. A block and a method are two ways of asking for the same lock.",
  },
  {
    id: "unsynchronized",
    code: `// Account has: synchronized void deposit(int)
//              void log(String msg)      // no synchronized

// Thread A:            // Thread B:
acc.deposit(10);        acc.log("hi");`,
    answer: PARALLEL,
    explanation:
      "A method without synchronized never asks for the lock, so it ignores it completely. Locks only protect code that agrees to use them - every access to the shared data has to take the same lock.",
  },
];

const OPTIONS = [BLOCKS, PARALLEL];

function WhoBlocksDemo() {
  const [picks, setPicks] = useState<Record<string, string>>({});

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Thread A is already inside its call when thread B arrives. Does B have
        to wait?
      </p>

      <div className="space-y-4">
        {SCENARIOS.map((s) => {
          const pick = picks[s.id];
          return (
            <div key={s.id} className="border border-line rounded p-3">
              <CodeBlock>{s.code}</CodeBlock>
              <div className="flex flex-wrap gap-2 mt-2">
                {OPTIONS.map((option) => {
                  const isPick = pick === option;
                  const isRight = option === s.answer;
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

export default WhoBlocksDemo;
