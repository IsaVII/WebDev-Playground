import useScrollReveal from "../../hooks/useScrollReveal";

/**
 * Splits text into words, clips each one, and reveals them left-to-right
 * with a short stagger once the heading scrolls into view - meant for
 * hero headings and section titles, not body copy (splitting text breaks
 * screen-reader word boundaries in some AT, so the full string is also
 * rendered once, visually hidden, for anyone using assistive tech - see
 * MOTION_SYSTEM.md's text-reveal accessibility note).
 */
function TextReveal({ text, as: Tag = "h2", className = "", wordDelay = 40 }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.4 });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span
            key={i}
            style={{ overflow: "hidden", display: "inline-block" }}
          >
            <span
              className={`text-reveal-piece ${isVisible ? "is-visible" : ""}`}
              style={{ transitionDelay: `${i * wordDelay}ms` }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

export default TextReveal;
