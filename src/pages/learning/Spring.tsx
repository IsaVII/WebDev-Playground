import { useTranslation } from "react-i18next";
import springContentEn from "../../data/en/learning/springContent.json";
import springContentSv from "../../data/sv/learning/springContent.json";
import LearningTopicLayout from "../../components/LearningTopicLayout";
import RequestFlowDemo from "../../components/demos/spring-demos/RequestFlowDemo";
import DiContainerDemo from "../../components/demos/spring-demos/DiContainerDemo";
import JpaQueryDerivationDemo from "../../components/demos/spring-demos/JpaQueryDerivationDemo";
import StereotypeAnnotationDemo from "../../components/demos/spring-demos/StereotypeAnnotationDemo";

const CONTENT_MAP = {
  en: springContentEn,
  sv: springContentSv,
};

function Spring() {
  const { i18n } = useTranslation();
  const content = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  const practiceDemos = {
    [content.practiceTopics[0].title]: DiContainerDemo,
    [content.practiceTopics[1].title]: JpaQueryDerivationDemo,
    [content.practiceTopics[2].title]: StereotypeAnnotationDemo,
  };

  return (
    <LearningTopicLayout
      title={content.title}
      introduction={content.introduction}
      coreConcepts={content.coreConcepts}
      sections={[
        {
          heading: content.layers.heading,
          description: content.layers.description,
          content: <RequestFlowDemo />,
        },
      ]}
      fullExample={content.fullExample}
      gettingStarted={content.gettingStarted}
      practiceTopics={content.practiceTopics}
      practiceDemos={practiceDemos}
      quiz={content.quiz}
      topicKey="spring"
    />
  );
}

export default Spring;
