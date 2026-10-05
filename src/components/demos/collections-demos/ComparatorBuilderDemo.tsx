import { useState } from "react";
import CodeBlock from "../../CodeBlock";
import {
  EMPLOYEES,
  FIELDS,
  comparatorCode,
  sortEmployees,
  type Direction,
  type Field,
  type SortKey,
} from "./comparatorChain";

const SLOTS = ["Sort by", "Then by", "Then by"];

function ComparatorBuilderDemo() {
  const [slots, setSlots] = useState<(SortKey | null)[]>([
    { field: "department", direction: "asc" },
    { field: "salary", direction: "desc" },
    { field: "name", direction: "asc" },
  ]);

  const keys = slots.filter((slot): slot is SortKey => slot !== null);
  const sorted = sortEmployees(EMPLOYEES, keys);
  const used = new Set(keys.map((k) => k.field));

  function setField(index: number, field: Field | null) {
    setSlots((prev) =>
      prev.map((slot, i) =>
        i !== index
          ? slot
          : field === null
            ? null
            : { field, direction: slot?.direction ?? "asc" },
      ),
    );
  }

  function setDirection(index: number, direction: Direction) {
    setSlots((prev) =>
      prev.map((slot, i) => (i === index && slot ? { ...slot, direction } : slot)),
    );
  }

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Build a <code>Comparator</code> one key at a time. Later keys only
        matter when every earlier key ties.
      </p>

      <div className="space-y-2 mb-4">
        {slots.map((slot, index) => (
          <div key={index} className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-heading-alt w-16">{SLOTS[index]}</span>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label={`${SLOTS[index]} ${index + 1} field`}
            >
              {FIELDS.map((field) => {
                const takenElsewhere = used.has(field) && slot?.field !== field;
                return (
                  <button
                    key={field}
                    type="button"
                    disabled={takenElsewhere}
                    onClick={() => setField(index, slot?.field === field ? null : field)}
                    className={`font-mono text-xs px-3 py-1 rounded border disabled:opacity-40 ${
                      slot?.field === field
                        ? "bg-accent text-white border-accent"
                        : "border-line text-muted hover:text-accent"
                    }`}
                  >
                    {field}
                  </button>
                );
              })}
            </div>
            {slot && (
              <div
                className="flex gap-2"
                role="group"
                aria-label={`${SLOTS[index]} ${index + 1} direction`}
              >
                {(["asc", "desc"] as const).map((direction) => (
                  <button
                    key={direction}
                    type="button"
                    onClick={() => setDirection(index, direction)}
                    className={`text-xs px-3 py-1 rounded border ${
                      slot.direction === direction
                        ? "bg-accent text-white border-accent"
                        : "border-line text-muted hover:text-accent"
                    }`}
                  >
                    {direction === "asc" ? "ascending" : "descending"}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <CodeBlock>{`staff.sort(${comparatorCode(keys)});`}</CodeBlock>

      <table className="w-full text-sm mt-4">
        <thead>
          <tr className="text-left text-xs text-muted">
            <th className="py-1 pr-3">#</th>
            <th className="py-1 pr-3">name</th>
            <th className="py-1 pr-3">department</th>
            <th className="py-1 pr-3">salary</th>
            <th className="py-1 pr-3">was at</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((employee, position) => (
            <tr key={employee.name} className="border-t border-line">
              <td className="py-1 pr-3 text-muted">{position + 1}</td>
              <td className="py-1 pr-3 text-heading">{employee.name}</td>
              <td className="py-1 pr-3">{employee.department}</td>
              <td className="py-1 pr-3">{employee.salary}</td>
              <td className="py-1 pr-3 text-muted">{EMPLOYEES.indexOf(employee) + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-muted mt-2 mb-0">
        Rows that tie on every key stay in their original order - Java's
        <code> List.sort</code> is stable. Try removing the name key and watch
        Omar stay ahead of Zoe.
      </p>
    </div>
  );
}

export default ComparatorBuilderDemo;
