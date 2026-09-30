import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Simulates a network request with a short artificial delay, the same way
// a real `fetch()` call to an API would resolve asynchronously.
export const fetchRandomValue = createAsyncThunk(
  "asyncValue/fetchRandomValue",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return Math.floor(Math.random() * 100);
  },
);

type AsyncValueState = {
  value: number | null;
  status: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: AsyncValueState = {
  value: null,
  status: "idle",
};

const asyncValueSlice = createSlice({
  name: "asyncValue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomValue.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRandomValue.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(fetchRandomValue.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default asyncValueSlice.reducer;
