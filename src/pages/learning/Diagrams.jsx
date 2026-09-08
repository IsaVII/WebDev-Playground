import { useTranslation } from "react-i18next";
import diagramsContentEn from "../../data/en/learning/diagramsContent.json";
import diagramsContentSv from "../../data/sv/learning/diagramsContent.json";
import LearningTopicLayout from "../../components/LearningTopicLayout";
import ClassToTableDemo from "../../components/demos/diagrams-demos/ClassToTableDemo";
import RelationshipTypesDemo from "../../components/demos/diagrams-demos/RelationshipTypesDemo";
import CardinalityDemo from "../../components/demos/diagrams-demos/CardinalityDemo";
import NormalizationDemo from "../../components/demos/diagrams-demos/NormalizationDemo";

const CONTENT_MAP = {
  en: diagramsContentEn,
  sv: diagramsContentSv,
};

function Diagrams() {
  const { i18n } = useTranslation();
  const content = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  const practiceDemos = {
    [content.practiceTopics[0].title]: RelationshipTypesDemo,
    [content.practiceTopics[1].title]: CardinalityDemo,
    [content.practiceTopics[2].title]: NormalizationDemo,
  };

  return (
    <LearningTopicLayout
      title={content.title}
      introduction={content.introduction}
      coreConcepts={content.coreConcepts}
      sections={[
        {
          heading: content.mapping.heading,
          description: content.mapping.description,
          content: <ClassToTableDemo />,
        },
      ]}
      fullExample={content.fullExample}
      gettingStarted={content.gettingStarted}
      practiceTopics={content.practiceTopics}
      practiceDemos={practiceDemos}
      quiz={content.quiz}
      topicKey="diagrams"
    />
  );
}

export default Diagrams;
