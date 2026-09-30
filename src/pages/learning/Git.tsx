import { useTranslation } from "react-i18next";
import BranchMergeDemo from "../../components/demos/git-demos/BranchMergeDemo";
import CherryPickDemo from "../../components/demos/git-demos/CherryPickDemo";
import CloneRemoteDemo from "../../components/demos/git-demos/CloneRemoteDemo";
import ConflictResolutionDemo from "../../components/demos/git-demos/ConflictResolutionDemo";
import gitContentEn from "../../data/en/learning/gitContent.json";
import gitContentSv from "../../data/sv/learning/gitContent.json";
import GitignoreDemo from "../../components/demos/git-demos/GitignoreDemo";
import LearningTopicLayout from "../../components/LearningTopicLayout";
import RebaseDemo from "../../components/demos/git-demos/RebaseDemo";
import ResetRevertDemo from "../../components/demos/git-demos/ResetRevertDemo";
import StagingCommitDemo from "../../components/demos/git-demos/StagingCommitDemo";
import StashDemo from "../../components/demos/git-demos/StashDemo";

const CONTENT_MAP = {
  en: gitContentEn,
  sv: gitContentSv,
};

function Git() {
  const { i18n } = useTranslation();
  const gitContent = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  // Maps each practice topic (by title, from gitContent.json) to a live,
  // interactive demo. Keeping this separate from the JSON data means the
  // content stays data-driven while the runnable examples stay real code.
  const practiceDemos = {
    [gitContent.practiceTopics[0].title]: CloneRemoteDemo,
    [gitContent.practiceTopics[1].title]: StagingCommitDemo,
    [gitContent.practiceTopics[2].title]: BranchMergeDemo,
    [gitContent.practiceTopics[3].title]: RebaseDemo,
    [gitContent.practiceTopics[4].title]: StashDemo,
    [gitContent.practiceTopics[5].title]: ResetRevertDemo,
    [gitContent.practiceTopics[6].title]: CherryPickDemo,
    [gitContent.practiceTopics[7].title]: ConflictResolutionDemo,
    [gitContent.practiceTopics[8].title]: GitignoreDemo,
  };

  return (
    <LearningTopicLayout
      title={gitContent.title}
      introduction={gitContent.introduction}
      coreConcepts={gitContent.coreConcepts}
      sections={[
        {
          heading: gitContent.threeStates.heading,
          description: gitContent.threeStates.description,
        },
      ]}
      fullExample={gitContent.fullExample}
      gettingStarted={gitContent.gettingStarted}
      practiceTopics={gitContent.practiceTopics}
      practiceDemos={practiceDemos}
      topicKey="git"
    />
  );
}

export default Git;
