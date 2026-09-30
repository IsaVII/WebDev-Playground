import { useTranslation } from "react-i18next";
import CheatSheetLayout from "../../components/CheatSheetLayout";
import gitCommandsDataEn from "../../data/en/cheatsheets/gitCommands.json";
import gitCommandsDataSv from "../../data/sv/cheatsheets/gitCommands.json";

const CONTENT_MAP = {
  en: gitCommandsDataEn,
  sv: gitCommandsDataSv,
};

function GitCommands() {
  const { i18n } = useTranslation();
  const gitCommandsData = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;
  const gitCommandsContent = gitCommandsData.default || gitCommandsData;

  return (
    <CheatSheetLayout
      key="gitcommands"
      title={gitCommandsContent.title}
      introduction={gitCommandsContent.introduction}
      prerequisites={gitCommandsContent.prerequisites}
      steps={gitCommandsContent.steps}
      gettingStarted={gitCommandsContent.gettingStarted}
      source={gitCommandsContent.source}
    />
  );
}

export default GitCommands;
