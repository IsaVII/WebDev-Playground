import { useMemo, useState } from "react";
import CodeBlock from "../../CodeBlock";

// A tiny bean graph. Each bean declares what it needs; the "container"
// below resolves them in dependency order or reports what's missing.
const BEANS = {
  DataSource: { needs: [], code: "@Bean DataSource dataSource() { ... }" },
  CustomerRepository: {
    needs: ["DataSource"],
    code: "@Repository class CustomerRepository { CustomerRepository(DataSource ds) }",
  },
  CustomerService: {
    needs: ["CustomerRepository"],
    code: "@Service class CustomerService { CustomerService(CustomerRepository repo) }",
  },
  CustomerController: {
    needs: ["CustomerService"],
    code: "@RestController class CustomerController { CustomerController(CustomerService svc) }",
  },
};

function resolve(registered) {
  const set = new Set(registered);
  const order = [];
  const pending = new Set(registered);
  let guard = 0;
  while (pending.size && guard++ < 20) {
    let progressed = false;
    for (const name of [...pending]) {
      const missing = BEANS[name].needs.filter((n) => !set.has(n));
      if (missing.length === 0) {
        order.push(name);
        pending.delete(name);
        progressed = true;
      }
    }
    if (!progressed) break;
  }
  const errors = [];
  for (const name of registered) {
    for (const need of BEANS[name].needs) {
      if (!set.has(need)) {
        errors.push(
          `No qualifying bean of type '${need}' available for ${name}`,
        );
      }
    }
  }
  return { order, errors };
}

function DiContainerDemo() {
  const [registered, setRegistered] = useState([
    "DataSource",
    "CustomerRepository",
    "CustomerService",
    "CustomerController",
  ]);

  const toggle = (name) =>
    setRegistered((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );

  const { order, errors } = useMemo(() => resolve(registered), [registered]);

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Tick which classes are registered as beans. The container builds them
        in dependency order - and fails loudly the moment a constructor asks
        for something that isn&apos;t there.
      </p>

      <div className="space-y-1 mb-4 text-sm">
        {Object.entries(BEANS).map(([name, b]) => (
          <label key={name} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={registered.includes(name)}
              onChange={() => toggle(name)}
              className="accent-accent"
            />
            <span className="font-mono text-heading-alt">{name}</span>
            <span className="text-subtle text-xs">
              {b.needs.length ? `needs ${b.needs.join(", ")}` : "no dependencies"}
            </span>
          </label>
        ))}
      </div>

      {errors.length > 0 ? (
        <div className="bg-red-500/10 border border-red-500/40 rounded p-3 text-sm">
          <p className="text-red-500 font-semibold mb-1">
            ApplicationContext failed to start
          </p>
          {errors.map((e, i) => (
            <p key={i} className="font-mono text-xs text-muted m-0">
              {e}
            </p>
          ))}
        </div>
      ) : (
        <div className="bg-surface rounded p-3 border border-line text-sm">
          <p className="text-green-500 font-semibold mb-1">
            Context started - beans created in order:
          </p>
          <p className="font-mono text-xs text-heading-alt m-0">
            {order.join("  →  ") || "(nothing registered)"}
          </p>
        </div>
      )}

      <CodeBlock>{BEANS[registered[registered.length - 1] || "CustomerController"]?.code || ""}</CodeBlock>
    </div>
  );
}

export default DiContainerDemo;
