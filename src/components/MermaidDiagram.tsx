import { useEffect, useId, useState } from "react";

/**
 * Renders Mermaid source as an SVG diagram.
 *
 * mermaid is large, so it is imported on demand (a separate chunk that only
 * loads on a page that actually shows a diagram). It also needs real layout
 * measurement, which jsdom doesn't have - if rendering fails for any reason
 * the component renders nothing, leaving the source code block that always
 * sits above it as the fallback.
 */
interface MermaidDiagramProps {
  source: string;
}

/** Same rule the stylesheet uses: `.dark` wins, `.light` wins, else the OS setting. */
function prefersDark(): boolean {
  const root = document.documentElement;
  if (root.classList.contains("dark")) return true;
  if (root.classList.contains("light")) return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function MermaidDiagram({ source }: MermaidDiagramProps) {
  // useId() contains colons, which aren't valid in the element id mermaid builds its SVG from.
  const id = `mermaid-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [svg, setSvg] = useState<string | null>(null);
  const [dark, setDark] = useState(prefersDark);

  // The theme toggle just flips a class on <html>, so watch for it.
  useEffect(() => {
    const observer = new MutationObserver(() => setDark(prefersDark()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: dark ? "dark" : "default",
        });
        const { svg: rendered } = await mermaid.render(id, source);
        if (!cancelled) setSvg(rendered);
      } catch {
        if (!cancelled) setSvg(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [source, dark, id]);

  if (!svg) return null;

  return (
    <div
      role="img"
      aria-label="Rendered class diagram"
      className="bg-surface border border-line rounded p-4 overflow-x-auto flex justify-center"
      // mermaid sanitizes its own output (securityLevel "strict"); the source is bundled content, not user input.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default MermaidDiagram;
