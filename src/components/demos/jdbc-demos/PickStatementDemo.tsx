import { useState } from "react";

const ITEMS = [
  {
    id: "insert",
    label: "Add a new customer as a new row in the customer table",
    answer: "INSERT",
    explanation:
      "INSERT INTO ... VALUES (...) creates new rows. It never changes or removes existing ones.",
  },
  {
    id: "select",
    label: "Read the products that cost less than 500, without changing anything",
    answer: "SELECT",
    explanation:
      "SELECT is the only statement that reads. It returns rows and leaves the table exactly as it was.",
  },
  {
    id: "update",
    label: "Change the price of one existing product",
    answer: "UPDATE",
    explanation:
      "UPDATE ... SET column = value WHERE ... changes existing rows in place. Forget the WHERE and every row changes.",
  },
  {
    id: "delete",
    label: "Remove all cancelled orders",
    answer: "DELETE",
    explanation:
      "DELETE FROM ... WHERE ... removes whole rows. To change a single column you use UPDATE instead.",
  },
  {
    id: "executequery",
    label: "Send a SELECT from Java and get a ResultSet back",
    answer: "executeQuery",
    explanation:
      "executeQuery is the JDBC method for statements that return rows - you then loop with while (rs.next()).",
  },
  {
    id: "executeupdate",
    label: "Send an INSERT, UPDATE or DELETE and learn how many rows it changed",
    answer: "executeUpdate",
    explanation:
      "executeUpdate returns an int - the number of rows affected. 0 means the WHERE matched nothing.",
  },
  {
    id: "generatedkeys",
    label: "Find out which id the database gave the row you just inserted",
    answer: "getGeneratedKeys",
    explanation:
      "Prepare the statement with Statement.RETURN_GENERATED_KEYS, execute it, then read the new id from ps.getGeneratedKeys().",
  },
  {
    id: "commit",
    label: "Make two UPDATEs take effect together, after turning auto-commit off",
    answer: "commit",
    explanation:
      "conn.commit() ends the transaction and makes all its changes permanent in one step; conn.rollback() throws them all away.",
  },
];

const OPTIONS = [
  "INSERT",
  "SELECT",
  "UPDATE",
  "DELETE",
  "executeQuery",
  "executeUpdate",
  "getGeneratedKeys",
  "commit",
];

function PickStatementDemo() {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const allPicked = ITEMS.every((item) => picks[item.id]);
  const score = ITEMS.filter((item) => picks[item.id] === item.answer).length;

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        For each job, pick the SQL statement or JDBC call that does it. Each
        answer is right exactly once.
      </p>

      <div className="space-y-3">
        {ITEMS.map((item) => {
          const right = checked && picks[item.id] === item.answer;
          const wrong = checked && picks[item.id] && picks[item.id] !== item.answer;
          return (
            <div
              key={item.id}
              className={`rounded border p-3 ${
                right
                  ? "border-green-500 bg-green-500/10"
                  : wrong
                    ? "border-red-500 bg-red-500/10"
                    : "border-line"
              }`}
            >
              <p className="text-xs text-heading-alt mb-2">{item.label}</p>
              <div className="flex flex-wrap gap-2">
                {OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setChecked(false);
                      setPicks((p) => ({ ...p, [item.id]: option }));
                    }}
                    className={`font-mono text-xs px-3 py-1 rounded border ${
                      picks[item.id] === option
                        ? "bg-accent text-white border-accent"
                        : "border-line text-muted hover:text-accent"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {checked && wrong && (
                <p className="text-xs text-muted mt-2 mb-0 text-left">
                  → {item.answer}: {item.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={!allPicked}
          className="bg-accent text-white px-4 py-1 rounded text-sm hover:opacity-90 disabled:opacity-40"
        >
          Check
        </button>
        {checked && (
          <span className="text-sm font-semibold text-heading">
            {score} / {ITEMS.length}
          </span>
        )}
      </div>
    </div>
  );
}

export default PickStatementDemo;
