import { useState } from "react";
import CodeBlock from "../../CodeBlock";

let nextId = 3;

function RestJsonDemo() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn REST", done: false },
    { id: 2, title: "Learn JSON", done: true },
  ]);
  const [log, setLog] = useState([]);

  const respond = (method, url, status, body) => {
    setLog((l) => [
      ...l,
      `${method} ${url} → ${status}\n${JSON.stringify(body, null, 2)}`,
    ]);
  };

  const list = () => respond("GET", "/tasks", 200, tasks);

  const create = () => {
    const task = { id: nextId++, title: "Learn Fetch", done: false };
    setTasks((t) => [...t, task]);
    respond("POST", "/tasks", 201, task);
  };

  const update = () => {
    if (tasks.length === 0) return;
    const target = tasks[0];
    const updated = { ...target, done: !target.done };
    setTasks((t) => t.map((task) => (task.id === target.id ? updated : task)));
    respond("PATCH", `/tasks/${target.id}`, 200, updated);
  };

  const remove = () => {
    if (tasks.length === 0) return;
    const target = tasks[tasks.length - 1];
    setTasks((t) => t.filter((task) => task.id !== target.id));
    respond("DELETE", `/tasks/${target.id}`, 204, null);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        REST maps CRUD onto methods and URLs: a collection lives at{" "}
        <code>/tasks</code>, one item lives at <code>/tasks/:id</code>, and
        every body going in or coming out is JSON.
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={list}
          className="bg-surface border border-line text-heading px-3 py-2 rounded hover:border-accent transition-colors text-sm"
        >
          GET /tasks
        </button>
        <button
          onClick={create}
          className="bg-surface border border-line text-heading px-3 py-2 rounded hover:border-accent transition-colors text-sm"
        >
          POST /tasks
        </button>
        <button
          onClick={update}
          className="bg-surface border border-line text-heading px-3 py-2 rounded hover:border-accent transition-colors text-sm"
        >
          PATCH /tasks/:id
        </button>
        <button
          onClick={remove}
          className="bg-surface border border-line text-heading px-3 py-2 rounded hover:border-accent transition-colors text-sm"
        >
          DELETE /tasks/:id
        </button>
        <button
          onClick={() => setLog([])}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear log
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-xs min-h-[140px] overflow-x-auto">
        {log.length === 0 && (
          <p className="text-subtle">Responses will appear here...</p>
        )}
        {log.map((entry, i) => (
          <pre key={i} className="text-heading-alt mb-3 whitespace-pre-wrap">
            {entry}
          </pre>
        ))}
      </div>

      <CodeBlock>{`const res = await fetch("/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Learn Fetch", done: false }),
});
const created = await res.json();`}</CodeBlock>
    </div>
  );
}

export default RestJsonDemo;
