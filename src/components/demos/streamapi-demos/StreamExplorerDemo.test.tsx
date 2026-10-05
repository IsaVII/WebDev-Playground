import { fireEvent, render, screen, within } from "@testing-library/react";
import StreamExplorerDemo from "./StreamExplorerDemo";

const add = (name: RegExp | string) =>
  fireEvent.click(
    within(screen.getByRole("group", { name: "Add operation" })).getByRole("button", { name }),
  );

describe("StreamExplorerDemo", () => {
  it("starts with flatMap, distinct and sorted and shows every stage", () => {
    render(<StreamExplorerDemo />);
    expect(screen.getByTestId("stage-0").children).toHaveLength(3);
    expect(screen.getByTestId("stage-1").children).toHaveLength(10);
    expect(screen.getByTestId("stage-2").children).toHaveLength(8);
    expect(screen.getByTestId("stage-3").textContent).toBe("beisnotorquestionthattheto");
    expect(screen.getByRole("status")).toHaveTextContent("[be, is, not, or, question, that, the, to]");
  });

  it("changes the result when the order of the operations changes", () => {
    render(<StreamExplorerDemo />);
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    add(/flatMap/);
    add(/limit/);
    add(/^\+ sorted$/);
    expect(screen.getByRole("status")).toHaveTextContent("[be, not, or, to]");

    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    add(/flatMap/);
    add(/^\+ sorted$/);
    add(/limit/);
    expect(screen.getByRole("status")).toHaveTextContent("[be, be, is, not]");
  });

  it("switches the terminal operation", () => {
    render(<StreamExplorerDemo />);
    fireEvent.click(screen.getByRole("button", { name: "count()" }));
    expect(screen.getByRole("status")).toHaveTextContent("Result: 8");
  });

  it("stops offering operations after five", () => {
    render(<StreamExplorerDemo />);
    add(/map \(upper\)/);
    add(/skip/);
    expect(within(screen.getByRole("group", { name: "Add operation" })).getByRole("button", { name: /limit/ })).toBeDisabled();
  });

  it("removes the last operation", () => {
    render(<StreamExplorerDemo />);
    fireEvent.click(screen.getByRole("button", { name: "Remove last" }));
    expect(screen.queryByTestId("stage-3")).toBeNull();
  });
});
