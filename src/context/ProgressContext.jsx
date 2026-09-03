import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCookie, setCookie } from "../utils/cookies";
import javascriptContent from "../data/en/learning/javascriptContent.json";
import typescriptContent from "../data/en/learning/typescriptContent.json";
import gitContent from "../data/en/learning/gitContent.json";
import httpContent from "../data/en/learning/httpContent.json";
import nodeContent from "../data/en/learning/nodeContent.json";
import reactContent from "../data/en/learning/reactContent.json";
import reduxContent from "../data/en/learning/reduxContent.json";
import testingContent from "../data/en/learning/testingContent.json";
import expressContent from "../data/en/learning/expressContent.json";
import authContent from "../data/en/learning/authContent.json";
import webSocketsContent from "../data/en/learning/webSocketsContent.json";
import deploymentContent from "../data/en/learning/deploymentContent.json";
import dockerContent from "../data/en/learning/dockerContent.json";

// Map topic keys to their learning content (to access practice topics)
const CONTENT_BY_KEY = {
  javascript: javascriptContent,
  typescript: typescriptContent,
  git: gitContent,
  http: httpContent,
  node: nodeContent,
  react: reactContent,
  redux: reduxContent,
  testing: testingContent,
  express: expressContent,
  auth: authContent,
  websockets: webSocketsContent,
  deployment: deploymentContent,
  docker: dockerContent,
};

// Everything the user has checked off lives in a single cookie, so
// progress survives a refresh (and a new tab) without any backend.
const COOKIE_NAME = "learningToolProgress";
const EMPTY_PROGRESS = { topics: {}, subtopics: {} };

function readProgressFromCookie() {
  const raw = getCookie(COOKIE_NAME);
  if (!raw) return EMPTY_PROGRESS;

  try {
    const parsed = JSON.parse(raw);
    return {
      topics: parsed.topics ?? {},
      subtopics: parsed.subtopics ?? {},
    };
  } catch {
    // Malformed/old cookie - fall back to a clean slate instead of crashing.
    return EMPTY_PROGRESS;
  }
}

const ProgressContext = createContext(null);

/**
 * Tracks which topics (home page cards) and sub-topics (the practice
 * topics/demos inside each lesson) the user has checked off. State is
 * kept in memory and mirrored to a cookie on every change.
 */
export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(readProgressFromCookie);

  useEffect(() => {
    setCookie(COOKIE_NAME, JSON.stringify(progress));
  }, [progress]);

  const toggleTopic = useCallback((topicKey) => {
    if (!topicKey) return;
    setProgress((prev) => ({
      ...prev,
      topics: { ...prev.topics, [topicKey]: !prev.topics[topicKey] },
    }));
  }, []);

  const toggleTopicWithSubtopics = useCallback((topicKey) => {
    if (!topicKey) return;
    setProgress((prev) => {
      const newTopicState = !prev.topics[topicKey];
      const content = CONTENT_BY_KEY[topicKey];
      const practiceTopics = content?.practiceTopics || [];

      // If toggling ON, mark all subtopics as done
      // If toggling OFF, remove all subtopics
      const newSubtopics = { ...prev.subtopics[topicKey] };
      practiceTopics.forEach((topic) => {
        newSubtopics[topic.title] = newTopicState;
      });

      return {
        ...prev,
        topics: { ...prev.topics, [topicKey]: newTopicState },
        subtopics: {
          ...prev.subtopics,
          [topicKey]: newSubtopics,
        },
      };
    });
  }, []);

  const toggleSubtopic = useCallback((topicKey, subtopicTitle) => {
    if (!topicKey || !subtopicTitle) return;
    setProgress((prev) => {
      const topicSubtopics = prev.subtopics[topicKey] ?? {};
      return {
        ...prev,
        subtopics: {
          ...prev.subtopics,
          [topicKey]: {
            ...topicSubtopics,
            [subtopicTitle]: !topicSubtopics[subtopicTitle],
          },
        },
      };
    });
  }, []);

  const isTopicDone = useCallback(
    (topicKey) => Boolean(progress.topics[topicKey]),
    [progress.topics],
  );

  const isSubtopicDone = useCallback(
    (topicKey, subtopicTitle) =>
      Boolean(progress.subtopics[topicKey]?.[subtopicTitle]),
    [progress.subtopics],
  );

  // Number of checked-off sub-topics for a given topic - handy for showing
  // "3 sub-topics done" on the home page card without needing to know the
  // total up front.
  const getTopicSubtopicCount = useCallback(
    (topicKey) => {
      const topicSubtopics = progress.subtopics[topicKey];
      if (!topicSubtopics) return 0;
      return Object.values(topicSubtopics).filter(Boolean).length;
    },
    [progress.subtopics],
  );

  // Total number of checked main topics
  const getTotalCheckedTopics = useCallback(() => {
    return Object.values(progress.topics).filter(Boolean).length;
  }, [progress.topics]);

  const resetProgress = useCallback(() => {
    setProgress(EMPTY_PROGRESS);
  }, []);

  const value = useMemo(
    () => ({
      isTopicDone,
      toggleTopic,
      toggleTopicWithSubtopics,
      isSubtopicDone,
      toggleSubtopic,
      getTopicSubtopicCount,
      getTotalCheckedTopics,
      resetProgress,
    }),
    [
      isTopicDone,
      toggleTopic,
      toggleTopicWithSubtopics,
      isSubtopicDone,
      toggleSubtopic,
      getTopicSubtopicCount,
      getTotalCheckedTopics,
      resetProgress,
    ],
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
