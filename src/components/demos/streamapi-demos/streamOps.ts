/**
 * The logic behind StreamExplorerDemo: a handful of stream operations applied
 * to a small list of sentences, with the list after every stage, the final
 * terminal operation, and the Java code that would do the same.
 */
export const SOURCE = ["to be or not", "to be", "that is the question"];

export type OpId =
  | "flatMap"
  | "map"
  | "filter"
  | "distinct"
  | "sorted"
  | "sortedByLength"
  | "limit"
  | "skip";

export interface Operation {
  id: OpId;
  /** The Java call, as it appears in a pipeline. */
  code: string;
  apply: (items: string[]) => string[];
}

/** Java's String ordering is by UTF-16 code unit - the same as JS `<`. */
const compareStrings = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

export const OPERATIONS: Operation[] = [
  {
    id: "flatMap",
    code: ".flatMap(s -> Arrays.stream(s.split(\" \")))",
    apply: (items) => items.flatMap((s) => s.split(" ")),
  },
  {
    id: "map",
    code: ".map(String::toUpperCase)",
    apply: (items) => items.map((s) => s.toUpperCase()),
  },
  {
    id: "filter",
    code: ".filter(s -> s.length() > 2)",
    apply: (items) => items.filter((s) => s.length > 2),
  },
  {
    id: "distinct",
    code: ".distinct()",
    apply: (items) => items.filter((s, i) => items.indexOf(s) === i),
  },
  {
    id: "sorted",
    code: ".sorted()",
    apply: (items) => [...items].sort(compareStrings),
  },
  {
    id: "sortedByLength",
    code: ".sorted(Comparator.comparingInt(String::length)\n        .thenComparing(Comparator.naturalOrder()))",
    apply: (items) =>
      [...items].sort((a, b) => a.length - b.length || compareStrings(a, b)),
  },
  { id: "limit", code: ".limit(4)", apply: (items) => items.slice(0, 4) },
  { id: "skip", code: ".skip(2)", apply: (items) => items.slice(2) },
];

export type TerminalId = "toList" | "count" | "joining" | "groupingBy";

export interface Terminal {
  id: TerminalId;
  code: string;
  run: (items: string[]) => string;
}

export const TERMINALS: Terminal[] = [
  { id: "toList", code: ".toList()", run: (items) => `[${items.join(", ")}]` },
  { id: "count", code: ".count()", run: (items) => String(items.length) },
  {
    id: "joining",
    code: '.collect(Collectors.joining(", "))',
    run: (items) => items.join(", "),
  },
  {
    id: "groupingBy",
    code: ".collect(Collectors.groupingBy(String::length, Collectors.counting()))",
    run: (items) => {
      const counts = new Map<number, number>();
      for (const s of items) counts.set(s.length, (counts.get(s.length) ?? 0) + 1);
      const entries = [...counts].sort((a, b) => a[0] - b[0]);
      return `{${entries.map(([k, v]) => `${k}=${v}`).join(", ")}}`;
    },
  },
];

const operation = (id: OpId) => OPERATIONS.find((o) => o.id === id)!;
const terminal = (id: TerminalId) => TERMINALS.find((t) => t.id === id)!;

/** The list before any operation, then after each operation in turn. */
export function stages(ops: OpId[]): string[][] {
  const result = [SOURCE];
  for (const id of ops) result.push(operation(id).apply(result[result.length - 1]));
  return result;
}

export function finalResult(ops: OpId[], terminalId: TerminalId): string {
  const all = stages(ops);
  return terminal(terminalId).run(all[all.length - 1]);
}

export function pipelineCode(ops: OpId[], terminalId: TerminalId): string {
  return [
    "sentences.stream()",
    ...ops.map((id) => `    ${operation(id).code}`),
    `    ${terminal(terminalId).code};`,
  ].join("\n");
}
