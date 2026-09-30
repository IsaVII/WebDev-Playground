import useScrollReveal from "../../hooks/useScrollReveal";

/**
 * Wraps any content so it reveals in as it scrolls into view.
 * `direction` picks which .reveal-* variant to use (up/down/left/right/
 * scale, from motion.css); `index` feeds --stagger-index so a list of
 * these staggers automatically when a shared parent has
 * .stagger-children (see TopicCard usage in Main.jsx).
 *
 * `variant` controls the reveal style:
 *   "default" - the standard reveal: opacity 0 → 1 with a translate
 *   "fade"    - starts at opacity 0.2, fades up to opacity 1, no translate
 */
function Reveal({
  children,
  as: Tag = "div",
  direction = "up",
  variant = "default",
  index = 0,
  className = "",
  ...rest
}) {
  const { ref, isVisible } = useScrollReveal();

  if (variant === "fade") {
    return (
      <Tag
        ref={ref}
        className={`reveal-fade ${isVisible ? "is-visible" : ""} ${className}`}
        style={{ "--stagger-index": index }}
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
      style={{ "--stagger-index": index }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
