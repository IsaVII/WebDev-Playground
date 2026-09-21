import { useTranslation } from "react-i18next";
import CheatSheetLayout from "../../components/CheatSheetLayout";
import markdownDataEn from "../../data/en/cheatsheets/markdown.json";
import markdownDataSv from "../../data/sv/cheatsheets/markdown.json";

const CONTENT_MAP = {
  en: markdownDataEn,
  sv: markdownDataSv,
};

function Markdown() {
  const { i18n } = useTranslation();
  const markdownData = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;
  const markdownContent = markdownData.default || markdownData;

  return (
    <CheatSheetLayout
      key="markdown"
      title={markdownContent.title}
      introduction={markdownContent.introduction}
      prerequisites={markdownContent.prerequisites}
      steps={markdownContent.steps}
      gettingStarted={markdownContent.gettingStarted}
      source={markdownContent.source}
    />
  );
}

export default Markdown;
