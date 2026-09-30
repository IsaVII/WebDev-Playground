import counterReducer, {
  decremented,
  incremented,
  incrementedByAmount,
} from "./counterSlice";

describe("counterSlice", () => {
  it("returns the initial state when given an unknown action", () => {
    const state = counterReducer(undefined, { type: "unknown" });
    expect(state).toEqual({ value: 0 });
  });

  it("handles incremented", () => {
    const state = counterReducer({ value: 0 }, incremented());
    expect(state.value).toBe(1);
  });

  it("handles decremented", () => {
    const state = counterReducer({ value: 5 }, decremented());
    expect(state.value).toBe(4);
  });

  it("handles incrementedByAmount", () => {
    const state = counterReducer({ value: 10 }, incrementedByAmount(5));
    expect(state.value).toBe(15);
  });

  it("can go negative - there's no floor on the value", () => {
    const state = counterReducer({ value: 0 }, decremented());
    expect(state.value).toBe(-1);
  });

  it("does not mutate the state object it was given", () => {
    // The reducer body writes `state.value += 1`, which only stays safe
    // because Redux Toolkit's Immer wrapper intercepts it and produces a
    // new object - this pins that down instead of assuming it.
    const original = { value: 1 };
    const next = counterReducer(original, incremented());
    expect(original.value).toBe(1);
    expect(next).not.toBe(original);
  });
});
