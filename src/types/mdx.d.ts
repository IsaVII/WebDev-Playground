// Ambient declaration (no top-level import/export, or it stops being global).
declare module "*.mdx" {
  export const frontmatter: import("./content").LessonFrontmatter;
  const Content: import("react").ComponentType<{
    components?: import("mdx/types").MDXComponents;
  }>;
  export default Content;
}

// Just the frontmatter, without compiling the lesson - see
// scripts/vite-plugin-mdx-frontmatter.ts for why.
declare module "*.mdx?frontmatter" {
  const frontmatter: import("./content").LessonFrontmatter;
  export default frontmatter;
}
