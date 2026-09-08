import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const FORMS = {
  "Anonymous class": {
    code: `names.sort(new Comparator<String>() {
    @Override
    public int compare(String a, String b) {
        return a.length() - b.length();
    }
});`,
    note: "The pre-Java-8 way. A whole class body just to carry one method - the compiler even generates a separate .class file for it.",
  },
  Lambda: {
    code: `names.sort((a, b) -> a.length() - b.length());`,
    note: "Comparator is a functional interface (one abstract method), so the lambda's parameters and body ARE that method. Same behaviour, no boilerplate.",
  },
  "Method reference": {
    code: `names.sort(Comparator.comparingInt(String::length));`,
    note: "When the lambda just calls one existing method, a method reference names it directly. String::length is shorthand for s -> s.length().",
  },
};

function LambdaVsAnonymousDemo() {
  const [form, setForm] = useState("Lambda");
  const active = FORMS[form];

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        The same &quot;sort by string length&quot; written three ways. Each
        row is exactly the one above with more noise removed.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(FORMS).map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setForm(name)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              form === name
                ? "bg-accent text-white"
                : "bg-surface text-muted hover:text-heading"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <CodeBlock>{active.code}</CodeBlock>
      <p className="text-sm text-muted mt-3">{active.note}</p>
    </div>
  );
}

export default LambdaVsAnonymousDemo;
