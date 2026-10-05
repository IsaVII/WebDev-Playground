import {
  createContext,
  type ReactNode,
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
import paymentsContent from "../data/en/learning/paymentsContent.json";
import diagramsContent from "../data/en/learning/diagramsContent.json";
import streamsContent from "../data/en/learning/streamsContent.json";
import springContent from "../data/en/learning/springContent.json";
import heapStackContent from "../data/en/learning/heapStackContent.json";
import threadsFrontmatter from "../data/en/learning/threads.mdx?frontmatter";
import runnablesFrontmatter from "../data/en/learning/runnables.mdx?frontmatter";
import collectionsFrontmatter from "../data/en/learning/collections.mdx?frontmatter";
import { lessonMeta } from "../utils/lessonMeta";

// Lessons written as MDX contribute just their frontmatter (practice topics).
const threadsContent = lessonMeta(threadsFrontmatter);
const runnablesContent = lessonMeta(runnablesFrontmatter);
const collectionsContent = lessonMeta(collectionsFrontmatter);

// Map topic keys to their learning content (to access practice topics)
const CONTENT_BY_KEY: Record<string, { practiceTopics?: { title: string }[] }> = {
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
  payments: paymentsContent,
  diagrams: diagramsContent,
  streams: streamsContent,
  spring: springContent,
  heapstack: heapStackContent,
  threads: threadsContent,
  runnables: runnablesContent,
  collections: collectionsContent,
};

// Everything the user has checked off lives in a single cookie, so
// progress survives a refresh (and a new tab) without any backend.
const COOKIE_NAME = "learningToolProgress";
type Progress = {
  topics: Record<string, boolean>;
  subtopics: Record<string, Record<string, boolean>>;
};

const EMPTY_PROGRESS: Progress = { topics: {}, subtopics: {} };

function readProgressFromCookie(): Progress {
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

type ProgressContextValue = {
  isTopicDone: (topicKey: string) => boolean;
  toggleTopic: (topicKey: string) => void;
  toggleTopicWithSubtopics: (topicKey: string) => void;
  isSubtopicDone: (topicKey: string, subtopicTitle: string) => boolean;
  toggleSubtopic: (topicKey: string, subtopicTitle: string) => void;
  getTopicSubtopicCount: (topicKey: string) => number;
  getTotalCheckedTopics: () => number;
  resetProgress: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

/**
 * Tracks which topics (home page cards) and sub-topics (the practice
 * topics/demos inside each lesson) the user has checked off. State is
 * kept in memory and mirrored to a cookie on every change.
 */
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(readProgressFromCookie);

  useEffect(() => {
    setCookie(COOKIE_NAME, JSON.stringify(progress));
  }, [progress]);

  const toggleTopic = useCallback((topicKey: string) => {
    if (!topicKey) return;
    setProgress((prev) => ({
      ...prev,
      topics: { ...prev.topics, [topicKey]: !prev.topics[topicKey] },
    }));
  }, []);

  const toggleTopicWithSubtopics = useCallback((topicKey: string) => {
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

  const toggleSubtopic = useCallback((topicKey: string, subtopicTitle: string) => {
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
    (topicKey: string) => Boolean(progress.topics[topicKey]),
    [progress.topics],
  );

  const isSubtopicDone = useCallback(
    (topicKey: string, subtopicTitle: string) =>
      Boolean(progress.subtopics[topicKey]?.[subtopicTitle]),
    [progress.subtopics],
  );

  // Number of checked-off sub-topics for a given topic - handy for showing
  // "3 sub-topics done" on the home page card without needing to know the
  // total up front.
  const getTopicSubtopicCount = useCallback(
    (topicKey: string) => {
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
