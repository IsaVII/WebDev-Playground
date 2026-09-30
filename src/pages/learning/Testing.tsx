import { useTranslation } from "react-i18next";
import ApiEndpointTestDemo from "../../components/demos/testing-demos/ApiEndpointTestDemo";
import AsyncTestDemo from "../../components/demos/testing-demos/AsyncTestDemo";
import ComponentTestDemo from "../../components/demos/testing-demos/ComponentTestDemo";
import FixturesDemo from "../../components/demos/testing-demos/FixturesDemo";
import IntegrationTestDemo from "../../components/demos/testing-demos/IntegrationTestDemo";
import LearningTopicLayout from "../../components/LearningTopicLayout";
import MockingDemo from "../../components/demos/testing-demos/MockingDemo";
import ReactComponentTestDemo from "../../components/demos/testing-demos/ReactComponentTestDemo";
import SpiesDemo from "../../components/demos/testing-demos/SpiesDemo";
import TddDemo from "../../components/demos/testing-demos/TddDemo";
import TestPyramidDemo from "../../components/demos/testing-demos/TestPyramidDemo";
import testingContentEn from "../../data/en/learning/testingContent.json";
import testingContentSv from "../../data/sv/learning/testingContent.json";
import UnitTestDemo from "../../components/demos/testing-demos/UnitTestDemo";

const CONTENT_MAP = {
  en: testingContentEn,
  sv: testingContentSv,
};

function Testing() {
  const { i18n } = useTranslation();
  const testingContent = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  // Maps each practice topic (by title, from testingContent.json) to a live,
  // interactive demo. Keeping this separate from the JSON data means the
  // content stays data-driven while the runnable examples stay real code.
  const practiceDemos = {
    [testingContent.practiceTopics[0].title]: UnitTestDemo,
    [testingContent.practiceTopics[1].title]: IntegrationTestDemo,
    [testingContent.practiceTopics[2].title]: ComponentTestDemo,
    [testingContent.practiceTopics[3].title]: MockingDemo,
    [testingContent.practiceTopics[4].title]: SpiesDemo,
    [testingContent.practiceTopics[5].title]: FixturesDemo,
    [testingContent.practiceTopics[6].title]: TddDemo,
    [testingContent.practiceTopics[7].title]: AsyncTestDemo,
    [testingContent.practiceTopics[8].title]: ReactComponentTestDemo,
    [testingContent.practiceTopics[9].title]: ApiEndpointTestDemo,
  };

  return (
    <LearningTopicLayout
      title={testingContent.title}
      introduction={testingContent.introduction}
      coreConcepts={testingContent.coreConcepts}
      sections={[
        {
          heading: testingContent.pyramid.heading,
          description: testingContent.pyramid.description,
          content: <TestPyramidDemo />,
        },
      ]}
      fullExample={testingContent.fullExample}
      gettingStarted={testingContent.gettingStarted}
      practiceTopics={testingContent.practiceTopics}
      practiceDemos={practiceDemos}
      practiceTopicsIntro='Click a topic to open a small failing test - fix it and hit "Run tests".'
      topicKey="testing"
    />
  );
}

export default Testing;
