import { fireEvent, render, screen, within } from "@testing-library/react";
import ComparatorBuilderDemo from "./ComparatorBuilderDemo";

/** The name column of the result table, top to bottom. */
function order() {
  return screen
    .getAllByRole("row")
    .slice(1)
    .map((row) => within(row).getAllByRole("cell")[1].textContent);
}

function field(slot: number, name: string) {
  return within(
    screen.getByRole("group", {
      name: `${["Sort by", "Then by", "Then by"][slot - 1]} ${slot} field`,
    }),
  ).getByRole("button", { name });
}

describe("ComparatorBuilderDemo", () => {
  it("starts sorted by department, then salary descending, then name", () => {
    render(<ComparatorBuilderDemo />);
    expect(order()).toEqual(["Lena", "Omar", "Zoe", "Björn", "Adam", "Maja"]);
  });

  it("falls back to the original order on ties once the name key is removed", () => {
    render(<ComparatorBuilderDemo />);
    fireEvent.click(field(3, "name")); // toggles the third key off
    // Adam and Maja tie (Sales, 31000): Maja was first in the source list.
    expect(order()).toEqual(["Lena", "Omar", "Zoe", "Björn", "Maja", "Adam"]);
  });

  it("does not offer a field that another key already uses", () => {
    render(<ComparatorBuilderDemo />);
    expect(field(2, "department")).toBeDisabled();
    expect(field(2, "salary")).toBeEnabled();
  });

  it("flips a key's direction", () => {
    render(<ComparatorBuilderDemo />);
    fireEvent.click(
      within(screen.getByRole("group", { name: "Sort by 1 direction" })).getByRole(
        "button",
        { name: "descending" },
      ),
    );
    // Sales now comes before IT; the salary and name keys still order each group.
    expect(order()).toEqual(["Björn", "Adam", "Maja", "Lena", "Omar", "Zoe"]);
  });
});
