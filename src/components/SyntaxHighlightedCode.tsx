/**
 * A small, dependency-free syntax highlighter for JS/JSX code snippets,
 * colored to match the default "Dark+" theme in Visual Studio Code.
 *
 * This is a regex-based tokenizer, not a real parser - it's built to make
 * the React and Redux code examples on this site easy to scan, not to
 * handle every possible piece of JavaScript syntax perfectly.
 *
 * Colors below are taken directly from VS Code's built-in Dark+ theme:
 *   - keywords like `if`/`return`/`import`   -> #C586C0 (pink)
 *   - keywords like `const`/`function`/`new` -> #569CD6 (blue)
 *   - strings                                -> #CE9178 (orange)
 *   - numbers                                -> #B5CEA8 (light green)
 *   - comments                               -> #6A9955 (green)
 *   - function calls                         -> #DCDCAA (yellow)
 *   - component names / JSX tags             -> #4EC9B0 (teal)
 *   - JSX attribute names / declared vars    -> #9CDCFE (light blue)
 */

const KEYWORDS_DECLARATION = new Set([
  "const",
  "let",
  "var",
  "function",
  "class",
  "extends",
  "new",
  "typeof",
  "instanceof",
  "delete",
  "void",
  "in",
  "of",
  "static",
  "async",
  "await",
  "this",
  "super",
  "interface",
  "type",
  "enum",
  "namespace",
  "declare",
  "abstract",
  "readonly",
  "public",
  "private",
  "protected",
  "implements",
  "keyof",
  "as",
  "satisfies",
]);

const KEYWORDS_CONTROL = new Set([
  "import",
  "export",
  "from",
  "default",
  "return",
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "break",
  "continue",
  "try",
  "catch",
  "finally",
  "throw",
  "yield",
]);

const LITERALS = new Set(["true", "false", "null", "undefined"]);

// Colors match VS Code's default "Dark+" theme - defined once as CSS
// variables in index.css (--color-syntax-*) and exposed here as the
// matching Tailwind utilities.
const TOKEN_COLORS = {
  comment: "text-syntax-comment italic",
  string: "text-syntax-string",
  number: "text-syntax-number",
  control: "text-syntax-control",
  declaration: "text-syntax-declaration",
  literal: "text-syntax-declaration",
  tag: "text-syntax-declaration",
  component: "text-syntax-component",
  call: "text-syntax-call",
  attribute: "text-syntax-attribute",
  plain: "text-syntax-plain",
};

const TOKEN_REGEX = new RegExp(
  [
    "(?<comment>//[^\\n]*|/\\*[\\s\\S]*?\\*/)",
    "(?<string>\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*'|`(?:\\\\.|[^`\\\\])*`)",
    "(?<number>\\b\\d+\\.?\\d*\\b)",
    "(?<word>\\b[A-Za-z_$][\\w$]*\\b)",
    "(?<lt><\\/?)",
    "(?<gt>\\/?>)",
  ].join("|"),
  "g",
);

/**
 * Splits a line of code into `{ text, type }` tokens.
 */
function tokenize(code) {
  const tokens = [];
  let lastIndex = 0;
  let insideTag = false;
  let prevWasFunctionKeyword = false;
  let match;

  while ((match = TOKEN_REGEX.exec(code))) {
    if (match.index > lastIndex) {
      tokens.push({ text: code.slice(lastIndex, match.index), type: "plain" });
    }

    const g = match.groups;

    if (g.comment) {
      tokens.push({ text: g.comment, type: "comment" });
      prevWasFunctionKeyword = false;
    } else if (g.string) {
      tokens.push({ text: g.string, type: "string" });
      prevWasFunctionKeyword = false;
    } else if (g.number) {
      tokens.push({ text: g.number, type: "number" });
      prevWasFunctionKeyword = false;
    } else if (g.lt) {
      insideTag = true;
      tokens.push({ text: g.lt, type: "plain" });
    } else if (g.gt) {
      insideTag = false;
      tokens.push({ text: g.gt, type: "plain" });
    } else if (g.word) {
      const word = g.word;
      const after = code.slice(TOKEN_REGEX.lastIndex, TOKEN_REGEX.lastIndex + 20);
      let type;

      if (insideTag) {
        // Only the identifier right after `<` / `</` is the tag name -
        // everything else inside the tag is handled on later matches.
        type = /^[A-Z]/.test(word) ? "component" : "tag";
        insideTag = false;
      } else if (KEYWORDS_CONTROL.has(word)) {
        type = "control";
      } else if (KEYWORDS_DECLARATION.has(word)) {
        type = "declaration";
      } else if (LITERALS.has(word)) {
        type = "literal";
      } else if (prevWasFunctionKeyword && /^\s*\(/.test(after)) {
        // `function Greeting(` - Greeting is a component/function name,
        // not a call.
        type = "component";
      } else if (/^\s*\(/.test(after)) {
        type = "call";
      } else if (/^[A-Z]/.test(word)) {
        type = "component";
      } else if (/^\s*=(?!=|>)/.test(after)) {
        type = "attribute";
      } else {
        type = "plain";
      }

      tokens.push({ text: word, type });
      prevWasFunctionKeyword = word === "function" || word === "class";
    }

    lastIndex = TOKEN_REGEX.lastIndex;
  }

  if (lastIndex < code.length) {
    tokens.push({ text: code.slice(lastIndex), type: "plain" });
  }

  return tokens;
}

/**
 * Renders one line of code with VS Code-style syntax colors.
 * Pass a single line - `CodeBlock` handles splitting multi-line code.
 */
function SyntaxHighlightedCode({ code }) {
  const tokens = tokenize(code);

  return tokens.map((token, index) => (
    <span key={index} className={TOKEN_COLORS[token.type]}>
      {token.text}
    </span>
  ));
}

export default SyntaxHighlightedCode;
