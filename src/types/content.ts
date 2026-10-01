/**
 * Shapes of the content JSON (src/data/{en,sv}/**) as consumed by the shared
 * page layouts. The JSON files are the source of truth; these types only
 * describe the fields the layouts actually read, so a page can pass a JSON
 * object straight in as long as it has (at least) these fields.
 *
 * Every prose string (descriptions, steps, notes, quiz text...) is rendered
 * as inline Markdown by `InlineMarkdown` - `code`, **bold**, *italic*, and
 * [links](https://...); see src/utils/markdown.ts. To show a literal `*` or
 * backtick, put it in a code span (or escape it with a backslash).
 * src/data/content.test.ts fails on any string that leaves a stray one behind.
 * Titles, `key`s and other non-prose fields stay plain text.
 */

export interface Introduction {
  heading: string;
  description: string;
}

export interface CoreConcepts {
  heading: string;
  concepts: { title: string; description: string }[];
}

export interface GettingStarted {
  heading: string;
  steps: string[];
}

/** Cheat sheets' closing checklist; a few JSON files label it `title` instead of `heading`. */
export interface CheatSheetGettingStarted {
  heading?: string;
  title?: string;
  steps: string[];
}

export interface PracticeTopic {
  title: string;
  description: string;
}

/** One entry of a StepByStepExample: `lines` is an inclusive 1-indexed [first, last] range. */
export interface ExampleStep {
  label: string;
  lines: number[];
  explanation: string;
}

export interface FullExample {
  heading: string;
  title?: string;
  description?: string;
  files: string[];
  steps: ExampleStep[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface CheatSheetSubStep {
  id?: string | number;
  title: string;
  description?: string;
  codeFile?: string;
  highlightLines?: number[];
  note?: string;
}

export interface CheatSheetStep {
  id?: string | number;
  title: string;
  description?: string;
  codeFile?: string;
  highlightLines?: number[];
  substeps?: string[];
  note?: string;
  subSteps?: CheatSheetSubStep[];
}

/**
 * Frontmatter every lesson .mdx file starts with. `practiceTopics` and `quiz`
 * duplicate what the body declares (<PracticeTopic title=...> / <Quiz>) so the
 * header menu and progress tracking can count them without rendering the
 * lesson; src/data/mdx.test.ts fails if the two ever disagree.
 */
export interface LessonFrontmatter {
  title: string;
  practiceTopics: string[];
  quiz?: boolean;
}

/** A topic entry in learningContent.json / cheatsheets.json / javaBackend.json. */
export interface TopicSummary {
  id: number;
  key: string;
  title: string;
  description: string;
  route: string;
  screenshot?: string;
  difficulty: string;
  estimatedTime: string;
  comingSoon?: boolean;
}

export interface FolderStructure {
  heading: string;
  description?: string;
  structure: string;
}

export interface BackendSetup {
  heading: string;
  description?: string;
  steps: { step: string; codeFile: string }[];
}

export interface WhatYouMightBeMissing {
  heading: string;
  categories: { title: string; items: string[] }[];
}

export interface SourceLink {
  url: string;
  label: string;
}

/** The `{ topics: [...] }` wrapper used by the three index JSON files. */
export interface TopicIndex {
  topics: TopicSummary[];
}
