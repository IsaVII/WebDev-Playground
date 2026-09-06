import{n as e}from"./rolldown-runtime-CbXtAM7H.js";import{a as t,c as n,i as r}from"./TextReveal-BmuH47v_.js";import{E as i,F as a,I as o,L as s,N as c,P as l,d as u,n as d,t as f}from"./index-Bd2BiPaS.js";import{i as p}from"./codeExamples-CXNQ3VSk.js";import{t as m}from"./LearningTopicLayout-jENjC6Rj.js";var h=r();function g(){let{value:e,status:t}=d(e=>e.asyncValue),n=f(),r=t===`loading`;return(0,h.jsxs)(`div`,{className:`bg-surface-alt border border-line rounded p-6`,children:[(0,h.jsxs)(`p`,{className:`text-muted mb-4`,children:[`Dispatching this thunk immediately fires a `,(0,h.jsx)(`code`,{children:`pending`}),` action, then a `,(0,h.jsx)(`code`,{children:`fulfilled`}),` action once the simulated request resolves - all without the component managing any loading state itself.`]}),(0,h.jsxs)(`div`,{className:`flex items-center gap-4 mb-4`,children:[(0,h.jsx)(`button`,{onClick:()=>n(l()),disabled:r,className:`bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50`,children:r?`Loading...`:`Fetch random value`}),(0,h.jsx)(`span`,{className:`text-2xl font-bold text-heading-alt tabular-nums`,children:t===`succeeded`?e:`—`})]}),(0,h.jsx)(p,{children:`export const fetchRandomValue = createAsyncThunk(
  "asyncValue/fetchRandomValue",
  async () => {
    const response = await fetch("/api/random");
    return response.json();
  },
);

// handled automatically in the slice:
builder.addCase(fetchRandomValue.pending, (state) => {
  state.status = "loading";
});
builder.addCase(fetchRandomValue.fulfilled, (state, action) => {
  state.status = "succeeded";
  state.value = action.payload;
});`})]})}function _(){let e=d(e=>e.like.count),t=f();return(0,h.jsxs)(`div`,{className:`bg-surface-alt border border-line rounded p-6`,children:[(0,h.jsxs)(`p`,{className:`text-muted mb-4`,children:[`Clicking the button dispatches a plain action object. The store runs the reducer, calculates the new state, and this component re-renders because it reads that state with `,(0,h.jsx)(`code`,{children:`useSelector`}),`.`]}),(0,h.jsxs)(`div`,{className:`flex items-center gap-4 mb-4`,children:[(0,h.jsx)(`button`,{onClick:()=>t(c()),className:`bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity`,children:`Like ❤️`}),(0,h.jsx)(`span`,{className:`text-3xl font-bold text-heading-alt tabular-nums`,children:e})]}),(0,h.jsx)(p,{children:`// 1. UI dispatches an action
dispatch({ type: "like/liked" });

// 2. Reducer calculates new state
liked: (state) => { state.count += 1 }

// 3. Component reads the new state
const count = useSelector(state => state.like.count);`})]})}var v=e(n(),1);function y(){let[e,t]=(0,v.useState)([{type:`@@INIT`,timestamp:`00:00.000`}]),[n,r]=(0,v.useState)(0),i=()=>{let n={type:`counter/incremented`,timestamp:new Date().toTimeString().slice(0,8)};t(e=>[...e,n]),r(e.length)},a=e=>{r(e)};return(0,h.jsxs)(`div`,{className:`bg-surface-alt border border-line rounded p-6`,children:[(0,h.jsx)(`p`,{className:`text-muted mb-4`,children:`The Redux DevTools Extension gives you superpowers: inspect every action and state change, time-travel backward and forward through your app's history, and export/import state for debugging.`}),(0,h.jsx)(`button`,{onClick:i,className:`bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity mb-4`,children:`Dispatch Action`}),(0,h.jsxs)(`div`,{className:`grid grid-cols-2 gap-4 mb-4`,children:[(0,h.jsxs)(`div`,{className:`bg-surface border border-line rounded p-4`,children:[(0,h.jsx)(`div`,{className:`text-accent text-sm mb-3`,children:`Action History:`}),(0,h.jsx)(`div`,{className:`max-h-40 overflow-y-auto space-y-1`,children:e.map((e,t)=>(0,h.jsxs)(`div`,{onClick:()=>a(t),className:`text-xs p-2 rounded cursor-pointer transition-colors ${t===n?`bg-accent text-white`:`bg-surface-alt text-heading hover:bg-surface`}`,children:[(0,h.jsx)(`div`,{className:`font-mono`,children:e.type}),(0,h.jsx)(`div`,{className:`text-muted text-[10px]`,children:e.timestamp})]},t))})]}),(0,h.jsxs)(`div`,{className:`bg-surface border border-line rounded p-4`,children:[(0,h.jsxs)(`div`,{className:`text-accent text-sm mb-3`,children:[`Current State (Action #`,n,`):`]}),(0,h.jsx)(`pre`,{className:`text-xs text-heading-alt font-mono overflow-x-auto`,children:`{
  counter: {
    value: ${n}
  },
  user: {
    isLoggedIn: false
  }
}`})]})]}),(0,h.jsx)(p,{children:`// DevTools are enabled by default with configureStore
const store = configureStore({
  reducer: { counter: counterReducer },
  // DevTools automatically included
});

// Install the browser extension:
// Chrome: Redux DevTools
// Firefox: Redux DevTools

// Features:
// - Inspect every action and resulting state
// - Time-travel: jump to any previous action
// - Diff view: see what changed between states
// - Export/import state for bug reports
// - Trace: see which component dispatched an action
// - Skip/block actions for testing`})]})}function b(){let[e,t]=(0,v.useState)({ids:[1,2,3],entities:{1:{id:1,name:`Alice`,status:`online`},2:{id:2,name:`Bob`,status:`offline`},3:{id:3,name:`Charlie`,status:`online`}}}),n=()=>{let n=Math.max(...e.ids)+1,r={id:n,name:`User ${n}`,status:`online`};t({ids:[...e.ids,n],entities:{...e.entities,[n]:r}})},r=n=>{let{[n]:r,...i}=e.entities;t({ids:e.ids.filter(e=>e!==n),entities:i})},i=n=>{t({...e,entities:{...e.entities,[n]:{...e.entities[n],status:e.entities[n].status===`online`?`offline`:`online`}}})};return(0,h.jsxs)(`div`,{className:`bg-surface-alt border border-line rounded p-6`,children:[(0,h.jsxs)(`p`,{className:`text-muted mb-4`,children:[(0,h.jsx)(`code`,{children:`createEntityAdapter`}),` manages normalized collections by ID. Instead of searching arrays, entities are stored in an object keyed by ID for O(1) lookups, with a separate array of IDs for ordering.`]}),(0,h.jsx)(`button`,{onClick:n,className:`bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity mb-4`,children:`Add User`}),(0,h.jsxs)(`div`,{className:`bg-surface border border-line rounded p-4 mb-4 max-h-60 overflow-y-auto`,children:[(0,h.jsxs)(`div`,{className:`text-accent text-sm mb-3`,children:[`Normalized State (ids: [`,e.ids.join(`, `),`]):`]}),e.ids.map(t=>{let n=e.entities[t];return(0,h.jsxs)(`div`,{className:`flex justify-between items-center mb-2 pb-2 border-b border-line last:border-0`,children:[(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`span`,{className:`text-heading-alt font-medium`,children:n.name}),(0,h.jsx)(`span`,{className:`ml-2 text-xs px-2 py-1 rounded ${n.status===`online`?`bg-green-500/20 text-green-400`:`bg-gray-500/20 text-gray-400`}`,children:n.status})]}),(0,h.jsxs)(`div`,{className:`flex gap-2`,children:[(0,h.jsx)(`button`,{onClick:()=>i(t),className:`text-xs bg-surface border border-line px-2 py-1 rounded hover:border-accent`,children:`Toggle`}),(0,h.jsx)(`button`,{onClick:()=>r(t),className:`text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded hover:bg-red-500/30`,children:`Remove`})]})]},t)})]}),(0,h.jsx)(p,{children:`import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();
// Generates: { ids: [], entities: {} }

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    userAdded: usersAdapter.addOne,
    userRemoved: usersAdapter.removeOne,
    userUpdated: usersAdapter.updateOne,
    usersReceived: usersAdapter.setAll,
  },
});

// Auto-generated selectors
const selectors = usersAdapter.getSelectors((state) => state.users);
const allUsers = selectors.selectAll(state); // Array in ID order
const userById = selectors.selectById(state, userId); // O(1) lookup`})]})}function x(){let e=d(e=>e.counter.value),t=d(e=>e.activityLog.entries),n=f(),r=t.slice(-3);return(0,h.jsxs)(`div`,{className:`bg-surface-alt border border-line rounded p-6`,children:[(0,h.jsxs)(`p`,{className:`text-muted mb-4`,children:[`A slice can listen to actions from `,(0,h.jsx)(`em`,{children:`other`}),` slices using`,` `,(0,h.jsx)(`code`,{children:`extraReducers`}),`. This lets one action update multiple parts of state without coupling the slices together.`]}),(0,h.jsxs)(`div`,{className:`flex items-center gap-4 mb-4`,children:[(0,h.jsx)(`button`,{onClick:()=>n(o()),className:`bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity`,children:`Increment Counter`}),(0,h.jsx)(`span`,{className:`text-2xl font-bold text-heading-alt tabular-nums`,children:e})]}),(0,h.jsxs)(`div`,{className:`bg-surface border border-line rounded p-4 mb-4`,children:[(0,h.jsx)(`div`,{className:`text-accent text-sm mb-2`,children:`Activity Log (listening to counter actions):`}),r.length===0?(0,h.jsx)(`div`,{className:`text-muted text-sm`,children:`No activity yet...`}):r.map((e,t)=>(0,h.jsxs)(`div`,{className:`text-heading-alt text-sm mb-1 font-mono`,children:[`[`,e.timestamp,`] `,e.action]},t))]}),(0,h.jsx)(p,{children:`// activityLogSlice.js listens to actions from counterSlice
import { incremented } from './counterSlice';

const activityLogSlice = createSlice({
  name: 'activityLog',
  initialState: { entries: [] },
  reducers: {},
  extraReducers: (builder) => {
    // Listen to another slice's action
    builder.addCase(incremented, (state, action) => {
      state.entries.push({
        action: action.type,
        timestamp: new Date().toISOString(),
      });
    });
  },
});`})]})}function S(){let e=d(e=>e.counter.value);return(0,h.jsxs)(`div`,{className:`bg-surface rounded p-4 border border-line flex-1 min-w-[120px]`,children:[(0,h.jsx)(`p`,{className:`text-sm text-subtle mb-1`,children:`useSelector only`}),(0,h.jsx)(`p`,{className:`text-2xl font-bold text-heading-alt tabular-nums`,children:e})]})}function C(){let e=f();return(0,h.jsxs)(`div`,{className:`flex items-center gap-3 flex-1 min-w-[120px]`,children:[(0,h.jsx)(`p`,{className:`text-sm text-subtle mr-1`,children:`useDispatch only`}),(0,h.jsx)(`button`,{onClick:()=>e(a()),className:`bg-surface border border-line text-heading w-10 h-10 rounded hover:border-accent transition-colors`,children:`−`}),(0,h.jsx)(`button`,{onClick:()=>e(o()),className:`bg-accent text-white w-10 h-10 rounded hover:opacity-90 transition-opacity`,children:`+`})]})}function w(){return(0,h.jsxs)(`div`,{className:`bg-surface-alt border border-line rounded p-6`,children:[(0,h.jsxs)(`p`,{className:`text-muted mb-4`,children:[(0,h.jsx)(`code`,{children:`ValueDisplay`}),` and `,(0,h.jsx)(`code`,{children:`Controls`}),` share no props at all - each connects to the same store independently through its own hook, yet clicking a button in one updates the other.`]}),(0,h.jsxs)(`div`,{className:`flex flex-wrap gap-4 mb-4`,children:[(0,h.jsx)(S,{}),(0,h.jsx)(C,{})]}),(0,h.jsx)(p,{children:`function ValueDisplay() {
  const value = useSelector(state => state.counter.value);
  return <p>{value}</p>;
}

function Controls() {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(incremented())}>+</button>;
}`})]})}function T(){let[e,t]=(0,v.useState)(0),n=d(e=>e.activityLog.entries.filter(e=>e.action.includes(`incremented`)).map(e=>e.action)),r=d(e=>e.activityLog.entries),i=(0,v.useMemo)(()=>r.filter(e=>e.action.includes(`incremented`)).map(e=>e.action),[r]);return(0,v.useMemo)(()=>{t(e=>e+1)},[n]),(0,h.jsxs)(`div`,{className:`bg-surface-alt border border-line rounded p-6`,children:[(0,h.jsxs)(`p`,{className:`text-muted mb-4`,children:[`Selectors that return new arrays or objects on every call cause unnecessary re-renders. Use `,(0,h.jsx)(`code`,{children:`createSelector`}),` from Reselect or`,` `,(0,h.jsx)(`code`,{children:`useMemo`}),` to memoize expensive computations.`]}),(0,h.jsxs)(`div`,{className:`bg-surface border border-line rounded p-4 mb-4`,children:[(0,h.jsxs)(`div`,{className:`text-sm mb-2`,children:[(0,h.jsx)(`span`,{className:`text-muted`,children:`Component rendered: `}),(0,h.jsxs)(`span`,{className:`text-accent font-bold`,children:[e,` times`]})]}),(0,h.jsxs)(`div`,{className:`text-sm mb-2`,children:[(0,h.jsx)(`span`,{className:`text-muted`,children:`Filtered actions count: `}),(0,h.jsx)(`span`,{className:`text-heading-alt font-bold`,children:i.length})]})]}),(0,h.jsx)(p,{children:`// ❌ Bad: Returns new array every time, causing re-renders
const selectFiltered = (state) => 
  state.items.filter(item => item.active);

// ✅ Good: Memoized with createSelector (from Reselect)
import { createSelector } from '@reduxjs/toolkit';

const selectItems = (state) => state.items;
const selectActiveItems = createSelector(
  [selectItems],
  (items) => items.filter(item => item.active)
);

// Only recalculates when items array changes reference`})]})}function E(){let[e,t]=(0,v.useState)([]),n=f();return(0,h.jsxs)(`div`,{className:`bg-surface-alt border border-line rounded p-6`,children:[(0,h.jsxs)(`p`,{className:`text-muted mb-4`,children:[`Middleware sits between `,(0,h.jsx)(`code`,{children:`dispatch(action)`}),` and the reducer, intercepting every action. Common uses: logging, crash reporting, talking to an API, or routing based on action types.`]}),(0,h.jsx)(`button`,{onClick:()=>{let e=new Date().toLocaleTimeString(),r=o();t(t=>[...t.slice(-4),{time:e,action:r.type,payload:r.payload??`none`}]),n(r)},className:`bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity mb-4`,children:`Dispatch Action (Watch Logs)`}),(0,h.jsxs)(`div`,{className:`bg-surface border border-line rounded p-4 mb-4 font-mono text-sm`,children:[(0,h.jsx)(`div`,{className:`text-accent mb-2`,children:`Action Log (Middleware Output):`}),e.length===0?(0,h.jsx)(`div`,{className:`text-muted`,children:`No actions dispatched yet...`}):e.map((e,t)=>(0,h.jsxs)(`div`,{className:`text-heading-alt mb-1`,children:[`[`,e.time,`] `,e.action,e.payload!==`none`&&` → ${e.payload}`]},t))]}),(0,h.jsx)(p,{children:`// Custom logging middleware
const logger = (store) => (next) => (action) => {
  console.log('dispatching:', action);
  const result = next(action);
  console.log('next state:', store.getState());
  return result;
};

// Add to store
const store = configureStore({
  reducer: { counter: counterReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});`})]})}var D=(e,t)=>({type:`tasks/taskAdded`,payload:{id:Date.now(),title:e,priority:t,createdAt:new Date().toISOString()}});function O(){let[e,t]=(0,v.useState)(``),[n,r]=(0,v.useState)(`medium`),[i,a]=(0,v.useState)([]);f();let o=()=>{if(!e.trim())return;let r=D(e,n);a(e=>[...e,r.payload]),t(``)};return(0,h.jsxs)(`div`,{className:`bg-surface-alt border border-line rounded p-6`,children:[(0,h.jsxs)(`p`,{className:`text-muted mb-4`,children:[`Action creators can accept multiple arguments and transform them into a standardized payload shape using a `,(0,h.jsx)(`code`,{children:`prepare`}),` callback. This keeps components simple - they just pass raw values.`]}),(0,h.jsxs)(`div`,{className:`flex gap-2 mb-4`,children:[(0,h.jsx)(`input`,{type:`text`,value:e,onChange:e=>t(e.target.value),placeholder:`Task title...`,className:`flex-1 bg-surface border border-line rounded px-3 py-2 text-heading`,onKeyDown:e=>e.key===`Enter`&&o()}),(0,h.jsxs)(`select`,{value:n,onChange:e=>r(e.target.value),className:`bg-surface border border-line rounded px-3 py-2 text-heading`,children:[(0,h.jsx)(`option`,{value:`low`,children:`Low`}),(0,h.jsx)(`option`,{value:`medium`,children:`Medium`}),(0,h.jsx)(`option`,{value:`high`,children:`High`})]}),(0,h.jsx)(`button`,{onClick:o,className:`bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity`,children:`Add`})]}),(0,h.jsx)(`div`,{className:`bg-surface border border-line rounded p-4 mb-4 max-h-40 overflow-y-auto`,children:i.length===0?(0,h.jsx)(`div`,{className:`text-muted text-sm`,children:`No tasks yet...`}):i.map(e=>(0,h.jsxs)(`div`,{className:`text-sm mb-2 pb-2 border-b border-line last:border-0`,children:[(0,h.jsxs)(`div`,{className:`flex justify-between items-start`,children:[(0,h.jsx)(`span`,{className:`text-heading-alt font-medium`,children:e.title}),(0,h.jsx)(`span`,{className:`text-xs px-2 py-1 rounded ${e.priority===`high`?`bg-red-500/20 text-red-400`:e.priority===`medium`?`bg-yellow-500/20 text-yellow-400`:`bg-blue-500/20 text-blue-400`}`,children:e.priority})]}),(0,h.jsxs)(`div`,{className:`text-muted text-xs mt-1`,children:[`ID: `,e.id,` | `,new Date(e.createdAt).toLocaleTimeString()]})]},e.id))}),(0,h.jsx)(p,{children:`const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    taskAdded: {
      // The reducer receives the prepared payload
      reducer: (state, action) => {
        state.push(action.payload);
      },
      // prepare callback transforms arguments
      prepare: (title, priority) => ({
        payload: {
          id: nanoid(),
          title,
          priority,
          createdAt: new Date().toISOString(),
        },
      }),
    },
  },
});

// Component just passes raw values
dispatch(taskAdded('Buy milk', 'high'));`})]})}function k(){let[e,t]=(0,v.useState)(0),[n,r]=(0,v.useState)(0);return(0,h.jsxs)(`div`,{className:`bg-surface-alt border border-line rounded p-6`,children:[(0,h.jsx)(`p`,{className:`text-muted mb-4`,children:`Redux re-renders components on every dispatch. Use batching, memoized selectors, and proper component structure to minimize unnecessary renders and keep your app fast.`}),(0,h.jsxs)(`div`,{className:`grid grid-cols-2 gap-4 mb-4`,children:[(0,h.jsxs)(`div`,{className:`bg-surface border border-line rounded p-4`,children:[(0,h.jsx)(`div`,{className:`text-sm mb-3 text-accent`,children:`Multiple Dispatches:`}),(0,h.jsx)(`div`,{className:`text-3xl font-bold text-heading-alt mb-3 tabular-nums`,children:e}),(0,h.jsx)(`button`,{onClick:()=>{t(e=>e+1),setTimeout(()=>t(e=>e+1),10),setTimeout(()=>t(e=>e+1),20)},className:`bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors w-full`,children:`+3 (separate)`}),(0,h.jsx)(`div`,{className:`text-xs text-muted mt-2`,children:`Triggers 3 separate re-renders`})]}),(0,h.jsxs)(`div`,{className:`bg-surface border border-line rounded p-4`,children:[(0,h.jsx)(`div`,{className:`text-sm mb-3 text-accent`,children:`Batched Updates:`}),(0,h.jsx)(`div`,{className:`text-3xl font-bold text-green-400 mb-3 tabular-nums`,children:n}),(0,h.jsx)(`button`,{onClick:()=>{r(e=>e+3)},className:`bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity w-full`,children:`+3 (batched)`}),(0,h.jsx)(`div`,{className:`text-xs text-muted mt-2`,children:`Triggers 1 re-render (optimized)`})]})]}),(0,h.jsx)(p,{children:`// ❌ Bad: Multiple dispatches = multiple re-renders
dispatch(setUser(user));
dispatch(setLoading(false));
dispatch(setError(null));

// ✅ Good: Batch into single action
dispatch(loginSuccess({ user, loading: false, error: null }));

// ✅ Good: Use React.unstable_batchedUpdates
import { unstable_batchedUpdates } from 'react-dom';

unstable_batchedUpdates(() => {
  dispatch(action1());
  dispatch(action2());
  dispatch(action3());
}); // Only 1 re-render

// ✅ Good: Memoize selectors to prevent re-renders
const selectExpensiveData = createSelector(
  [(state) => state.items],
  (items) => items.filter(/* expensive calculation */)
);

// ✅ Good: Split large components reading different state slices
// Instead of one component reading everything,
// have smaller components each reading only what they need`})]})}function A(){let[e,t]=(0,v.useState)(`idle`),[n,r]=(0,v.useState)(null),[i,a]=(0,v.useState)(0);return(0,h.jsxs)(`div`,{className:`bg-surface-alt border border-line rounded p-6`,children:[(0,h.jsx)(`p`,{className:`text-muted mb-4`,children:`RTK Query is a powerful data-fetching and caching tool built into Redux Toolkit. It generates hooks that automatically manage loading states, cache data, and provide refetch/invalidation capabilities.`}),(0,h.jsxs)(`div`,{className:`flex gap-2 mb-4`,children:[(0,h.jsx)(`button`,{onClick:()=>{t(`loading`),setTimeout(()=>{r({id:Date.now(),title:`Sample Post`,author:`Redux Team`,cached:i>0}),t(`success`),a(e=>e+1)},800)},disabled:e===`loading`,className:`bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50`,children:e===`loading`?`Fetching...`:`Fetch Data`}),n&&(0,h.jsx)(`button`,{onClick:()=>{r(null),t(`idle`)},className:`bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors`,children:`Invalidate Cache`})]}),(0,h.jsxs)(`div`,{className:`bg-surface border border-line rounded p-4 mb-4`,children:[(0,h.jsxs)(`div`,{className:`text-sm mb-2`,children:[(0,h.jsx)(`span`,{className:`text-muted`,children:`Status: `}),(0,h.jsx)(`span`,{className:`font-bold ${e===`loading`?`text-yellow-400`:e===`success`?`text-green-400`:`text-gray-400`}`,children:e})]}),n&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(`div`,{className:`text-sm mb-2`,children:[(0,h.jsx)(`span`,{className:`text-muted`,children:`Data: `}),(0,h.jsx)(`span`,{className:`text-heading-alt`,children:n.title}),n.cached&&(0,h.jsx)(`span`,{className:`ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded`,children:`from cache`})]}),(0,h.jsxs)(`div`,{className:`text-sm`,children:[(0,h.jsx)(`span`,{className:`text-muted`,children:`Fetched: `}),(0,h.jsxs)(`span`,{className:`text-heading-alt`,children:[i,` time(s)`]})]})]})]}),(0,h.jsx)(p,{children:`// Define an API slice
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
      providesTags: ['Post'],
    }),
    addPost: builder.mutation({
      query: (body) => ({ url: 'posts', method: 'POST', body }),
      invalidatesTags: ['Post'], // Auto-refetch getPosts
    }),
  }),
});

// Auto-generated hooks
export const { useGetPostsQuery, useAddPostMutation } = api;

// In component
function Posts() {
  const { data, isLoading, refetch } = useGetPostsQuery();
  const [addPost] = useAddPostMutation();
  
  return <div>...</div>;
}`})]})}function j(){let[e,t]=(0,v.useState)(5),n=d(e=>e.counter.value),r=d(e=>e.activityLog.entries),i=f();return(0,h.jsxs)(`div`,{className:`bg-surface-alt border border-line rounded p-6`,children:[(0,h.jsxs)(`p`,{className:`text-muted mb-4`,children:[(0,h.jsx)(`code`,{children:`createSlice`}),` generates the `,(0,h.jsx)(`code`,{children:`incrementedByAmount`}),` `,`action creator for you. Every action dispatched anywhere on this page - including from the other demos - gets logged below, since the store runs its reducers for every single action.`]}),(0,h.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3 mb-4`,children:[(0,h.jsx)(`input`,{type:`number`,value:e,onChange:e=>t(Number(e.target.value)),className:`bg-surface border border-line rounded px-3 py-2 text-heading w-24`}),(0,h.jsx)(`button`,{onClick:()=>i(s(e)),className:`bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity`,children:`Dispatch incrementedByAmount`}),(0,h.jsx)(`span`,{className:`text-2xl font-bold text-heading-alt tabular-nums ml-auto`,children:n})]}),(0,h.jsx)(`div`,{className:`bg-surface rounded p-4 border border-line mb-4 max-h-40 overflow-y-auto`,children:r.length===0?(0,h.jsx)(`p`,{className:`text-sm text-subtle`,children:`No actions dispatched yet.`}):(0,h.jsx)(`ul`,{className:`text-sm font-mono text-muted space-y-1`,children:r.map((e,t)=>(0,h.jsxs)(`li`,{children:[(0,h.jsx)(`span`,{className:`text-subtle`,children:e.timestamp||e.at}),` `,`— `,e.action||e.type]},t))})}),(0,h.jsx)(p,{children:`const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    incrementedByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

dispatch(incrementedByAmount(5));
// => { type: "counter/incrementedByAmount", payload: 5 }`})]})}function M(){let e=d(e=>e.counter.value),t=f();return(0,h.jsxs)(`div`,{className:`bg-surface-alt border border-line rounded p-6`,children:[(0,h.jsxs)(`p`,{className:`text-muted mb-4`,children:[`Every button below dispatches a plain action object to the same store.`,` `,(0,h.jsx)(`code`,{children:`state.counter.value`}),` is currently `,(0,h.jsx)(`strong`,{children:e}),`.`]}),(0,h.jsxs)(`div`,{className:`flex flex-wrap gap-3 mb-4`,children:[(0,h.jsx)(`button`,{onClick:()=>t(a()),className:`bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors`,children:`−1`}),(0,h.jsx)(`button`,{onClick:()=>t(o()),className:`bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity`,children:`+1`}),(0,h.jsx)(`button`,{onClick:()=>{e%2!=0&&t(o())},className:`bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors`,children:`+1 if odd`}),(0,h.jsx)(`button`,{onClick:()=>{setTimeout(()=>t(o()),1e3)},className:`bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors`,children:`+1 async`})]}),(0,h.jsx)(p,{children:`incrementButton.addEventListener('click', () => {
  dispatch(incremented());
});

// only dispatch conditionally
if (value % 2 !== 0) dispatch(incremented());

// or after a delay
setTimeout(() => dispatch(incremented()), 1000);`})]})}var N={en:i,sv:u};function P(){let{i18n:e}=t(),n=N[e.language]||N.en,r={[n.practiceTopics[0].title]:M,[n.practiceTopics[1].title]:j,[n.practiceTopics[2].title]:w,[n.practiceTopics[3].title]:g,[n.practiceTopics[4].title]:E,[n.practiceTopics[5].title]:T,[n.practiceTopics[6].title]:x,[n.practiceTopics[7].title]:O,[n.practiceTopics[8].title]:b,[n.practiceTopics[9].title]:A,[n.practiceTopics[10].title]:y,[n.practiceTopics[11].title]:k};return(0,h.jsx)(m,{title:n.title,introduction:n.introduction,coreConcepts:n.coreConcepts,sections:[{description:`Every Redux update follows the same one-way cycle: the UI dispatches an action, the store runs the reducer to calculate a new state, and the UI reads that new state.`,content:(0,h.jsx)(_,{})},{heading:n.toolkit.heading,description:n.toolkit.description,content:(0,h.jsx)(p,{children:`// configureStore replaces createStore + manual middleware setup
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
});`})}],fullExample:n.fullExample,gettingStarted:n.gettingStarted,practiceTopics:n.practiceTopics,practiceDemos:r,topicKey:`redux`})}export{P as default};