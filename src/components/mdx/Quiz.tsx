import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import SelfCheckQuiz, { type QuizItem } from "../SelfCheckQuiz";
import { useLesson } from "./lessonContext";

/**
 * A lesson's Self-Check, written in MDX as:
 *
 *   <Quiz>
 *
 *   <Question>
 *
 *   The question, as ordinary Markdown.
 *
 *   <Option>A wrong answer</Option>
 *   <Option correct>The right answer</Option>
 *   <Option>Another wrong answer</Option>
 *
 *   <Explanation>Why - shown once the answers are checked.</Explanation>
 *
 *   </Question>
 *
 *   </Quiz>
 *
 * Exactly one <Option> per <Question> is marked `correct`. Keep each
 * <Option>/<Explanation> on one line so it stays inline text.
 */
interface ContentProps {
  children?: ReactNode;
}

interface OptionProps extends ContentProps {
  correct?: boolean;
}

/** These four only carry props up to <Quiz>; they never render by themselves. */
export function Question(_props: ContentProps) {
  return null;
}
export function Option(_props: OptionProps) {
  return null;
}
export function Explanation(_props: ContentProps) {
  return null;
}

function isElementOf<P>(
  node: ReactNode,
  type: (props: P) => null,
): node is ReactElement<P> {
  return isValidElement(node) && node.type === type;
}

function toQuizItem(question: ReactElement<ContentProps>): QuizItem {
  const parts = Children.toArray(question.props.children);
  const options = parts.filter((p) => isElementOf<OptionProps>(p, Option));
  const explanation = parts.find((p) => isElementOf<ContentProps>(p, Explanation));
  const prompt = parts.filter(
    (p) =>
      !isElementOf<OptionProps>(p, Option) &&
      !isElementOf<ContentProps>(p, Explanation),
  );

  const correct = options.flatMap((o, i) => (o.props.correct ? [i] : []));
  if (correct.length !== 1) {
    throw new Error(
      `<Question> needs exactly one <Option correct> but has ${correct.length}`,
    );
  }

  return {
    question: prompt,
    options: options.map((o) => o.props.children),
    answerIndex: correct[0],
    explanation: explanation?.props.children,
  };
}

export function Quiz({ children }: ContentProps) {
  const { topicKey } = useLesson();
  const questions = Children.toArray(children)
    .filter((c): c is ReactElement<ContentProps> => isElementOf<ContentProps>(c, Question))
    .map(toQuizItem);

  return <SelfCheckQuiz questions={questions} topicKey={topicKey} />;
}
