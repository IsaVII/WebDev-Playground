import { createSlice } from "@reduxjs/toolkit";

const likeSlice = createSlice({
  name: "like",
  initialState: {
    count: 0,
  },
  reducers: {
    liked: (state) => {
      state.count += 1;
    },
  },
});

export const { liked } = likeSlice.actions;
export default likeSlice.reducer;
