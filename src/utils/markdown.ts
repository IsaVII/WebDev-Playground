/**
 * A deliberately small inline-Markdown parser for the strings in the content
 * JSON (src/data/{en,sv}/**). Only the inline constructs lesson prose
 * actually needs are supported:
 *
 *   `code`  (also ``code with a ` inside``)   **bold**   *italic*
 *   [text](https://example.com)   \* backslash-escapes
 *
 * There are no block constructs (headings, lists, fences) - the JSON
 * structure already provides those - and no `_underscore_` emphasis, so
 * snake_case names and file names never get mangled. Anything that doesn't
 * form a complete construct is left as literal text rather than guessed at.
 */

export type InlineNode =
  | { type: "text"; value: string }
  | { type: "code"; value: string }
  | { type: "strong"; children: InlineNode[] }
  | { type: "em"; children: InlineNode[] }
  | { type: "link"; href: string; children: InlineNode[] };

const ESCAPABLE = "\\`*[]()";

/** Only these link targets are rendered as links - never `javascript:` etc. */
const SAFE_HREF = /^(https?:\/\/|mailto:|\/|#)/i;

const isSpace = (ch: string | undefined) => ch === undefined || /\s/.test(ch);

function backtickRun(text: string, start: number): number {
  let end = start;
  while (text[end] === "`") end++;
  return end - start;
}

/** Index of the next backtick run of exactly `length` backticks at/after `from`, or -1. */
function findClosingRun(text: string, from: number, length: number): number {
  let i = from;
  while (i < text.length) {
    if (text[i] !== "`") {
      i++;
      continue;
    }
    const run = backtickRun(text, i);
    if (run === length) return i;
    i += run;
  }
  return -1;
}

/** CommonMark: strip one space from each side of a code span if both are present. */
function trimCodeSpan(value: string): string {
  const padded = value.length > 1 && value.startsWith(" ") && value.endsWith(" ");
  return padded && value.trim() !== "" ? value.slice(1, -1) : value;
}

/**
 * Index of the `marker` ("*" or "**") that closes an emphasis run opened just
 * before `from`, or -1. Skips escapes, code spans, and (for "*") nested
 * "**...**" pairs; a closer may not follow whitespace.
 */
function findClosingMarker(text: string, from: number, marker: string): number {
  let i = from;
  while (i < text.length) {
    const ch = text[i];
    if (ch === "\\" && ESCAPABLE.includes(text[i + 1] ?? "")) {
      i += 2;
    } else if (ch === "`") {
      const run = backtickRun(text, i);
      const close = findClosingRun(text, i + run, run);
      i = close === -1 ? i + run : close + run;
    } else if (ch === "*") {
      if (marker === "*" && text.startsWith("**", i)) {
        // Skip a complete nested **bold** pair; otherwise step over the stars.
        const close = isSpace(text[i + 2])
          ? -1
          : findClosingMarker(text, i + 2, "**");
        i = close === -1 ? i + 2 : close + 2;
      } else if (text.startsWith(marker, i) && i > from && !isSpace(text[i - 1])) {
        return i;
      } else {
        i += marker === "**" && text.startsWith("**", i) ? 2 : 1;
      }
    } else {
      i++;
    }
  }
  return -1;
}

export function parseInline(text: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  let buffer = "";
  const flush = () => {
    if (buffer) nodes.push({ type: "text", value: buffer });
    buffer = "";
  };

  let i = 0;
  while (i < text.length) {
    const ch = text[i];

    if (ch === "\\" && ESCAPABLE.includes(text[i + 1] ?? "")) {
      buffer += text[i + 1];
      i += 2;
      continue;
    }

    if (ch === "`") {
      const run = backtickRun(text, i);
      const close = findClosingRun(text, i + run, run);
      if (close === -1) {
        buffer += "`".repeat(run);
        i += run;
      } else {
        flush();
        nodes.push({
          type: "code",
          value: trimCodeSpan(text.slice(i + run, close)),
        });
        i = close + run;
      }
      continue;
    }

    if (ch === "*") {
      const marker = text.startsWith("**", i) ? "**" : "*";
      const open = i + marker.length;
      const close = isSpace(text[open]) ? -1 : findClosingMarker(text, open, marker);
      if (close === -1) {
        buffer += marker;
        i = open;
      } else {
        flush();
        nodes.push({
          type: marker === "**" ? "strong" : "em",
          children: parseInline(text.slice(open, close)),
        });
        i = close + marker.length;
      }
      continue;
    }

    if (ch === "[") {
      const mid = text.indexOf("](", i + 1);
      const end = mid === -1 ? -1 : text.indexOf(")", mid + 2);
      const label = mid === -1 ? "" : text.slice(i + 1, mid);
      const href = end === -1 ? "" : text.slice(mid + 2, end);
      if (
        end !== -1 &&
        label !== "" &&
        !label.includes("]") &&
        !/\s/.test(href) &&
        SAFE_HREF.test(href)
      ) {
        flush();
        nodes.push({ type: "link", href, children: parseInline(label) });
        i = end + 1;
        continue;
      }
    }

    buffer += ch;
    i++;
  }

  flush();
  return nodes;
}

function plainText(nodes: InlineNode[]): string {
  return nodes
    .map((node) =>
      node.type === "text" || node.type === "code"
        ? node.value
        : plainText(node.children),
    )
    .join("");
}

/** The text a reader would see with all markup removed - for search, titles, aria-labels. */
export function stripMarkdown(text: string): string {
  return plainText(parseInline(text));
}
