import type { LessonFrontmatter } from "../types/content";

/**
 * Adapts an .mdx lesson's frontmatter to the `{ practiceTopics, quiz }` shape
 * the header menu and ProgressContext read from every lesson's content, so an
 * MDX lesson slots into their existing per-topic maps unchanged.
 */
export function lessonMeta(frontmatter: LessonFrontmatter) {
  return {
    practiceTopics: frontmatter.practiceTopics.map((title) => ({ title })),
    // Those consumers only check whether a quiz exists (`quiz.length > 0`).
    quiz: frontmatter.quiz ? [true] : [],
  };
}
