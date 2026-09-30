import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incremented: (state) => {
      // "Mutating" state here is safe - Redux Toolkit uses Immer under the
      // hood, so this actually produces a new, immutable state object.
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
    incrementedByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { incremented, decremented, incrementedByAmount } =
  counterSlice.actions;
export default counterSlice.reducer;
