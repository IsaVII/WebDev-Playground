import { useTranslation } from "react-i18next";
import CheatSheetLayout from "../../components/CheatSheetLayout";
import llmIntegrationDataEn from "../../data/en/cheatsheets/llmIntegration.json";
import llmIntegrationDataSv from "../../data/sv/cheatsheets/llmIntegration.json";

const CONTENT_MAP = {
  en: llmIntegrationDataEn,
  sv: llmIntegrationDataSv,
};

function LlmIntegration() {
  const { i18n } = useTranslation();
  const llmIntegrationData = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;
  const llmIntegrationContent = llmIntegrationData.default || llmIntegrationData;

  return (
    <CheatSheetLayout
      key="llmintegration"
      title={llmIntegrationContent.title}
      introduction={llmIntegrationContent.introduction}
      prerequisites={llmIntegrationContent.prerequisites}
      steps={llmIntegrationContent.steps}
      gettingStarted={llmIntegrationContent.gettingStarted}
      source={llmIntegrationContent.source}
    />
  );
}

export default LlmIntegration;
