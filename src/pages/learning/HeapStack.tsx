import { useTranslation } from "react-i18next";
import heapStackContentEn from "../../data/en/learning/heapStackContent.json";
import heapStackContentSv from "../../data/sv/learning/heapStackContent.json";
import LearningTopicLayout from "../../components/LearningTopicLayout";
import CallStackHeapDemo from "../../components/demos/heapstack-demos/CallStackHeapDemo";
import StackOrHeapDemo from "../../components/demos/heapstack-demos/StackOrHeapDemo";
import PassByValueDemo from "../../components/demos/heapstack-demos/PassByValueDemo";

const CONTENT_MAP: Record<string, typeof heapStackContentEn> = {
  en: heapStackContentEn,
  sv: heapStackContentSv,
};

function HeapStack() {
  const { i18n } = useTranslation();
  const content = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  const practiceDemos = {
    [content.practiceTopics[0].title]: StackOrHeapDemo,
    [content.practiceTopics[1].title]: PassByValueDemo,
  };

  return (
    <LearningTopicLayout
      title={content.title}
      introduction={content.introduction}
      coreConcepts={content.coreConcepts}
      sections={[
        {
          heading: content.callTrace.heading,
          description: content.callTrace.description,
          content: <CallStackHeapDemo />,
        },
      ]}
      fullExample={content.fullExample}
      gettingStarted={content.gettingStarted}
      practiceTopics={content.practiceTopics}
      practiceDemos={practiceDemos}
      quiz={content.quiz}
      topicKey="heapstack"
    />
  );
}

export default HeapStack;
