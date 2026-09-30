import { useTranslation } from "react-i18next";
import AuthDemo from "../../components/demos/http-demos/AuthDemo";
import CorsDemo from "../../components/demos/http-demos/CorsDemo";
import FetchAbortDemo from "../../components/demos/http-demos/FetchAbortDemo";
import HeadersCookiesDemo from "../../components/demos/http-demos/HeadersCookiesDemo";
import httpContentEn from "../../data/en/learning/httpContent.json";
import httpContentSv from "../../data/sv/learning/httpContent.json";
import LearningTopicLayout from "../../components/LearningTopicLayout";
import MethodsStatusDemo from "../../components/demos/http-demos/MethodsStatusDemo";
import RequestResponseDemo from "../../components/demos/http-demos/RequestResponseDemo";
import RestJsonDemo from "../../components/demos/http-demos/RestJsonDemo";
import SseDemo from "../../components/demos/http-demos/SseDemo";
import WebSocketDemo from "../../components/demos/http-demos/WebSocketDemo";

const CONTENT_MAP = {
  en: httpContentEn,
  sv: httpContentSv,
};

function Http() {
  const { i18n } = useTranslation();
  const httpContent = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  // Maps each practice topic (by title, from httpContent.json) to a live,
  // interactive demo. Keeping this separate from the JSON data means the
  // content stays data-driven while the runnable examples stay real code.
  const practiceDemos = {
    [httpContent.practiceTopics[0].title]: MethodsStatusDemo,
    [httpContent.practiceTopics[1].title]: HeadersCookiesDemo,
    [httpContent.practiceTopics[2].title]: CorsDemo,
    [httpContent.practiceTopics[3].title]: RestJsonDemo,
    [httpContent.practiceTopics[4].title]: FetchAbortDemo,
    [httpContent.practiceTopics[5].title]: AuthDemo,
    [httpContent.practiceTopics[6].title]: WebSocketDemo,
    [httpContent.practiceTopics[7].title]: SseDemo,
  };

  return (
    <LearningTopicLayout
      title={httpContent.title}
      introduction={httpContent.introduction}
      coreConcepts={httpContent.coreConcepts}
      sections={[
        {
          heading: httpContent.lifecycle.heading,
          description: httpContent.lifecycle.description,
          content: <RequestResponseDemo />,
        },
      ]}
      fullExample={httpContent.fullExample}
      gettingStarted={httpContent.gettingStarted}
      practiceTopics={httpContent.practiceTopics}
      practiceDemos={practiceDemos}
      topicKey="http"
    />
  );
}

export default Http;
