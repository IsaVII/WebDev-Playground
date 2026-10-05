/**
 * The locking rules of `synchronized`, as plain data - what MonitorLockDemo
 * lets you explore. Every Java object (and every Class) has one monitor, and
 * which monitor a call needs depends on how the method was declared.
 */
export type MethodId = "deposit" | "getBalance" | "withdraw" | "log" | "register";
export type TargetId = "account1" | "account2";

export interface MethodInfo {
  id: MethodId;
  /** How the method is declared, shown next to its name. */
  declaration: string;
  /** What it locks: the instance it is called on, the Class, or nothing. */
  lockKind: "instance" | "class" | "none";
}

export const METHODS: MethodInfo[] = [
  { id: "deposit", declaration: "synchronized void deposit(int)", lockKind: "instance" },
  { id: "getBalance", declaration: "synchronized int getBalance()", lockKind: "instance" },
  { id: "withdraw", declaration: "synchronized (this) { ... } inside withdraw(int)", lockKind: "instance" },
  { id: "log", declaration: "void log(String)  - not synchronized", lockKind: "none" },
  { id: "register", declaration: "static synchronized void register()", lockKind: "class" },
];

export const TARGETS: { id: TargetId; label: string }[] = [
  { id: "account1", label: "account1" },
  { id: "account2", label: "account2" },
];

export interface Call {
  method: MethodId;
  target: TargetId;
}

/** The monitor a call must hold while it runs, or null if it takes none. */
export function lockFor({ method, target }: Call): string | null {
  const info = METHODS.find((m) => m.id === method);
  if (!info || info.lockKind === "none") return null;
  return info.lockKind === "class" ? "Account.class" : target;
}

export type Verdict =
  | { kind: "parallel-free"; lockA: string | null; lockB: string | null }
  | { kind: "parallel-different"; lockA: string; lockB: string }
  | { kind: "blocked"; lock: string };

/** What happens when thread A is inside `a` and thread B tries to run `b`. */
export function verdict(a: Call, b: Call): Verdict {
  const lockA = lockFor(a);
  const lockB = lockFor(b);
  if (lockA === null || lockB === null) {
    return { kind: "parallel-free", lockA, lockB };
  }
  if (lockA === lockB) return { kind: "blocked", lock: lockA };
  return { kind: "parallel-different", lockA, lockB };
}
