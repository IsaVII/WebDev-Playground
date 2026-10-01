import { useState, type ReactNode } from "react";
import CodeBlock from "./CodeBlock";
import InlineMarkdown from "./InlineMarkdown";

function linesInRange([start = 0, end = start]: number[]) {
  const lines: number[] = [];
  for (let i = start; i <= end; i++) lines.push(i);
  return lines;
}

/**
 * Shows one complete, realistic code example alongside a numbered list of
 * steps. Clicking a step highlights the lines it's talking about in the
 * code block below, so the explanation and the code stay connected instead
 * of being two separate walls of text.
 *
 * Expects `steps` shaped like:
 *   [{ label: "Create state", lines: [4, 6], explanation: "..." }, ...]
 * `lines` is an inclusive [firstLine, lastLine] range, 1-indexed to match
 * what a reader sees in the code block's gutter.
 */
export interface WalkthroughStep {
  label: string;
  /** Inclusive 1-indexed [first, last] range of the code this step explains. */
  lines: number[];
  /** A string (inline Markdown) or rendered content (from a lesson's .mdx). */
  explanation: ReactNode;
}

interface StepByStepExampleProps {
  title?: string;
  description?: ReactNode;
  /** The example, one string per line. */
  code: string[];
  steps: WalkthroughStep[];
}

function StepByStepExample({
  title,
  description,
  code,
  steps,
}: StepByStepExampleProps) {
  const [activeStep, setActiveStep] = useState(0);
  const current = steps[activeStep];

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      {title && (
        <h4 className="text-lg font-semibold text-heading-alt mb-2">{title}</h4>
      )}
      {description && (
        <div className="text-muted leading-relaxed mb-4 [&_p]:mb-2">
          <InlineMarkdown>{description}</InlineMarkdown>
        </div>
      )}

      <div className="grid md:grid-cols-[220px_1fr] gap-4">
        <ol className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            return (
              <li key={step.label} className="shrink-0 md:shrink">
                <button
                  type="button"
                  onClick={() => setActiveStep(index)}
                  aria-current={isActive}
                  className={`w-full text-left px-3 py-2 rounded border transition-colors flex items-center gap-2 whitespace-nowrap md:whitespace-normal ${
                    isActive
                      ? "bg-accent border-accent text-white"
                      : "bg-surface border-line text-heading hover:border-accent"
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold shrink-0 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-surface-muted text-muted"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <InlineMarkdown allowLinks={false}>{step.label}</InlineMarkdown>
                </button>
              </li>
            );
          })}
        </ol>

        <div>
          <CodeBlock
            showLineNumbers
            highlightLines={linesInRange(current.lines)}
          >
            {code}
          </CodeBlock>

          <div className="text-muted leading-relaxed mt-4 pl-3 border-l-2 border-accent">
            <strong className="text-heading-alt ">
              <InlineMarkdown>{current.label}</InlineMarkdown>:
            </strong>{" "}
            <InlineMarkdown>{current.explanation}</InlineMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepByStepExample;
