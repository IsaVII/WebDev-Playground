import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useReducedMotion from "../../hooks/useReducedMotion";

/**
 * Replays a short enter animation whenever the route changes, by keying
 * on pathname - React unmounts/remounts the wrapper, which restarts the
 * CSS animation named in motion.css. No exit animation: waiting for an
 * outgoing page to animate away adds latency to navigation for no real
 * benefit, so only the incoming page moves.
 *
 * Scroll position is reset on navigation so the entrance is never seen
 * from a mid-scroll position left over from the previous page.
 */
function PageTransition({ children }) {
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "auto" });
  }, [location.pathname, reducedMotion]);

  return (
    <div
      key={location.pathname}
      className={reducedMotion ? "" : "page-transition-enter"}
    >
      {children}
    </div>
  );
}

export default PageTransition;
