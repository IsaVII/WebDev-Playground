import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    title: "Learning Tool",
  },
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { setTitle } = appSlice.actions;
export default appSlice.reducer;
