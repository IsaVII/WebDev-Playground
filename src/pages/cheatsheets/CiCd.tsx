import { useTranslation } from "react-i18next";
import CheatSheetLayout from "../../components/CheatSheetLayout";
import cicdDataEn from "../../data/en/cheatsheets/cicd.json";
import cicdDataSv from "../../data/sv/cheatsheets/cicd.json";

const CONTENT_MAP = {
  en: cicdDataEn,
  sv: cicdDataSv,
};

function CiCd() {
  const { i18n } = useTranslation();
  const cicdData = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;
  const cicdContent = cicdData.default || cicdData;

  return (
    <CheatSheetLayout
      key="cicd"
      title={cicdContent.title}
      introduction={cicdContent.introduction}
      prerequisites={cicdContent.prerequisites}
      steps={cicdContent.steps}
      gettingStarted={cicdContent.gettingStarted}
      source={cicdContent.source}
    />
  );
}

export default CiCd;
