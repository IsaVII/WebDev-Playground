import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import learningContent from "./en/learningContent.json";
import cheatsheets from "./en/cheatsheets.json";
import javaBackend from "./en/javaBackend.json";
import type { TopicSummary } from "../types/content";

const ALLOWED_DIFFICULTIES = ["beginner", "intermediate", "advanced"];

function readSource(relativePath: string) {
  return readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), {
    encoding: "utf8",
  });
}

/**
 * learningContent.json/cheatsheets.json drive the home page and the header
 * nav automatically, but a topic's `key` still has to be hand-kept in sync
 * with App.tsx's routes and, for learning topics, the CONTENT_BY_KEY maps
 * in Header.tsx and ProgressContext.tsx (there's no compiler check tying
 * these together - see the webSocketsContent.json casing bug this caught
 * during development). These tests catch that whole class of "added an
 * entry to the JSON but forgot to wire it up somewhere" mistake without
 * having to render every single page.
 */
function checkTopicIndex(
  topics: TopicSummary[],
  { requireContentMapping }: { requireContentMapping: boolean },
) {
  const appSource = readSource("../App.tsx");
  const headerSource = requireContentMapping
    ? readSource("../components/Header.tsx")
    : null;
  const progressSource = requireContentMapping
    ? readSource("../context/ProgressContext.tsx")
    : null;

  const ids = topics.map((t) => t.id);
  const keys = topics.map((t) => t.key);
  const routes = topics.map((t) => t.route);

  it("has a unique id for every topic", () => {
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has a unique key for every topic", () => {
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("has a unique route for every topic", () => {
    expect(new Set(routes).size).toBe(routes.length);
  });

  it.each(topics)(
    "$key has every required field, and a route starting with /",
    (topic) => {
      expect(topic.title).toBeTruthy();
      expect(topic.description).toBeTruthy();
      expect(topic.route).toMatch(/^\//);
      expect(topic.difficulty).toBeTruthy();
      expect(topic.estimatedTime).toBeTruthy();
    },
  );

  it.each(topics)(
    "$key has a difficulty TopicCard actually has a color for",
    (topic) => {
      // TopicCard builds --difficulty-${difficulty.toLowerCase()} as a CSS
      // variable name - a typo'd value here doesn't error, it just
      // silently renders with no color at all.
      expect(ALLOWED_DIFFICULTIES).toContain(topic.difficulty.toLowerCase());
    },
  );

  it.each(topics)("$key's route is registered in App.tsx", (topic) => {
    expect(appSource).toContain(`path="${topic.route}"`);
  });

  if (requireContentMapping) {
    it.each(topics)(
      "$key is mapped to its content JSON in Header.tsx",
      (topic) => {
        expect(headerSource).toMatch(
          new RegExp(`\\b${topic.key}:\\s*\\w+Content(?:En|Sv)?\\b`),
        );
      },
    );

    it.each(topics)(
      "$key is mapped to its content JSON in ProgressContext.tsx",
      (topic) => {
        expect(progressSource).toMatch(
          new RegExp(`\\b${topic.key}:\\s*\\w+Content(?:En|Sv)?\\b`),
        );
      },
    );
  }
}

describe("learningContent.json", () => {
  checkTopicIndex(learningContent.topics, { requireContentMapping: true });
});

describe("javaBackend.json", () => {
  // Same wiring rules as learning topics: each key must be routed in App.tsx
  // and mapped to its content JSON in Header.tsx and ProgressContext.tsx.
  checkTopicIndex(javaBackend.topics, { requireContentMapping: true });
});

describe("cheatsheets.json", () => {
  // Cheat sheets don't track per-sub-topic progress, so they're never
  // expected to show up in the CONTENT_BY_KEY maps - only the route check
  // applies to them.
  checkTopicIndex(cheatsheets.topics, { requireContentMapping: false });
});
