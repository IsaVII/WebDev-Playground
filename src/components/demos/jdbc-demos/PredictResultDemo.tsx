import ScenarioQuiz, { type Scenario } from "./ScenarioQuiz";

const TABLE = "product has 4 rows with ids 1, 2, 3, 4";

const SCENARIOS: Scenario[] = [
  {
    id: "deleteall",
    context: TABLE,
    code: `int rows = stmt.executeUpdate("DELETE FROM product");
System.out.println(rows);`,
    options: ["0", "1", "4"],
    answer: "4",
    explanation:
      "Without a WHERE clause every row matches, so all four are deleted and executeUpdate returns 4. Always double-check the WHERE on UPDATE and DELETE - there is no undo outside a transaction.",
  },
  {
    id: "norow",
    context: TABLE,
    code: `ps.setLong(1, 99);
int rows = ps.executeUpdate();   // UPDATE product SET price = 1 WHERE id = ?
System.out.println(rows);`,
    options: ["0", "Throws SQLException", "-1"],
    answer: "0",
    explanation:
      "A WHERE that matches nothing is not an error - zero rows were changed and the call returns 0. Checking the returned count is how you notice that the id did not exist.",
  },
  {
    id: "count",
    context: TABLE,
    code: `// SELECT COUNT(*) FROM product WHERE price > 100000
rs.next();
System.out.println(rs.getInt(1));`,
    options: ["0", "rs.next() returns false and getInt throws", "null"],
    answer: "0",
    explanation:
      "An aggregate without GROUP BY always returns exactly one row, even when nothing matches - COUNT gives 0 (and AVG or MAX would give NULL). So rs.next() is true and the value is 0.",
  },
  {
    id: "empty",
    context: TABLE,
    code: `// SELECT ... FROM product WHERE id = 99
boolean found = rs.next();
System.out.println(found);`,
    options: ["true", "false", "Throws SQLException"],
    answer: "false",
    explanation:
      "No matching row means an empty ResultSet, and next() returns false on the first call. That is how findById turns into Optional.empty() rather than an exception.",
  },
  {
    id: "null",
    context: TABLE,
    code: `// SELECT * FROM product WHERE name = NULL
// How many rows come back?`,
    options: ["0 rows - nothing is ever equal to NULL", "1 row", "Every row"],
    answer: "0 rows - nothing is ever equal to NULL",
    explanation:
      "In SQL, NULL means \"unknown\", so name = NULL is never true - not even for a row whose name is NULL. Use WHERE name IS NULL (or IS NOT NULL) instead.",
  },
  {
    id: "identity",
    context: "product has 4 rows (ids 1-4); the identity column is GENERATED ALWAYS AS IDENTITY",
    code: `// DELETE FROM product WHERE id = 4;
// INSERT INTO product (name, price, stock) VALUES ('Headset', 599, 15);
// What id does the new row get?`,
    options: ["4 - the free id is reused", "5", "1"],
    answer: "5",
    explanation:
      "The identity counter only moves forward. Deleting row 4 does not hand the number back, so the next insert gets 5. Never assume ids are gap-free - read the real one with getGeneratedKeys().",
  },
];

function PredictResultDemo() {
  return (
    <ScenarioQuiz
      intro="Predict what each statement returns, given the table described above it."
      scenarios={SCENARIOS}
    />
  );
}

export default PredictResultDemo;
