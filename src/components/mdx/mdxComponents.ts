import type { MDXComponents } from "mdx/types";
import { A, Blockquote, H2, H3, Li, Ol, P, Pre, Ul } from "./Prose";
import { Section } from "./Section";
import { Step, Walkthrough } from "./Walkthrough";
import { Explanation, Option, Question, Quiz } from "./Quiz";
import { PracticeTopic, PracticeTopics } from "./PracticeTopics";

/**
 * Everything an .mdx lesson can use without importing it: the styled
 * Markdown elements, plus the lesson building blocks (<Section>,
 * <Walkthrough>/<Step>, <PracticeTopics>/<PracticeTopic>, and
 * <Quiz>/<Question>/<Option>/<Explanation>). Demos are the exception - a
 * lesson imports those itself at the top of the file.
 */
export const mdxComponents: MDXComponents = {
  h2: H2,
  h3: H3,
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  a: A,
  blockquote: Blockquote,
  pre: Pre,
  Section,
  Walkthrough,
  Step,
  PracticeTopics,
  PracticeTopic,
  Quiz,
  Question,
  Option,
  Explanation,
};
