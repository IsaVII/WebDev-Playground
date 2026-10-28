import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test/test-utils";
import WebStack from "./WebStack";
import contentEn from "../../data/en/cheatsheets/webStack.json";
import contentSv from "../../data/sv/cheatsheets/webStack.json";
import { loadCodeFile } from "../../utils/codeExamples";
import type { CheatSheetStep } from "../../types/content";

const TECHNOLOGIES = [
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Express.js",
  "React",
  "Next.js",
  "Tailwind CSS",
];

describe("JavaScript web stack cheat sheet", () => {
  it("renders its title and the two comparison tables", () => {
    renderWithProviders(<WebStack />);

    expect(
      screen.getByRole("heading", { name: /JavaScript Web Stack/, level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("table")).toHaveLength(2);
  });

  it("compares every technology in the overview table", () => {
    renderWithProviders(<WebStack />);

    const rowHeaders = screen
      .getAllByRole("rowheader")
      .map((el) => el.textContent);
    for (const tech of TECHNOLOGIES) {
      expect(rowHeaders).toContain(tech);
    }
  });

  it("has a step with an example for every technology", () => {
    renderWithProviders(<WebStack />);

    for (const tech of TECHNOLOGIES) {
      expect(
        screen.getByRole("heading", { name: new RegExp(`${tech}$`), level: 3 }),
      ).toBeInTheDocument();
    }
  });
});

describe("JavaScript web stack cheat sheet content", () => {
  it("has the same steps, tables and code files in English and Swedish", () => {
    const shape = (content: { steps: CheatSheetStep[] }) =>
      content.steps.map((step) => ({
        codeFile: step.codeFile,
        tables: (step.tables ?? []).map((table) => ({
          columns: table.headers.length,
          rows: table.rows.length,
        })),
      }));

    expect(shape(contentSv)).toEqual(shape(contentEn));
  });

  it("gives every table row exactly as many cells as the table has headers", () => {
    for (const content of [contentEn, contentSv]) {
      for (const step of content.steps as CheatSheetStep[]) {
        for (const table of step.tables ?? []) {
          for (const row of table.rows) {
            expect(row).toHaveLength(table.headers.length);
          }
        }
      }
    }
  });

  it.each(
    contentEn.steps.flatMap((step) => (step.codeFile ? [step.codeFile] : [])),
  )("%s exists and is not empty", (path) => {
    expect(loadCodeFile(path).length).toBeGreaterThan(0);
  });
});
