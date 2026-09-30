import { useTranslation } from "react-i18next";
import CounterDemo from "../../components/demos/react-demos/CounterDemo";
import CustomHookDemo from "../../components/demos/react-demos/CustomHookDemo";
import HooksIntroDemo from "../../components/demos/react-demos/HooksIntroDemo";
import LearningTopicLayout from "../../components/LearningTopicLayout";
import ListRenderingDemo from "../../components/demos/react-demos/ListRenderingDemo";
import PropsDemo from "../../components/demos/react-demos/PropsDemo";
import reactContentEn from "../../data/en/learning/reactContent.json";
import reactContentSv from "../../data/sv/learning/reactContent.json";
import RenderCountDemo from "../../components/demos/react-demos/RenderCountDemo";
import StopwatchDemo from "../../components/demos/react-demos/StopwatchDemo";

const CONTENT_MAP = {
  en: reactContentEn,
  sv: reactContentSv,
};

function React() {
  const { i18n } = useTranslation();
  const reactContent = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  // Maps each practice topic (by title, from reactContent.json) to a live,
  // interactive demo. Keeping this separate from the JSON data means the
  // content stays data-driven while the runnable examples stay real code.
  const practiceDemos = {
    [reactContent.practiceTopics[0].title]: CounterDemo,
    [reactContent.practiceTopics[1].title]: PropsDemo,
    [reactContent.practiceTopics[2].title]: StopwatchDemo,
    [reactContent.practiceTopics[3].title]: ListRenderingDemo,
    [reactContent.practiceTopics[4].title]: CustomHookDemo,
    [reactContent.practiceTopics[5].title]: RenderCountDemo,
  };

  return (
    <LearningTopicLayout
      title={reactContent.title}
      introduction={reactContent.introduction}
      coreConcepts={reactContent.coreConcepts}
      sections={[
        {
          heading: reactContent.hooks.heading,
          description: reactContent.hooks.description,
          content: <HooksIntroDemo />,
        },
      ]}
      fullExample={reactContent.fullExample}
      gettingStarted={reactContent.gettingStarted}
      practiceTopics={reactContent.practiceTopics}
      practiceDemos={practiceDemos}
      topicKey="react"
    />
  );
}

export default React;
