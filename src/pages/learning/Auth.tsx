import { useTranslation } from "react-i18next";
import authContentEn from "../../data/en/learning/authContent.json";
import authContentSv from "../../data/sv/learning/authContent.json";
import AuthFlowDemo from "../../components/demos/auth-demos/AuthFlowDemo";
import JwtDemo from "../../components/demos/auth-demos/JwtDemo";
import LearningTopicLayout from "../../components/LearningTopicLayout";
import OAuthDemo from "../../components/demos/auth-demos/OAuthDemo";
import PasswordHashingDemo from "../../components/demos/auth-demos/PasswordHashingDemo";
import ProtectedRouteDemo from "../../components/demos/auth-demos/ProtectedRouteDemo";
import RbacDemo from "../../components/demos/auth-demos/RbacDemo";
import SessionsDemo from "../../components/demos/auth-demos/SessionsDemo";

const CONTENT_MAP = {
  en: authContentEn,
  sv: authContentSv,
};

function Auth() {
  const { i18n } = useTranslation();
  const authContent = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  // Maps each practice topic (by title, from authContent.json) to a live,
  // interactive demo. Keeping this separate from the JSON data means the
  // content stays data-driven while the runnable examples stay real code.
  const practiceDemos = {
    [authContent.practiceTopics[0].title]: PasswordHashingDemo,
    [authContent.practiceTopics[1].title]: SessionsDemo,
    [authContent.practiceTopics[2].title]: JwtDemo,
    [authContent.practiceTopics[3].title]: ProtectedRouteDemo,
    [authContent.practiceTopics[4].title]: RbacDemo,
    [authContent.practiceTopics[5].title]: OAuthDemo,
  };

  return (
    <LearningTopicLayout
      title={authContent.title}
      introduction={authContent.introduction}
      coreConcepts={authContent.coreConcepts}
      sections={[
        {
          heading: authContent.flow.heading,
          description: authContent.flow.description,
          content: <AuthFlowDemo />,
        },
      ]}
      fullExample={authContent.fullExample}
      gettingStarted={authContent.gettingStarted}
      practiceTopics={authContent.practiceTopics}
      practiceDemos={practiceDemos}
      topicKey="auth"
    />
  );
}

export default Auth;
