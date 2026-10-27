import { readFileSync } from "node:fs";
import { screen, within } from "@testing-library/react";
import mermaid from "mermaid";
import { renderWithProviders } from "../../test/test-utils";
import MermaidClassDiagram from "./MermaidClassDiagram";
import contentEn from "../../data/en/cheatsheets/mermaidClassDiagram.json";
import contentSv from "../../data/sv/cheatsheets/mermaidClassDiagram.json";
import { loadCodeFile } from "../../utils/codeExamples";
import type { CheatSheetStep } from "../../types/content";

describe("Mermaid class diagram cheat sheet", () => {
  it("renders its title and the reference tables", () => {
    renderWithProviders(<MermaidClassDiagram />);

    expect(
      screen.getByRole("heading", { name: /Mermaid Class Diagram/ }),
    ).toBeInTheDocument();
    // One table per step that declares one (steps 1-9).
    expect(screen.getAllByRole("table")).toHaveLength(9);
  });

  it("lists every relationship arrow as literal code, not formatting", () => {
    renderWithProviders(<MermaidClassDiagram />);

    const codes = screen
      .getAllByRole("cell")
      .flatMap((cell) => Array.from(cell.querySelectorAll("code")))
      .map((el) => el.textContent);

    for (const arrow of ["<|--", "<|..", "o--", "*--", "-->", "..>"]) {
      expect(codes).toContain(arrow);
    }
  });

  it("marks the first column of each row as a row header", () => {
    renderWithProviders(<MermaidClassDiagram />);

    const visibility = screen
      .getAllByRole("table")
      .find((t) => within(t).queryByText("Java keyword"));
    expect(visibility).toBeDefined();
    expect(
      within(visibility as HTMLElement).getAllByRole("rowheader"),
    ).toHaveLength(4);
  });
});

describe("Mermaid class diagram cheat sheet content", () => {
  it("has the same steps, tables and diagram files in English and Swedish", () => {
    const shape = (content: { steps: CheatSheetStep[] }) =>
      content.steps.map((step) => ({
        codeFile: step.codeFile,
        diagram: step.diagram ?? false,
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

  const sources = contentEn.steps.flatMap((step) =>
    step.codeFile ? [step.codeFile] : [],
  );

  // A typo in an arrow or a stray character would only show up as a blank
  // space where the diagram should be, so check the real parser accepts each one.
  it.each(sources)("%s is valid Mermaid class diagram syntax", async (path) => {
    const source = loadCodeFile(path);
    expect(source.startsWith("classDiagram")).toBe(true);
    await expect(mermaid.parse(source)).resolves.toBeTruthy();
  });
});

describe("Mermaid_ClassDiagram_CheatSheet.md (standalone copy)", () => {
  // vitest runs from the project root.
  const markdown = readFileSync("Mermaid_ClassDiagram_CheatSheet.md", {
    encoding: "utf8",
  });
  const diagrams = [...markdown.matchAll(/```mermaid\n([\s\S]*?)```/g)].map(
    (match) => match[1],
  );

  it("has a diagram for every diagram in the app version", () => {
    const inApp = contentEn.steps.filter((step) => step.codeFile).length;
    expect(diagrams).toHaveLength(inApp);
  });

  it.each(diagrams.map((source, index) => [index + 1, source]))(
    "diagram %i is valid Mermaid class diagram syntax",
    async (_index, source) => {
      await expect(mermaid.parse(source as string)).resolves.toBeTruthy();
    },
  );
});
