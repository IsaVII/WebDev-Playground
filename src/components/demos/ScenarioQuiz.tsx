import { useState } from "react";
import CodeBlock from "../CodeBlock";

export interface Scenario {
  id: string;
  /** Optional lead-in shown above the code (e.g. the table contents). */
  context?: string;
  code: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface ScenarioQuizProps {
  intro: string;
  scenarios: Scenario[];
}

/** Code snippet + answer buttons; picking one reveals whether it was right and why. */
function ScenarioQuiz({ intro, scenarios }: ScenarioQuizProps) {
  const [picks, setPicks] = useState<Record<string, string>>({});

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">{intro}</p>

      <div className="space-y-4">
        {scenarios.map((s) => {
          const pick = picks[s.id];
          return (
            <div key={s.id} className="border border-line rounded p-3">
              {s.context && (
                <p className="text-xs text-heading-alt mb-2 mt-0">{s.context}</p>
              )}
              <CodeBlock>{s.code}</CodeBlock>
              <div className="flex flex-wrap gap-2 mt-2">
                {s.options.map((option) => {
                  const isPick = pick === option;
                  const isRight = pick && option === s.answer;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setPicks((p) => ({ ...p, [s.id]: option }))}
                      className={`text-xs px-3 py-1 rounded border text-left ${
                        isPick && isRight
                          ? "bg-green-500/20 border-green-500 text-green-600"
                          : isPick
                            ? "bg-red-500/20 border-red-500 text-red-600"
                            : "border-line text-muted hover:text-accent"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {pick && (
                <p className="text-xs text-muted mt-2 mb-0 text-left">
                  <strong>{s.answer}</strong> - {s.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ScenarioQuiz;
