import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import type { Plugin } from "vite";
import { parse } from "yaml";

const SUFFIX = "?frontmatter";
const PREFIX = "\0mdx-frontmatter:";

/**
 * `import meta from "./lesson.mdx?frontmatter"` gives just the YAML frontmatter
 * of an .mdx file, as a plain object - without compiling the lesson.
 *
 * Why it exists: importing the .mdx itself (even just for its `frontmatter`
 * export) pulls the whole compiled lesson - its text and every demo it
 * imports - into whatever bundle the importer is in. The header menu and the
 * progress tracking need only the lesson's practice topics, and they sit in
 * the main bundle, so they use this instead and the lesson stays in its own
 * lazy-loaded page chunk.
 *
 * The virtual module id ends in `.js` on purpose: the MDX plugin acts on
 * anything that looks like an `.mdx` path.
 */
export default function mdxFrontmatter(): Plugin {
  return {
    name: "mdx-frontmatter",
    enforce: "pre",

    resolveId(source, importer) {
      if (!source.endsWith(SUFFIX) || !importer) return null;
      const file = resolve(
        dirname(importer.split("?")[0]),
        source.slice(0, -SUFFIX.length),
      );
      return `${PREFIX}${file}.js`;
    },

    load(id) {
      if (!id.startsWith(PREFIX)) return null;
      const file = id.slice(PREFIX.length, -".js".length);
      this.addWatchFile(file);

      const source = readFileSync(file, "utf8");
      const block = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
      if (!block) {
        this.error(`${file} has no frontmatter block`);
      }
      return `export default ${JSON.stringify(parse(block[1]))};`;
    },
  };
}
