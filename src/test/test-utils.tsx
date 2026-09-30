import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ProgressProvider } from "../context/ProgressContext";
import counterReducer from "../redux/counterSlice";
import likeReducer from "../redux/likeSlice";
import activityLogReducer from "../redux/activityLogSlice";
import asyncValueReducer from "../redux/asyncValueSlice";
import appReducer from "../redux/appSlice";

/**
 * Most pages in this app assume they're mounted inside the same three
 * providers main.jsx wraps App in (a Redux store, route context, and
 * progress tracking) - a handful of components reach for useProgress() or
 * <Link> even when the page itself doesn't obviously need routing or
 * Redux. Rather than repeat that wrapping in every test, render() from
 * this file sets it up once, the same way it's set up for real.
 */
function AllProviders({ children, initialEntries = ["/"] }) {
  const store = configureStore({
    reducer: {
      counter: counterReducer,
      like: likeReducer,
      activityLog: activityLogReducer,
      asyncValue: asyncValueReducer,
      app: appReducer,
    },
  });

  return (
    <Provider store={store}>
      <ProgressProvider>
        <MemoryRouter initialEntries={initialEntries}>
          {children}
        </MemoryRouter>
      </ProgressProvider>
    </Provider>
  );
}

export function renderWithProviders(ui, { initialEntries, ...options } = {}) {
  return render(ui, {
    wrapper: (props) => (
      <AllProviders {...props} initialEntries={initialEntries} />
    ),
    ...options,
  });
}

// Re-export everything from RTL so test files only need one import line.
export * from "@testing-library/react";
