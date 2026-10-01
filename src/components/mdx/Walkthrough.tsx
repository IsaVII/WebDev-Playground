import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import StepByStepExample from "../StepByStepExample";
import { loadCombinedExample } from "../../utils/codeExamples";

/**
 * A code walkthrough, written in MDX as:
 *
 *   <Walkthrough title="..." files={["code-examples/java/threads/ThreadsDemo.java"]}>
 *
 *   Any prose placed here becomes the introduction above the code.
 *
 *   <Step label="Short name" lines={[11, 19]}>What these lines do, in Markdown.</Step>
 *
 *   </Walkthrough>
 *
 * Write each <Step>'s explanation on the same line as its tags - that keeps
 * it inline text instead of a paragraph. `lines` is an inclusive, 1-indexed
 * range of the combined code.
 */
interface StepProps {
  label: string;
  lines: number[];
  children?: ReactNode;
}

/** Carries a step's props to <Walkthrough>; never renders by itself. */
export function Step(_props: StepProps) {
  return null;
}

interface WalkthroughProps {
  title?: string;
  files: string[];
  children?: ReactNode;
}

function isStep(node: ReactNode): node is ReactElement<StepProps> {
  return isValidElement(node) && node.type === Step;
}

export function Walkthrough({ title, files, children }: WalkthroughProps) {
  const nodes = Children.toArray(children);
  const steps = nodes.filter(isStep).map((step) => ({
    label: step.props.label,
    lines: step.props.lines,
    explanation: step.props.children,
  }));
  const description = nodes.filter((node) => !isStep(node));

  return (
    <StepByStepExample
      title={title}
      description={description.length > 0 ? description : undefined}
      code={loadCombinedExample(files)}
      steps={steps}
    />
  );
}
