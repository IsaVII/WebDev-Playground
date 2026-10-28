import { useTranslation } from "react-i18next";
import CheatSheetLayout from "../../components/CheatSheetLayout";
import webStackDataEn from "../../data/en/cheatsheets/webStack.json";
import webStackDataSv from "../../data/sv/cheatsheets/webStack.json";

const CONTENT_MAP: Record<string, typeof webStackDataEn> = {
  en: webStackDataEn,
  sv: webStackDataSv,
};

function WebStack() {
  const { i18n } = useTranslation();
  const webStackContent = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  return (
    <CheatSheetLayout
      key="webstack"
      title={webStackContent.title}
      introduction={webStackContent.introduction}
      prerequisites={webStackContent.prerequisites}
      steps={webStackContent.steps}
      gettingStarted={webStackContent.gettingStarted}
    />
  );
}

export default WebStack;
