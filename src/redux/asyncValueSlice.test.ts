import asyncValueReducer, { fetchRandomValue } from "./asyncValueSlice";

describe("asyncValueSlice", () => {
  it("starts idle with no value", () => {
    const state = asyncValueReducer(undefined, { type: "unknown" });
    expect(state).toEqual({ value: null, status: "idle" });
  });

  it("moves to loading when the thunk is pending", () => {
    const action = fetchRandomValue.pending("request-1");
    const state = asyncValueReducer({ value: null, status: "idle" }, action);
    expect(state.status).toBe("loading");
  });

  it("stores the payload and moves to succeeded when the thunk resolves", () => {
    const action = fetchRandomValue.fulfilled(42, "request-1");
    const state = asyncValueReducer(
      { value: null, status: "loading" },
      action,
    );
    expect(state.status).toBe("succeeded");
    expect(state.value).toBe(42);
  });

  it("moves to failed (and keeps the old value) when the thunk rejects", () => {
    const action = fetchRandomValue.rejected(
      new Error("network error"),
      "request-1",
    );
    const state = asyncValueReducer(
      { value: 7, status: "loading" },
      action,
    );
    expect(state.status).toBe("failed");
    expect(state.value).toBe(7);
  });

  it("resolves with a number between 0 and 99 for real", async () => {
    // Unlike the other cases above (which test the reducer against
    // hand-built actions), this runs the actual thunk end to end so the
    // random-value logic itself is covered too, not just the reducer.
    vi.useFakeTimers();
    try {
      const dispatched = [];
      const thunk = fetchRandomValue();
      const promise = thunk(
        (action) => dispatched.push(action),
        () => ({}),
        undefined,
      );

      await vi.advanceTimersByTimeAsync(1200);
      await promise;

      const fulfilled = dispatched.find(
        (a) => a.type === fetchRandomValue.fulfilled.type,
      );
      expect(fulfilled).toBeDefined();
      expect(fulfilled.payload).toBeGreaterThanOrEqual(0);
      expect(fulfilled.payload).toBeLessThan(100);
    } finally {
      vi.useRealTimers();
    }
  });
});
