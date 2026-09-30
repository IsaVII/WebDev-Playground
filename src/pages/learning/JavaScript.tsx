import { useTranslation } from "react-i18next";
import ArrayMethodsDemo from "../../components/demos/javascript-demos/ArrayMethodsDemo";
import AsyncAwaitDemo from "../../components/demos/javascript-demos/AsyncAwaitDemo";
import ClosureDemo from "../../components/demos/javascript-demos/ClosureDemo";
import DestructuringDemo from "../../components/demos/javascript-demos/DestructuringDemo";
import EventLoopDemo from "../../components/demos/javascript-demos/EventLoopDemo";
import javascriptContentEn from "../../data/en/learning/javascriptContent.json";
import javascriptContentSv from "../../data/sv/learning/javascriptContent.json";
import LearningTopicLayout from "../../components/LearningTopicLayout";
import ScopeDemo from "../../components/demos/javascript-demos/ScopeDemo";
import TemplateLiteralDemo from "../../components/demos/javascript-demos/TemplateLiteralDemo";

const CONTENT_MAP = {
  en: javascriptContentEn,
  sv: javascriptContentSv,
};

function JavaScript() {
  const { i18n } = useTranslation();
  const javascriptContent = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  // Maps each practice topic (by title, from javascriptContent.json) to a
  // live, interactive demo. Keeping this separate from the JSON data means
  // the content stays data-driven while the runnable examples stay real code.
  const practiceDemos = {
    [javascriptContent.practiceTopics[0].title]: ScopeDemo,
    [javascriptContent.practiceTopics[1].title]: ClosureDemo,
    [javascriptContent.practiceTopics[2].title]: ArrayMethodsDemo,
    [javascriptContent.practiceTopics[3].title]: DestructuringDemo,
    [javascriptContent.practiceTopics[4].title]: TemplateLiteralDemo,
    [javascriptContent.practiceTopics[5].title]: AsyncAwaitDemo,
  };

  return (
    <LearningTopicLayout
      title={javascriptContent.title}
      introduction={javascriptContent.introduction}
      coreConcepts={javascriptContent.coreConcepts}
      sections={[
        {
          heading: javascriptContent.eventLoop.heading,
          description: javascriptContent.eventLoop.description,
          content: <EventLoopDemo />,
        },
      ]}
      fullExample={javascriptContent.fullExample}
      gettingStarted={javascriptContent.gettingStarted}
      practiceTopics={javascriptContent.practiceTopics}
      practiceDemos={practiceDemos}
      topicKey="javascript"
    />
  );
}

export default JavaScript;
