import { useTranslation } from "react-i18next";
import threadsContentEn from "../../data/en/learning/threadsContent.json";
import threadsContentSv from "../../data/sv/learning/threadsContent.json";
import LearningTopicLayout from "../../components/LearningTopicLayout";
import RaceConditionDemo from "../../components/demos/threads-demos/RaceConditionDemo";
import ThreadStatesDemo from "../../components/demos/threads-demos/ThreadStatesDemo";
import ThreadPredictDemo from "../../components/demos/threads-demos/ThreadPredictDemo";
import ThreadPoolDemo from "../../components/demos/threads-demos/ThreadPoolDemo";

const CONTENT_MAP: Record<string, typeof threadsContentEn> = {
  en: threadsContentEn,
  sv: threadsContentSv,
};

function Threads() {
  const { i18n } = useTranslation();
  const content = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  const practiceDemos = {
    [content.practiceTopics[0].title]: ThreadStatesDemo,
    [content.practiceTopics[1].title]: ThreadPredictDemo,
    [content.practiceTopics[2].title]: ThreadPoolDemo,
  };

  return (
    <LearningTopicLayout
      title={content.title}
      introduction={content.introduction}
      coreConcepts={content.coreConcepts}
      sections={[
        {
          heading: content.interleaving.heading,
          description: content.interleaving.description,
          content: <RaceConditionDemo />,
        },
      ]}
      fullExample={content.fullExample}
      gettingStarted={content.gettingStarted}
      practiceTopics={content.practiceTopics}
      practiceDemos={practiceDemos}
      quiz={content.quiz}
      topicKey="threads"
    />
  );
}

export default Threads;
