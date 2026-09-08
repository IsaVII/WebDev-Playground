import { useEffect, useMemo, useState } from "react";
import { useProgress } from "../context/ProgressContext";

/**
 * A short retrieval-practice quiz shown at the bottom of a lesson.
 *
 * The pedagogy this is built around: actively recalling an idea (and then
 * getting immediate feedback on the attempt) fixes it in memory far better
 * than re-reading the lesson does. So each question asks the learner to
 * *retrieve* a concept, not match a definition, and every answer - right or
 * wrong - reveals a short explanation once it's checked.
 *
 * When every question has been answered correctly at least once, the quiz
 * marks a "Self-Check" sub-topic done via the same progress mechanism the
 * practice-topic cards use, so it counts toward the lesson's completion
 * ring. `LearningTopicLayout` adds 1 to that ring's total when a `quiz` is
 * present.
 */
const SELF_CHECK_KEY = "Self-Check";

function SelfCheckQuiz({ questions = [], topicKey }) {
  const { isSubtopicDone, toggleSubtopic } = useProgress();
  const [selected, setSelected] = useState(() => questions.map(() => null));
  const [checked, setChecked] = useState(false);

  const alreadyDone = isSubtopicDone(topicKey, SELF_CHECK_KEY);

  const score = useMemo(
    () =>
      questions.reduce(
        (total, question, i) =>
          selected[i] === question.answerIndex ? total + 1 : total,
        0,
      ),
    [questions, selected],
  );

  const allAnswered = selected.every((choice) => choice !== null);
  const allCorrect = checked && score === questions.length && questions.length > 0;

  // Tick the "Self-Check" sub-topic the first time the whole quiz is right.
  // Guard on alreadyDone so re-checking a passed quiz doesn't toggle it back
  // off if the learner cleared it by hand.
  useEffect(() => {
    if (allCorrect && !alreadyDone) {
      toggleSubtopic(topicKey, SELF_CHECK_KEY);
    }
  }, [allCorrect, alreadyDone, toggleSubtopic, topicKey]);

  const choose = (questionIndex, optionIndex) => {
    if (checked) return;
    setSelected((prev) => {
      const next = [...prev];
      next[questionIndex] = optionIndex;
      return next;
    });
  };

  const reset = () => {
    setSelected(questions.map(() => null));
    setChecked(false);
  };

  if (questions.length === 0) return null;

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-5">
        Answer from memory first, <em>then</em> check - the effort of
        recalling is what makes it stick. Scroll back up only after you&apos;ve
        committed to an answer.
      </p>

      <ol className="list-none m-0 p-0 flex flex-col gap-6">
        {questions.map((question, qi) => {
          const answered = selected[qi];
          const isCorrect = checked && answered === question.answerIndex;
          const isWrong =
            checked && answered !== null && answered !== question.answerIndex;

          return (
            <li key={qi}>
              <p className="text-heading font-semibold mb-2">
                {qi + 1}. {question.question}
              </p>
              <div className="flex flex-col gap-1.5">
                {question.options.map((option, oi) => {
                  const isChosen = answered === oi;
                  const isTheAnswer = checked && oi === question.answerIndex;
                  return (
                    <label
                      key={oi}
                      className={`flex items-start gap-2 rounded px-3 py-2 text-sm cursor-pointer border transition-colors ${
                        isTheAnswer
                          ? "border-green-500 bg-green-500/10"
                          : isChosen && isWrong
                            ? "border-red-500 bg-red-500/10"
                            : isChosen
                              ? "border-accent bg-accent/10"
                              : "border-line hover:bg-surface"
                      } ${checked ? "cursor-default" : ""}`}
                    >
                      <input
                        type="radio"
                        name={`self-check-${topicKey}-${qi}`}
                        checked={isChosen}
                        onChange={() => choose(qi, oi)}
                        disabled={checked}
                        className="mt-0.5 accent-accent shrink-0"
                      />
                      <span className="text-heading-alt">{option}</span>
                    </label>
                  );
                })}
              </div>
              {checked && (
                <p
                  className={`text-sm mt-2 ${
                    isCorrect ? "text-green-600" : "text-muted"
                  }`}
                >
                  <strong>{isCorrect ? "Correct. " : "Not quite. "}</strong>
                  {question.explanation}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      <div className="flex flex-wrap items-center gap-3 mt-6">
        {!checked ? (
          <button
            type="button"
            onClick={() => setChecked(true)}
            disabled={!allAnswered}
            className="bg-accent text-white px-4 py-2 rounded text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Check answers
          </button>
        ) : (
          <button
            type="button"
            onClick={reset}
            className="bg-accent text-white px-4 py-2 rounded text-sm hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
        )}
        {checked && (
          <span className="text-sm font-semibold text-heading">
            {score} / {questions.length} correct
          </span>
        )}
        {!checked && !allAnswered && (
          <span className="text-xs text-subtle">
            Answer every question to check.
          </span>
        )}
        {allCorrect && (
          <span className="text-xs text-green-600 font-semibold">
            ✓ Self-Check complete
          </span>
        )}
      </div>
    </div>
  );
}

export default SelfCheckQuiz;
