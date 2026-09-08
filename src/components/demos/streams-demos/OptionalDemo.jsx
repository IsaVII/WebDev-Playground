import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const USERS = {
  7: { name: "ada", email: "ada@example.com" },
  8: { name: "alan", email: null },
};

function OptionalDemo() {
  const [id, setId] = useState("7");
  const user = USERS[id] || null;

  // The two styles, evaluated on the chosen input.
  const nullStyle = (() => {
    if (user == null) return "\"(no such user)\"";
    if (user.email == null) return "\"(no email)\"";
    return `"${user.email.toUpperCase()}"`;
  })();

  const optionalStyle = (() => {
    // Optional.ofNullable(user).map(User::email).filter(...).map(...).orElse(...)
    if (user == null || user.email == null) return "\"(none)\"";
    return `"${user.email.toUpperCase()}"`;
  })();

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        <code>Optional</code> is a pipeline for a single maybe-value: chain
        <code> map</code> / <code>filter</code> / <code>orElse</code> instead
        of a ladder of null checks, and a missing value can never slip
        through as a surprise <code>NullPointerException</code>.
      </p>

      <div className="flex items-center gap-3 mb-4 text-sm">
        <span className="text-muted">lookup user id:</span>
        {["7", "8", "99"].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setId(v)}
            className={`px-3 py-1 rounded transition-colors ${
              id === v
                ? "bg-accent text-white"
                : "bg-surface text-muted hover:text-heading"
            }`}
          >
            {v}
            {v === "7" && " (ok)"}
            {v === "8" && " (no email)"}
            {v === "99" && " (missing)"}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-subtle mb-1">
            null checks
          </p>
          <CodeBlock>{`User u = repo.find(${id});
if (u == null) return "(no such user)";
if (u.email() == null) return "(no email)";
return u.email().toUpperCase();`}</CodeBlock>
          <p className="text-sm font-mono text-accent mt-2">
            {"=> "}
            {nullStyle}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-subtle mb-1">
            Optional pipeline
          </p>
          <CodeBlock>{`return repo.findOpt(${id})
    .map(User::email)
    .map(String::toUpperCase)
    .orElse("(none)");`}</CodeBlock>
          <p className="text-sm font-mono text-accent mt-2">
            {"=> "}
            {optionalStyle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OptionalDemo;
