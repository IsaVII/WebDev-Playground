import { useEffect, useRef, useState } from "react";
import useReducedMotion from "./useReducedMotion";

/**
 * Reveals an element once it scrolls into view, using an
 * IntersectionObserver instead of a scroll listener so it costs nothing
 * while the element is off-screen. Fires once and disconnects - reveals
 * are a one-time "welcome to the page" moment, not something that should
 * re-trigger every time someone scrolls past.
 *
 * With reduced motion on, the element is just immediately visible - the
 * intent (content appearing) still happens, the travel doesn't.
 */
function useScrollReveal({ threshold = 0.2, rootMargin = "0px 0px -10% 0px" } = {}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, threshold, rootMargin]);

  return { ref, isVisible };
}

export default useScrollReveal;
