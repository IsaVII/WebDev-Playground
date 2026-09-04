# WebDev Learning Playground ![CI](https://github.com/IsaVII/WebDev-Playground/actions/workflows/ci.yml/badge.svg)

A frontend-only, interactive learning platform for mastering modern web development — through **structured lessons**, **live demos**, **step-by-step code walkthroughs**, and **task-focused cheat sheets** you can follow while actually building something.

Learn **JavaScript**, **TypeScript**, **Git**, **HTTP & Web APIs**, **Node.js**, **React**, **Redux**, **WebSockets**, **Express**, **Authentication & Authorization**, and **Testing** at your own pace, with hands-on examples you can edit and experiment with directly in the browser. When you just need to _do_ something rather than learn it end-to-end, the **Cheat Sheets** section gives you a numbered, copy-pasteable checklist instead.

**Live demo:** https://isavii.github.io/WebDev-Playground/

---

## Screenshots

| ![Screenshot 1](./screenshots/WebDev-01.jpg) | ![Screenshot 2](./screenshots/WebDev-02.jpg) |
| -------------------------------------------- | -------------------------------------------- |
| ![Screenshot 3](./screenshots/WebDev-03.jpg) | ![Screenshot 4](./screenshots/WebDev-04.jpg) |

## Key Features

- **Structured Lessons** — Each topic covers core concepts, a full worked example, and a getting-started checklist
- **Interactive Demos** — Live, editable widgets (a counter, a stopwatch, a simulated HTTP server, an event loop visualizer, a WebSocket echo server, ...) show concepts in action, not just in prose
- **Step-by-Step Code Walkthroughs** — Click a step to highlight exactly which lines of a realistic example it's talking about
- **Cheat Sheets** — Numbered, "how to actually do it" checklists for common setup tasks (project scaffolding, deployment, databases, UI motion), separate from the teaching-focused lessons
- **Progress Tracking** — Check off topics on the home page and individual sub-topics/demos inside each lesson; progress is saved in your browser and picks up right where you left off
- **Light & Dark Themes** — Easy on the eyes, any time of day
- **Data-Driven Content** — Lesson and cheat sheet copy lives in JSON, so it can change without touching component code
- **Zero Backend** — No server, no account, no sign-up — everything runs and persists locally in your browser

---

## Learning Path

Topics are ordered to roughly match how you'd want to learn them — language fundamentals first, then the tools and concepts that build on top of them.

| #   | Topic                              | What you'll learn                                                                                 |
| --- | ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| 1   | **JavaScript Basics**              | Variables & scope, functions & closures, arrays/objects, destructuring, promises, and async/await |
| 2   | **TypeScript Basics**              | Static types, interfaces, generics, and typing functions/components on top of JavaScript          |
| 3   | **Git**                            | Cloning, staging & committing, branching & merging, rebase, stash, and resolving conflicts        |
| 4   | **HTTP & Web APIs**                | Methods & status codes, headers & cookies, CORS, REST/JSON, fetch, auth, WebSockets, and SSE      |
| 5   | **Node.js**                        | The runtime and event loop, modules, the built-in `http` module, and streams                      |
| 6   | **React**                          | Components, JSX, props, state, hooks, and performance with `memo`                                 |
| 7   | **Redux**                          | Actions, reducers, `configureStore`, `createSlice`, and async thunks                              |
| 8   | **WebSockets**                     | Real-time, full-duplex communication: handshakes, events, and building an echo/broadcast server   |
| 9   | **Unit Tests**                     | Unit, integration, and component testing, mocking, spies, fixtures, and TDD                       |
| 10  | **Express.js**                     | Routing, middleware, error handling, and building a REST API                                      |
| 11  | **Authentication & Authorization** | Sessions vs. tokens, password hashing, JWTs, protected routes, and role-based access              |

## Cheat Sheets

Task-focused references for setup work you'd otherwise have to look up across a dozen tabs:

| Cheat Sheet                      | What it covers                                                                                                                                                          |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React + Redux Project Setup**  | Scaffolding a modern React project with Redux, Tailwind CSS, and routing                                                                                                |
| **GitHub Pages for React**       | Deploying a React app to GitHub Pages from VS Code                                                                                                                      |
| **Essential npm Libraries**      | Must-have packages for Node.js, Express, MongoDB, auth, and email                                                                                                       |
| **MongoDB Setup & Connection**   | Local/Atlas setup, connection strings, and troubleshooting                                                                                                              |
| **SQL Database**                 | Creating tables, SELECT/INSERT/UPDATE/DELETE, JOINs, aggregation, constraints, indexes, transactions                                                                    |
| **Text Reveal & Content Reveal** | A drop-in, IntersectionObserver-based scroll-reveal system for React (word-by-word text reveals plus fade/slide content reveals), with `prefers-reduced-motion` support |

---

## Tech Stack

