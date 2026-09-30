import { configureStore } from "@reduxjs/toolkit";
import activityLogReducer from "./activityLogSlice";
import appReducer from "./appSlice";
import asyncValueReducer from "./asyncValueSlice";
import counterReducer from "./counterSlice";
import likeReducer from "./likeSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    counter: counterReducer,
    like: likeReducer,
    activityLog: activityLogReducer,
    asyncValue: asyncValueReducer,
  },
});

export default store;
