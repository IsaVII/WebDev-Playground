import { useState } from "react";
import CodeBlock from "../../CodeBlock";
import { runTests } from "./testEngine";

/**
 * A small, self-contained "fix the failing test" exercise. Renders the
 * (read-only) code under test, an editable test file seeded with a bug,
 * and a Run button that grades the learner's edits with the in-browser
 * test engine from testEngine.js.
 *
 * Props:
 *  - description: what the exercise is about (shown above the code)
 *  - contextLabel: filename-ish label shown above the read-only code block
 *  - contextCode: the read-only "code under test" (string)
 *  - initialTest: starter test source, seeded with a bug (string)
 *  - buildScope: () => object - factory for the globals test code can use
 *      (the functions from contextCode, plus test helpers like
 *      createMock/createSpy). A factory (not a plain object) so every
 *      run gets fresh, unmutated state.
 *  - hint: optional one-line nudge, hidden behind a toggle
 */
function FixTheTestDemo({
  description,
  contextLabel = "Code under test",
  contextCode,
  initialTest,
  buildScope,
  hint,
}) {
  const [testCode, setTestCode] = useState(initialTest);
  const [outcome, setOutcome] = useState(null);
  const [running, setRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleRun = async () => {
    setRunning(true);
    const result = await runTests(testCode, buildScope());
    setOutcome(result);
    setRunning(false);
  };

  const handleReset = () => {
    setTestCode(initialTest);
    setOutcome(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd, value } = e.target;
      setTestCode(
        `${value.slice(0, selectionStart)}  ${value.slice(selectionEnd)}`,
      );
      requestAnimationFrame(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 2;
      });
    }
  };

  const passCount = outcome?.results.filter((r) => r.passed).length ?? 0;
  const totalCount = outcome?.results.length ?? 0;
  const allPassing = totalCount > 0 && passCount === totalCount;

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted leading-relaxed mb-4">{description}</p>

      {contextCode && (
        <>
          <h5 className="text-heading-alt font-semibold mb-2 text-sm uppercase tracking-wide">
            {contextLabel}
          </h5>
          <CodeBlock>{contextCode}</CodeBlock>
        </>
      )}

      <h5 className="text-heading-alt font-semibold mt-4 mb-2 text-sm uppercase tracking-wide">
        test.js - edit me
      </h5>
      <textarea
        value={testCode}
        onChange={(e) => setTestCode(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        rows={testCode.split("\n").length}
        className="w-full bg-surface border border-line rounded p-4 text-sm font-mono text-heading-alt leading-relaxed resize-y focus:outline-none focus:border-accent"
      />

      <div className="flex flex-wrap items-center gap-3 mt-4">
        <button
          type="button"
          onClick={handleRun}
          disabled={running}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {running ? "Running..." : "Run tests"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors"
        >
          Reset
        </button>
        {hint && (
          <button
            type="button"
            onClick={() => setShowHint((h) => !h)}
            className="text-sm font-medium text-accent hover:opacity-80 transition-opacity ml-auto"
          >
            {showHint ? "Hide hint" : "Show hint"}
          </button>
        )}
      </div>

      {showHint && hint && (
        <p className="text-sm text-muted mt-3 pl-3 border-l-2 border-accent">
          {hint}
        </p>
      )}

      {outcome && (
        <div className="bg-surface rounded p-4 border border-line mt-4">
          {outcome.syntaxError ? (
            <p className="text-sm font-mono text-red-600 dark:text-red-400">
              ✗ {outcome.syntaxError}
            </p>
          ) : (
            <>
              <p
                className={`text-sm font-semibold mb-2 ${
                  allPassing
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {passCount}/{totalCount} passing
                {allPassing ? " - nice work!" : ""}
              </p>
              <ul className="text-sm font-mono space-y-1">
                {outcome.results.map((result, index) => (
                  <li
                    key={index}
                    className={
                      result.passed
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }
                  >
                    {result.passed ? "✓" : "✗"} {result.name}
                    {!result.passed && result.error && (
                      <div className="text-subtle pl-4">{result.error}</div>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default FixTheTestDemo;
