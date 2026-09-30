import { useState } from "react";
import CodeBlock from "./CodeBlock";

function linesInRange([start, end]) {
  const lines = [];
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
function StepByStepExample({ title, description, code, steps }) {
  const [activeStep, setActiveStep] = useState(0);
  const current = steps[activeStep];

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      {title && (
        <h4 className="text-lg font-semibold text-heading-alt mb-2">{title}</h4>
      )}
      {description && (
        <p className="text-muted leading-relaxed mb-4">{description}</p>
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
                  {step.label}
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

          <p className="text-muted leading-relaxed mt-4 pl-3 border-l-2 border-accent">
            <strong className="text-heading-alt ">{current.label}:</strong>{" "}
            {current.explanation}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StepByStepExample;
