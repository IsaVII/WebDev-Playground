import { EMPLOYEES, comparatorCode, sortEmployees } from "./comparatorChain";

const names = (keys: Parameters<typeof sortEmployees>[1]) =>
  sortEmployees(EMPLOYEES, keys).map((e) => e.name);

describe("sortEmployees", () => {
  it("keeps the original order when there are no keys", () => {
    expect(names([])).toEqual(EMPLOYEES.map((e) => e.name));
  });

  it("sorts by one key", () => {
    expect(names([{ field: "name", direction: "asc" }])).toEqual([
      "Adam",
      "Björn",
      "Lena",
      "Maja",
      "Omar",
      "Zoe",
    ]);
  });

  it("uses later keys only to break ties in earlier ones", () => {
    expect(
      names([
        { field: "department", direction: "asc" },
        { field: "salary", direction: "desc" },
        { field: "name", direction: "asc" },
      ]),
    ).toEqual(["Lena", "Omar", "Zoe", "Björn", "Adam", "Maja"]);
  });

  it("reverses a numeric key", () => {
    expect(names([{ field: "salary", direction: "desc" }]).slice(0, 3)).toEqual([
      "Lena",
      "Omar",
      "Zoe",
    ]);
  });

  it("keeps tied rows in their original order (stable sort)", () => {
    // Omar and Zoe both earn 45000; Omar comes first in the source list.
    const sorted = names([{ field: "salary", direction: "asc" }]);
    expect(sorted.indexOf("Omar")).toBeLessThan(sorted.indexOf("Zoe"));
    // Maja and Adam both earn 31000; Maja comes first in the source list.
    expect(sorted.indexOf("Maja")).toBeLessThan(sorted.indexOf("Adam"));
  });

  it("does not mutate the input", () => {
    const before = EMPLOYEES.map((e) => e.name);
    sortEmployees(EMPLOYEES, [{ field: "name", direction: "desc" }]);
    expect(EMPLOYEES.map((e) => e.name)).toEqual(before);
  });
});

describe("comparatorCode", () => {
  it("says so when there are no keys", () => {
    expect(comparatorCode([])).toMatch(/no comparator/);
  });

  it("builds the first key with comparing / comparingInt", () => {
    expect(comparatorCode([{ field: "name", direction: "asc" }])).toBe(
      "Comparator.comparing(Employee::name)",
    );
    expect(comparatorCode([{ field: "salary", direction: "asc" }])).toBe(
      "Comparator.comparingInt(Employee::salary)",
    );
  });

  it("reverses the first key", () => {
    expect(comparatorCode([{ field: "salary", direction: "desc" }])).toBe(
      "Comparator.comparingInt(Employee::salary).reversed()",
    );
    expect(comparatorCode([{ field: "name", direction: "desc" }])).toBe(
      "Comparator.comparing(Employee::name, Comparator.reverseOrder())",
    );
  });

  it("chains later keys with thenComparing", () => {
    expect(
      comparatorCode([
        { field: "department", direction: "asc" },
        { field: "salary", direction: "desc" },
        { field: "name", direction: "asc" },
      ]),
    ).toBe(
      [
        "Comparator.comparing(Employee::department)",
        ".thenComparing(Employee::salary, Comparator.reverseOrder())",
        ".thenComparing(Employee::name)",
      ].join("\n    "),
    );
  });

  it("uses thenComparingInt for a later ascending numeric key", () => {
    expect(
      comparatorCode([
        { field: "department", direction: "asc" },
        { field: "salary", direction: "asc" },
      ]),
    ).toContain(".thenComparingInt(Employee::salary)");
  });
});
