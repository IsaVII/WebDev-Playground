import { INITIAL_MODEL, isDirty, run, type Model, type OpId, type Result } from "./lifecycle";

/** Applies a sequence of calls and returns the last result, plus every SQL statement sent. */
function play(...ops: OpId[]) {
  let model: Model = INITIAL_MODEL;
  const sql: string[] = [];
  let result: Result = { model, sql: [], kind: "info", note: "" };
  for (const op of ops) {
    result = run(model, op);
    model = result.model;
    sql.push(...result.sql);
  }
  return { model, sql, result };
}

describe("persist", () => {
  it("inserts at once (identity id) and makes the object managed", () => {
    const { model, sql } = play("persist");
    expect(model.state).toBe("managed");
    expect(model.id).toBe(1);
    expect(model.row).toEqual({ id: 1, price: 899 });
    expect(sql).toEqual(["insert into product (name, price) values ('Keyboard', 899.00)"]);
  });

  it("does nothing on a managed entity", () => {
    const { sql, result } = play("persist", "persist");
    expect(sql).toHaveLength(1);
    expect(result.kind).toBe("info");
  });

  it("throws for a detached entity", () => {
    const { result } = play("persist", "detach", "persist");
    expect(result.kind).toBe("error");
    expect(result.note).toContain("Detached entity passed to persist");
  });

  it("cancels a pending removal", () => {
    const { model, sql } = play("persist", "remove", "persist", "commit");
    expect(model.state).toBe("managed");
    expect(model.row).not.toBeNull();
    expect(sql).toHaveLength(1);
  });
});

describe("dirty checking", () => {
  it("sends no SQL for a price change until commit, then one UPDATE", () => {
    const afterChange = play("persist", "setPrice");
    expect(isDirty(afterChange.model)).toBe(true);
    expect(afterChange.sql).toHaveLength(1);

    const { model, sql } = play("persist", "setPrice", "commit");
    expect(sql[1]).toBe("update product set name='Keyboard', price=799.00 where id=1");
    expect(model.row?.price).toBe(799);
    expect(isDirty(model)).toBe(false);
  });

  it("sends nothing when commit finds no change", () => {
    const { sql, result } = play("persist", "commit");
    expect(sql).toHaveLength(1);
    expect(result.kind).toBe("info");
  });

  it("a price set before persist is simply part of the INSERT", () => {
    const { model, sql } = play("setPrice", "persist", "commit");
    expect(sql).toEqual(["insert into product (name, price) values ('Keyboard', 799.00)"]);
    expect(model.row?.price).toBe(799);
  });

  it("keeps a floor so the price never goes negative", () => {
    let model: Model = INITIAL_MODEL;
    for (let i = 0; i < 20; i++) model = run(model, "setPrice").model;
    expect(model.price).toBe(99);
  });
});

describe("detach and merge", () => {
  it("loses an unflushed change when detached", () => {
    const { model, sql, result } = play("persist", "setPrice", "detach", "commit");
    expect(model.state).toBe("detached");
    expect(model.row?.price).toBe(899);
    expect(sql).toHaveLength(1);
    expect(result.kind).toBe("info");
  });

  it("ignores changes to a detached object", () => {
    const { model, result } = play("persist", "detach", "setPrice");
    expect(model.price).toBe(799);
    expect(model.row?.price).toBe(899);
    expect(result.kind).toBe("info");
  });

  it("merge SELECTs, re-attaches, and the UPDATE follows at commit", () => {
    const { model, sql } = play("persist", "detach", "setPrice", "merge", "commit");
    expect(sql).toEqual([
      "insert into product (name, price) values ('Keyboard', 899.00)",
      "select id, name, price from product where id=1",
      "update product set name='Keyboard', price=799.00 where id=1",
    ]);
    expect(model.state).toBe("managed");
    expect(model.row?.price).toBe(799);
  });

  it("merge of a transient object inserts a managed copy", () => {
    const { model, sql } = play("merge");
    expect(model.state).toBe("managed");
    expect(sql).toHaveLength(1);
  });

  it("merge on a managed entity sends nothing", () => {
    const { sql } = play("persist", "merge");
    expect(sql).toHaveLength(1);
  });
});

describe("find", () => {
  it("is served from the first-level cache when managed", () => {
    const { sql, result } = play("persist", "find");
    expect(sql).toHaveLength(1);
    expect(result.note).toContain("first-level cache");
  });

  it("SELECTs when detached and returns the database values", () => {
    const { model, sql } = play("persist", "detach", "setPrice", "find");
    expect(sql[1]).toBe("select id, name, price from product where id=1");
    expect(model.state).toBe("managed");
    expect(model.price).toBe(899);
  });

  it("has nothing to look up before persist", () => {
    expect(play("find").result.kind).toBe("info");
  });
});

describe("remove", () => {
  it("queues the DELETE until commit", () => {
    const afterRemove = play("persist", "remove");
    expect(afterRemove.model.state).toBe("removed");
    expect(afterRemove.sql).toHaveLength(1);

    const { model, sql } = play("persist", "remove", "commit");
    expect(sql[1]).toBe("delete from product where id=1");
    expect(model.row).toBeNull();
    expect(model.state).toBe("detached");
  });

  it("accepts a detached entity (Hibernate 7) and queues the DELETE", () => {
    const afterRemove = play("persist", "detach", "remove");
    expect(afterRemove.model.state).toBe("removed");
    expect(afterRemove.sql).toHaveLength(1);

    const { model, sql } = play("persist", "detach", "remove", "commit");
    expect(sql[1]).toBe("delete from product where id=1");
    expect(model.row).toBeNull();
  });

  it("cannot persist an entity again after its DELETE was flushed", () => {
    const { result } = play("persist", "remove", "commit", "persist");
    expect(result.kind).toBe("error");
  });

  it("ignores a transient object", () => {
    const { result } = play("remove");
    expect(result.kind).toBe("info");
  });

  it("refuses to merge a removed entity", () => {
    expect(play("persist", "remove", "merge").result.kind).toBe("error");
  });
});

describe("every operation in every state", () => {
  const ops: OpId[] = ["persist", "setPrice", "find", "merge", "detach", "remove", "commit"];
  const reach: { state: string; setup: OpId[] }[] = [
    { state: "transient", setup: [] },
    { state: "managed", setup: ["persist"] },
    { state: "detached", setup: ["persist", "detach"] },
    { state: "removed", setup: ["persist", "remove"] },
    { state: "detached (row deleted)", setup: ["persist", "remove", "commit"] },
  ];

  it.each(reach)("never throws and always returns a note when $state", ({ setup }) => {
    let model: Model = INITIAL_MODEL;
    for (const op of setup) model = run(model, op).model;
    for (const op of ops) {
      const result = run(model, op);
      expect(result.note).toBeTruthy();
    }
  });
});
