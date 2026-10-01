import { Fragment, useMemo, type ReactNode } from "react";
import { parseInline, type InlineNode } from "../utils/markdown";

/**
 * Renders a content-JSON string that may contain inline Markdown (`code`,
 * **bold**, *italic*, [links](https://...)). See src/utils/markdown.ts for
 * exactly what is supported.
 *
 * Pass `allowLinks={false}` anywhere the text sits inside another
 * interactive element (a card that is itself a link, a button, a label) -
 * a nested <a> is invalid HTML - and the link text is shown without the link.
 */
interface InlineMarkdownProps {
  /** A string is parsed as inline Markdown; other nodes (e.g. MDX content) pass through as-is. */
  children: ReactNode;
  allowLinks?: boolean;
}

function renderNodes(nodes: InlineNode[], allowLinks: boolean): ReactNode {
  return nodes.map((node, index) => {
    switch (node.type) {
      case "text":
        return <Fragment key={index}>{node.value}</Fragment>;
      case "code":
        return <code key={index}>{node.value}</code>;
      case "strong":
        return <strong key={index}>{renderNodes(node.children, allowLinks)}</strong>;
      case "em":
        return <em key={index}>{renderNodes(node.children, allowLinks)}</em>;
      case "link":
        return allowLinks ? (
          <a
            key={index}
            href={node.href}
            target={node.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            {renderNodes(node.children, allowLinks)}
          </a>
        ) : (
          <Fragment key={index}>{renderNodes(node.children, allowLinks)}</Fragment>
        );
    }
  });
}

function InlineMarkdown({ children, allowLinks = true }: InlineMarkdownProps) {
  const text = typeof children === "string" ? children : null;
  const nodes = useMemo(() => (text === null ? [] : parseInline(text)), [text]);
  return <>{text === null ? children : renderNodes(nodes, allowLinks)}</>;
}

export default InlineMarkdown;
