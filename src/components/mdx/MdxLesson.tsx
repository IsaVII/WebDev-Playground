import { useEffect, type ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import ProgressRing from "../ProgressRing";
import ContentCard from "../ContentCard";
import TextReveal from "../motion/TextReveal";
import { useProgress } from "../../context/ProgressContext";
import type { LessonFrontmatter } from "../../types/content";
import { LessonContext } from "./lessonContext";
import { mdxComponents } from "./mdxComponents";

/**
 * Page shell for a lesson written as an .mdx file - the MDX counterpart of
 * LearningTopicLayout. It supplies the title, the progress ring and the card;
 * the lesson body (everything after the frontmatter) is the compiled MDX
 * `Content`, rendered with the shared building blocks from ./mdxComponents.
 */
interface MdxLessonProps {
  Content: ComponentType<{ components?: MDXComponents }>;
  frontmatter: LessonFrontmatter;
  topicKey: string;
}

function MdxLesson({ Content, frontmatter, topicKey }: MdxLessonProps) {
  const { title, practiceTopics, quiz } = frontmatter;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  const { getTopicSubtopicCount } = useProgress();
  const checkedCount = getTopicSubtopicCount(topicKey);
  const totalCount = practiceTopics.length + (quiz ? 1 : 0);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <TextReveal as="h1" text={title} className="text-4xl text-heading" />
        {totalCount > 0 && (
          <div className="flex items-center gap-3">
            <ProgressRing
              completed={checkedCount}
              total={totalCount}
              label={`Progress: ${checkedCount} of ${totalCount} topics completed`}
            />
          </div>
        )}
      </div>

      <ContentCard>
        <LessonContext.Provider value={{ topicKey }}>
          {/* Tint the <Section>s alternately, as the JSON layout does by hand. */}
          <div className="[&>section:nth-of-type(odd)]:bg-content1 [&>section:nth-of-type(odd)]:border-content1-border [&>section:nth-of-type(even)]:bg-content2 [&>section:nth-of-type(even)]:border-content2-border">
            <Content components={mdxComponents} />
          </div>
        </LessonContext.Provider>
      </ContentCard>
    </>
  );
}

export default MdxLesson;
