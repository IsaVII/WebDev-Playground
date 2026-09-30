import "@testing-library/jest-dom/vitest";
import "../i18n";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Unmount anything rendered by the previous test so state (and side
// effects like observers/timers it registered) don't leak between tests.
afterEach(() => {
  cleanup();
  document.cookie.split(";").forEach((entry) => {
    const name = entry.split("=")[0]?.trim();
    if (name) document.cookie = `${name}=; max-age=0; path=/`;
  });
});

// jsdom doesn't implement window.scrollTo - every page layout calls it on
// mount (see LearningTopicLayout/CheatSheetLayout), and without a stub that
// prints a "not implemented" error to the console on every single test.
window.scrollTo = () => {};

// jsdom doesn't implement matchMedia either, and useReducedMotion (used by
// every motion component - Reveal, TextReveal, PageTransition, ...) reads
// it on every render. This default stub reports "no preference" and
// provides a no-op listener API; tests that specifically need to simulate
// the user's reduced-motion setting changing override this themselves.
window.matchMedia =
  window.matchMedia ||
  (() => ({
    matches: false,
    media: "",
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }));

// jsdom has no IntersectionObserver, which useScrollReveal (behind Reveal
// and TextReveal) needs to do anything. This default stub just lets
// components mount without crashing - the observer is created but never
// actually reports an intersection, so `isVisible` stays false. Tests that
// need to simulate an element scrolling into view provide their own
// implementation (see useScrollReveal.test.js).
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver =
  window.IntersectionObserver || IntersectionObserverStub;
