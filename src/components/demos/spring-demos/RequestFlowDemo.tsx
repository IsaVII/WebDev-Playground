import { useState } from "react";
import CodeBlock from "../../CodeBlock";

const STEPS = [
  {
    layer: "DispatcherServlet",
    line: "GET /api/customers/7",
    detail:
      "Spring's front controller matches the URL and HTTP method to a handler method, binds path variables, and will serialize whatever comes back to JSON.",
  },
  {
    layer: "@RestController",
    line: "customerController.getOne(7)",
    detail:
      "Turns the request into a plain method call. No business rules, no SQL - it delegates straight to the service and returns the result.",
  },
  {
    layer: "@Service",
    line: "customerService.findById(7)",
    detail:
      "Applies business rules and owns the transaction (@Transactional). If it needs two repository calls to stay consistent, this is where that boundary lives.",
  },
  {
    layer: "@Repository (Spring Data)",
    line: "customerRepository.findById(7)",
    detail:
      "The generated implementation issues exactly one query through the EntityManager: select * from customer where id = 7.",
  },
  {
    layer: "Database",
    line: "1 row: { id: 7, name: 'Ada', email: 'ada@...' }",
    detail: "Returns the row. Hibernate maps it back into a Customer entity.",
  },
  {
    layer: "back out → JSON",
    line: '200 OK  { "id": 7, "name": "Ada", "email": "ada@..." }',
    detail:
      "The entity travels back up unchanged through service and controller; the DispatcherServlet serializes it and writes the HTTP response.",
  },
];

function RequestFlowDemo() {
  const [reached, setReached] = useState(0);

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        One request, five boundaries. Step it through and notice that each
        layer only knows about the one directly below it.
      </p>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setReached((r) => Math.min(STEPS.length, r + 1))}
          disabled={reached >= STEPS.length}
          className="bg-accent text-white px-4 py-1 rounded text-sm hover:opacity-90 disabled:opacity-40"
        >
          {reached === 0 ? "Send request" : "Next hop ▸"}
        </button>
        <button
          type="button"
          onClick={() => setReached(0)}
          className="text-sm text-subtle hover:text-accent ml-auto"
        >
          Reset
        </button>
      </div>

      <ol className="list-none m-0 p-0 space-y-2">
        {STEPS.map((s, i) => {
          const on = i < reached;
          return (
            <li
              key={s.layer}
              className={`border-l-4 rounded px-4 py-2 transition-colors ${
                on
                  ? "border-accent bg-surface"
                  : "border-line bg-transparent opacity-40"
              }`}
            >
              <p className="text-sm font-semibold text-heading-alt m-0">
                {s.layer}
              </p>
              <p className="font-mono text-xs text-accent m-0">{s.line}</p>
              {on && <p className="text-xs text-muted mt-1 mb-0">{s.detail}</p>}
            </li>
          );
        })}
      </ol>

      {reached >= STEPS.length && (
        <CodeBlock>{`@GetMapping("/{id}")
public Customer getOne(@PathVariable Long id) {   // controller
    return service.findById(id);                  // -> service -> repository
}`}</CodeBlock>
      )}
    </div>
  );
}

export default RequestFlowDemo;
