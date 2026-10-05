import { useTranslation } from "react-i18next";
import MdxLesson from "../../components/mdx/MdxLesson";
import ContentEn, {
  frontmatter as frontmatterEn,
} from "../../data/en/learning/jdbc.mdx";
import ContentSv, {
  frontmatter as frontmatterSv,
} from "../../data/sv/learning/jdbc.mdx";

// Written as MDX like Threads, Runnables, Collections and Stream API: the
// lesson text, demos and quiz all live in the .mdx files.
const LESSONS = {
  en: { Content: ContentEn, frontmatter: frontmatterEn },
  sv: { Content: ContentSv, frontmatter: frontmatterSv },
};

function Jdbc() {
  const { i18n } = useTranslation();
  const lesson =
    LESSONS[i18n.language as keyof typeof LESSONS] || LESSONS.en;

  return <MdxLesson {...lesson} topicKey="jdbc" />;
}

export default Jdbc;
