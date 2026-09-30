import { useTranslation } from "react-i18next";
import learningContentEn from "../data/en/learningContent.json";
import cheatSheetsEn from "../data/en/cheatsheets.json";
import javaBackendEn from "../data/en/javaBackend.json";
import learningContentSv from "../data/sv/learningContent.json";
import cheatSheetsSv from "../data/sv/cheatsheets.json";
import javaBackendSv from "../data/sv/javaBackend.json";
import Reveal from "../components/motion/Reveal";
import TextReveal from "../components/motion/TextReveal";
import TopicCard from "../components/TopicCard";
import { useProgress } from "../context/ProgressContext";
import HeroGlow from "../components/motion/HeroGlow";
import ProgressRing from "../components/ProgressRing";

const CONTENT_MAP = {
  en: {
    learning: learningContentEn,
    cheatsheets: cheatSheetsEn,
    javaBackend: javaBackendEn,
  },
  sv: {
    learning: learningContentSv,
    cheatsheets: cheatSheetsSv,
    javaBackend: javaBackendSv,
  },
};

function Main() {
  const { isTopicDone } = useProgress();
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language;
  const learningContent =
    CONTENT_MAP[currentLang]?.learning || CONTENT_MAP.en.learning;
  const cheatSheets =
    CONTENT_MAP[currentLang]?.cheatsheets || CONTENT_MAP.en.cheatsheets;
  const javaBackend =
    CONTENT_MAP[currentLang]?.javaBackend || CONTENT_MAP.en.javaBackend;

  // Count only this section's topics as done - getTotalCheckedTopics() is
  // global, and Java Backend topics now have their own done checkboxes too.
  const checkedTopics = learningContent.topics.filter((topic) =>
    isTopicDone(topic.key),
  ).length;
  const totalTopics = learningContent.topics.length;

  return (
    <>
      <section className="flex flex-col items-center text-center py-2 mb-3">
        <HeroGlow />
        <TextReveal
          as="h1"
          text={t("main.title")}
          className="text-4xl mb-2 text-heading"
        />
        <p className="text-lg text-muted w-2/3">{t("main.subtitle")}</p>
      </section>

      <section className="py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl text-heading">{t("main.learningSection")}</h2>
          <div className="flex items-center gap-3">
            <ProgressRing
              completed={checkedTopics}
              total={totalTopics}
              label={`Progress: ${checkedTopics} of ${totalTopics} topics completed`}
            />
            {/* <span className="text-lg text-muted font-semibold hidden sm:inline">
              {checkedTopics} of {totalTopics}
            </span> */}
          </div>
        </div>
        <div className="stagger-children w-full max-w-210 justify-self-center grid grid-cols-1 md:grid-cols-2 gap-8 ">
          {learningContent.topics.map((topic, i) => (
            <Reveal key={topic.id} index={i % 4}>
              <TopicCard topic={topic} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl text-heading">
            {t("main.javaBackendSection")}
          </h2>
          <ProgressRing
            completed={
              javaBackend.topics.filter((topic) => isTopicDone(topic.key))
                .length
            }
            total={javaBackend.topics.length}
            label="Java Backend progress"
          />
        </div>
        <div className="stagger-children w-full max-w-210 justify-self-center grid grid-cols-1 md:grid-cols-2 gap-8">
          {javaBackend.topics.map((topic, i) => (
            <Reveal key={topic.id} index={i % 4}>
              <TopicCard topic={topic} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-8 px-4">
        <h2 className="text-3xl mb-8 text-heading">Cheat Sheets</h2>
        <div className="stagger-children w-full max{t('main.cheatsheetsSection')}fy-self-center grid grid-cols-1 md:grid-cols-2 gap-8 ">
          {cheatSheets.topics.map((topic, i) => (
            <Reveal key={topic.id} index={i % 4}>
              <TopicCard topic={topic} isCheatSheet={true} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

export default Main;
