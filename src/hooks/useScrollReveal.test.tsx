import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach } from "vitest";
import useScrollReveal from "./useScrollReveal";

/**
 * A controllable stand-in for IntersectionObserver. Real browsers call the
 * callback whenever the observed element crosses the threshold - here a
 * test calls it directly, with a fake "entry", to simulate that.
 */
function installIntersectionObserverMock() {
  const instances = [];
  window.IntersectionObserver = class {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
      this.disconnected = false;
      instances.push(this);
    }
    observe() {}
    unobserve() {}
    disconnect() {
      this.disconnected = true;
    }
  };
  return instances;
}

function installReducedMotionMock(matches) {
  window.matchMedia = () => ({
    matches,
    addEventListener: () => {},
    removeEventListener: () => {},
  });
}

// The hook returns a real DOM ref (useRef), not a callback ref, so it only
// creates the IntersectionObserver once that ref is actually attached to a
// rendered element - a small probe component does that the same way every
// real caller (Reveal, TextReveal) does.
function Probe() {
  const { ref, isVisible } = useScrollReveal();
  return <div ref={ref}>{isVisible ? "visible" : "hidden"}</div>;
}

describe("useScrollReveal", () => {
  const originalIO = window.IntersectionObserver;
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    cleanup();
    window.IntersectionObserver = originalIO;
    window.matchMedia = originalMatchMedia;
  });

  it("starts not visible, and observes the element it's attached to", () => {
    installReducedMotionMock(false);
    const instances = installIntersectionObserverMock();
    render(<Probe />);

    expect(screen.getByText("hidden")).toBeInTheDocument();
    expect(instances).toHaveLength(1);
  });

  it("becomes visible once the observed element intersects", () => {
    installReducedMotionMock(false);
    const instances = installIntersectionObserverMock();
    render(<Probe />);

    act(() => instances[0].callback([{ isIntersecting: true }]));

    expect(screen.getByText("visible")).toBeInTheDocument();
  });

  it("disconnects the observer after the first reveal - it never re-hides", () => {
    installReducedMotionMock(false);
    const instances = installIntersectionObserverMock();
    render(<Probe />);

    act(() => instances[0].callback([{ isIntersecting: true }]));

    expect(instances[0].disconnected).toBe(true);
  });

  it("stays hidden while the element hasn't intersected yet", () => {
    installReducedMotionMock(false);
    const instances = installIntersectionObserverMock();
    render(<Probe />);

    act(() => instances[0].callback([{ isIntersecting: false }]));

    expect(screen.getByText("hidden")).toBeInTheDocument();
  });

  it("is visible immediately when prefers-reduced-motion is on, without observing anything", () => {
    installReducedMotionMock(true);
    const instances = installIntersectionObserverMock();
    render(<Probe />);

    expect(screen.getByText("visible")).toBeInTheDocument();
    expect(instances).toHaveLength(0);
  });
});
