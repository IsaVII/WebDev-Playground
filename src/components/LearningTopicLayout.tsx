import { useEffect } from "react";
import ProgressRing from "./ProgressRing";
import ContentCard from "./ContentCard";
import PracticeTopicCard from "./PracticeTopicCard";
import StepByStepExample from "./StepByStepExample";
import SelfCheckQuiz from "./SelfCheckQuiz";
import { useProgress } from "../context/ProgressContext";
import Reveal from "./motion/Reveal";
import TextReveal from "./motion/TextReveal";
import { loadCombinedExample } from "../utils/codeExamples";

/**
 * Shared page layout for every topic under src/pages/learning/. Each page
 * (Git, Http, Node, React, Redux, Testing, TypeScript, WebSockets...) is
 * just its content JSON, its practice-topic demo map, and a call to this
 * component - the actual heading sizes, spacing, and section order live
 * here ONCE. Change something here (e.g. text-3xl -> text-4xl) and every
 * topic page picks it up, instead of editing eight near-identical files.
 *
 * Sections between "Core Concepts" and "Full Example" vary per topic (Git's
 * three states, HTTP/WebSockets' connection lifecycle, Node's event loop,
 * React's hooks, Testing's pyramid, TypeScript's type checking, Redux's
 * data flow + toolkit). Rather than hard-code one "extra" slot, pages pass
 * a `sections` array - each one is an optional heading, an optional
 * description paragraph, and optional content (a demo, a CodeBlock,
 * whatever the topic needs).
 */
function LearningTopicLayout({
  title,
  introduction,
  coreConcepts,
  sections = [],
  fullExample,
  gettingStarted,
  practiceTopics,
  practiceDemos,
  practiceTopicsIntro = "Click a topic to open a live, editable example.",
  quiz = [],
  topicKey,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  const { getTopicSubtopicCount } = useProgress();
  const checkedCount = getTopicSubtopicCount(topicKey);
  const hasQuiz = quiz?.length > 0;
  const totalCount = (practiceTopics?.length || 0) + (hasQuiz ? 1 : 0);
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
        <Reveal variant="fade" index={0}>
          <div className="bg-content1 w-full border-l-4 border-content1-border p-3 pl-5 mb-3">
            <h2 className="text-3xl text-heading mt-8 mb-4">
              {introduction.heading}
            </h2>
            <p className="text-muted leading-relaxed mb-4 text-left ">
              {introduction.description}
            </p>
          </div>
        </Reveal>

        <Reveal variant="fade" index={1}>
          <div className="bg-content2 w-full  border-l-4  border-content2-border p-3 pl-5  mb-3   ">
            <h3 className="text-2xl text-heading-alt mt-6 mb-3">
              {coreConcepts.heading}
            </h3>
            <ul className="text-muted leading-relaxed   text-left">
              {coreConcepts.concepts.map((concept) => (
                <li key={concept.title} className="mb-3">
                  <strong>{concept.title}:</strong> {concept.description}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {sections.map((section, index) => (
          <Reveal variant="fade" key={section.heading ?? index} index={index + 2}>
            <div className="bg-content1 w-full border-l-4 border-content1-border p-3 pl-5 md:pr-5 mb-3 md:ml-auto">
              {section.heading && (
                <h3 className="text-2xl text-heading-alt mt-6 mb-3">
                  {section.heading}
                </h3>
              )}
              {section.description && (
                <p className="text-muted leading-relaxed mb-4">
                  {section.description}
                </p>
              )}
              {section.content}
            </div>
          </Reveal>
        ))}

        {fullExample && (
          <Reveal variant="fade" index={sections.length + 2}>
            <div className="bg-content2 border-l-4 border-content2-border p-3 pl-5 md:pr-5 mb-3 md:ml-auto w-fit">
              <h3 className="text-2xl text-heading-alt mt-6 mb-3">
                {fullExample.heading}
              </h3>
              <StepByStepExample
                title={fullExample.title}
                description={fullExample.description}
                code={loadCombinedExample(fullExample.files)}
                steps={fullExample.steps}
              />
            </div>
          </Reveal>
        )}

        <Reveal variant="fade" index={sections.length + 3}>
          <div className="bg-content1 w-full border-l-4 border-content1-border p-3 pl-5 mb-3">
            <h3 className="text-2xl text-heading-alt mt-6 mb-3">
              {gettingStarted.heading}
            </h3>
            <ol className="text-muted leading-relaxed pl-6 text-left">
              {gettingStarted.steps.map((step, index) => (
                <li key={index} className="mb-2">
                  • {step}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal variant="fade" index={sections.length + 4}>
          <div className="bg-content2 w-full border-l-4 border-content2-border p-3 pl-5 mb-3">
            <h3 className="text-2xl text-heading-alt mt-6 mb-3">
              Practice Topics
            </h3>
            <p className="text-muted text-sm mb-4">{practiceTopicsIntro}</p>
            <div className="stagger-children grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {practiceTopics.map((topic, i) => {
                const Demo = practiceDemos[topic.title];
                return (
                  <Reveal variant="fade" key={topic.title} index={i}>
                    <PracticeTopicCard
                      topicKey={topicKey}
                      title={topic.title}
                      description={topic.description}
                      demo={Demo ? <Demo /> : null}
                    />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>

        {hasQuiz && (
          <Reveal variant="fade" index={sections.length + 5}>
            <div className="bg-content1 w-full border-l-4 border-content1-border p-3 pl-5 mb-3">
              <h3 className="text-2xl text-heading-alt mt-6 mb-3">Self-Check</h3>
              <p className="text-muted text-sm mb-4">
                Recall, don&apos;t re-read - answer before you check.
              </p>
              <SelfCheckQuiz questions={quiz} topicKey={topicKey} />
            </div>
          </Reveal>
        )}
      </ContentCard>
    </>
  );
}

export default LearningTopicLayout;
