/* src/styles/motion.css */
:root {
  --duration-base: 280ms; /* used for the reduced-motion opacity fallback */
  --duration-moderate: 420ms; /* reveal + text-reveal transition length */
  --ease-emerge: cubic-bezier(0.16, 1, 0.3, 1); /* fast start, soft landing */
  --reveal-distance: 24px; /* how far content travels in from */
}

/* ---- Text reveal (per word/char, driven by <TextReveal>) ---- */
.text-reveal-piece {
  display: inline-block;
  transform: translateY(110%);
  opacity: 0;
  transition:
    transform var(--duration-moderate) var(--ease-emerge),
    opacity var(--duration-moderate) var(--ease-emerge);
}
.text-reveal-piece.is-visible {
  transform: translateY(0);
  opacity: 1;
}

/* ---- Content reveal (driven by <Reveal>) ---- */
.reveal {
  opacity: 0;
  transition:
    opacity var(--duration-moderate) var(--ease-emerge),
    transform var(--duration-moderate) var(--ease-emerge);
  will-change: opacity, transform;
}
.reveal-up {
  transform: translateY(var(--reveal-distance));
}
.reveal-down {
  transform: translateY(calc(var(--reveal-distance) * -1));
}
.reveal-left {
  transform: translateX(var(--reveal-distance));
}
.reveal-right {
  transform: translateX(calc(var(--reveal-distance) * -1));
}
.reveal-scale {
  transform: scale(0.96);
}
.reveal.is-visible {
  opacity: 1;
  transform: translate(0, 0) scale(1);
  will-change: auto;
}

/* Stagger children of a revealed container - pair with the
   --stagger-index custom property Reveal sets inline per child. */
.stagger-children > * {
  transition-delay: calc(var(--stagger-index, 0) * 70ms);
}

/* ---- Reduced motion: keep the fade, drop the travel ---- */
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-moderate: 1ms;
  }

  .reveal,
  .reveal-up,
  .reveal-down,
  .reveal-left,
  .reveal-right,
  .reveal-scale {
    transform: none !important;
    transition: opacity var(--duration-base) linear;
  }

  .text-reveal-piece {
    transform: none;
  }
}

/* ---- Reveal variant: fading ---- */
.reveal-fade {
  opacity: 0.2;
  transition: opacity var(--duration-moderate) var(--ease-emerge);
  will-change: opacity;
}
.reveal-fade.is-visible {
  opacity: 1;
  will-change: auto;
}

@media (prefers-reduced-motion: reduce) {
  .reveal-fade {
    transition: opacity var(--duration-base) linear;
  }
}
