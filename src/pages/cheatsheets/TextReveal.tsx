import { useTranslation } from "react-i18next";
import CheatSheetLayout from "../../components/CheatSheetLayout";
import textRevealContentEn from "../../data/en/cheatsheets/textReveal.json";
import textRevealContentSv from "../../data/sv/cheatsheets/textReveal.json";

const CONTENT_MAP = {
  en: textRevealContentEn,
  sv: textRevealContentSv,
};

function TextReveal() {
  const { i18n } = useTranslation();
  const textRevealContent = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  return (
    <CheatSheetLayout
      title={textRevealContent.title}
      introduction={textRevealContent.introduction}
      prerequisites={textRevealContent.prerequisites}
      steps={textRevealContent.steps}
      whatYouMightBeMissing={textRevealContent.whatYouMightBeMissing}
      gettingStarted={textRevealContent.gettingStarted}
      source={textRevealContent.source}
    />
  );
}

export default TextReveal;
