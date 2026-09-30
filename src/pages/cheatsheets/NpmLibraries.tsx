import { useTranslation } from "react-i18next";
import CheatSheetLayout from "../../components/CheatSheetLayout";
import npmLibrariesDataEn from "../../data/en/cheatsheets/npmLibraries.json";
import npmLibrariesDataSv from "../../data/sv/cheatsheets/npmLibraries.json";

const CONTENT_MAP = {
  en: npmLibrariesDataEn,
  sv: npmLibrariesDataSv,
};

function NpmLibraries() {
  const { i18n } = useTranslation();
  const npmLibrariesData = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;
  const npmLibrariesContent = npmLibrariesData.default || npmLibrariesData;

  return (
    <CheatSheetLayout
      key="npmlibraries"
      title={npmLibrariesContent.title}
      introduction={npmLibrariesContent.introduction}
      prerequisites={npmLibrariesContent.prerequisites}
      steps={npmLibrariesContent.steps}
      gettingStarted={npmLibrariesContent.gettingStarted}
      source={npmLibrariesContent.source}
    />
  );
}

export default NpmLibraries;
