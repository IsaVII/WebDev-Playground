import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test/test-utils";
import Main from "./Main";
import Deployment from "./learning/Deployment";
import Git from "./learning/Git";
import SQL from "./cheatsheets/SQL";
import CiCd from "./cheatsheets/CiCd";
import MarkdownSheet from "./cheatsheets/Markdown";
import Diagrams from "./learning/Diagrams";
import Streams from "./learning/Streams";
import Spring from "./learning/Spring";
import Threads from "./learning/Threads";
import Runnables from "./learning/Runnables";
import Collections from "./learning/Collections";
import StreamApi from "./learning/StreamApi";
import Jdbc from "./learning/Jdbc";
import { stripMarkdown } from "../utils/markdown";
import learningContent from "../data/en/learningContent.json";
import cheatsheets from "../data/en/cheatsheets.json";
import javaBackend from "../data/en/javaBackend.json";
import diagramsContent from "../data/en/learning/diagramsContent.json";
import streamsContent from "../data/en/learning/streamsContent.json";
import springContent from "../data/en/learning/springContent.json";
import { frontmatter as threadsFrontmatter } from "../data/en/learning/threads.mdx";
import { frontmatter as runnablesFrontmatter } from "../data/en/learning/runnables.mdx";
import { frontmatter as collectionsFrontmatter } from "../data/en/learning/collections.mdx";
import { frontmatter as streamApiFrontmatter } from "../data/en/learning/streamapi.mdx";
import { frontmatter as jdbcFrontmatter } from "../data/en/learning/jdbc.mdx";

/**
 * These don't try to cover every interaction on every page - the practice
 * topic demos each have their own more focused tests where it's worth it.
 * The point here is cheaper and broader: rendering a real page, with its
 * real content JSON, through the real providers, catches the kind of
 * mistake unit tests on individual pieces miss - a typo'd JSON field a
 * component expects, a missing import, a practice topic whose title
 * doesn't match its demo mapping.
 */
describe("Main (home page)", () => {
  it("renders the welcome heading", () => {
    renderWithProviders(<Main />);
    expect(
      screen.getByRole("heading", {
        name: "WebDev Playground",
      }),
    ).toBeInTheDocument();
  });

  it("renders a card for every learning topic and every cheat sheet", () => {
    renderWithProviders(<Main />);

    for (const topic of learningContent.topics) {
      expect(
        screen.getByRole("heading", { name: topic.title, level: 3 }),
      ).toBeInTheDocument();
    }
    for (const sheet of cheatsheets.topics) {
      expect(
        screen.getByRole("heading", { name: sheet.title, level: 3 }),
      ).toBeInTheDocument();
    }
    for (const topic of javaBackend.topics) {
      expect(
        screen.getByRole("heading", { name: topic.title, level: 3 }),
      ).toBeInTheDocument();
    }
  });
});

describe("Java Backend category (new)", () => {
  const cases = [
    { name: "Diagrams", Page: Diagrams, content: diagramsContent },
    { name: "Streams", Page: Streams, content: streamsContent },
    { name: "Spring", Page: Spring, content: springContent },
  ];

  for (const { name, Page, content } of cases) {
    it(`${name} renders its heading, every practice topic, and the Self-Check`, () => {
      renderWithProviders(<Page />);

      expect(
        screen.getByRole("heading", { name: content.title, level: 1 }),
      ).toBeInTheDocument();

      for (const topic of content.practiceTopics) {
        expect(screen.getByText(topic.title)).toBeInTheDocument();
      }

      expect(
        screen.getByRole("heading", { name: "Self-Check", level: 3 }),
      ).toBeInTheDocument();
      // Questions are inline Markdown, so `code` renders as its own element
      // and the text is split - match the deepest element whose combined
      // text contains the whole question.
      const question = stripMarkdown(content.quiz[0].question);
      const hasQuestion = (el: Element) =>
        (el.textContent ?? "").includes(question);
      expect(
        screen.getByText(
          (_, element) =>
            !!element &&
            hasQuestion(element) &&
            !Array.from(element.children).some(hasQuestion),
        ),
      ).toBeInTheDocument();
    });
  }
});

