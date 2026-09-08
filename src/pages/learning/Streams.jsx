import { useTranslation } from "react-i18next";
import streamsContentEn from "../../data/en/learning/streamsContent.json";
import streamsContentSv from "../../data/sv/learning/streamsContent.json";
import LearningTopicLayout from "../../components/LearningTopicLayout";
import StreamPipelineDemo from "../../components/demos/streams-demos/StreamPipelineDemo";
import LambdaVsAnonymousDemo from "../../components/demos/streams-demos/LambdaVsAnonymousDemo";
import CollectorsDemo from "../../components/demos/streams-demos/CollectorsDemo";
import OptionalDemo from "../../components/demos/streams-demos/OptionalDemo";

const CONTENT_MAP = {
  en: streamsContentEn,
  sv: streamsContentSv,
};

function Streams() {
  const { i18n } = useTranslation();
  const content = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  const practiceDemos = {
    [content.practiceTopics[0].title]: LambdaVsAnonymousDemo,
    [content.practiceTopics[1].title]: CollectorsDemo,
    [content.practiceTopics[2].title]: OptionalDemo,
  };

  return (
    <LearningTopicLayout
      title={content.title}
      introduction={content.introduction}
      coreConcepts={content.coreConcepts}
      sections={[
        {
          heading: content.pipeline.heading,
          description: content.pipeline.description,
          content: <StreamPipelineDemo />,
        },
      ]}
      fullExample={content.fullExample}
      gettingStarted={content.gettingStarted}
      practiceTopics={content.practiceTopics}
      practiceDemos={practiceDemos}
      quiz={content.quiz}
      topicKey="streams"
    />
  );
}

export default Streams;
