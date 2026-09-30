import type { CSSProperties, ElementType, HTMLAttributes } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";

/**
 * Wraps any content so it reveals in as it scrolls into view.
 * `direction` picks which .reveal-* variant to use (up/down/left/right/
 * scale, from motion.css); `index` feeds --stagger-index so a list of
 * these staggers automatically when a shared parent has
 * .stagger-children (see TopicCard usage in Main.tsx).
 *
 * `variant` controls the reveal style:
 *   "default" - the standard reveal: opacity 0 → 1 with a translate
 *   "fade"    - starts at opacity 0.2, fades up to opacity 1, no translate
 */
interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  direction?: "up" | "down" | "left" | "right";
  variant?: "default" | "fade";
  index?: number;
}

function Reveal({
  children,
  as: Tag = "div",
  direction = "up",
  variant = "default",
  index = 0,
  className = "",
  ...rest
}: RevealProps) {
  const { ref, isVisible } = useScrollReveal();

  if (variant === "fade") {
    return (
      <Tag
        ref={ref}
        className={`reveal-fade ${isVisible ? "is-visible" : ""} ${className}`}
        style={{ "--stagger-index": index } as CSSProperties}
        {...rest}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${direction} ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ "--stagger-index": index } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
