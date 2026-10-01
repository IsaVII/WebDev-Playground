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
- **Data-Driven Content** — Lesson and cheat sheet copy lives in JSON, so it can change without touching component code. Prose strings support inline Markdown (`` `code` ``, `**bold**`, `*italic*`, `[links](https://...)`)
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

## Java Backend

A separate track for the Java side of full-stack work — the concepts a Spring course assumes you already have. Each lesson ends with a **Self-Check**: a short retrieval-practice quiz (recall the idea from memory, then get immediate feedback) that counts toward the lesson's completion ring.

| #   | Topic                             | What you'll learn                                                                                                                                           |
| --- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Class & ER Diagrams**           | UML class boxes, the four relationship types, multiplicity/cardinality, turning a class model into tables, normalization to 3NF                             |
| 2   | **Lambda & Stream API**           | Lambdas, functional interfaces, method references, lazy stream pipelines, `map`/`filter`/`reduce`, collectors, `Optional`                                   |
| 3   | **Spring Framework Fundamentals** | Inversion of control & dependency injection, beans and stereotypes, Spring Boot auto-configuration, Controller/Service/Repository layering, Spring Data JPA |

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

- [React 19](https://react.dev/) + [React Router](https://reactrouter.com/), written in [TypeScript](https://www.typescriptlang.org/) (strict mode)
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
npm run typecheck # type-check the whole project with tsc (also runs as part of build)
npm test         # run the test suite once (Vitest)
npm run deploy   # build and publish dist/ to GitHub Pages
```

---

## Progress Tracking

Every topic on the home page and every sub-topic (practice topic/demo) inside a lesson has a checkbox next to it. Checking one off:

- Marks it as done with a visual checkmark
- Is saved automatically to a cookie (`learningToolProgress`) in your browser, so it's remembered the next time you visit
- Doesn't require an account, sign-in, or backend — everything stays on your machine

Clearing your browser cookies (or the site's cookies specifically) resets your progress. There's no sync between devices/browsers, since nothing is sent to a server.

Under the hood this lives in `src/context/ProgressContext.tsx`, which reads/writes the cookie via the small helpers in `src/utils/cookies.ts` and exposes a `useProgress()` hook (`isTopicDone`, `toggleTopic`, `isSubtopicDone`, `toggleSubtopic`, ...) to any component that needs it.

---

## Writing a Lesson in MDX

Most lessons are JSON (`src/data/{en,sv}/learning/*Content.json`) rendered by `LearningTopicLayout`. The **Threads & Multithreading** lesson is the pilot for a different format: one `.mdx` file per language (`src/data/{en,sv}/learning/threads.mdx`) - Markdown with React components mixed in - so the text, the demos and the quiz all live together in reading order.

```mdx
---
title: "Threads & Multithreading"
practiceTopics: ["Thread States", "Thread Pool Scheduler"]
quiz: true
---

import RaceConditionDemo from "../../../components/demos/threads-demos/RaceConditionDemo";

<Section>

## A heading

Ordinary **Markdown** with `code`, lists and [links](https://example.com).

<RaceConditionDemo />

</Section>
```

Building blocks (all in `src/components/mdx/`): `<Section>` (the tinted, alternating box), `<Walkthrough>`/`<Step>` (code with clickable line-range explanations), `<PracticeTopics>`/`<PracticeTopic>` (demo cards), and `<Quiz>`/`<Question>`/`<Option correct>`/`<Explanation>`. Fenced code blocks render with the site's `CodeBlock`.

Two MDX gotchas: `<`, `>` and `{` `}` outside backticks are JSX, so put things like `List<String>` in a code span; and keep one-line items (`<Option>`, `<Step>`, `<PracticeTopic>`) on a single line so they stay inline text. The frontmatter repeats the practice-topic titles and quiz flag so the header menu and progress ring can count them without loading the lesson (via the `lesson.mdx?frontmatter` import, see `scripts/vite-plugin-mdx-frontmatter.ts`); `src/data/mdx.test.tsx` fails if the frontmatter and body disagree, if a step highlights lines past the end of its code file, or if the English and Swedish files drift apart.

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
│       ├── websockets-demos/      # WebSockets demos
│       ├── diagrams-demos/        # Class & ER diagram demos
│       ├── streams-demos/         # Lambda & Stream API demos
│       └── spring-demos/          # Spring Framework demos
│   └── SelfCheckQuiz.tsx          # Retrieval-practice quiz shown at the end of a lesson
├── context/
│   └── ProgressContext.tsx     # Topic/sub-topic completion state, backed by a cookie
├── hooks/
│   ├── useReducedMotion.ts     # Tracks prefers-reduced-motion
│   └── useScrollReveal.ts      # IntersectionObserver hook behind Reveal/TextReveal
├── data/                      # JSON content that drives each page
│   ├── learningContent.json      # Topics shown on the home page, in learning order
│   ├── cheatsheets.json          # Cheat sheets shown on the home page
│   ├── javaBackend.json          # Java Backend category topics (per language, en/ + sv/)
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
│   ├── Main.tsx               # Home page, lists topics + cheat sheets
│   ├── learning/               # One page per topic (JavaScript.tsx, Git.tsx, React.tsx, ...)
│   └── cheatsheets/             # One page per cheat sheet (SQL.tsx, MongoDB.tsx, ...)
├── redux/                    # Redux store + slices used by the Redux demos
├── types/
│   └── content.ts              # Types describing the content JSON the shared layouts consume
├── styles/
│   └── motion.css              # Design tokens + utility classes for every animation in the app
├── utils/
│   └── cookies.ts              # Tiny get/set/delete cookie helpers
├── App.tsx                   # Routes
└── main.tsx                  # Entry point
```

Lesson and cheat sheet content lives in JSON so the copy can change without touching component code; the interactive demos are real, hand-written components mapped to a lesson's "practice topics" by title. `CheatSheetLayout.tsx` and `LearningTopicLayout.tsx` hold the shared page chrome for cheat sheets and lessons respectively, so each page component is just its content JSON plus one layout call.

---

## Adding a New Topic

1. Add an entry to `src/data/learningContent.json` in the right spot for the learning order, including a unique `key` (used to store its progress-tracking checkbox state, e.g. `"key": "git"`).
2. Create a `src/data/learning/<topic>Content.json` file with the same shape as the existing ones (`introduction`, `coreConcepts`, `gettingStarted`, `practiceTopics`, `fullExample`, ...).
3. Build any interactive demos in a new `src/components/demos/<topic>-demos/` folder.
4. Create `src/pages/learning/<Topic>.tsx`, following the pattern in `Git.tsx`, `React.tsx`, or `Redux.tsx`. When rendering `<PracticeTopicCard>` for each practice topic, pass `topicKey="<the same key from step 1>"` so its sub-topic checkboxes save correctly.
5. Register the route in `src/App.tsx` and add a link in `src/components/Header.tsx`.

A **Java Backend** topic is the same, except its index entry goes in `src/data/{en,sv}/javaBackend.json` (which the home page, header menu, and search all read automatically), and its content JSON can include an optional `quiz` array (`{ question, options, answerIndex, explanation }`) — `LearningTopicLayout` renders it as the lesson's Self-Check and counts it as one item on the completion ring.

## Adding a New Cheat Sheet

1. Add an entry to `src/data/cheatsheets.json` with a unique `key` and a `route` (e.g. `"key": "sql"`, `"route": "/sql"`) — the home page and header nav both pull from this file automatically.
2. Create a `src/data/cheatsheets/<name>.json` file shaped like the existing ones: `title`, `introduction`, `prerequisites`, `steps` (each with `title`, `description`, optional `code`/`highlightLines`/`note`/`substeps`/`subSteps`), and any of the optional sections `CheatSheetLayout` supports (`folderStructure`, `backendSetup`, `whatYouMightBeMissing`, `gettingStarted`, `source`).
3. Create `src/pages/cheatsheets/<Name>.tsx`, following the pattern in `SQL.tsx` — import the JSON and pass its fields straight into `<CheatSheetLayout>`.
4. Register the route in `src/App.tsx` as a lazy-loaded page (see the other cheat sheet imports).

---

## Goals & Vision

This project is designed to:

- Provide a **self-paced, visual learning experience** for modern web development
- Show concepts through **working code and interactive examples**, not just documentation
- Give a fast, **task-focused reference** (the cheat sheets) for setup work that doesn't need a full lesson
- Make it **easy to extend** with new topics or cheat sheets — just add JSON + a small React component
- Demonstrate **modern React patterns** (hooks, context, Redux, testing, IntersectionObserver-driven UI)
