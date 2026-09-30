import { useTranslation } from "react-i18next";
import CheatSheetLayout from "../../components/CheatSheetLayout";
import githubPagesContentEn from "../../data/en/cheatsheets/githubPages.json";
import githubPagesContentSv from "../../data/sv/cheatsheets/githubPages.json";

const CONTENT_MAP = {
  en: githubPagesContentEn,
  sv: githubPagesContentSv,
};

function GithubPages() {
  const { i18n } = useTranslation();
  const githubPagesContent = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  return (
    <CheatSheetLayout
      title={githubPagesContent.title}
      introduction={githubPagesContent.introduction}
      prerequisites={githubPagesContent.prerequisites}
      steps={githubPagesContent.steps}
      gettingStarted={githubPagesContent.gettingStarted}
      source={githubPagesContent.source}
    />
  );
}

export default GithubPages;
