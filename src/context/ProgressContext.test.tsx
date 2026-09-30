import { act, renderHook } from "@testing-library/react";
import { ProgressProvider, useProgress } from "./ProgressContext";
import gitContent from "../data/en/learning/gitContent.json";
import { setCookie } from "../utils/cookies";

const COOKIE_NAME = "learningToolProgress";

function renderProgress() {
  return renderHook(() => useProgress(), { wrapper: ProgressProvider });
}

describe("ProgressContext", () => {
  it("throws if useProgress is used outside a ProgressProvider", () => {
    // Suppress the expected React error log for this one assertion.
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useProgress())).toThrow(
      "useProgress must be used within a ProgressProvider",
    );
    spy.mockRestore();
  });

  it("starts with nothing checked off", () => {
    const { result } = renderProgress();
    expect(result.current.isTopicDone("git")).toBe(false);
    expect(result.current.getTopicSubtopicCount("git")).toBe(0);
    expect(result.current.getTotalCheckedTopics()).toBe(0);
  });

  it("toggleTopic flips a single topic's done state", () => {
    const { result } = renderProgress();

    act(() => result.current.toggleTopic("git"));
    expect(result.current.isTopicDone("git")).toBe(true);
    expect(result.current.getTotalCheckedTopics()).toBe(1);

    act(() => result.current.toggleTopic("git"));
    expect(result.current.isTopicDone("git")).toBe(false);
    expect(result.current.getTotalCheckedTopics()).toBe(0);
  });

  it("toggleSubtopic flips one practice topic without affecting others", () => {
    const { result } = renderProgress();
    const [firstTitle, secondTitle] = gitContent.practiceTopics.map(
      (t) => t.title,
    );

    act(() => result.current.toggleSubtopic("git", firstTitle));

    expect(result.current.isSubtopicDone("git", firstTitle)).toBe(true);
    expect(result.current.isSubtopicDone("git", secondTitle)).toBe(false);
    expect(result.current.getTopicSubtopicCount("git")).toBe(1);
  });

  it("toggleTopicWithSubtopics marks every practice topic done at once", () => {
    const { result } = renderProgress();

    act(() => result.current.toggleTopicWithSubtopics("git"));

    expect(result.current.isTopicDone("git")).toBe(true);
    expect(result.current.getTopicSubtopicCount("git")).toBe(
      gitContent.practiceTopics.length,
    );

    // Toggling again clears the topic AND every one of its sub-topics.
    act(() => result.current.toggleTopicWithSubtopics("git"));
    expect(result.current.isTopicDone("git")).toBe(false);
    expect(result.current.getTopicSubtopicCount("git")).toBe(0);
  });

  it("resetProgress clears every topic and sub-topic", () => {
    const { result } = renderProgress();

    act(() => {
      result.current.toggleTopic("git");
      result.current.toggleSubtopic("git", gitContent.practiceTopics[0].title);
    });
    expect(result.current.getTotalCheckedTopics()).toBe(1);

    act(() => result.current.resetProgress());

    expect(result.current.getTotalCheckedTopics()).toBe(0);
    expect(result.current.getTopicSubtopicCount("git")).toBe(0);
  });

  it("persists changes to the learningToolProgress cookie", () => {
    const { result } = renderProgress();
    act(() => result.current.toggleTopic("react"));

    expect(document.cookie).toContain(COOKIE_NAME);
  });

  it("picks up progress that was already saved in the cookie", () => {
    setCookie(
      COOKIE_NAME,
      JSON.stringify({ topics: { react: true }, subtopics: {} }),
    );

    const { result } = renderProgress();
    expect(result.current.isTopicDone("react")).toBe(true);
    expect(result.current.isTopicDone("git")).toBe(false);
  });

  it("falls back to empty progress if the cookie is malformed", () => {
    setCookie(COOKIE_NAME, "{not valid json");

    const { result } = renderProgress();
    expect(result.current.getTotalCheckedTopics()).toBe(0);
  });
});
