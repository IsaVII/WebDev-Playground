import { useTranslation } from "react-i18next";
import CheatSheetLayout from "../../components/CheatSheetLayout";
import sqlDataEn from "../../data/en/cheatsheets/sql.json";
import sqlDataSv from "../../data/sv/cheatsheets/sql.json";

const CONTENT_MAP: Record<string, typeof sqlDataEn> = {
  en: sqlDataEn,
  sv: sqlDataSv,
};

function SQL() {
  const { i18n } = useTranslation();
  const sqlData = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;
  const sqlContent = sqlData;

  return (
    <CheatSheetLayout
      key="sql"
      title={sqlContent.title}
      introduction={sqlContent.introduction}
      prerequisites={sqlContent.prerequisites}
      steps={sqlContent.steps}
    />
  );
}

export default SQL;
