import { useState } from "react";

// One snapshot per line of MemoryDemo.java (src/data/code-examples/java/heapstack/MemoryDemo.java)
// executing. `stack` lists frames oldest-first (rendered newest-on-top);
// `heap` lists every object allocated so far.
const STEPS = [
  {
    line: "int score = 10;",
    stack: [{ frame: "main()", locals: [{ name: "score", value: "10" }] }],
    heap: [],
  },
  {
    line: 'Player hero = new Player("Nova", 100);',
    stack: [
      {
        frame: "main()",
        locals: [
          { name: "score", value: "10" },
          { name: "hero", value: "→ Player@a1" },
        ],
      },
    ],
    heap: [
      {
        id: "a1",
        type: "Player",
        fields: [
          { name: "name", value: '"Nova"' },
          { name: "health", value: "100" },
        ],
      },
    ],
  },
  {
    line: "levelUp(hero, score);  // pushes a new frame",
    stack: [
      {
        frame: "main()",
        locals: [
          { name: "score", value: "10" },
          { name: "hero", value: "→ Player@a1" },
        ],
      },
      {
        frame: "levelUp()",
        locals: [
          { name: "player", value: "→ Player@a1  (copy of the reference)" },
          { name: "bonus", value: "10  (copy of the value)" },
        ],
      },
    ],
    heap: [
      {
        id: "a1",
        type: "Player",
        fields: [
          { name: "name", value: '"Nova"' },
          { name: "health", value: "100" },
        ],
      },
    ],
  },
  {
    line: "int newHealth = player.getHealth() + bonus;",
    stack: [
      {
        frame: "main()",
        locals: [
          { name: "score", value: "10" },
          { name: "hero", value: "→ Player@a1" },
        ],
      },
      {
        frame: "levelUp()",
        locals: [
          { name: "player", value: "→ Player@a1" },
          { name: "bonus", value: "10" },
          { name: "newHealth", value: "110" },
        ],
      },
    ],
    heap: [
      {
        id: "a1",
        type: "Player",
        fields: [
          { name: "name", value: '"Nova"' },
          { name: "health", value: "100" },
        ],
      },
    ],
  },
  {
    line: "player.setHealth(newHealth);  // mutates the shared object",
    stack: [
      {
        frame: "main()",
        locals: [
          { name: "score", value: "10" },
          { name: "hero", value: "→ Player@a1" },
        ],
      },
      {
        frame: "levelUp()",
        locals: [
          { name: "player", value: "→ Player@a1" },
          { name: "bonus", value: "10" },
          { name: "newHealth", value: "110" },
        ],
      },
    ],
    heap: [
      {
        id: "a1",
        type: "Player",
        fields: [
          { name: "name", value: '"Nova"' },
          { name: "health", value: "110" },
        ],
      },
    ],
  },
  {
    line: "}  // levelUp returns - its frame is popped",
    stack: [
      {
        frame: "main()",
        locals: [
          { name: "score", value: "10" },
          { name: "hero", value: "→ Player@a1" },
        ],
      },
    ],
    heap: [
      {
        id: "a1",
        type: "Player",
        fields: [
          { name: "name", value: '"Nova"' },
          { name: "health", value: "110" },
        ],
      },
    ],
  },
  {
    line: "System.out.println(hero.getHealth());  // prints 110",
    stack: [
      {
        frame: "main()",
        locals: [
          { name: "score", value: "10" },
          { name: "hero", value: "→ Player@a1" },
        ],
      },
    ],
    heap: [
      {
        id: "a1",
        type: "Player",
        fields: [
          { name: "name", value: '"Nova"' },
          { name: "health", value: "110" },
        ],
      },
    ],
  },
];

function CallStackHeapDemo() {
  const [index, setIndex] = useState(-1);
  const current = index >= 0 ? STEPS[index] : null;

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Step through <code>MemoryDemo.main()</code> one line at a time and
        watch what lands on the call stack versus the heap.
      </p>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.min(STEPS.length - 1, i + 1))}
          disabled={index >= STEPS.length - 1}
          className="bg-accent text-white px-4 py-1 rounded text-sm hover:opacity-90 disabled:opacity-40"
        >
          {index === -1 ? "Run first line" : "Next line ▸"}
        </button>
        <button
          type="button"
          onClick={() => setIndex(-1)}
          className="text-sm text-subtle hover:text-accent ml-auto"
        >
          Reset
        </button>
      </div>

      <p className="font-mono text-xs text-accent mb-4 min-h-[1.5em]">
        {current ? current.line : "(nothing executed yet)"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
            Call Stack
          </p>
          <div className="space-y-2">
            {current && current.stack.length > 0 ? (
              [...current.stack].reverse().map((f, i) => (
                <div
                  key={f.frame}
                  className="bg-surface border border-line rounded p-3"
                >
                  <p className="text-sm font-semibold text-heading-alt m-0 mb-1">
                    {f.frame}
                    {i === 0 && (
                      <span className="text-xs text-subtle font-normal ml-2">
                        ◂ top of stack
                      </span>
                    )}
                  </p>
                  {f.locals.map((l) => (
                    <p
                      key={l.name}
                      className="font-mono text-xs text-muted m-0"
                    >
                      {l.name} = {l.value}
                    </p>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-xs text-subtle italic">empty</p>
            )}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
            Heap
          </p>
          <div className="space-y-2">
            {current && current.heap.length > 0 ? (
              current.heap.map((o) => (
                <div
                  key={o.id}
                  className="bg-surface border border-dashed border-line rounded p-3"
                >
                  <p className="text-sm font-semibold text-heading-alt m-0 mb-1">
                    {o.type}@{o.id}
                  </p>
                  {o.fields.map((f) => (
                    <p
                      key={f.name}
                      className="font-mono text-xs text-muted m-0"
                    >
                      {f.name} = {f.value}
                    </p>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-xs text-subtle italic">empty</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallStackHeapDemo;
