import { fireEvent, render, screen } from "@testing-library/react";
import RaceConditionDemo from "./RaceConditionDemo";

function clickNextUntilDone() {
  const next = screen.getByRole("button", { name: /Next step/ });
  while (!(next as HTMLButtonElement).disabled) fireEvent.click(next);
}

describe("RaceConditionDemo", () => {
  it("loses an update without synchronization", () => {
    render(<RaceConditionDemo />);
    clickNextUntilDone();
    expect(screen.getByText(/Final count = 1 - expected 2/)).toBeInTheDocument();
  });

  it("reaches 2 once the threads take turns with synchronized", () => {
    render(<RaceConditionDemo />);
    fireEvent.click(screen.getByRole("button", { name: "synchronized" }));
    clickNextUntilDone();
    expect(screen.getByText(/Final count = 2 ✓/)).toBeInTheDocument();
  });

  it("restarts from the first step when switching mode", () => {
    render(<RaceConditionDemo />);
    fireEvent.click(screen.getByRole("button", { name: /Next step/ }));
    fireEvent.click(screen.getByRole("button", { name: "synchronized" }));
    expect(screen.getByText(/inside synchronized\(counter\)/)).toBeInTheDocument();
  });
});
