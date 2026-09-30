import { useState } from "react";
import CodeBlock from "../../CodeBlock";

// Checks a user-editable object literal against a fixed interface, field
// by field, so the difference between a required field, an optional
// field, and an unknown extra field is something you can trigger yourself.
const INITIAL_FIELDS = [
  { key: "id", value: "7", required: true, type: "number" },
  { key: "name", value: "Isa", required: true, type: "string" },
  { key: "email", value: "", required: false, type: "string" },
];

function InterfaceDemo() {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [extraEnabled, setExtraEnabled] = useState(false);

  const clearField = (key) => {
    setFields((f) =>
      f.map((field) => (field.key === key ? { ...field, value: "" } : field)),
    );
  };

  const restoreField = (key) => {
    const original = INITIAL_FIELDS.find((f) => f.key === key);
    setFields((f) =>
      f.map((field) =>
        field.key === key ? { ...field, value: original.value } : field,
      ),
    );
  };

  const errors = [];
  for (const field of fields) {
    if (field.required && !field.value) {
      errors.push(
        `Property '${field.key}' is missing in type '{}' but required in type 'User'.`,
      );
    }
  }
  if (extraEnabled) {
    errors.push(
      "Object literal may only specify known properties, and 'role' does not exist in type 'User'.",
    );
  }

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        An interface names a shape once. Any object literal typed as a{" "}
        <code>User</code> is checked against it: required fields must be
        present, and (with object literals) unlisted fields are rejected rather
        than silently ignored.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {fields.map((field) => (
          <button
            key={field.key}
            onClick={() =>
              field.value ? clearField(field.key) : restoreField(field.key)
            }
            className={`px-3 py-1.5 rounded border text-sm font-mono transition-colors ${
              field.value
                ? "bg-surface border-line text-heading hover:border-accent"
                : "bg-red-500/10 border-red-500/40 text-red-500"
            }`}
          >
            {field.value ? `remove ${field.key}` : `restore ${field.key}`}
          </button>
        ))}
        <button
          onClick={() => setExtraEnabled((e) => !e)}
          className={`px-3 py-1.5 rounded border text-sm font-mono transition-colors ${
            extraEnabled
              ? "bg-red-500/10 border-red-500/40 text-red-500"
              : "bg-surface border-line text-heading hover:border-accent"
          }`}
        >
          {extraEnabled
            ? "remove extra field 'role'"
            : "add extra field 'role'"}
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-xs overflow-x-auto">
        <p className="text-heading-alt">const user: User = {"{"}</p>
        {fields.map((field) => (
          <p key={field.key} className="pl-4 text-muted">
            {field.key}:{" "}
            {field.value
              ? field.type === "number"
                ? field.value
                : `"${field.value}"`
              : "// missing"}
            ,
          </p>
        ))}
        {extraEnabled && (
          <p className="pl-4 text-red-500">role: "admin", // not on User</p>
        )}
        <p className="text-heading-alt">{"}"};</p>

        {errors.length === 0 ? (
          <p className="text-accent mt-3">✓ matches interface User</p>
        ) : (
          errors.map((err, i) => (
            <p key={i} className="text-red-500 mt-2">
              ✕ {err}
            </p>
          ))
        )}
      </div>

      <CodeBlock>{`interface User {
  id: number;
  name: string;
  email?: string; // optional - fine to leave out
}

const user: User = { id: 7, name: "Isa" }; // ✓ valid`}</CodeBlock>
    </div>
  );
}

export default InterfaceDemo;
