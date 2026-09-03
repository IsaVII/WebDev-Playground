import { useTranslation } from "react-i18next";
import dockerContentEn from "../../data/en/learning/dockerContent.json";
import dockerContentSv from "../../data/sv/learning/dockerContent.json";
import ComposeNetworkingDemo from "../../components/demos/docker-demos/ComposeNetworkingDemo";
import ContainerArchitectureDemo from "../../components/demos/docker-demos/ContainerArchitectureDemo";
import DockerGotchasDemo from "../../components/demos/docker-demos/DockerGotchasDemo";
import LayerCachingDemo from "../../components/demos/docker-demos/LayerCachingDemo";
import LearningTopicLayout from "../../components/LearningTopicLayout";
import MultiStageBuildDemo from "../../components/demos/docker-demos/MultiStageBuildDemo";

const CONTENT_MAP = {
  en: dockerContentEn,
  sv: dockerContentSv,
};

function Docker() {
  const { i18n } = useTranslation();
  const dockerContent = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  // Maps each practice topic (by title, from dockerContent.json) to a
  // live, interactive demo. Keeping this separate from the JSON data means
  // the content stays data-driven while the runnable examples stay real code.
  const practiceDemos = {
    [dockerContent.practiceTopics[0].title]: MultiStageBuildDemo,
    [dockerContent.practiceTopics[1].title]: LayerCachingDemo,
    [dockerContent.practiceTopics[2].title]: ComposeNetworkingDemo,
    [dockerContent.practiceTopics[3].title]: DockerGotchasDemo,
  };

  return (
    <LearningTopicLayout
      title={dockerContent.title}
      introduction={dockerContent.introduction}
      coreConcepts={dockerContent.coreConcepts}
      sections={[
        {
          heading: dockerContent.architecture.heading,
          description: dockerContent.architecture.description,
          content: <ContainerArchitectureDemo />,
        },
      ]}
      fullExample={dockerContent.fullExample}
      gettingStarted={dockerContent.gettingStarted}
      practiceTopics={dockerContent.practiceTopics}
      practiceDemos={practiceDemos}
      topicKey="docker"
    />
  );
}

export default Docker;
