import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { screen } from "@testing-library/react";
import type { ComponentType } from "react";
import MdxLesson from "../components/mdx/MdxLesson";
import { renderWithProviders } from "../test/test-utils";
import { loadCombinedExample } from "../utils/codeExamples";
import type { LessonFrontmatter } from "../types/content";

/**
 * Lessons written as .mdx (src/data/{en,sv}/learning/*.mdx) are checked here
 * the way content.test.ts checks the JSON ones: the body and the frontmatter
 * restate some of the same facts (practice topics, whether there's a quiz),
 * the walkthrough points at line numbers in a separate code file, and the
 * English and Swedish files are meant to be the same lesson. Nothing but a
 * test ties those together, so drift would otherwise only show up as a
 * wrong progress count or a highlight past the end of the code.
 */
const compiled = import.meta.glob<{
  default: ComponentType;
  frontmatter: LessonFrontmatter;
}>("./{en,sv}/learning/*.mdx", { eager: true });

// What Header and ProgressContext import instead of the compiled lesson.
const metaOnly = import.meta.glob<LessonFrontmatter>(
  "./{en,sv}/learning/*.mdx",
  { eager: true, query: "?frontmatter", import: "default" },
);

// The unprocessed source, read from disk (a `?raw` import would be compiled
// by the MDX plugin like any other .mdx import).
const raw = Object.fromEntries(
  Object.keys(compiled).map((path) => [
    path,
    readFileSync(fileURLToPath(new URL(path, import.meta.url)), {
      encoding: "utf8",
    }),
  ]),
);

const LANGS = ["en", "sv"] as const;

function lessonNames() {
  return Object.keys(raw)
    .filter((path) => path.startsWith("./en/"))
    .map((path) => path.replace("./en/learning/", "").replace(".mdx", ""));
}

const pathFor = (lang: string, name: string) => `./${lang}/learning/${name}.mdx`;

const all = (source: string, pattern: RegExp) =>
  Array.from(source.matchAll(pattern), (match) => match[1] ?? match[0]);

/** The [first, last] line pairs of every <Step lines={[first, last]}>. */
const stepRanges = (source: string) =>
  Array.from(
    source.matchAll(/<Step\b[^>]*\blines=\{\[(\d+),\s*(\d+)\]\}/g),
    (match) => [Number(match[1]), Number(match[2])] as const,
  );

describe("MDX lessons", () => {
  it("finds the lessons", () => {
    expect(lessonNames().length).toBeGreaterThan(0);
  });

  describe.each(lessonNames())("%s", (name) => {
    it.each(LANGS)("has a Swedish and an English file (%s)", (lang) => {
      expect(raw[pathFor(lang, name)]).toBeDefined();
    });

    it.each(LANGS)(
      "%s: frontmatter lists exactly the practice topics the body declares",
      (lang) => {
        const source = raw[pathFor(lang, name)];
        const { practiceTopics } = compiled[pathFor(lang, name)].frontmatter;
        expect(practiceTopics).toEqual(
          all(source, /<PracticeTopic\s+title="([^"]+)"/g),
        );
      },
    );

    it.each(LANGS)(
      "%s: `?frontmatter` yields the same data as the compiled lesson's frontmatter",
      (lang) => {
        expect(metaOnly[pathFor(lang, name)]).toEqual(
          compiled[pathFor(lang, name)].frontmatter,
        );
      },
    );

    it.each(LANGS)("%s: frontmatter `quiz` matches whether there is a <Quiz>", (lang) => {
      const source = raw[pathFor(lang, name)];
      const { quiz } = compiled[pathFor(lang, name)].frontmatter;
      expect(Boolean(quiz)).toBe(source.includes("<Quiz>"));
    });

    it.each(LANGS)(
      "%s: every walkthrough step highlights lines that exist in its code files",
      (lang) => {
        const source = raw[pathFor(lang, name)];
        const files: string[] = JSON.parse(
          source.match(/<Walkthrough\b[^>]*\bfiles=\{(\[[^\]]*\])\}/)?.[1] ?? "[]",
        );
        const lineCount = loadCombinedExample(files).length;

        for (const [first, last] of stepRanges(source)) {
          expect(first).toBeGreaterThanOrEqual(1);
          expect(last).toBeGreaterThanOrEqual(first);
          expect(last).toBeLessThanOrEqual(lineCount);
        }
      },
    );

    it("the Swedish lesson has the same structure as the English one", () => {
      const [en, sv] = LANGS.map((lang) => raw[pathFor(lang, name)]);
      const shape = (source: string) => ({
        sections: all(source, /<Section\b/g).length,
        steps: stepRanges(source),
        questions: all(source, /<Question>/g).length,
        options: all(source, /<Option\b/g).length,
        correctOptions: all(source, /<Option correct>/g).length,
        practiceTopics: all(source, /<PracticeTopic\b/g).length,
        demos: all(source, /demo=\{<(\w+)/g),
        imports: all(source, /^import (\w+) from/gm),
      });
      expect(shape(sv)).toEqual(shape(en));
    });

    it.each(LANGS)("%s: renders, with one correct answer per question", (lang) => {
      const { default: Content, frontmatter } = compiled[pathFor(lang, name)];
      // <Quiz> throws if a question doesn't have exactly one `correct` option.
      renderWithProviders(
        <MdxLesson Content={Content} frontmatter={frontmatter} topicKey={name} />,
      );
      expect(
        screen.getByRole("heading", { name: frontmatter.title, level: 1 }),
      ).toBeInTheDocument();
      expect(document.body.textContent).not.toContain("`");
    });
  });
});
