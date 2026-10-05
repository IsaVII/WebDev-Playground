/**
 * The logic behind ComparatorBuilderDemo: sort a small list of employees by a
 * chain of keys, and print the Java `Comparator` that would do the same.
 */
export interface Employee {
  name: string;
  department: string;
  salary: number;
}

export type Field = "department" | "salary" | "name";
export type Direction = "asc" | "desc";
export interface SortKey {
  field: Field;
  direction: Direction;
}

export const FIELDS: Field[] = ["department", "salary", "name"];

export const EMPLOYEES: Employee[] = [
  { name: "Maja", department: "Sales", salary: 31000 },
  { name: "Omar", department: "IT", salary: 45000 },
  { name: "Lena", department: "IT", salary: 52000 },
  { name: "Adam", department: "Sales", salary: 31000 },
  { name: "Zoe", department: "IT", salary: 45000 },
  { name: "Björn", department: "Sales", salary: 38000 },
];

/** Like Java's compareTo/Integer.compare: negative, zero or positive. */
function compareField(a: Employee, b: Employee, field: Field): number {
  const x = a[field];
  const y = b[field];
  return x < y ? -1 : x > y ? 1 : 0;
}

/**
 * Sorts a copy of `rows` by the keys in order - the first key that tells two
 * rows apart decides. Rows that tie on every key keep their original order,
 * as with Java's List.sort (a stable sort).
 */
export function sortEmployees(rows: Employee[], keys: SortKey[]): Employee[] {
  return [...rows].sort((a, b) => {
    for (const { field, direction } of keys) {
      const result = compareField(a, b, field);
      if (result !== 0) return direction === "asc" ? result : -result;
    }
    return 0;
  });
}

const isInt = (field: Field) => field === "salary";

function firstKey({ field, direction }: SortKey): string {
  const ref = `Employee::${field}`;
  if (isInt(field)) {
    const base = `Comparator.comparingInt(${ref})`;
    return direction === "asc" ? base : `${base}.reversed()`;
  }
  return direction === "asc"
    ? `Comparator.comparing(${ref})`
    : `Comparator.comparing(${ref}, Comparator.reverseOrder())`;
}

function nextKey({ field, direction }: SortKey): string {
  const ref = `Employee::${field}`;
  if (direction === "desc") {
    return `.thenComparing(${ref}, Comparator.reverseOrder())`;
  }
  return isInt(field) ? `.thenComparingInt(${ref})` : `.thenComparing(${ref})`;
}

/** The Java expression for the chain, one key per line. */
export function comparatorCode(keys: SortKey[]): string {
  if (keys.length === 0) return "// no comparator - the list keeps its original order";
  const [first, ...rest] = keys;
  return [firstKey(first), ...rest.map(nextKey)].join("\n    ");
}
