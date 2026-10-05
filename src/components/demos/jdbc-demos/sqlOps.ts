/**
 * A tiny pretend `product` table, just enough to show what each SQL
 * statement does to the rows and what the matching JDBC call hands back.
 * It is not an SQL engine - every operation is a fixed statement.
 */
export interface Row {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface TableState {
  rows: Row[];
  /** The identity column's counter - it never goes backwards, even after DELETE. */
  nextId: number;
}

export type OpId =
  | "insert"
  | "selectAll"
  | "selectWhere"
  | "aggregate"
  | "update"
  | "delete"
  | "deleteAll";

export type Cell = string | number | null;

export type Outcome =
  | { kind: "query"; columns: string[]; rows: Cell[][] }
  | { kind: "update"; affected: number };

export interface Operation {
  id: OpId;
  label: string;
  /** The statement with `?` placeholders, as it is written in Java. */
  sql: string;
  /** What gets bound to each `?`, in order. */
  params: string[];
  /** The JDBC code that sends it. */
  java: string;
  /** Which PreparedStatement/Statement method sends it. */
  call: "executeQuery" | "executeUpdate";
}

export const INITIAL_STATE: TableState = {
  rows: [
    { id: 1, name: "Keyboard", price: 899, stock: 25 },
    { id: 2, name: "Mouse", price: 299, stock: 40 },
    { id: 3, name: "Monitor", price: 2499, stock: 8 },
    { id: 4, name: "Cable", price: 49, stock: 120 },
  ],
  nextId: 5,
};

export const OPERATIONS: Operation[] = [
  {
    id: "insert",
    label: "INSERT",
    sql: "INSERT INTO product (name, price, stock)\nVALUES (?, ?, ?)",
    params: ["'Headset'", "599.00", "15"],
    call: "executeUpdate",
    java: `ps.setString(1, "Headset");
ps.setBigDecimal(2, new BigDecimal("599.00"));
ps.setInt(3, 15);
int rows = ps.executeUpdate();`,
  },
  {
    id: "selectAll",
    label: "SELECT all",
    sql: "SELECT id, name, price, stock\nFROM product\nORDER BY id",
    params: [],
    call: "executeQuery",
    java: `try (ResultSet rs = ps.executeQuery()) {
    while (rs.next()) {
        products.add(toProduct(rs));
    }
}`,
  },
  {
    id: "selectWhere",
    label: "SELECT ... WHERE",
    sql: "SELECT id, name, price, stock\nFROM product\nWHERE price < ?\nORDER BY price",
    params: ["500.00"],
    call: "executeQuery",
    java: `ps.setBigDecimal(1, new BigDecimal("500.00"));
try (ResultSet rs = ps.executeQuery()) {
    while (rs.next()) {
        products.add(toProduct(rs));
    }
}`,
  },
  {
    id: "aggregate",
    label: "COUNT / AVG",
    sql: "SELECT COUNT(*) AS n, AVG(price) AS avg_price\nFROM product",
    params: [],
    call: "executeQuery",
    java: `try (ResultSet rs = ps.executeQuery()) {
    rs.next();                 // always exactly one row
    int n = rs.getInt("n");
    BigDecimal avg = rs.getBigDecimal("avg_price"); // null if no rows
}`,
  },
  {
    id: "update",
    label: "UPDATE",
    sql: "UPDATE product\nSET price = ?\nWHERE id = ?",
    params: ["699.00", "1"],
    call: "executeUpdate",
    java: `ps.setBigDecimal(1, new BigDecimal("699.00"));
ps.setLong(2, 1);
int rows = ps.executeUpdate();`,
  },
  {
    id: "delete",
    label: "DELETE ... WHERE",
    sql: "DELETE FROM product\nWHERE id = ?",
    params: ["2"],
    call: "executeUpdate",
    java: `ps.setLong(1, 2);
int rows = ps.executeUpdate();`,
  },
  {
    id: "deleteAll",
    label: "DELETE (no WHERE!)",
    sql: "DELETE FROM product",
    params: [],
    call: "executeUpdate",
    java: `int rows = stmt.executeUpdate(
    "DELETE FROM product");   // every row is gone`,
  },
];

export function operation(id: OpId): Operation {
  const op = OPERATIONS.find((o) => o.id === id);
  if (!op) throw new Error(`unknown operation ${id}`);
  return op;
}

const money = (n: number) => n.toFixed(2);

export const COLUMNS = ["id", "name", "price", "stock"];
export const toCells = (r: Row): Cell[] => [r.id, r.name, money(r.price), r.stock];

/** Runs one operation: returns the table afterwards and what JDBC would hand back. */
export function run(
  state: TableState,
  id: OpId,
): { state: TableState; outcome: Outcome } {
  switch (id) {
    case "insert": {
      const row: Row = { id: state.nextId, name: "Headset", price: 599, stock: 15 };
      return {
        state: { rows: [...state.rows, row], nextId: state.nextId + 1 },
        outcome: { kind: "update", affected: 1 },
      };
    }
    case "selectAll":
      return {
        state,
        outcome: {
          kind: "query",
          columns: COLUMNS,
          rows: [...state.rows].sort((a, b) => a.id - b.id).map(toCells),
        },
      };
    case "selectWhere":
      return {
        state,
        outcome: {
          kind: "query",
          columns: COLUMNS,
          rows: state.rows
            .filter((r) => r.price < 500)
            .sort((a, b) => a.price - b.price)
            .map(toCells),
        },
      };
    case "aggregate": {
      const n = state.rows.length;
      const avg = n === 0 ? null : state.rows.reduce((sum, r) => sum + r.price, 0) / n;
      return {
        state,
        outcome: {
          kind: "query",
          columns: ["n", "avg_price"],
          rows: [[n, avg === null ? null : money(avg)]],
        },
      };
    }
    case "update": {
      const hit = state.rows.filter((r) => r.id === 1).length;
      return {
        state: {
          ...state,
          rows: state.rows.map((r) => (r.id === 1 ? { ...r, price: 699 } : r)),
        },
        outcome: { kind: "update", affected: hit },
      };
    }
    case "delete": {
      const rows = state.rows.filter((r) => r.id !== 2);
      return {
        state: { ...state, rows },
        outcome: { kind: "update", affected: state.rows.length - rows.length },
      };
    }
    case "deleteAll":
      return {
        state: { ...state, rows: [] },
        outcome: { kind: "update", affected: state.rows.length },
      };
  }
}

/** The statement with each `?` replaced by its bound value, for display. */
export function boundSql(op: Operation): string {
  let i = 0;
  return op.sql.replace(/\?/g, () => op.params[i++] ?? "?");
}