- [React 19](https://react.dev/) + [React Router](https://reactrouter.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/) / [React Redux](https://react-redux.js.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Vite](https://vite.dev/) for dev/build tooling, [oxlint](https://oxc.rs/docs/guide/usage/linter.html) for linting
- [gh-pages](https://www.npmjs.com/package/gh-pages) for one-command deploys

## Getting Started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

Other useful scripts:

```bash
npm run build    # production build, output to dist/
npm run preview  # preview the production build locally
npm run lint     # lint with oxlint
npm run deploy   # build and publish dist/ to GitHub Pages
```

---

## Progress Tracking

Every topic on the home page and every sub-topic (practice topic/demo) inside a lesson has a checkbox next to it. Checking one off:

- Marks it as done with a visual checkmark
- Is saved automatically to a cookie (`learningToolProgress`) in your browser, so it's remembered the next time you visit
- Doesn't require an account, sign-in, or backend — everything stays on your machine

Clearing your browser cookies (or the site's cookies specifically) resets your progress. There's no sync between devices/browsers, since nothing is sent to a server.

Under the hood this lives in `src/context/ProgressContext.jsx`, which reads/writes the cookie via the small helpers in `src/utils/cookies.js` and exposes a `useProgress()` hook (`isTopicDone`, `toggleTopic`, `isSubtopicDone`, `toggleSubtopic`, ...) to any component that needs it.

---

## Project Structure

```
src/
├── components/               # Shared UI (Header, Footer, CodeBlock, TopicCard, ...)
│   ├── motion/                 # Scroll/text reveal, page transitions, parallax (see Text Reveal cheat sheet)
│   └── demos/                   # Interactive demos for all learning topics
│       ├── auth-demos/            # Authentication & Authorization demos
│       ├── deployment-demos/      # Deployment demos
│       ├── express-demos/         # Express.js demos
│       ├── git-demos/             # Git demos
│       ├── http-demos/            # HTTP & Web APIs demos
│       ├── javascript-demos/      # JavaScript demos
│       ├── node-demos/            # Node.js demos
│       ├── react-demos/           # React demos
│       ├── redux-demos/           # Redux demos
│       ├── testing-demos/         # Testing demos
│       ├── typescript-demos/      # TypeScript demos
│       └── websockets-demos/      # WebSockets demos
├── context/
│   └── ProgressContext.jsx     # Topic/sub-topic completion state, backed by a cookie
├── hooks/
│   ├── useReducedMotion.js     # Tracks prefers-reduced-motion
│   └── useScrollReveal.js      # IntersectionObserver hook behind Reveal/TextReveal
├── data/                      # JSON content that drives each page
│   ├── learningContent.json      # Topics shown on the home page, in learning order
│   ├── cheatsheets.json          # Cheat sheets shown on the home page
│   ├── learning/
│   │   ├── javascriptContent.json
│   │   ├── typescriptContent.json
│   │   ├── gitContent.json
│   │   ├── httpContent.json
│   │   ├── nodeContent.json
│   │   ├── reactContent.json
│   │   ├── reduxContent.json
│   │   ├── webSocketsContent.json
│   │   ├── testingContent.json
│   │   ├── expressContent.json
│   │   └── authContent.json
│   └── cheatsheets/
│       ├── projectSetup.json
│       ├── githubPages.json
│       ├── npmLibraries.json
│       ├── mongodb.json
│       ├── sql.json
│       └── textReveal.json
├── pages/
│   ├── Main.jsx               # Home page, lists topics + cheat sheets
│   ├── learning/               # One page per topic (JavaScript.jsx, Git.jsx, React.jsx, ...)
│   └── cheatsheets/             # One page per cheat sheet (SQL.jsx, MongoDB.jsx, ...)
├── redux/                    # Redux store + slices used by the Redux demos
├── styles/
│   └── motion.css              # Design tokens + utility classes for every animation in the app
├── utils/
│   └── cookies.js              # Tiny get/set/delete cookie helpers
├── App.jsx                   # Routes
└── main.jsx                  # Entry point
```

Lesson and cheat sheet content lives in JSON so the copy can change without touching component code; the interactive demos are real, hand-written components mapped to a lesson's "practice topics" by title. `CheatSheetLayout.jsx` and `LearningTopicLayout.jsx` hold the shared page chrome for cheat sheets and lessons respectively, so each page component is just its content JSON plus one layout call.

---

## Adding a New Topic

1. Add an entry to `src/data/learningContent.json` in the right spot for the learning order, including a unique `key` (used to store its progress-tracking checkbox state, e.g. `"key": "git"`).
2. Create a `src/data/learning/<topic>Content.json` file with the same shape as the existing ones (`introduction`, `coreConcepts`, `gettingStarted`, `practiceTopics`, `fullExample`, ...).
3. Build any interactive demos in a new `src/components/demos/<topic>-demos/` folder.
4. Create `src/pages/learning/<Topic>.jsx`, following the pattern in `Git.jsx`, `React.jsx`, or `Redux.jsx`. When rendering `<PracticeTopicCard>` for each practice topic, pass `topicKey="<the same key from step 1>"` so its sub-topic checkboxes save correctly.
5. Register the route in `src/App.jsx` and add a link in `src/components/Header.jsx`.

## Adding a New Cheat Sheet

1. Add an entry to `src/data/cheatsheets.json` with a unique `key` and a `route` (e.g. `"key": "sql"`, `"route": "/sql"`) — the home page and header nav both pull from this file automatically.
2. Create a `src/data/cheatsheets/<name>.json` file shaped like the existing ones: `title`, `introduction`, `prerequisites`, `steps` (each with `title`, `description`, optional `code`/`highlightLines`/`note`/`substeps`/`subSteps`), and any of the optional sections `CheatSheetLayout` supports (`folderStructure`, `backendSetup`, `whatYouMightBeMissing`, `gettingStarted`, `source`).
3. Create `src/pages/cheatsheets/<Name>.jsx`, following the pattern in `SQL.jsx` — import the JSON and pass its fields straight into `<CheatSheetLayout>`.
4. Register the route in `src/App.jsx` as a lazy-loaded page (see the other cheat sheet imports).

---

## Goals & Vision

This project is designed to:

- Provide a **self-paced, visual learning experience** for modern web development
- Show concepts through **working code and interactive examples**, not just documentation
- Give a fast, **task-focused reference** (the cheat sheets) for setup work that doesn't need a full lesson
- Make it **easy to extend** with new topics or cheat sheets — just add JSON + a small React component
- Demonstrate **modern React patterns** (hooks, context, Redux, testing, IntersectionObserver-driven UI)
