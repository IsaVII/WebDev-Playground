import { useTranslation } from "react-i18next";
import MdxLesson from "../../components/mdx/MdxLesson";
import ContentEn, {
  frontmatter as frontmatterEn,
} from "../../data/en/learning/threads.mdx";
import ContentSv, {
  frontmatter as frontmatterSv,
} from "../../data/sv/learning/threads.mdx";

// Unlike the other lessons (JSON + LearningTopicLayout), this one is written
// as MDX: the lesson text, demos and quiz all live in the .mdx files.
const LESSONS = {
  en: { Content: ContentEn, frontmatter: frontmatterEn },
  sv: { Content: ContentSv, frontmatter: frontmatterSv },
};

function Threads() {
  const { i18n } = useTranslation();
  const lesson =
    LESSONS[i18n.language as keyof typeof LESSONS] || LESSONS.en;

  return <MdxLesson {...lesson} topicKey="threads" />;
}

export default Threads;
