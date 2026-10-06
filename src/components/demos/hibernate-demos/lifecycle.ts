/**
 * A tiny model of one `Product` entity and the Hibernate session around it,
 * just enough to show how the four lifecycle states react to persist, find,
 * merge, detach, remove and commit. It is not Hibernate - every rule here is
 * one the lesson states, applied to a single entity with an identity id.
 */
export type EntityState = "transient" | "managed" | "detached" | "removed";

export interface Model {
  state: EntityState;
  /** null until the database has handed out an id. */
  id: number | null;
  /** The price the Java object holds right now. */
  price: number;
  /** The row in the database, as far as Hibernate has sent SQL. */
  row: { id: number; price: number } | null;
  /** The identity column's counter. */
  nextId: number;
}

export type OpId = "persist" | "setPrice" | "find" | "merge" | "detach" | "remove" | "commit";

export interface Operation {
  id: OpId;
  label: string;
  /** The Java that makes this call. */
  java: string;
}

export interface Result {
  model: Model;
  /** SQL Hibernate sends because of this call, in order. */
  sql: string[];
  /** ok: worked; info: nothing happened; error: Hibernate throws. */
  kind: "ok" | "info" | "error";
  note: string;
}

export const NAME = "Keyboard";
const PRICE_STEP = 100;
const MIN_PRICE = 99;

export const INITIAL_MODEL: Model = {
  state: "transient",
  id: null,
  price: 899,
  row: null,
  nextId: 1,
};

export const OPERATIONS: Operation[] = [
  { id: "persist", label: "persist(p)", java: "session.persist(p);" },
  { id: "setPrice", label: "p.setPrice(-100)", java: "p.setPrice(p.getPrice().subtract(new BigDecimal(100)));" },
  { id: "commit", label: "commit()", java: "tx.commit();   // flushes first" },
  { id: "find", label: "find(id)", java: "Product again = session.find(Product.class, id);" },
  { id: "merge", label: "merge(p)", java: "Product managed = session.merge(p);" },
  { id: "detach", label: "detach(p)", java: "session.detach(p);   // closing the session does the same" },
  { id: "remove", label: "remove(p)", java: "session.remove(p);" },
];

export const STATE_DESCRIPTIONS: Record<EntityState, string> = {
  transient: "A plain Java object. Hibernate has never seen it and there is no row for it.",
  managed: "Tracked by the session. Changes to it are noticed and written to the database.",
  detached: "Has an id, but the session no longer tracks it. Changes to it are ignored.",
  removed: "Still tracked, but scheduled for deletion at the next commit.",
};

export const money = (n: number) => n.toFixed(2);

const insertSql = (price: number) =>
  `insert into product (name, price) values ('${NAME}', ${money(price)})`;
const updateSql = (id: number, price: number) =>
  `update product set name='${NAME}', price=${money(price)} where id=${id}`;
const selectSql = (id: number) => `select id, name, price from product where id=${id}`;
const deleteSql = (id: number) => `delete from product where id=${id}`;

/** Managed and different from the database row: commit would send an UPDATE. */
export function isDirty(m: Model): boolean {
  return m.state === "managed" && m.row !== null && m.price !== m.row.price;
}

export function operation(id: OpId): Operation {
  const op = OPERATIONS.find((o) => o.id === id);
  if (!op) throw new Error(`unknown operation ${id}`);
  return op;
}

const info = (model: Model, note: string): Result => ({ model, sql: [], kind: "info", note });
const error = (model: Model, note: string): Result => ({ model, sql: [], kind: "error", note });

/** Inserts the object as a new row; the identity column needs the INSERT now. */
function insertRow(m: Model, note: string): Result {
  const id = m.nextId;
  return {
    model: { ...m, state: "managed", id, row: { id, price: m.price }, nextId: id + 1 },
    sql: [insertSql(m.price)],
    kind: "ok",
    note,
  };
}

