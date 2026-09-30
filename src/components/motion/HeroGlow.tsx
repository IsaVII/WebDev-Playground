import Parallax from "./Parallax";

/**
 * Decorative animated gradient behind the hero heading on the home page.
 *
 * Two soft, blurred color blobs drift on a slow 12s loop (`.hero-gradient`
 * in motion.css handles the animation itself) and shift position gently
 * as the page scrolls, via the existing <Parallax> primitive. It's purely
 * decorative - aria-hidden, sits behind the text (-z-10), and never
 * intercepts clicks (pointer-events-none) - and the gradient's own motion
 * is disabled under prefers-reduced-motion (see motion.css), independent
 * of Parallax's own reduced-motion handling.
 *
 * Usage: drop into a `relative overflow-hidden` section, positioned
 * absolute to fill it:
 *
 *   <section className="relative overflow-hidden ...">
 *     <HeroGlow />
 *     <h1>...</h1>
 *   </section>
 */
function HeroGlow() {
  return (
    <Parallax
      speed={0.08}
      className="absolute inset-0 -z-10 pointer-events-none"
    >
      <div className="hero-gradient absolute inset-0" aria-hidden="true" />
    </Parallax>
  );
}

export default HeroGlow;
