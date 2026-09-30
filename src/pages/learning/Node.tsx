import { useTranslation } from "react-i18next";
import AsyncPatternsDemo from "../../components/demos/node-demos/AsyncPatternsDemo";
import BufferDemo from "../../components/demos/node-demos/BufferDemo";
import ChildProcessDemo from "../../components/demos/node-demos/ChildProcessDemo";
import EnvironmentDemo from "../../components/demos/node-demos/EnvironmentDemo";
import ErrorHandlingDemo from "../../components/demos/node-demos/ErrorHandlingDemo";
import EventLoopDemo from "../../components/demos/node-demos/EventLoopDemo";
import EventsDemo from "../../components/demos/node-demos/EventsDemo";
import FileSystemDemo from "../../components/demos/node-demos/FileSystemDemo";
import HttpServerDemo from "../../components/demos/node-demos/HttpServerDemo";
import LearningTopicLayout from "../../components/LearningTopicLayout";
import ModuleDemo from "../../components/demos/node-demos/ModuleDemo";
import nodeContentEn from "../../data/en/learning/nodeContent.json";
import nodeContentSv from "../../data/sv/learning/nodeContent.json";
import NpmDemo from "../../components/demos/node-demos/NpmDemo";
import PathDemo from "../../components/demos/node-demos/PathDemo";
import ProcessDemo from "../../components/demos/node-demos/ProcessDemo";
import StreamDemo from "../../components/demos/node-demos/StreamDemo";

const CONTENT_MAP = {
  en: nodeContentEn,
  sv: nodeContentSv,
};

function Node() {
  const { i18n } = useTranslation();
  const nodeContent = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  // Maps each practice topic (by title, from nodeContent.json) to a live,
  // interactive demo. Keeping this separate from the JSON data means the
  // content stays data-driven while the runnable examples stay real code.
  const practiceDemos = {
    [nodeContent.practiceTopics[0].title]: ModuleDemo,
    [nodeContent.practiceTopics[1].title]: FileSystemDemo,
    [nodeContent.practiceTopics[2].title]: HttpServerDemo,
    [nodeContent.practiceTopics[3].title]: StreamDemo,
    [nodeContent.practiceTopics[4].title]: NpmDemo,
    [nodeContent.practiceTopics[5].title]: EnvironmentDemo,
    [nodeContent.practiceTopics[6].title]: PathDemo,
    [nodeContent.practiceTopics[7].title]: ErrorHandlingDemo,
    [nodeContent.practiceTopics[8].title]: EventsDemo,
    [nodeContent.practiceTopics[9].title]: BufferDemo,
    [nodeContent.practiceTopics[10].title]: ChildProcessDemo,
    [nodeContent.practiceTopics[11].title]: AsyncPatternsDemo,
    [nodeContent.practiceTopics[12].title]: ProcessDemo,
  };

  return (
    <LearningTopicLayout
      title={nodeContent.title}
      introduction={nodeContent.introduction}
      coreConcepts={nodeContent.coreConcepts}
      sections={[
        {
          heading: nodeContent.runtime.heading,
          description: nodeContent.runtime.description,
          content: <EventLoopDemo />,
        },
      ]}
      fullExample={nodeContent.fullExample}
      gettingStarted={nodeContent.gettingStarted}
      practiceTopics={nodeContent.practiceTopics}
      practiceDemos={practiceDemos}
      topicKey="node"
    />
  );
}

export default Node;
