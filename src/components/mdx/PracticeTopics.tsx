import type { ReactNode } from "react";
import PracticeTopicCard from "../PracticeTopicCard";
import Reveal from "../motion/Reveal";
import { useLesson } from "./lessonContext";

/**
 * The lesson's grid of practice-topic cards, written in MDX as:
 *
 *   <PracticeTopics>
 *   <PracticeTopic title="Thread States" demo={<ThreadStatesDemo />}>One-line description, in Markdown.</PracticeTopic>
 *   </PracticeTopics>
 *
 * Each `title` must also be listed under `practiceTopics` in the file's
 * frontmatter (src/data/mdx.test.ts checks), because the header menu and the
 * progress ring count them without rendering the lesson.
 */
export function PracticeTopics({ children }: { children?: ReactNode }) {
  return (
    <div className="stagger-children grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {children}
    </div>
  );
}

interface PracticeTopicProps {
  title: string;
  demo?: ReactNode;
  children?: ReactNode;
}

export function PracticeTopic({ title, demo, children }: PracticeTopicProps) {
  const { topicKey } = useLesson();
  return (
    <Reveal variant="fade">
      <PracticeTopicCard
        topicKey={topicKey}
        title={title}
        description={children}
        demo={demo}
      />
    </Reveal>
  );
}
