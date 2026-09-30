import { useTranslation } from "react-i18next";
import AsyncThunkDemo from "../../components/demos/redux-demos/AsyncThunkDemo";
import CodeBlock from "../../components/CodeBlock";
import DataFlowDemo from "../../components/demos/redux-demos/DataFlowDemo";
import DevToolsDemo from "../../components/demos/redux-demos/DevToolsDemo";
import EntityAdapterDemo from "../../components/demos/redux-demos/EntityAdapterDemo";
import ExtraReducersDemo from "../../components/demos/redux-demos/ExtraReducersDemo";
import HooksSeparationDemo from "../../components/demos/redux-demos/HooksSeparationDemo";
import LearningTopicLayout from "../../components/LearningTopicLayout";
import MemoizedSelectorsDemo from "../../components/demos/redux-demos/MemoizedSelectorsDemo";
import MiddlewareDemo from "../../components/demos/redux-demos/MiddlewareDemo";
import PayloadPreparationDemo from "../../components/demos/redux-demos/PayloadPreparationDemo";
import PerformancePatternsDemo from "../../components/demos/redux-demos/PerformancePatternsDemo";
import reduxContentEn from "../../data/en/learning/reduxContent.json";
import reduxContentSv from "../../data/sv/learning/reduxContent.json";
import RtkQueryDemo from "../../components/demos/redux-demos/RtkQueryDemo";
import SliceActionLogDemo from "../../components/demos/redux-demos/SliceActionLogDemo";
import StoreCounterDemo from "../../components/demos/redux-demos/StoreCounterDemo";

const CONTENT_MAP = {
  en: reduxContentEn,
  sv: reduxContentSv,
};

function Redux() {
  const { i18n } = useTranslation();
  const reduxContent = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  // Maps each practice topic (by title, from reduxContent.json) to a live,
  // interactive demo. Keeping this separate from the JSON data means the
  // content stays data-driven while the runnable examples stay real code.
  const practiceDemos = {
    [reduxContent.practiceTopics[0].title]: StoreCounterDemo,
    [reduxContent.practiceTopics[1].title]: SliceActionLogDemo,
    [reduxContent.practiceTopics[2].title]: HooksSeparationDemo,
    [reduxContent.practiceTopics[3].title]: AsyncThunkDemo,
    [reduxContent.practiceTopics[4].title]: MiddlewareDemo,
    [reduxContent.practiceTopics[5].title]: MemoizedSelectorsDemo,
    [reduxContent.practiceTopics[6].title]: ExtraReducersDemo,
    [reduxContent.practiceTopics[7].title]: PayloadPreparationDemo,
    [reduxContent.practiceTopics[8].title]: EntityAdapterDemo,
    [reduxContent.practiceTopics[9].title]: RtkQueryDemo,
    [reduxContent.practiceTopics[10].title]: DevToolsDemo,
    [reduxContent.practiceTopics[11].title]: PerformancePatternsDemo,
  };

  return (
    <LearningTopicLayout
      title={reduxContent.title}
      introduction={reduxContent.introduction}
      coreConcepts={reduxContent.coreConcepts}
      sections={[
        {
          description:
            "Every Redux update follows the same one-way cycle: the UI dispatches an action, the store runs the reducer to calculate a new state, and the UI reads that new state.",
          content: <DataFlowDemo />,
        },
        {
          heading: reduxContent.toolkit.heading,
          description: reduxContent.toolkit.description,
          content: (
            <CodeBlock>{`// configureStore replaces createStore + manual middleware setup
const store = configureStore({
  reducer: { counter: counterReducer },
});

// createSlice replaces hand-written action types, action
// creators, and a switch-statement reducer
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    incremented: (state) => { state.value += 1 },
  },
});`}</CodeBlock>
          ),
        },
      ]}
      fullExample={reduxContent.fullExample}
      gettingStarted={reduxContent.gettingStarted}
      practiceTopics={reduxContent.practiceTopics}
      practiceDemos={practiceDemos}
      topicKey="redux"
    />
  );
}

export default Redux;
