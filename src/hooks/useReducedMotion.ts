import { useEffect, useState } from "react";

/**
 * Tracks prefers-reduced-motion and stays in sync if the user changes it
 * mid-session (OS-level setting, no reload required). Every motion
 * component in src/components/motion checks this before running any
 * transform/scroll/timer-driven animation - see MOTION_SYSTEM.md.
 */
function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e) => setReduced(e.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}

export default useReducedMotion;
