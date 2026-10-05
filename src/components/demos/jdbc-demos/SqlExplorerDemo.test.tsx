import { fireEvent, render, screen, within } from "@testing-library/react";
import SqlExplorerDemo from "./SqlExplorerDemo";

const choose = (name: string) =>
  fireEvent.click(
    within(screen.getByRole("group", { name: "Statement" })).getByRole("button", { name }),
  );
const run = () => fireEvent.click(screen.getByRole("button", { name: "Run" }));
const tableRows = () => within(screen.getByTestId("table")).getAllByRole("row").length - 1;

describe("SqlExplorerDemo", () => {
  it("starts on SELECT all with an untouched table and no result yet", () => {
    render(<SqlExplorerDemo />);
    expect(tableRows()).toBe(4);
    expect(screen.getByRole("status")).toHaveTextContent("Press Run");
    expect(screen.queryByTestId("result")).toBeNull();
  });

  it("shows the ResultSet for a SELECT and leaves the table alone", () => {
    render(<SqlExplorerDemo />);
    choose("SELECT ... WHERE");
    run();
    expect(screen.getByRole("status")).toHaveTextContent("ResultSet with 2 rows");
    expect(within(screen.getByTestId("result")).getByText("Cable")).toBeInTheDocument();
    expect(tableRows()).toBe(4);
  });

  it("INSERT adds a row and reports the rows affected", () => {
    render(<SqlExplorerDemo />);
    choose("INSERT");
    run();
    expect(screen.getByRole("status")).toHaveTextContent("executeUpdate() returned 1 row affected");
    expect(tableRows()).toBe(5);
    expect(screen.getByText("Next generated id: 6")).toBeInTheDocument();
  });

  it("a second DELETE ... WHERE affects 0 rows and says that is not an error", () => {
    render(<SqlExplorerDemo />);
    choose("DELETE ... WHERE");
    run();
    run();
    expect(screen.getByRole("status")).toHaveTextContent("0 rows affected - no error");
    expect(tableRows()).toBe(3);
  });

  it("shows NULL for the average of an empty table, and Reset brings the rows back", () => {
    render(<SqlExplorerDemo />);
    choose("DELETE (no WHERE!)");
    run();
    expect(screen.getByText("(no rows)")).toBeInTheDocument();
    choose("COUNT / AVG");
    run();
    expect(within(screen.getByTestId("result")).getByText("NULL")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reset table" }));
    expect(tableRows()).toBe(4);
  });

  it("lists the bound values for a parameterised statement", () => {
    render(<SqlExplorerDemo />);
    choose("UPDATE");
    expect(screen.getByTestId("bound")).toHaveTextContent("699.00, 1");
  });
});
