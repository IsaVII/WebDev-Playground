import {
  INITIAL_STATE,
  OPERATIONS,
  boundSql,
  operation,
  run,
  type OpId,
  type Outcome,
  type TableState,
} from "./sqlOps";

const apply = (ids: OpId[], from: TableState = INITIAL_STATE) => {
  let state = from;
  let outcome: Outcome | undefined;
  for (const id of ids) {
    ({ state, outcome } = run(state, id));
  }
  return { state, outcome };
};

describe("run", () => {
  it("INSERT adds one row with the next identity value and reports 1 row", () => {
    const { state, outcome } = apply(["insert"]);
    expect(outcome).toEqual({ kind: "update", affected: 1 });
    expect(state.rows.at(-1)).toEqual({ id: 5, name: "Headset", price: 599, stock: 15 });
    expect(state.nextId).toBe(6);
  });

  it("never reuses an id after a DELETE", () => {
    const { state } = apply(["delete", "insert"]);
    expect(state.rows.map((r) => r.id)).toEqual([1, 3, 4, 5]);
  });

  it("SELECT all returns every row and leaves the table unchanged", () => {
    const { state, outcome } = apply(["selectAll"]);
    expect(state).toBe(INITIAL_STATE);
    expect(outcome).toMatchObject({ kind: "query", columns: ["id", "name", "price", "stock"] });
    expect(outcome?.kind === "query" && outcome.rows).toHaveLength(4);
  });

  it("SELECT WHERE filters and sorts by price", () => {
    const { outcome } = apply(["selectWhere"]);
    expect(outcome?.kind === "query" && outcome.rows.map((r) => r[1])).toEqual(["Cable", "Mouse"]);
  });

  it("COUNT/AVG always returns one row, with a NULL average on an empty table", () => {
    expect(apply(["aggregate"]).outcome).toEqual({
      kind: "query",
      columns: ["n", "avg_price"],
      rows: [[4, "936.50"]],
    });
    expect(apply(["deleteAll", "aggregate"]).outcome).toEqual({
      kind: "query",
      columns: ["n", "avg_price"],
      rows: [[0, null]],
    });
  });

  it("UPDATE changes the matching row and reports it", () => {
    const { state, outcome } = apply(["update"]);
    expect(outcome).toEqual({ kind: "update", affected: 1 });
    expect(state.rows[0].price).toBe(699);
  });

  it("UPDATE of a row that is gone affects 0 rows without failing", () => {
    expect(apply(["deleteAll", "update"]).outcome).toEqual({ kind: "update", affected: 0 });
  });

  it("DELETE WHERE removes one row; a second run removes nothing", () => {
    const first = apply(["delete"]);
    expect(first.outcome).toEqual({ kind: "update", affected: 1 });
    expect(first.state.rows).toHaveLength(3);
    expect(apply(["delete", "delete"]).outcome).toEqual({ kind: "update", affected: 0 });
  });

  it("DELETE without WHERE removes every row", () => {
    const { state, outcome } = apply(["deleteAll"]);
    expect(outcome).toEqual({ kind: "update", affected: 4 });
    expect(state.rows).toEqual([]);
  });

  it("does not mutate the state it is given", () => {
    const before = JSON.stringify(INITIAL_STATE);
    apply(["insert", "update", "delete", "deleteAll"]);
    expect(JSON.stringify(INITIAL_STATE)).toBe(before);
  });
});

describe("operations", () => {
  it("each has as many params as ? placeholders", () => {
    for (const op of OPERATIONS) {
      expect(op.params).toHaveLength((op.sql.match(/\?/g) ?? []).length);
    }
  });

  it("boundSql substitutes the params in order", () => {
    expect(boundSql(operation("update"))).toBe("UPDATE product\nSET price = 699.00\nWHERE id = 1");
  });

  it("uses executeQuery for SELECT and executeUpdate for everything else", () => {
    for (const op of OPERATIONS) {
      expect(op.call).toBe(op.sql.startsWith("SELECT") ? "executeQuery" : "executeUpdate");
    }
  });
});
