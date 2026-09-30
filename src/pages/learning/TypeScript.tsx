import { useTranslation } from "react-i18next";
import BasicTypesDemo from "../../components/demos/typescript-demos/BasicTypesDemo";
import FunctionTypingDemo from "../../components/demos/typescript-demos/FunctionTypingDemo";
import GenericsDemo from "../../components/demos/typescript-demos/GenericsDemo";
import InterfaceDemo from "../../components/demos/typescript-demos/InterfaceDemo";
import LearningTopicLayout from "../../components/LearningTopicLayout";
import TypeCheckingDemo from "../../components/demos/typescript-demos/TypeCheckingDemo";
import typescriptContentEn from "../../data/en/learning/typescriptContent.json";
import typescriptContentSv from "../../data/sv/learning/typescriptContent.json";
import UnionIntersectionDemo from "../../components/demos/typescript-demos/UnionIntersectionDemo";

const CONTENT_MAP = {
  en: typescriptContentEn,
  sv: typescriptContentSv,
};

function TypeScript() {
  const { i18n } = useTranslation();
  const typescriptContent = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  // Maps each practice topic (by title, from typescriptContent.json) to a
  // live, interactive demo. Keeping this separate from the JSON data means
  // the content stays data-driven while the runnable examples stay real code.
  const practiceDemos = {
    [typescriptContent.practiceTopics[0].title]: BasicTypesDemo,
    [typescriptContent.practiceTopics[1].title]: InterfaceDemo,
    [typescriptContent.practiceTopics[2].title]: FunctionTypingDemo,
    [typescriptContent.practiceTopics[3].title]: GenericsDemo,
    [typescriptContent.practiceTopics[4].title]: UnionIntersectionDemo,
  };

  return (
    <LearningTopicLayout
      title={typescriptContent.title}
      introduction={typescriptContent.introduction}
      coreConcepts={typescriptContent.coreConcepts}
      sections={[
        {
          heading: typescriptContent.typeChecking.heading,
          description: typescriptContent.typeChecking.description,
          content: <TypeCheckingDemo />,
        },
      ]}
      fullExample={typescriptContent.fullExample}
      gettingStarted={typescriptContent.gettingStarted}
      practiceTopics={typescriptContent.practiceTopics}
      practiceDemos={practiceDemos}
      topicKey="typescript"
    />
  );
}

export default TypeScript;