describe("Threads (lesson written as MDX)", () => {
  it("renders its heading, every section, practice topic, and the Self-Check", () => {
    renderWithProviders(<Threads />);

    expect(
      screen.getByRole("heading", { name: threadsFrontmatter.title, level: 1 }),
    ).toBeInTheDocument();
    for (const heading of [
      "Doing More Than One Thing at a Time",
      "Core Concepts",
      "Watching Two Threads Collide",
      "Full Example, Step by Step",
      "Getting Started",
      "Practice Topics",
      "Self-Check",
    ]) {
      expect(
        screen.getByRole("heading", { name: heading, level: 2 }),
      ).toBeInTheDocument();
    }
    for (const title of threadsFrontmatter.practiceTopics) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
    // Markdown in the lesson became real elements, not literal backticks.
    expect(screen.getAllByText("thread.start()").length).toBeGreaterThan(0);
    expect(document.body.textContent).not.toContain("`");
  });

  it("wires up its demo, walkthrough and quiz", () => {
    renderWithProviders(<Threads />);

    // <RaceConditionDemo /> placed inline in the lesson.
    expect(
      screen.getByRole("button", { name: /Next step/ }),
    ).toBeInTheDocument();
    // <Walkthrough> / <Step> -> StepByStepExample.
    expect(
      screen.getByRole("button", { name: /Shared objects and a task to run/ }),
    ).toBeInTheDocument();
    // <Quiz> -> SelfCheckQuiz, gated until every question is answered.
    expect(
      screen.getByRole("button", { name: /check answers/i }),
    ).toBeDisabled();
    expect(screen.getAllByRole("radio").length).toBeGreaterThan(10);
  });

  it("opens a practice topic's live demo when clicked", () => {
    renderWithProviders(<Threads />);
    fireEvent.click(screen.getByRole("button", { name: /Thread Pool Scheduler/ }));
    expect(screen.getByText(/Choose the pool size/)).toBeInTheDocument();
  });
});

describe("Runnables & synchronized (second lesson written as MDX)", () => {
  it("renders its heading, every section, practice topic, and the Self-Check", () => {
    renderWithProviders(<Runnables />);

    expect(
      screen.getByRole("heading", { name: runnablesFrontmatter.title, level: 1 }),
    ).toBeInTheDocument();
    for (const heading of [
      "Tasks, Threads, and Taking Turns",
      "Core Concepts",
      "Which Lock Does a Call Need?",
      "Full Example, Step by Step",
      "Getting Started",
      "Practice Topics",
      "Self-Check",
    ]) {
      expect(
        screen.getByRole("heading", { name: heading, level: 2 }),
      ).toBeInTheDocument();
    }
    for (const title of runnablesFrontmatter.practiceTopics) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
    expect(document.body.textContent).not.toContain("`");
  });

  it("wires up its lock demo, walkthrough and quiz", () => {
    renderWithProviders(<Runnables />);

    // <MonitorLockDemo /> starts on two synchronized calls on one account.
    expect(screen.getByRole("status")).toHaveTextContent(/B is BLOCKED/);
    expect(
      screen.getByRole("button", { name: /Three ways to create a thread/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /check answers/i }),
    ).toBeDisabled();
    expect(screen.getAllByRole("radio").length).toBe(24);
  });

  it("opens a practice topic's live demo when clicked", () => {
    renderWithProviders(<Runnables />);
    fireEvent.click(screen.getByRole("button", { name: /Who Blocks Whom\?/ }));
    expect(screen.getByText(/Does B have\s+to wait/)).toBeInTheDocument();
  });
});

