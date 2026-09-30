import { useLocalizedContent } from "../../hooks/useLocalizedContent";
import CheatSheetLayout from "../../components/CheatSheetLayout";
import enData from "../../data/en/cheatsheets/i18n.json";
import svData from "../../data/sv/cheatsheets/i18n.json";

function I18n() {
  const content = useLocalizedContent(enData, svData);
  return <CheatSheetLayout {...content} />;
}

export default I18n;
