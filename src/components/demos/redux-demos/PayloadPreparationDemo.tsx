import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CodeBlock from "../../CodeBlock";

// Simulated slice action with prepare callback
const createTaskAction = (title, priority) => ({
  type: "tasks/taskAdded",
  payload: {
    id: Date.now(),
    title,
    priority,
    createdAt: new Date().toISOString(),
  },
});

function PayloadPreparationDemo() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!title.trim()) return;

    const action = createTaskAction(title, priority);
    setTasks((prev) => [...prev, action.payload]);
    setTitle("");

    // In a real app, you'd dispatch this to the store
    // dispatch(taskAdded(title, priority));
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Action creators can accept multiple arguments and transform them into a
        standardized payload shape using a <code>prepare</code> callback. This
        keeps components simple - they just pass raw values.
      </p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title..."
          className="flex-1 bg-surface border border-line rounded px-3 py-2 text-heading"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-surface border border-line rounded px-3 py-2 text-heading"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          onClick={handleAdd}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Add
        </button>
      </div>

      <div className="bg-surface border border-line rounded p-4 mb-4 max-h-40 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="text-muted text-sm">No tasks yet...</div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="text-sm mb-2 pb-2 border-b border-line last:border-0"
            >
              <div className="flex justify-between items-start">
                <span className="text-heading-alt font-medium">
                  {task.title}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    task.priority === "high"
                      ? "bg-red-500/20 text-red-400"
                      : task.priority === "medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
              <div className="text-muted text-xs mt-1">
                ID: {task.id} | {new Date(task.createdAt).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>

      <CodeBlock>{`const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    taskAdded: {
      // The reducer receives the prepared payload
      reducer: (state, action) => {
        state.push(action.payload);
      },
      // prepare callback transforms arguments
      prepare: (title, priority) => ({
        payload: {
          id: nanoid(),
          title,
          priority,
          createdAt: new Date().toISOString(),
        },
      }),
    },
  },
});

// Component just passes raw values
dispatch(taskAdded('Buy milk', 'high'));`}</CodeBlock>
    </div>
  );
}

export default PayloadPreparationDemo;
