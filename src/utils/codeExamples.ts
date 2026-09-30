/**
 * Resolves the `codeFile` / `files` references left in the cheatsheet and
 * learning content JSON (see scripts/extract-code-examples.mjs) back into
 * plain strings/line-arrays for the components that render them.
 *
 * Every file under src/data/code-examples/** is pulled in as raw text at
 * build time via Vite's `?raw` import - no network request, no async
 * loading state, just a plain string available the moment this module
 * runs. `import.meta.glob` with `eager: true` is what makes that happen
 * synchronously instead of returning dynamic `import()` promises.
 */
const rawModules = import.meta.glob("/src/data/code-examples/**/*", {
  eager: true,
  query: "?raw",
  import: "default",
});

// Re-key from Vite's absolute module path ("/src/data/code-examples/...")
// down to the same repo-relative path stored in the JSON
// ("code-examples/..."), and strip the single trailing newline every
// extracted file ends with so line counts match the original inline code
// exactly.
const FILES_BY_PATH = Object.fromEntries(
  Object.entries(rawModules).map(([path, content]) => [
    path.replace(/^\/src\/data\//, ""),
    content.replace(/\n$/, ""),
  ]),
);

/**
 * Returns the raw text content of one extracted code file.
 * @param {string} relativePath - e.g. "code-examples/cheatsheets/sql/03-join-tables.sql"
 */
export function loadCodeFile(relativePath) {
  const content = FILES_BY_PATH[relativePath];
  if (content === undefined) {
    throw new Error(
      `codeExamples: no extracted file found for "${relativePath}". Run ` +
        `\`node scripts/extract-code-examples.mjs\` if you just added it by hand.`,
    );
  }
  return content;
}

/**
 * Concatenates one or more extracted files into the single line-array
 * StepByStepExample expects, with one blank line between files - matching
 * how the original hand-written `fullExample.code` arrays separated the
 * files they walked through.
 * @param {string[]} relativePaths
 * @returns {string[]} lines
 */
export function loadCombinedExample(relativePaths) {
  const lines = [];
  relativePaths.forEach((path, index) => {
    if (index > 0) lines.push("");
    lines.push(...loadCodeFile(path).split("\n"));
  });
  return lines;
}
