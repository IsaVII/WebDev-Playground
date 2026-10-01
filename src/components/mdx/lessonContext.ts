import { createContext, useContext } from "react";

/** What the lesson's MDX components need to know about the page they're on. */
interface LessonContextValue {
  /** Progress-tracking key, e.g. "threads". */
  topicKey: string;
}

export const LessonContext = createContext<LessonContextValue>({ topicKey: "" });

export function useLesson() {
  return useContext(LessonContext);
}
