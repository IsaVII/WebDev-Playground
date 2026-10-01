import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import mdxFrontmatter from "./scripts/vite-plugin-mdx-frontmatter";

// https://vite.dev/config/
export default defineConfig({
  base: "/WebDev-Playground/",
  plugins: [
    // Lessons written as .mdx (see src/data/{en,sv}/learning/*.mdx) compile to
    // React components; the YAML frontmatter becomes `export const frontmatter`.
    // Must run before the React plugin.
    {
      enforce: "pre",
      ...mdx({
        // Only .mdx: the plugin would otherwise also compile the .md sample
        // files under src/data/code-examples, which are loaded as raw text.
        include: /\.mdx$/,
        format: "mdx",
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      }),
    },
    // `lesson.mdx?frontmatter` -> just the frontmatter, without the lesson.
    mdxFrontmatter(),
    react(),
    tailwindcss(),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
});
