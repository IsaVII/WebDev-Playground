import { lockFor, verdict } from "./monitorLocks";

describe("lockFor", () => {
  it("locks the instance for synchronized instance methods and blocks", () => {
    expect(lockFor({ method: "deposit", target: "account1" })).toBe("account1");
    expect(lockFor({ method: "getBalance", target: "account2" })).toBe("account2");
    expect(lockFor({ method: "withdraw", target: "account1" })).toBe("account1");
  });

  it("locks the Class object for a static synchronized method, whatever the target", () => {
    expect(lockFor({ method: "register", target: "account1" })).toBe("Account.class");
    expect(lockFor({ method: "register", target: "account2" })).toBe("Account.class");
  });

  it("takes no lock for a method that is not synchronized", () => {
    expect(lockFor({ method: "log", target: "account1" })).toBeNull();
  });
});

describe("verdict", () => {
  it("blocks when both calls need the same instance's monitor", () => {
    expect(
      verdict(
        { method: "deposit", target: "account1" },
        { method: "getBalance", target: "account1" },
      ),
    ).toEqual({ kind: "blocked", lock: "account1" });
  });

  it("does not block calls on two different instances", () => {
    expect(
      verdict(
        { method: "deposit", target: "account1" },
        { method: "deposit", target: "account2" },
      ).kind,
    ).toBe("parallel-different");
  });

  it("does not block an instance lock against the class lock", () => {
    expect(
      verdict(
        { method: "deposit", target: "account1" },
        { method: "register", target: "account1" },
      ).kind,
    ).toBe("parallel-different");
  });

  it("blocks two static synchronized calls even on different 'targets'", () => {
    expect(
      verdict(
        { method: "register", target: "account1" },
        { method: "register", target: "account2" },
      ),
    ).toEqual({ kind: "blocked", lock: "Account.class" });
  });

  it("never blocks when either side is not synchronized", () => {
    expect(
      verdict(
        { method: "deposit", target: "account1" },
        { method: "log", target: "account1" },
      ).kind,
    ).toBe("parallel-free");
  });
});
