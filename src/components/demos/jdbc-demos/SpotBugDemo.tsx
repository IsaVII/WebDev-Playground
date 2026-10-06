import ScenarioQuiz, { type Scenario } from "../ScenarioQuiz";

const SCENARIOS: Scenario[] = [
  {
    id: "injection",
    code: `String sql = "SELECT * FROM users WHERE name = '" + name + "'";
ResultSet rs = stmt.executeQuery(sql);`,
    options: [
      "The user's input is glued into the SQL (SQL injection)",
      "SELECT * is not allowed in JDBC",
      "executeQuery cannot take a String",
    ],
    answer: "The user's input is glued into the SQL (SQL injection)",
    explanation:
      "A name like ' OR '1'='1 turns the WHERE into something that matches every row - or worse. Use a PreparedStatement with WHERE name = ? and ps.setString(1, name): the value travels separately and is never parsed as SQL.",
  },
  {
    id: "index",
    code: `try (ResultSet rs = ps.executeQuery()) {
    while (rs.next()) {
        String name = rs.getString(0);
    }
}`,
    options: [
      "Column indexes start at 1, not 0",
      "getString cannot read a name",
      "next() must be called after getString",
    ],
    answer: "Column indexes start at 1, not 0",
    explanation:
      "JDBC counts columns - and the ? parameters in setString(1, ...) - from 1. Index 0 throws an SQLException. Reading by column name, rs.getString(\"name\"), avoids the mistake and survives a reordered SELECT list.",
  },
  {
    id: "next",
    code: `try (ResultSet rs = ps.executeQuery()) {
    String name = rs.getString("name");
}`,
    options: [
      "next() was never called, so the cursor is before the first row",
      "A ResultSet must be closed before it is read",
      "getString needs a column number",
    ],
    answer: "next() was never called, so the cursor is before the first row",
    explanation:
      "A ResultSet starts positioned before the first row. rs.next() moves to the next row and returns false when there are no more - use if (rs.next()) for one row and while (rs.next()) for many.",
  },
  {
    id: "wrongcall",
    code: `PreparedStatement ps = conn.prepareStatement(
    "DELETE FROM product WHERE id = ?");
ps.setLong(1, 7);
ResultSet rs = ps.executeQuery();`,
    options: [
      "executeQuery is for statements that return rows; DELETE needs executeUpdate",
      "DELETE cannot be used with a PreparedStatement",
      "setLong should be setInt",
    ],
    answer: "executeQuery is for statements that return rows; DELETE needs executeUpdate",
    explanation:
      "executeQuery expects a ResultSet and the PostgreSQL driver throws \"No results were returned by the query\" for a DELETE. INSERT, UPDATE and DELETE use executeUpdate, which returns the number of rows changed.",
  },
  {
    id: "leak",
    code: `Connection conn = DriverManager.getConnection(url, user, pw);
PreparedStatement ps = conn.prepareStatement(sql);
ps.executeUpdate();
// method returns here`,
    options: [
      "The connection and statement are never closed (a resource leak)",
      "executeUpdate cannot run on a Connection",
      "The URL must be read from a file",
    ],
    answer: "The connection and statement are never closed (a resource leak)",
    explanation:
      "Every open connection is a session held on the database server, and the server only allows a limited number. Put the Connection, PreparedStatement and ResultSet in a try-with-resources so they are closed even when an exception is thrown.",
  },
  {
    id: "commit",
    code: `conn.setAutoCommit(false);
ps.executeUpdate();
conn.close();`,
    options: [
      "commit() was never called, so the change is rolled back",
      "setAutoCommit(false) closes the connection",
      "The change is saved, because close() commits",
    ],
    answer: "commit() was never called, so the change is rolled back",
    explanation:
      "With auto-commit off, changes stay in an open transaction until conn.commit(). Closing the connection without it throws the work away. Pair setAutoCommit(false) with commit() on success and rollback() in the catch block.",
  },
];

function SpotBugDemo() {
  return (
    <ScenarioQuiz
      intro="Each snippet has one classic JDBC mistake. Pick what is wrong with it."
      scenarios={SCENARIOS}
    />
  );
}

export default SpotBugDemo;
