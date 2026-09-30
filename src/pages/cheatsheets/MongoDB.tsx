import { useTranslation } from "react-i18next";
import CheatSheetLayout from "../../components/CheatSheetLayout";
import mongoDBDataEn from "../../data/en/cheatsheets/mongodb.json";
import mongoDBDataSv from "../../data/sv/cheatsheets/mongodb.json";

const CONTENT_MAP = {
  en: mongoDBDataEn,
  sv: mongoDBDataSv,
};

function MongoDB() {
  const { i18n } = useTranslation();
  const mongoDBData = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;
  const mongoDBContent = mongoDBData.default || mongoDBData;

  return (
    <CheatSheetLayout
      key="mongodb"
      title={mongoDBContent.title}
      introduction={mongoDBContent.introduction}
      prerequisites={mongoDBContent.prerequisites}
      steps={mongoDBContent.steps}
      gettingStarted={mongoDBContent.gettingStarted}
      source={mongoDBContent.source}
    />
  );
}

export default MongoDB;
