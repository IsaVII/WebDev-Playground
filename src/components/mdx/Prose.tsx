import { isValidElement, type ComponentPropsWithoutRef, type ReactNode } from "react";
import CodeBlock from "../CodeBlock";

/**
 * Styling for the plain Markdown elements inside a lesson .mdx file. These
 * match the classes the JSON-driven LearningTopicLayout uses for the same
 * kinds of text, so an MDX lesson looks like the rest of the site.
 */
export function H2(props: ComponentPropsWithoutRef<"h2">) {
  return <h2 className="text-2xl text-heading-alt mt-6 mb-3" {...props} />;
}

export function H3(props: ComponentPropsWithoutRef<"h3">) {
  return <h3 className="text-xl text-heading-alt mt-4 mb-2" {...props} />;
}

export function P(props: ComponentPropsWithoutRef<"p">) {
  return <p className="text-muted leading-relaxed mb-4 text-left" {...props} />;
}

export function Ul(props: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul className="text-muted leading-relaxed text-left list-disc pl-6 mb-4" {...props} />
  );
}

export function Ol(props: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol className="text-muted leading-relaxed text-left list-decimal pl-6 mb-4" {...props} />
  );
}

export function Li(props: ComponentPropsWithoutRef<"li">) {
  return <li className="mb-2" {...props} />;
}

export function A(props: ComponentPropsWithoutRef<"a">) {
  const external = props.href?.startsWith("http");
  return (
    <a
      className="text-accent hover:underline"
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      {...props}
    />
  );
}

export function Blockquote(props: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className="bg-content2 border-l-4 border-content2-border text-muted text-sm p-3 pl-4 mb-4 leading-relaxed text-left"
      {...props}
    />
  );
}

/** A fenced code block (```java ... ```) renders with the site's CodeBlock. */
export function Pre({ children }: { children?: ReactNode }) {
  const inner = isValidElement<{ children?: ReactNode }>(children)
    ? children.props.children
    : children;
  const code = typeof inner === "string" ? inner.replace(/\n$/, "") : "";
  return (
    <div className="mb-4 text-left">
      <CodeBlock>{code}</CodeBlock>
    </div>
  );
}
