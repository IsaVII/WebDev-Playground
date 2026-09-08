import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const RELATIONSHIPS = {
  Association: {
    notation: "A ────── B",
    meaning: "\"knows about\" - A holds a reference to B as a field",
    partOutlivesWhole: "n/a - peers, not whole/part",
    example: `class Order {
  private Customer customer; // Order references a Customer
}`,
  },
  Aggregation: {
    notation: "A ◇────── B   (hollow diamond on A)",
    meaning: "whole/part where the part CAN exist on its own",
    partOutlivesWhole: "Yes - delete the Team, the Players still exist",
    example: `class Team {
  private List<Player> players; // players can move to another team
}`,
  },
  Composition: {
    notation: "A ◆────── B   (filled diamond on A)",
    meaning: "whole/part where the part CANNOT exist without the whole",
    partOutlivesWhole: "No - delete the Invoice, its LineItems go too",
    example: `class Invoice {
  private final List<LineItem> lines = new ArrayList<>();
  // lines are created here and never shared out
}`,
  },
  Inheritance: {
    notation: "A ──────▷ B   (hollow triangle pointing at B)",
    meaning: "\"is a\" - A extends B and can be used wherever B is expected",
    partOutlivesWhole: "n/a - not a whole/part relationship",
    example: `class Manager extends Employee {
  private BigDecimal bonus;
}`,
  },
  Dependency: {
    notation: "A ┄┄┄┄┄▸ B   (dashed arrow)",
    meaning: "\"uses\" - B appears as a parameter or local, never stored",
    partOutlivesWhole: "n/a - transient use only",
    example: `class Checkout {
  BigDecimal total(PricingService pricing) { // used, not kept
    return pricing.quote(cart);
  }
}`,
  },
};

function RelationshipTypesDemo() {
  const [kind, setKind] = useState("Composition");
  const active = RELATIONSHIPS[kind];

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        The one question that separates the three &quot;has a&quot; links:
        <strong> if the whole is deleted, does the part go with it?</strong>
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(RELATIONSHIPS).map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setKind(name)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              kind === name
                ? "bg-accent text-white"
                : "bg-surface text-muted hover:text-heading"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line space-y-2 text-sm">
        <p className="font-mono text-heading-alt">{active.notation}</p>
        <p className="text-muted">
          <strong>Means:</strong> {active.meaning}
        </p>
        <p className="text-muted">
          <strong>Part outlives the whole?</strong> {active.partOutlivesWhole}
        </p>
      </div>

      <CodeBlock>{active.example}</CodeBlock>
    </div>
  );
}

export default RelationshipTypesDemo;
