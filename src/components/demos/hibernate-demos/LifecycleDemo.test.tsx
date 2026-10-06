import { fireEvent, render, screen, within } from "@testing-library/react";
import LifecycleDemo from "./LifecycleDemo";

const call = (name: string) =>
  fireEvent.click(
    within(screen.getByRole("group", { name: "Operation" })).getByRole("button", { name }),
  );
const currentState = () =>
  within(screen.getByRole("group", { name: "Lifecycle state" }))
    .getAllByText(/Transient|Managed|Detached|Removed/)
    .find((el) => el.getAttribute("aria-current") === "true")?.textContent;

describe("LifecycleDemo", () => {
  it("starts transient with no rows and nothing sent", () => {
    render(<LifecycleDemo />);
    expect(currentState()).toBe("Transient");
    expect(screen.getByText("(no rows)")).toBeInTheDocument();
    expect(screen.getByTestId("sql-log")).toHaveTextContent("nothing sent yet");
    expect(screen.getByRole("status")).toHaveTextContent("Press a button");
  });

  it("persist inserts a row at once and logs the INSERT", () => {
    render(<LifecycleDemo />);
    call("persist(p)");
    expect(currentState()).toBe("Managed");
    expect(screen.getByTestId("sql-log")).toHaveTextContent("insert into product");
    expect(within(screen.getByTestId("db")).getByText("899.00")).toBeInTheDocument();
  });

  it("a price change only reaches the table at commit()", () => {
    render(<LifecycleDemo />);
    call("persist(p)");
    call("p.setPrice(-100)");
    expect(screen.getByTestId("object")).toHaveTextContent("price: 799.00");
    expect(screen.getByTestId("object")).toHaveTextContent("changed since loaded: yes");
    expect(within(screen.getByTestId("db")).getByText("899.00")).toBeInTheDocument();

    call("commit()");
    expect(within(screen.getByTestId("db")).getByText("799.00")).toBeInTheDocument();
    expect(screen.getByTestId("sql-log")).toHaveTextContent("update product set");
    expect(screen.getByTestId("object")).toHaveTextContent("changed since loaded: no");
  });

  it("shows an error in the status line for persist on a detached object", () => {
    render(<LifecycleDemo />);
    call("persist(p)");
    call("detach(p)");
    call("persist(p)");
    expect(screen.getByRole("status")).toHaveTextContent("Detached entity passed to persist");
  });

  it("Reset brings back the first state and clears the log", () => {
    render(<LifecycleDemo />);
    call("persist(p)");
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(currentState()).toBe("Transient");
    expect(screen.getByTestId("sql-log")).toHaveTextContent("nothing sent yet");
  });
});
