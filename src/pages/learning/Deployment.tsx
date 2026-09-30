import { useTranslation } from "react-i18next";
import deploymentContentEn from "../../data/en/learning/deploymentContent.json";
import deploymentContentSv from "../../data/sv/learning/deploymentContent.json";
import DeploymentPipelineDemo from "../../components/demos/deployment-demos/DeploymentPipelineDemo";
import EnvironmentVariablesDemo from "../../components/demos/deployment-demos/EnvironmentVariablesDemo";
import GithubActionsDemo from "../../components/demos/deployment-demos/GithubActionsDemo";
import LearningTopicLayout from "../../components/LearningTopicLayout";
import PlatformComparisonDemo from "../../components/demos/deployment-demos/PlatformComparisonDemo";
import PreviewRollbackDemo from "../../components/demos/deployment-demos/PreviewRollbackDemo";

const CONTENT_MAP = {
  en: deploymentContentEn,
  sv: deploymentContentSv,
};

function Deployment() {
  const { i18n } = useTranslation();
  const deploymentContent = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  // Maps each practice topic (by title, from deploymentContent.json) to a
  // live, interactive demo. Keeping this separate from the JSON data means
  // the content stays data-driven while the runnable examples stay real code.
  const practiceDemos = {
    [deploymentContent.practiceTopics[0].title]: PlatformComparisonDemo,
    [deploymentContent.practiceTopics[1].title]: EnvironmentVariablesDemo,
    [deploymentContent.practiceTopics[2].title]: GithubActionsDemo,
    [deploymentContent.practiceTopics[3].title]: PreviewRollbackDemo,
  };

  return (
    <LearningTopicLayout
      title={deploymentContent.title}
      introduction={deploymentContent.introduction}
      coreConcepts={deploymentContent.coreConcepts}
      sections={[
        {
          heading: deploymentContent.pipeline.heading,
          description: deploymentContent.pipeline.description,
          content: <DeploymentPipelineDemo />,
        },
      ]}
      fullExample={deploymentContent.fullExample}
      gettingStarted={deploymentContent.gettingStarted}
      practiceTopics={deploymentContent.practiceTopics}
      practiceDemos={practiceDemos}
      topicKey="deployment"
    />
  );
}

export default Deployment;
