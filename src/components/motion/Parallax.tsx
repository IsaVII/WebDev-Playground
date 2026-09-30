import { useEffect, useRef } from "react";
import useReducedMotion from "../../hooks/useReducedMotion";

/**
 * Translates its content vertically as the page scrolls, capped to
 * --parallax-max so it reads as depth rather than a distracting float.
 * Runs on rAF and only while the element is near the viewport (an
 * IntersectionObserver gates the scroll listener) so idle sections cost
 * nothing. Disabled entirely under reduced motion.
 */
function Parallax({ children, speed = 0.15, className = "" }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const node = ref.current;
    if (!node) return;

    let ticking = false;
    let inView = false;

    const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

    const update = () => {
      ticking = false;
      if (!inView) return;
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const distanceFromCenter = rect.top + rect.height / 2 - viewportCenter;
      const maxTravel = 40; // px - matches --parallax-max
      const offset = clamp(distanceFromCenter * speed * -1, -maxTravel, maxTravel);
      node.style.transform = `translateY(${offset}px)`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) onScroll();
      },
      { rootMargin: "20% 0px" }
    );

    observer.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [reducedMotion, speed]);

  return (
    <div ref={ref} className={`parallax-layer ${className}`}>
      {children}
    </div>
  );
}

export default Parallax;
