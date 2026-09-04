import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test/test-utils";
import Main from "./Main";
import Deployment from "./learning/Deployment";
import Git from "./learning/Git";
import SQL from "./cheatsheets/SQL";
import CiCd from "./cheatsheets/CiCd";
import learningContent from "../data/en/learningContent.json";
import cheatsheets from "../data/en/cheatsheets.json";

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

// Small helper so the "click a practice topic" test above stays readable -
// userEvent isn't a project dependency, so this drives the same click via
// fireEvent instead of pulling in another package for one interaction.
import { fireEvent } from "@testing-library/react";
function withUser(renderResult) {
  return {
    ...renderResult,
    user: { click: async (el) => fireEvent.click(el) },
  };
}
