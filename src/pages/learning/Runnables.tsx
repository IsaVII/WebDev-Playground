import { useTranslation } from "react-i18next";
import MdxLesson from "../../components/mdx/MdxLesson";
import ContentEn, {
  frontmatter as frontmatterEn,
} from "../../data/en/learning/runnables.mdx";
import ContentSv, {
  frontmatter as frontmatterSv,
} from "../../data/sv/learning/runnables.mdx";

// Written as MDX like Threads: the lesson text, demos and quiz all live in
// the .mdx files.
const LESSONS = {
  en: { Content: ContentEn, frontmatter: frontmatterEn },
  sv: { Content: ContentSv, frontmatter: frontmatterSv },
};

function Runnables() {
  const { i18n } = useTranslation();
  const lesson =
    LESSONS[i18n.language as keyof typeof LESSONS] || LESSONS.en;

  return <MdxLesson {...lesson} topicKey="runnables" />;
}

export default Runnables;
