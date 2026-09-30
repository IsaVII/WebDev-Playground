import { decremented, incremented } from "./counterSlice";
import { liked } from "./likeSlice";
import activityLogReducer from "./activityLogSlice";

describe("activityLogSlice", () => {
  it("starts with an empty log", () => {
    // The slice's addMatcher logs *any* action whose type doesn't start
    // with "counter/" - so to see the untouched initial state, the probe
    // action here has to start with "counter/" too (and not be one of the
    // two addCase types) so neither handler fires.
    const state = activityLogReducer(undefined, { type: "counter/noop" });
    expect(state.entries).toEqual([]);
  });

  it("logs a counter/incremented action via addCase", () => {
    const state = activityLogReducer({ entries: [] }, incremented());
    expect(state.entries).toHaveLength(1);
    expect(state.entries[0].action).toBe(incremented.type);
  });

  it("logs a counter/decremented action via addCase", () => {
    const state = activityLogReducer({ entries: [] }, decremented());
    expect(state.entries[0].action).toBe(decremented.type);
  });

  it("also logs actions from other slices via the addMatcher fallback", () => {
    // This slice never imports likeSlice - the addMatcher in
    // activityLogSlice.js is what picks this up, by checking that the
    // action type doesn't start with "counter/".
    const state = activityLogReducer({ entries: [] }, liked());
    expect(state.entries).toHaveLength(1);
    expect(state.entries[0].action).toBe(liked.type);
  });

  it("adds new entries to the front of the list, newest first", () => {
    let state = activityLogReducer({ entries: [] }, incremented());
    state = activityLogReducer(state, decremented());
    expect(state.entries[0].action).toBe(decremented.type);
    expect(state.entries[1].action).toBe(incremented.type);
  });

  it("caps the log at 6 entries", () => {
    let state = { entries: [] };
    for (let i = 0; i < 10; i++) {
      state = activityLogReducer(state, incremented());
    }
    expect(state.entries).toHaveLength(6);
  });
});
