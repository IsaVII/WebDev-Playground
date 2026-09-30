import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function EntityAdapterDemo() {
  // Simulated normalized state (what createEntityAdapter manages)
  const [state, setState] = useState({
    ids: [1, 2, 3],
    entities: {
      1: { id: 1, name: "Alice", status: "online" },
      2: { id: 2, name: "Bob", status: "offline" },
      3: { id: 3, name: "Charlie", status: "online" },
    },
  });

  const addUser = () => {
    const newId = Math.max(...state.ids) + 1;
    const newUser = {
      id: newId,
      name: `User ${newId}`,
      status: "online",
    };

    setState({
      ids: [...state.ids, newId],
      entities: { ...state.entities, [newId]: newUser },
    });
  };

  const removeUser = (id) => {
    const { [id]: removed, ...remaining } = state.entities;
    setState({
      ids: state.ids.filter((userId) => userId !== id),
      entities: remaining,
    });
  };

  const toggleStatus = (id) => {
    setState({
      ...state,
      entities: {
        ...state.entities,
        [id]: {
          ...state.entities[id],
          status: state.entities[id].status === "online" ? "offline" : "online",
        },
      },
    });
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        <code>createEntityAdapter</code> manages normalized collections by ID.
        Instead of searching arrays, entities are stored in an object keyed by
        ID for O(1) lookups, with a separate array of IDs for ordering.
      </p>

      <button
        onClick={addUser}
        className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity mb-4"
      >
        Add User
      </button>

      <div className="bg-surface border border-line rounded p-4 mb-4 max-h-60 overflow-y-auto">
        <div className="text-accent text-sm mb-3">
          Normalized State (ids: [{state.ids.join(", ")}]):
        </div>
        {state.ids.map((id) => {
          const user = state.entities[id];
          return (
            <div
              key={id}
              className="flex justify-between items-center mb-2 pb-2 border-b border-line last:border-0"
            >
              <div>
                <span className="text-heading-alt font-medium">
                  {user.name}
                </span>
                <span
                  className={`ml-2 text-xs px-2 py-1 rounded ${
                    user.status === "online"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {user.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleStatus(id)}
                  className="text-xs bg-surface border border-line px-2 py-1 rounded hover:border-accent"
                >
                  Toggle
                </button>
                <button
                  onClick={() => removeUser(id)}
                  className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded hover:bg-red-500/30"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <CodeBlock>{`import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();
// Generates: { ids: [], entities: {} }

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    userAdded: usersAdapter.addOne,
    userRemoved: usersAdapter.removeOne,
    userUpdated: usersAdapter.updateOne,
    usersReceived: usersAdapter.setAll,
  },
});

// Auto-generated selectors
const selectors = usersAdapter.getSelectors((state) => state.users);
const allUsers = selectors.selectAll(state); // Array in ID order
const userById = selectors.selectById(state, userId); // O(1) lookup`}</CodeBlock>
    </div>
  );
}

export default EntityAdapterDemo;
