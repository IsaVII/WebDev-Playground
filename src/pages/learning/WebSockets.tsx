import { useTranslation } from "react-i18next";
import BroadcastDemo from "../../components/demos/websockets-demos/BroadcastDemo";
import HeartbeatDemo from "../../components/demos/websockets-demos/HeartbeatDemo";
import LearningTopicLayout from "../../components/LearningTopicLayout";
import MessageExchangeDemo from "../../components/demos/websockets-demos/MessageExchangeDemo";
import ReconnectDemo from "../../components/demos/websockets-demos/ReconnectDemo";
import WebSocketDemo from "../../components/demos/http-demos/WebSocketDemo";
import webSocketsContentEn from "../../data/en/learning/webSocketsContent.json";
import webSocketsContentSv from "../../data/sv/learning/webSocketsContent.json";

const CONTENT_MAP = {
  en: webSocketsContentEn,
  sv: webSocketsContentSv,
};

function WebSockets() {
  const { i18n } = useTranslation();
  const webSocketsContent = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  // Maps each practice topic (by title, from webSocketsContent.json) to a
  // live, interactive demo. Keeping this separate from the JSON data means
  // the content stays data-driven while the runnable examples stay real code.
  const practiceDemos = {
    [webSocketsContent.practiceTopics[0].title]: MessageExchangeDemo,
    [webSocketsContent.practiceTopics[1].title]: BroadcastDemo,
    [webSocketsContent.practiceTopics[2].title]: HeartbeatDemo,
    [webSocketsContent.practiceTopics[3].title]: ReconnectDemo,
  };

  return (
    <LearningTopicLayout
      title={webSocketsContent.title}
      introduction={webSocketsContent.introduction}
      coreConcepts={webSocketsContent.coreConcepts}
      sections={[
        {
          heading: webSocketsContent.lifecycle.heading,
          description: webSocketsContent.lifecycle.description,
          content: <WebSocketDemo />,
        },
      ]}
      fullExample={webSocketsContent.fullExample}
      gettingStarted={webSocketsContent.gettingStarted}
      practiceTopics={webSocketsContent.practiceTopics}
      practiceDemos={practiceDemos}
      topicKey="websockets"
    />
  );
}

export default WebSockets;