export function run(m: Model, id: OpId): Result {
  switch (id) {
    case "persist":
      switch (m.state) {
        case "transient":
          return insertRow(
            m,
            "p is now managed. The id comes from the database's identity column, so Hibernate had to send the INSERT right away to learn it.",
          );
        case "managed":
          return info(m, "p is already managed - persist on a managed entity does nothing.");
        case "removed":
          return {
            model: { ...m, state: "managed" },
            sql: [],
            kind: "ok",
            note: "persist on a removed entity cancels the removal - the DELETE will not be sent.",
          };
        case "detached":
          return error(
            m,
            "EntityExistsException: Detached entity passed to persist. Use merge to bring a detached object back.",
          );
      }
      break;

    case "setPrice": {
      const price = Math.max(m.price - PRICE_STEP, MIN_PRICE);
      const model = { ...m, price };
      switch (m.state) {
        case "managed":
          return {
            model,
            sql: [],
            kind: "ok",
            note: "Nothing is sent yet. The session remembers the values it loaded and compares them at flush time - that is dirty checking.",
          };
        case "transient":
          return info(model, "Just a Java object - Hibernate knows nothing about it.");
        case "detached":
          return info(
            model,
            "The session no longer tracks p, so this change is invisible to Hibernate. It reaches the database only if you merge p.",
          );
        case "removed":
          return info(model, "p is scheduled for deletion, so the new price will never be written.");
      }
      break;
    }

    case "commit":
      switch (m.state) {
        case "managed":
          if (m.row && isDirty(m)) {
            return {
              model: { ...m, row: { ...m.row, price: m.price } },
              sql: [updateSql(m.row.id, m.price)],
              kind: "ok",
              note: "Dirty checking found that price differs from the loaded value, so Hibernate sent an UPDATE. You never called save() or update(). It writes every column by default, not only the changed one.",
            };
          }
          return info(m, "No SQL: nothing changed since p was loaded, so there is nothing to write.");
        case "removed":
          return {
            model: { ...m, state: "detached", row: null },
            sql: [deleteSql(m.id ?? 0)],
            kind: "ok",
            note: "The queued DELETE is sent at commit. The Java object lives on, but it no longer has a row and the session has let go of it.",
          };
        default:
          return info(m, "The session manages nothing, so there is nothing to flush.");
      }

    case "find":
      switch (m.state) {
        case "transient":
          return info(m, "p has no id yet, so there is nothing to look up.");
        case "managed":
          return info(
            m,
            "No SQL: the session already holds this entity and hands back the same instance (the first-level cache).",
          );
        case "removed":
          return info(m, "find returns null for an entity that is scheduled for removal.");
        case "detached": {
          const select = selectSql(m.id ?? 0);
          if (!m.row) {
            return { model: m, sql: [select], kind: "info", note: "The SELECT found no row, so find returns null." };
          }
          return {
            model: { ...m, state: "managed", price: m.row.price },
            sql: [select],
            kind: "ok",
            note: "A SELECT ran. find returned a new managed instance with the database values (shown here as p). The old detached object is a separate, possibly stale copy.",
          };
        }
      }
      break;

    case "merge":
      switch (m.state) {
        case "transient":
          return insertRow(
            m,
            "merge never makes the object you pass in managed - it returns a managed copy. The copy was inserted; keep using it, not p.",
          );
        case "managed":
          return info(m, "Already managed: merge returns the same instance and sends nothing.");
        case "removed":
          return error(m, "Hibernate refuses to merge a removed entity. Cancel the removal with persist instead.");
        case "detached": {
          if (!m.row) {
            return info(m, "The row is gone, so there is nothing to merge into. Press Reset to start again.");
          }
          return {
            model: { ...m, state: "managed" },
            sql: [selectSql(m.row.id)],
            kind: "ok",
            note: "Hibernate loaded the row, copied the detached values onto the managed copy and returned it. If they differ, the copy is dirty and the UPDATE goes out at commit.",
          };
        }
      }
      break;

    case "detach":
      switch (m.state) {
        case "managed":
          return {
            model: { ...m, state: "detached" },
            sql: [],
            kind: "ok",
            note: isDirty(m)
              ? "p is detached and its unflushed price change is lost - the UPDATE is never sent. Closing the session before commit does the same."
              : "p is detached: still a Java object, but the session no longer tracks it.",
          };
        case "removed":
          return info(m, "Not modelled in this demo. Press Reset.");
        default:
          return info(m, "p is not managed, so there is nothing to detach.");
      }

    case "remove":
      switch (m.state) {
        case "managed":
          return {
            model: { ...m, state: "removed" },
            sql: [],
            kind: "ok",
            note: "Nothing is sent yet - the DELETE is queued until commit.",
          };
        case "removed":
          return info(m, "p is already scheduled for removal.");
        case "transient":
          return info(m, "remove ignores a transient object - there is no row to delete.");
        case "detached":
          return {
            model: { ...m, state: "removed" },
            sql: [],
            kind: "ok",
            note: "Hibernate 7 accepts this and queues the DELETE for commit; older versions threw \"Removing a detached instance\". The portable habit is to find the entity first, then remove it.",
          };
      }
      break;
  }
  throw new Error(`unhandled ${id} in state ${m.state}`);
}
