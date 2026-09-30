import useReducedMotion from "../hooks/useReducedMotion";

const SIZE = 56;
const STROKE = 5;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Small animated ring showing `completed`/`total` as a filled arc, in
 * place of (or alongside) a plain "3 of 8" text readout.
 *
 * The stroke draws in on mount/update by transitioning stroke-dashoffset
 * - the same tween any other scroll-reveal in the app uses
 * (--duration-ambient / --ease-emerge from motion.css), so it feels like
 * part of the same motion system rather than a one-off widget. Under
 * prefers-reduced-motion the fill still updates, just without the
 * transition, matching how the rest of the app handles reduced motion
 * (state changes stay perceivable, travel/animation doesn't).
 *
 * The percentage is conveyed via a single aria-label on the wrapper
 * (role="img") rather than read twice, so the centered number is
 * aria-hidden - it's a visual restatement of the same value.
 */
function ProgressRing({ completed, total, label, className = "" }) {
  const reducedMotion = useReducedMotion();
  const safeTotal = total > 0 ? total : 0;
  const percent = safeTotal > 0 ? Math.min(completed / safeTotal, 1) : 0;
  const offset = CIRCUMFERENCE * (1 - percent);

  return (
    <div
      role="img"
      aria-label={label ?? `${completed} of ${safeTotal} completed`}
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth={STROKE}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          style={{
            transition: reducedMotion
              ? "none"
              : "stroke-dashoffset var(--duration-ambient) var(--ease-emerge)",
          }}
        />
      </svg>
      <span
        aria-hidden="true"
        className="absolute text-xs font-bold text-heading"
      >
        {completed}/{safeTotal}
      </span>
    </div>
  );
}

export default ProgressRing;
