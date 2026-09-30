import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const ENDS = ["1", "0..1", "1..*", "*"];

const isMany = (end) => end === "1..*" || end === "*";

function classify(left, right) {
  const leftMany = isMany(left);
  const rightMany = isMany(right);

  if (!leftMany && !rightMany) {
    return {
      type: "One-to-one",
      mapping:
        "Foreign key on either table, with a UNIQUE constraint on it so the 1:1 is enforced. Often the two are just merged into one table.",
      sql: `ALTER TABLE profile
  ADD COLUMN user_id BIGINT NOT NULL UNIQUE REFERENCES "user"(id);`,
    };
  }
  if (leftMany !== rightMany) {
    return {
      type: "One-to-many",
      mapping:
        "Foreign key goes on the MANY side, pointing back at the ONE side. No extra table.",
      sql: `ALTER TABLE line_item
  ADD COLUMN order_id BIGINT NOT NULL REFERENCES "order"(id);`,
    };
  }
  return {
    type: "Many-to-many",
    mapping:
      "Neither side can hold a single foreign key. Create a join table with one FK to each side; its primary key is the pair.",
    sql: `CREATE TABLE student_course (
  student_id BIGINT NOT NULL REFERENCES student(id),
  course_id  BIGINT NOT NULL REFERENCES course(id),
  PRIMARY KEY (student_id, course_id)
);`,
  };
}

function crowsFoot(end) {
  // crude ASCII crow's-foot for the chosen end
  switch (end) {
    case "1":
      return "──||──";
    case "0..1":
      return "──o|──";
    case "1..*":
      return "──|<──";
    case "*":
      return "──o<──";
    default:
      return "──────";
  }
}

function CardinalityDemo() {
  const [left, setLeft] = useState("1");
  const [right, setRight] = useState("1..*");
  const result = classify(left, right);

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Set the multiplicity on each end and watch it decide whether the
        relationship becomes a foreign key or a whole join table.
      </p>

      <div className="flex items-center gap-3 mb-4 text-sm">
        <span className="font-mono text-heading-alt">A</span>
        <select
          value={left}
          onChange={(e) => setLeft(e.target.value)}
          className="bg-surface border border-line rounded px-2 py-1"
        >
          {ENDS.map((e) => (
            <option key={e}>{e}</option>
          ))}
        </select>
        <span className="font-mono text-accent">
          {crowsFoot(left)}
          {crowsFoot(right).split("").reverse().join("")}
        </span>
        <select
          value={right}
          onChange={(e) => setRight(e.target.value)}
          className="bg-surface border border-line rounded px-2 py-1"
        >
          {ENDS.map((e) => (
            <option key={e}>{e}</option>
          ))}
        </select>
        <span className="font-mono text-heading-alt">B</span>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line text-sm">
        <p className="text-accent font-semibold mb-1">{result.type}</p>
        <p className="text-muted">{result.mapping}</p>
      </div>

      <CodeBlock>{result.sql}</CodeBlock>
    </div>
  );
}

export default CardinalityDemo;
