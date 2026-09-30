import { useTranslation } from "react-i18next";
import CheatSheetLayout from "../../components/CheatSheetLayout";
import projectSetupContentEn from "../../data/en/cheatsheets/projectSetup.json";
import projectSetupContentSv from "../../data/sv/cheatsheets/projectSetup.json";

const CONTENT_MAP = {
  en: projectSetupContentEn,
  sv: projectSetupContentSv,
};

function ProjectSetup() {
  const { i18n } = useTranslation();
  const projectSetupContent = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  return (
    <CheatSheetLayout
      title={projectSetupContent.title}
      introduction={projectSetupContent.introduction}
      prerequisites={projectSetupContent.prerequisites}
      steps={projectSetupContent.steps}
      folderStructure={projectSetupContent.folderStructure}
      backendSetup={projectSetupContent.backendSetup}
      whatYouMightBeMissing={projectSetupContent.whatYouMightBeMissing}
      gettingStarted={projectSetupContent.gettingStarted}
      source={projectSetupContent.source}
    />
  );
}

export default ProjectSetup;
