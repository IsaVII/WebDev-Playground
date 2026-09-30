import { act, renderHook } from "@testing-library/react";
import useReducedMotion from "./useReducedMotion";

/**
 * A controllable stand-in for window.matchMedia that lets a test fire a
 * "change" event on demand, the way the OS would when someone flips their
 * reduced-motion setting mid-session.
 */
function installMatchMediaMock(initialMatches) {
  let listener;
  const mql = {
    matches: initialMatches,
    media: "(prefers-reduced-motion: reduce)",
    addEventListener: (_event, cb) => {
      listener = cb;
    },
    removeEventListener: () => {
      listener = undefined;
    },
  };
  window.matchMedia = () => mql;

  return {
    fireChange(matches) {
      mql.matches = matches;
      act(() => listener({ matches }));
    },
  };
}

describe("useReducedMotion", () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it("reflects prefers-reduced-motion: reduce when it's already set", () => {
    installMatchMediaMock(true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("reflects no preference when reduced motion isn't set", () => {
    installMatchMediaMock(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it("updates live if the OS setting changes mid-session", () => {
    const mock = installMatchMediaMock(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    mock.fireChange(true);
    expect(result.current).toBe(true);

    mock.fireChange(false);
    expect(result.current).toBe(false);
  });
});
