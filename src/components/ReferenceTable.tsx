import InlineMarkdown from "./InlineMarkdown";
import type { CheatSheetTable } from "../types/content";

/**
 * A cheat sheet's reference table (symbol / meaning / example...). Headers and
 * cells are inline Markdown, so symbols like `<|--` are written as `code`.
 * Wide tables scroll inside their own box instead of stretching the page.
 */
function ReferenceTable({ caption, headers, rows }: CheatSheetTable) {
  return (
    <div className="overflow-x-auto border border-line rounded">
      <table className="reference-table w-full text-left text-sm border-collapse">
        {caption && (
          <caption className="text-heading-alt font-semibold text-left p-2">
            <InlineMarkdown>{caption}</InlineMarkdown>
          </caption>
        )}
        <thead className="bg-surface-muted">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className="text-heading-alt font-semibold p-2 border-b border-line align-bottom"
              >
                <InlineMarkdown>{header}</InlineMarkdown>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-surface even:bg-surface-alt">
              {row.map((cell, cellIndex) =>
                cellIndex === 0 ? (
                  <th
                    key={cellIndex}
                    scope="row"
                    className="text-heading-alt font-semibold p-2 border-b border-line align-top"
                  >
                    <InlineMarkdown>{cell}</InlineMarkdown>
                  </th>
                ) : (
                  <td
                    key={cellIndex}
                    className="text-muted p-2 border-b border-line align-top"
                  >
                    <InlineMarkdown>{cell}</InlineMarkdown>
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReferenceTable;
