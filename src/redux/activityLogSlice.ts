import { createSlice } from "@reduxjs/toolkit";
import { incremented, decremented } from "./counterSlice";

const MAX_ENTRIES = 6;

// This slice never handles its own actions in `reducers` - instead it uses
// extraReducers to listen to actions from other slices (like counterSlice),
// which is a direct demonstration of how slices can respond to external actions
// without being coupled to them.
const activityLogSlice = createSlice({
  name: "activityLog",
  initialState: {
    entries: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // Listen to specific counter actions
    builder
      .addCase(incremented, (state, action) => {
        state.entries.unshift({
          action: action.type,
          timestamp: new Date().toLocaleTimeString(),
        });
        state.entries.length = Math.min(state.entries.length, MAX_ENTRIES);
      })
      .addCase(decremented, (state, action) => {
        state.entries.unshift({
          action: action.type,
          timestamp: new Date().toLocaleTimeString(),
        });
        state.entries.length = Math.min(state.entries.length, MAX_ENTRIES);
      });

    // Also log all other actions with a matcher
    builder.addMatcher(
      (action) => !action.type.startsWith("counter/"),
      (state, action) => {
        state.entries.unshift({
          action: action.type,
          timestamp: new Date().toLocaleTimeString(),
        });
        state.entries.length = Math.min(state.entries.length, MAX_ENTRIES);
      },
    );
  },
});

export default activityLogSlice.reducer;
