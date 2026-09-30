import { useState } from "react";

const TIERS = [
  {
    name: "End-to-End",
    width: "w-1/3",
    speed: "Slowest",
    volume: "Fewest",
    description:
      "Drives the whole app through a real browser, the way a user would - clicking through actual screens. Very realistic, but slow and the first to break when unrelated UI changes.",
  },
  {
    name: "Integration",
    width: "w-1/2",
    speed: "Slow",
    volume: "Few",
    description:
      "Checks that several real units - a couple of functions, a module and its dependency - work correctly together, without going through the whole app.",
  },
  {
    name: "Component",
    width: "w-3/4",
    speed: "Fast",
    volume: "Some",
    description:
      "Renders one UI component in isolation and asserts on what it shows or does, without a full page around it.",
  },
  {
    name: "Unit",
    width: "w-full",
    speed: "Fastest",
    volume: "Most",
    description:
      "Tests one function or method in complete isolation from everything else. Cheap to write, quick to run, and the first line of defense - so most of your tests should live here.",
  },
];

function TestPyramidDemo() {
  const [active, setActive] = useState(TIERS.length - 1);
  const tier = TIERS[active];

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        The testing pyramid is a rule of thumb for how many tests of each
        kind to write: lots of fast, cheap unit tests at the base, fewer
        slower tests as you climb toward the whole app. Click a layer.
      </p>

      <div className="flex flex-col items-center gap-1 mb-6">
        {TIERS.map((t, index) => (
          <button
            key={t.name}
            type="button"
            onClick={() => setActive(index)}
            aria-pressed={active === index}
            className={`${t.width} text-sm font-semibold py-3 rounded border transition-colors ${
              active === index
                ? "bg-accent border-accent text-white"
                : "bg-surface border-line text-heading hover:border-accent"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="bg-surface rounded p-4 border border-line">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
          <h5 className="text-heading-alt font-semibold">{tier.name} tests</h5>
          <span className="text-xs text-subtle">Speed: {tier.speed}</span>
          <span className="text-xs text-subtle">How many: {tier.volume}</span>
        </div>
        <p className="text-muted leading-relaxed">{tier.description}</p>
      </div>
    </div>
  );
}

export default TestPyramidDemo;
