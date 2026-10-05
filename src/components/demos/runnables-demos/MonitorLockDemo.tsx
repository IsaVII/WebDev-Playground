import { useState } from "react";
import {
  METHODS,
  TARGETS,
  lockFor,
  verdict,
  type Call,
  type MethodId,
  type TargetId,
} from "./monitorLocks";

const THREADS = [
  { id: "A", name: "Thread A", note: "gets there first" },
  { id: "B", name: "Thread B", note: "arrives while A is still inside" },
] as const;

function CallPicker({
  name,
  note,
  call,
  onChange,
}: {
  name: string;
  note: string;
  call: Call;
  onChange: (call: Call) => void;
}) {
  const staticCall = METHODS.find((m) => m.id === call.method)?.lockKind === "class";
  const lock = lockFor(call);

  return (
    <div className="border border-line rounded p-3">
      <p className="text-sm font-semibold text-heading mb-0">{name}</p>
      <p className="text-xs text-muted mb-2">{note}</p>

      <div className="flex flex-wrap gap-2 mb-2" role="group" aria-label={`${name} object`}>
        {TARGETS.map((t) => (
          <button
            key={t.id}
            type="button"
            disabled={staticCall}
            onClick={() => onChange({ ...call, target: t.id as TargetId })}
            className={`font-mono text-xs px-3 py-1 rounded border disabled:opacity-40 ${
              call.target === t.id && !staticCall
                ? "bg-accent text-white border-accent"
                : "border-line text-muted hover:text-accent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-1" role="group" aria-label={`${name} method`}>
        {METHODS.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onChange({ ...call, method: m.id as MethodId })}
            className={`block w-full text-left font-mono text-xs px-3 py-1 rounded border ${
              call.method === m.id
                ? "bg-accent text-white border-accent"
                : "border-line text-muted hover:text-accent"
            }`}
          >
            {m.declaration}
          </button>
        ))}
      </div>

      <p className="text-xs mt-2 mb-0 text-heading-alt">
        Needs the lock of: <strong>{lock ?? "nothing"}</strong>
      </p>
    </div>
  );
}

function MonitorLockDemo() {
  const [calls, setCalls] = useState<Record<"A" | "B", Call>>({
    A: { method: "deposit", target: "account1" },
    B: { method: "getBalance", target: "account1" },
  });
  const result = verdict(calls.A, calls.B);

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Two threads call methods of the same class, <code>Account</code>. Pick
        what each one calls and on which object, and see whether B has to wait.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {THREADS.map((t) => (
          <CallPicker
            key={t.id}
            name={t.name}
            note={t.note}
            call={calls[t.id]}
            onChange={(call) => setCalls((c) => ({ ...c, [t.id]: call }))}
          />
        ))}
      </div>

      <div
        role="status"
        className={`mt-4 rounded border p-3 text-sm ${
          result.kind === "blocked"
            ? "border-red-500 bg-red-500/10"
            : "border-green-500 bg-green-500/10"
        }`}
      >
        {result.kind === "blocked" && (
          <p className="mb-0">
            <strong>B is BLOCKED.</strong> Both calls need the monitor of{" "}
            <code>{result.lock}</code>, and only one thread at a time can hold
            it. B waits until A leaves its synchronized code.
          </p>
        )}
        {result.kind === "parallel-different" && (
          <p className="mb-0">
            <strong>Both run at the same time.</strong> A holds{" "}
            <code>{result.lockA}</code> and B needs <code>{result.lockB}</code>{" "}
            - two different monitors, so neither waits for the other.
          </p>
        )}
        {result.kind === "parallel-free" && (
          <p className="mb-0">
            <strong>Both run at the same time.</strong> A method that is not
            synchronized never asks for a lock, so it is never held up - and
            it does not hold anybody else up either. It gets no protection
            at all.
          </p>
        )}
      </div>
    </div>
  );
}

export default MonitorLockDemo;