describe("Collections & Comparator (third lesson written as MDX)", () => {
  it("renders its heading, every section, practice topic, and the Self-Check", () => {
    renderWithProviders(<Collections />);

    expect(
      screen.getByRole("heading", { name: collectionsFrontmatter.title, level: 1 }),
    ).toBeInTheDocument();
    for (const heading of [
      "Holding Data and Putting It in Order",
      "Core Concepts",
      "Building a Comparator",
      "Full Example, Step by Step",
      "Getting Started",
      "Practice Topics",
      "Self-Check",
    ]) {
      expect(
        screen.getByRole("heading", { name: heading, level: 2 }),
      ).toBeInTheDocument();
    }
    for (const title of collectionsFrontmatter.practiceTopics) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
    expect(document.body.textContent).not.toContain("`");
  });

  it("wires up its comparator demo, walkthrough and quiz", () => {
    renderWithProviders(<Collections />);

    // <ComparatorBuilderDemo /> starts sorted by department, salary, name.
    expect(screen.getAllByRole("row")).toHaveLength(7);
    expect(
      screen.getByRole("button", { name: /A list and its natural order/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /check answers/i }),
    ).toBeDisabled();
    expect(screen.getAllByRole("radio")).toHaveLength(24);
  });

  it("opens a practice topic's live demo when clicked", () => {
    renderWithProviders(<Collections />);
    fireEvent.click(screen.getByRole("button", { name: /Pick the Right Collection/ }));
    expect(screen.getByText(/Each\s+class is the right answer exactly once/)).toBeInTheDocument();
  });
});

describe("Stream API in Depth (fourth lesson written as MDX)", () => {
  it("renders its heading, every section, practice topic, and the Self-Check", () => {
    renderWithProviders(<StreamApi />);

    expect(
      screen.getByRole("heading", { name: streamApiFrontmatter.title, level: 1 }),
    ).toBeInTheDocument();
    for (const heading of [
      "Describing What You Want, Not How to Loop",
      "Core Concepts",
      "Building a Pipeline",
      "Full Example, Step by Step",
      "Getting Started",
      "Practice Topics",
      "Self-Check",
    ]) {
      expect(
        screen.getByRole("heading", { name: heading, level: 2 }),
      ).toBeInTheDocument();
    }
    for (const title of streamApiFrontmatter.practiceTopics) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
    expect(document.body.textContent).not.toContain("`");
  });

  it("wires up its pipeline explorer, walkthrough and quiz", () => {
    renderWithProviders(<StreamApi />);

    // <StreamExplorerDemo /> starts with flatMap, distinct and sorted.
    expect(screen.getByRole("status")).toHaveTextContent(
      "[be, is, not, or, question, that, the, to]",
    );
    expect(
      screen.getByRole("button", { name: /The data: records and nested lists/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /check answers/i }),
    ).toBeDisabled();
    expect(screen.getAllByRole("radio")).toHaveLength(24);
  });

  it("opens a practice topic's live demo when clicked", () => {
    renderWithProviders(<StreamApi />);
    fireEvent.click(screen.getByRole("button", { name: /Pick the Operation/ }));
    expect(screen.getByText(/pick the stream operation that does it/)).toBeInTheDocument();
  });
});

describe("Java & JDBC with PostgreSQL (fifth lesson written as MDX)", () => {
  it("renders its heading, every section, practice topic, and the Self-Check", () => {
    renderWithProviders(<Jdbc />);

    expect(
      screen.getByRole("heading", { name: jdbcFrontmatter.title, level: 1 }),
    ).toBeInTheDocument();
    for (const heading of [
      "Talking to a Database from Java",
      "Core Concepts",
      "Setting Up",
      "Trying the Statements",
      "Full Example, Step by Step",
      "Getting Started",
      "Practice Topics",
      "Self-Check",
    ]) {
      expect(
        screen.getByRole("heading", { name: heading, level: 2 }),
      ).toBeInTheDocument();
    }
    for (const title of jdbcFrontmatter.practiceTopics) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
    expect(document.body.textContent).not.toContain("`");
  });

  it("wires up its statement explorer, walkthrough and quiz", () => {
    renderWithProviders(<Jdbc />);

    // <SqlExplorerDemo /> starts on SELECT all, before anything has been run.
    expect(screen.getByRole("status")).toHaveTextContent("Press Run");
    expect(
      screen.getByRole("button", { name: /A record for one row/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /check answers/i }),
    ).toBeDisabled();
    expect(screen.getAllByRole("radio")).toHaveLength(24);
  });

  it("opens a practice topic's live demo when clicked", () => {
    renderWithProviders(<Jdbc />);
    fireEvent.click(screen.getByRole("button", { name: /Spot the Bug/ }));
    expect(screen.getByText(/Each snippet has one classic JDBC mistake/)).toBeInTheDocument();
  });
});

