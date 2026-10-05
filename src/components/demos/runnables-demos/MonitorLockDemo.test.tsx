import { fireEvent, render, screen, within } from "@testing-library/react";
import MonitorLockDemo from "./MonitorLockDemo";

function pick(thread: "Thread A" | "Thread B", name: string | RegExp) {
  fireEvent.click(
    within(screen.getByRole("group", { name: `${thread} method` })).getByRole(
      "button",
      { name },
    ),
  );
}

describe("MonitorLockDemo", () => {
  it("starts with two synchronized calls on the same account, so B is blocked", () => {
    render(<MonitorLockDemo />);
    expect(screen.getByRole("status")).toHaveTextContent(/B is BLOCKED/);
  });

  it("lets B run when it switches to a different account", () => {
    render(<MonitorLockDemo />);
    fireEvent.click(
      within(screen.getByRole("group", { name: "Thread B object" })).getByRole(
        "button",
        { name: "account2" },
      ),
    );
    expect(screen.getByRole("status")).toHaveTextContent(/Both run at the same time/);
    expect(screen.getByRole("status")).toHaveTextContent(/two different monitors/);
  });

  it("shows that a method that is not synchronized takes no lock", () => {
    render(<MonitorLockDemo />);
    pick("Thread B", /not synchronized/);
    expect(screen.getByRole("status")).toHaveTextContent(/not synchronized never asks/);
  });

  it("blocks two static synchronized calls whatever the account", () => {
    render(<MonitorLockDemo />);
    pick("Thread A", /static synchronized/);
    pick("Thread B", /static synchronized/);
    expect(screen.getByRole("status")).toHaveTextContent(/B is BLOCKED/);
    expect(screen.getByRole("status")).toHaveTextContent("Account.class");
  });
});
