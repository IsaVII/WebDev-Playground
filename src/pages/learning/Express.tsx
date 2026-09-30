import { useTranslation } from "react-i18next";
import BodyParsingDemo from "../../components/demos/express-demos/BodyParsingDemo";
import ErrorHandlingDemo from "../../components/demos/express-demos/ErrorHandlingDemo";
import expressContentEn from "../../data/en/learning/expressContent.json";
import expressContentSv from "../../data/sv/learning/expressContent.json";
import LearningTopicLayout from "../../components/LearningTopicLayout";
import MiddlewarePipelineDemo from "../../components/demos/express-demos/MiddlewarePipelineDemo";
import RequestResponseDemo from "../../components/demos/express-demos/RequestResponseDemo";
import RouterDemo from "../../components/demos/express-demos/RouterDemo";
import RoutingDemo from "../../components/demos/express-demos/RoutingDemo";
import ThirdPartyMiddlewareDemo from "../../components/demos/express-demos/ThirdPartyMiddlewareDemo";

const CONTENT_MAP = {
  en: expressContentEn,
  sv: expressContentSv,
};

function Express() {
  const { i18n } = useTranslation();
  const expressContent = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  // Maps each practice topic (by title, from expressContent.json) to a live,
  // interactive demo. Keeping this separate from the JSON data means the
  // content stays data-driven while the runnable examples stay real code.
  const practiceDemos = {
    [expressContent.practiceTopics[0].title]: RoutingDemo,
    [expressContent.practiceTopics[1].title]: RequestResponseDemo,
    [expressContent.practiceTopics[2].title]: RouterDemo,
    [expressContent.practiceTopics[3].title]: BodyParsingDemo,
    [expressContent.practiceTopics[4].title]: ErrorHandlingDemo,
    [expressContent.practiceTopics[5].title]: ThirdPartyMiddlewareDemo,
  };

  return (
    <LearningTopicLayout
      title={expressContent.title}
      introduction={expressContent.introduction}
      coreConcepts={expressContent.coreConcepts}
      sections={[
        {
          heading: expressContent.pipeline.heading,
          description: expressContent.pipeline.description,
          content: <MiddlewarePipelineDemo />,
        },
      ]}
      fullExample={expressContent.fullExample}
      gettingStarted={expressContent.gettingStarted}
      practiceTopics={expressContent.practiceTopics}
      practiceDemos={practiceDemos}
      topicKey="express"
    />
  );
}

export default Express;