describe("Deployment (new learning topic)", () => {
  it("renders without crashing and shows every practice topic", () => {
    renderWithProviders(<Deployment />);

    expect(
      screen.getByRole("heading", { name: "Deployment & CI/CD" }),
    ).toBeInTheDocument();

    for (const topic of [
      "Choosing a Platform",
      "Environment Variables & Secrets",
      "GitHub Actions Basics",
      "Preview Deployments & Rollbacks",
    ]) {
      expect(screen.getByText(topic)).toBeInTheDocument();
    }
  });

  it("opens a practice topic's live demo when clicked", async () => {
    const { user } = withUser(renderWithProviders(<Deployment />));
    await user.click(
      screen.getByRole("button", { name: /Choosing a Platform/ }),
    );

    // PlatformComparisonDemo's prompt text, proving the right demo mounted.
    expect(
      screen.getByText(/Choose what you're deploying above/),
    ).toBeInTheDocument();
  });
});

describe("Git (existing learning topic, as a regression check)", () => {
  it("still renders after the Deployment topic was added", () => {
    renderWithProviders(<Git />);
    expect(
      screen.getByRole("heading", { name: "Git Fundamentals" }),
    ).toBeInTheDocument();
  });
});

describe("SQL (cheat sheet)", () => {
  it("renders its steps without needing Redux/progress providers' data", () => {
    renderWithProviders(<SQL />);
    expect(
      screen.getByRole("heading", { name: /SQL Database/ }),
    ).toBeInTheDocument();
  });
});

describe("CI/CD (new cheat sheet)", () => {
  it("renders its steps without needing Redux/progress providers' data", () => {
    renderWithProviders(<CiCd />);
    expect(
      screen.getByRole("heading", { name: /CI\/CD with GitHub Actions/ }),
    ).toBeInTheDocument();
  });

  it("shows the GitHub Pages deploy step and its quick checklist", () => {
    renderWithProviders(<CiCd />);
    expect(
      screen.getByText("Deploy to GitHub Pages on Merge (CD)"),
    ).toBeInTheDocument();
    expect(screen.getByText("Quick Checklist")).toBeInTheDocument();
  });
});

describe("Markdown cheat sheet (teaches the syntax the content itself is rendered with)", () => {
  it("shows its syntax examples literally, inside code spans", () => {
    const { container } = renderWithProviders(<MarkdownSheet />);
    const codes = Array.from(container.querySelectorAll("code")).map(
      (el) => el.textContent,
    );

    expect(codes).toContain("**bold**");
    expect(codes).toContain("*italic*");
    expect(codes).toContain("[text](url)");
    expect(codes).toContain("`code`");
    expect(codes).toContain("```lang ... ```");
    // ...and none of them was actually applied as formatting.
    expect(container.querySelector("a[href='url']")).toBeNull();
  });
});

// Small helper so the "click a practice topic" test above stays readable -
// userEvent isn't a project dependency, so this drives the same click via
// fireEvent instead of pulling in another package for one interaction.
import { fireEvent } from "@testing-library/react";
function withUser<T extends object>(renderResult: T) {
  return {
    ...renderResult,
    user: { click: async (el: Element) => fireEvent.click(el) },
  };
}
