import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const SCENARIOS = [
  {
    id: "mutate",
    code: `static void bump(Player p) {
    p.setHealth(p.getHealth() + 10);
}

Player hero = new Player("Nova", 100);
bump(hero);
System.out.println(hero.getHealth());`,
    options: ["100", "110", "Compile error"],
    answer: "110",
    explanation:
      "`p` is a copy of the reference, but it copies the address of the same heap object as `hero`. Calling a mutating method through that copy changes the one shared object, so the change is visible after bump() returns.",
  },
  {
    id: "reassign",
    code: `static void replace(Player p) {
    p = new Player("Echo", 0);
}

Player hero = new Player("Nova", 100);
replace(hero);
System.out.println(hero.getName());`,
    options: ["Nova", "Echo", "Compile error"],
    answer: "Nova",
    explanation:
      "Reassigning the parameter `p` only points that local copy at a new object - it never touches `hero` back in the caller's frame, which still points at the original Player.",
  },
  {
    id: "primitive",
    code: `static void addTen(int n) {
    n = n + 10;
}

int score = 5;
addTen(score);
System.out.println(score);`,
    options: ["5", "15", "Compile error"],
    answer: "5",
    explanation:
      "Primitives are copied by value with nothing to share - `n` is an entirely independent int in addTen()'s own frame, so changing it can never affect `score`.",
  },
];

function PassByValueDemo() {
  const [picks, setPicks] = useState<Record<string, string>>({});

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Java always passes arguments by value - for a reference, that value
        is the address, not the object. Predict what each snippet prints.
      </p>

      <div className="space-y-4">
        {SCENARIOS.map((s) => {
          const pick = picks[s.id];
          return (
            <div key={s.id} className="border border-line rounded p-3">
              <CodeBlock>{s.code}</CodeBlock>
              <div className="flex gap-2 mt-2">
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
                  Prints <strong>{s.answer}</strong> - {s.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PassByValueDemo;
