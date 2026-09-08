import{n as e}from"./rolldown-runtime-CbXtAM7H.js";import{c as t,i as n}from"./TextReveal-BmuH47v_.js";var r=n(),i=new Set(`const.let.var.function.class.extends.new.typeof.instanceof.delete.void.in.of.static.async.await.this.super.interface.type.enum.namespace.declare.abstract.readonly.public.private.protected.implements.keyof.as.satisfies`.split(`.`)),a=new Set([`import`,`export`,`from`,`default`,`return`,`if`,`else`,`for`,`while`,`do`,`switch`,`case`,`break`,`continue`,`try`,`catch`,`finally`,`throw`,`yield`]),o=new Set([`true`,`false`,`null`,`undefined`]),s={comment:`text-syntax-comment italic`,string:`text-syntax-string`,number:`text-syntax-number`,control:`text-syntax-control`,declaration:`text-syntax-declaration`,literal:`text-syntax-declaration`,tag:`text-syntax-declaration`,component:`text-syntax-component`,call:`text-syntax-call`,attribute:`text-syntax-attribute`,plain:`text-syntax-plain`},c=new RegExp([`(?<comment>//[^\\n]*|/\\*[\\s\\S]*?\\*/)`,`(?<string>"(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*'|\`(?:\\\\.|[^\`\\\\])*\`)`,`(?<number>\\b\\d+\\.?\\d*\\b)`,`(?<word>\\b[A-Za-z_$][\\w$]*\\b)`,`(?<lt><\\/?)`,`(?<gt>\\/?>)`].join(`|`),`g`);function l(e){let t=[],n=0,r=!1,s=!1,l;for(;l=c.exec(e);){l.index>n&&t.push({text:e.slice(n,l.index),type:`plain`});let u=l.groups;if(u.comment)t.push({text:u.comment,type:`comment`}),s=!1;else if(u.string)t.push({text:u.string,type:`string`}),s=!1;else if(u.number)t.push({text:u.number,type:`number`}),s=!1;else if(u.lt)r=!0,t.push({text:u.lt,type:`plain`});else if(u.gt)r=!1,t.push({text:u.gt,type:`plain`});else if(u.word){let n=u.word,l=e.slice(c.lastIndex,c.lastIndex+20),d;r?(d=/^[A-Z]/.test(n)?`component`:`tag`,r=!1):d=a.has(n)?`control`:i.has(n)?`declaration`:o.has(n)?`literal`:s&&/^\s*\(/.test(l)?`component`:/^\s*\(/.test(l)?`call`:/^[A-Z]/.test(n)?`component`:/^\s*=(?!=|>)/.test(l)?`attribute`:`plain`,t.push({text:n,type:d}),s=n===`function`||n===`class`}n=c.lastIndex}return n<e.length&&t.push({text:e.slice(n),type:`plain`}),t}function u({code:e}){return l(e).map((e,t)=>(0,r.jsx)(`span`,{className:s[e.type],children:e.text},t))}var d=e(t(),1);function f({text:e,className:t=``}){let[n,i]=(0,d.useState)(!1),a=(0,d.useRef)(null);(0,d.useEffect)(()=>()=>clearTimeout(a.current),[]);let o=e=>{let t=document.createElement(`textarea`);t.value=e,t.style.position=`fixed`,t.style.top=`-9999px`,t.style.left=`-9999px`,document.body.appendChild(t),t.focus(),t.select();try{document.execCommand(`copy`)}finally{document.body.removeChild(t)}};return(0,r.jsx)(`button`,{type:`button`,onClick:async()=>{try{navigator.clipboard&&window.isSecureContext?await navigator.clipboard.writeText(e):o(e),i(!0),clearTimeout(a.current),a.current=setTimeout(()=>i(!1),2e3)}catch{try{o(e),i(!0),clearTimeout(a.current),a.current=setTimeout(()=>i(!1),2e3)}catch{}}},"aria-label":n?`Copied to clipboard`:`Copy code to clipboard`,title:n?`Copied!`:`Copy`,className:`inline-flex items-center gap-1.5 rounded border border-line bg-surface/90 px-2 py-1 text-xs font-mono text-muted backdrop-blur-sm transition-colors hover:text-heading hover:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${t}`,children:n?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 20 20`,fill:`currentColor`,className:`w-3.5 h-3.5 text-green-500`,"aria-hidden":`true`,children:(0,r.jsx)(`path`,{fillRule:`evenodd`,d:`M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z`,clipRule:`evenodd`})}),(0,r.jsx)(`span`,{className:`text-green-500`,children:`Copied!`})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 20 20`,fill:`currentColor`,className:`w-3.5 h-3.5`,"aria-hidden":`true`,children:[(0,r.jsx)(`path`,{d:`M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z`}),(0,r.jsx)(`path`,{d:`M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h8a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z`})]}),(0,r.jsx)(`span`,{children:`Copy`})]})})}function p({children:e,showLineNumbers:t=!1,highlightLines:n=[]}){let i=Array.isArray(e)?e:String(e??``).split(`
`),a=new Set(n),o=i.join(`
`);return(0,r.jsxs)(`div`,{className:`relative group`,children:[(0,r.jsx)(f,{text:o,className:`absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 focus-visible:opacity-100`}),(0,r.jsx)(`pre`,{className:` border border-line rounded p-4 overflow-x-auto text-sm font-mono whitespace-pre text-left`,children:(0,r.jsx)(`code`,{style:{display:`block`,width:`fit-content`},children:i.map((e,n)=>{let i=n+1,o=a.has(i);return(0,r.jsxs)(`div`,{className:`flex w-fit min-w-full ${o?`bg-white/10 -mx-4 px-4 border-l-2 border-accent`:``}`,children:[t&&(0,r.jsx)(`span`,{className:`select-none text-right pr-4 mr-2 text-syntax-line-number w-7 shrink-0`,children:i}),(0,r.jsx)(`span`,{className:`flex-1 block`,children:(0,r.jsx)(u,{code:e.length?e:` `})})]},i)})})})]})}function m({children:e}){return(0,r.jsx)(`section`,{className:` bg-surface rounded-lg p-8 shadow-sm`,children:e})}var h=Object.fromEntries(Object.entries(Object.assign({"/src/data/code-examples/cheatsheets/cicd/01-create-the-workflow-file-folder-structure.sh":`mkdir -p .github/workflows
touch .github/workflows/ci.yml
`,"/src/data/code-examples/cheatsheets/cicd/02-choose-your-triggers.yml":`name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch: {}
`,"/src/data/code-examples/cheatsheets/cicd/03-check-out-code-set-up-node.yml":`jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v5

      - name: Set up Node.js
        uses: actions/setup-node@v5
        with:
          node-version: "24"
          cache: "npm"
`,"/src/data/code-examples/cheatsheets/cicd/04-install-lint-test.yml":`      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Run tests
        run: npm test
`,"/src/data/code-examples/cheatsheets/cicd/05-matrix-builds-across-node-versions.yml":`jobs:
  build-and-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20, 22, 24]

    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: \${{ matrix.node-version }}
          cache: "npm"
      - run: npm ci
      - run: npm test
`,"/src/data/code-examples/cheatsheets/cicd/06-cache-dependencies-for-faster-runs.yml":`      - name: Cache node_modules
        uses: actions/cache@v4
        with:
          path: ~/.npm
          key: npm-\${{ runner.os }}-\${{ hashFiles('package-lock.json') }}
          restore-keys: |
            npm-\${{ runner.os }}-
`,"/src/data/code-examples/cheatsheets/cicd/07-store-secrets-environment-variables.yml":`      - name: Build with environment variables
        run: npm run build
        env:
          VITE_API_URL: \${{ secrets.VITE_API_URL }}
          NODE_ENV: production
`,"/src/data/code-examples/cheatsheets/cicd/08-build-upload-artifacts.yml":`      - name: Build
        run: npm run build

      - name: Upload build output
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
          retention-days: 7
`,"/src/data/code-examples/cheatsheets/cicd/09-deploy-to-github-pages-on-merge-cd.yml":`deploy:
  needs: build-and-test
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  runs-on: ubuntu-latest
  permissions:
    contents: write
  steps:
    - name: Checkout repository
      uses: actions/checkout@v5

    - name: Set up Node.js
      uses: actions/setup-node@v5
      with:
        node-version: "24"
        cache: "npm"

    - name: Install dependencies
      run: npm ci

    - name: Build app
      run: npm run build

    - name: Deploy to gh-pages branch
      uses: peaceiris/actions-gh-pages@v4
      with:
        github_token: \${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
`,"/src/data/code-examples/cheatsheets/cicd/09b-optional-deploy-with-official-pages-action.yml":`# Optional alternative to peaceiris/actions-gh-pages: serve Pages directly
# from an Actions run instead of publishing a gh-pages branch. Requires
# Settings > Pages > Source = "GitHub Actions" (not "Deploy from a branch").
deploy:
  needs: build-and-test
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  runs-on: ubuntu-latest
  permissions:
    pages: write
    id-token: write
  environment:
    name: github-pages
    url: \${{ steps.deployment.outputs.page_url }}
  steps:
    - uses: actions/checkout@v5
    - uses: actions/setup-node@v5
      with:
        node-version: "24"
        cache: "npm"
    - run: npm ci && npm run build
    - uses: actions/upload-pages-artifact@v3
      with:
        path: dist
    - id: deployment
      uses: actions/deploy-pages@v4
`,"/src/data/code-examples/cheatsheets/cicd/10-add-a-status-badge.md":`![CI](https://github.com/<owner>/<repo>/actions/workflows/ci.yml/badge.svg)
`,"/src/data/code-examples/cheatsheets/cicd/11-common-errors-fixes.sh":`Error: "Process completed with exit code 1" (no more detail)
Cause: A step failed but the real error is buried above the generic summary line.
Fix: Expand the failing step's log, not just the final summary block - the actual stack trace is usually a few lines up.

Error: "Dependencies lock file is not found" / npm ci fails
Cause: No package-lock.json committed, or setup-node's cache: "npm" can't find one to hash.
Fix: Commit package-lock.json - npm ci refuses to run without an exact lockfile, by design.

Error: Workflow doesn't trigger at all
Cause: The file isn't under .github/workflows/, has a YAML syntax error, or the branch name in on.push.branches doesn't match your default branch.
Fix: Check the Actions tab's "All workflows" list - if yours isn't listed, GitHub couldn't parse the file; check YAML indentation first.

Error: "remote: Permission to <owner>/<repo>.git denied" / 403 when pushing gh-pages
Cause: The deploy job is missing permissions: contents: write, so the default GITHUB_TOKEN isn't allowed to push the gh-pages branch that peaceiris/actions-gh-pages creates.
Fix: Add permissions: contents: write to the deploy job, as shown in step 9.

Error: "Resource not accessible by integration" on deploy (only if using the optional actions/deploy-pages job)
Cause: The job is missing the permissions block (pages: write / id-token: write) that actions/deploy-pages needs, or the repo's Pages source is still set to "Deploy from a branch" instead of "GitHub Actions".
Fix: Add that permissions block to the deploy job, and switch the Pages source to "GitHub Actions" - see the optional sub-step under step 9.

Error: Secret shows up as an empty string in the log
Cause: Referencing secrets.NAME from a pull_request-triggered workflow on a fork, where secrets are withheld intentionally.
Fix: Use pull_request_target with caution, or restructure so the step needing the secret only runs on push to your own repo.
`,"/src/data/code-examples/cheatsheets/cicd-sv/override-common-errors-fixes.sh":`Fel: "Process completed with exit code 1" (ingen mer detalj)
Orsak: Ett steg misslyckades men det verkliga felet ligger dolt ovanför den generiska sammanfattningsraden.
Fix: Expandera loggen för det misslyckade steget, inte bara den sista sammanfattningsblocket - den faktiska stacktracen finns vanligtvis några rader upp.

Fel: "Dependencies lock file is not found" / npm ci misslyckas
Orsak: Ingen package-lock.json är committad, eller så kan setup-nodes cache: "npm" inte hitta någon att hasha.
Fix: Committa package-lock.json - npm ci vägrar köra utan en exakt lockfil, med avsikt.

Fel: Workflowen triggas inte alls
Orsak: Filen ligger inte under .github/workflows/, har ett YAML-syntaxfel, eller så matchar branchnamnet i on.push.branches inte din standardbranch.
Fix: Kontrollera "All workflows"-listan i Actions-fliken - om din inte finns med kunde GitHub inte parsa filen; kontrollera YAML-indenteringen först.

Fel: "remote: Permission to <owner>/<repo>.git denied" / 403 vid push till gh-pages
Orsak: Deploy-jobbet saknar permissions: contents: write, så standard-GITHUB_TOKEN får inte pusha den gh-pages-branch som peaceiris/actions-gh-pages skapar.
Fix: Lägg till permissions: contents: write i deploy-jobbet, som visas i steg 9.

Fel: "Resource not accessible by integration" vid deploy (endast om du använder det valfria actions/deploy-pages-jobbet)
Orsak: Jobbet saknar permissions-blocket (pages: write / id-token: write) som actions/deploy-pages behöver, eller så är repots Pages-källa fortfarande satt till "Deploy from a branch" istället för "GitHub Actions".
Fix: Lägg till det permissions-blocket i deploy-jobbet, och byt Pages-källa till "GitHub Actions" - se det valfria understeget under steg 9.

Fel: En secret visas som en tom sträng i loggen
Orsak: Referens till secrets.NAME från en pull_request-triggad workflow på en fork, där secrets medvetet hålls tillbaka.
Fix: Använd pull_request_target med försiktighet, eller strukturera om så att steget som behöver secreten bara körs vid push till ditt eget repo.
`,"/src/data/code-examples/cheatsheets/githubPages/01-install-gh-pages.sh":`npm install gh-pages --save-dev
`,"/src/data/code-examples/cheatsheets/githubPages/02-add-a-homepage-property-to-package-json.json":`// vite.config.js - Vite projects set the sub-path here
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/react-gh-pages/', // "/<your-repo-name>/" - keep the trailing slash
})

// Create React App (deprecated) instead used a "homepage" field in package.json:
// "homepage": "https://gitname.github.io/react-gh-pages"
`,"/src/data/code-examples/cheatsheets/githubPages/03-add-predeploy-and-deploy-scripts.json":`"scripts": {
+ "predeploy": "npm run build",
+ "deploy": "gh-pages -d dist",
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  ...
}
`,"/src/data/code-examples/cheatsheets/githubPages/04-point-the-repo-at-github.sh":`git remote add origin https://github.com/{username}/{repo-name}.git
`,"/src/data/code-examples/cheatsheets/githubPages/05-build-and-deploy.sh":`npm run build
npm run deploy
`,"/src/data/code-examples/cheatsheets/i18n/01-install-the-libraries.sh":`npm install i18next react-i18next
`,"/src/data/code-examples/cheatsheets/i18n/02-create-the-locale-files/a-src-locales-en-common-json.json":`{
  "header": {
    "home": "Home",
    "learning": "Learning",
    "cheatsheets": "Cheat Sheets"
  },
  "main": {
    "title": "WebDev Playground",
    "subtitle": "Learn web development through interactive examples",
    "searchPlaceholder": "Search topics..."
  },
  "difficulty": {
    "beginner": "Beginner",
    "intermediate": "Intermediate",
    "advanced": "Advanced"
  },
  "common": {
    "loading": "Loading...",
    "backToHome": "Back to Home"
  }
}
`,"/src/data/code-examples/cheatsheets/i18n/02-create-the-locale-files/b-src-locales-sv-common-json.json":`{
  "header": {
    "home": "Hem",
    "learning": "Lärande",
    "cheatsheets": "Snabbguider"
  },
  "main": {
    "title": "WebDev Playground",
    "subtitle": "Lär dig webbutveckling genom interaktiva exempel",
    "searchPlaceholder": "Sök ämnen..."
  },
  "difficulty": {
    "beginner": "Nybörjare",
    "intermediate": "Medel",
    "advanced": "Avancerad"
  },
  "common": {
    "loading": "Laddar...",
    "backToHome": "Tillbaka till Hem"
  }
}
`,"/src/data/code-examples/cheatsheets/i18n/02-create-the-locale-files.sh":`src/
  locales/
    en/
      common.json   ← English UI strings (always required)
    sv/
      common.json   ← Swedish UI strings
`,"/src/data/code-examples/cheatsheets/i18n/03-create-src-i18n-js.js":`import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en/common.json';
import svTranslations from './locales/sv/common.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    sv: { translation: svTranslations },
  },
  // Restore saved language; fall back to English
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
`,"/src/data/code-examples/cheatsheets/i18n/04-import-i18n-js-in-main-jsx.jsx":`import ReactDOM from 'react-dom/client';
import './i18n';           // ← must come before <App />
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
`,"/src/data/code-examples/cheatsheets/i18n/05-use-translations-in-components.jsx":`import { useTranslation } from 'react-i18next';

function Header() {
  const { t } = useTranslation();

  return (
    <nav>
      <a href="/">{t('header.home')}</a>
      <a href="/learning">{t('header.learning')}</a>
      <a href="/cheatsheets">{t('header.cheatsheets')}</a>
    </nav>
  );
}

export default Header;
`,"/src/data/code-examples/cheatsheets/i18n/06-build-the-languageswitcher-component.jsx":`import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);  // persist the choice
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className={\`px-3 py-1 rounded transition-colors \${
          i18n.language === 'en'
            ? 'bg-blue-600 text-white'           // active
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'  // inactive
        }\`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('sv')}
        className={\`px-3 py-1 rounded transition-colors \${
          i18n.language === 'sv'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }\`}
        aria-label="Byt till Svenska"
      >
        SV
      </button>
    </div>
  );
}

export default LanguageSwitcher;
`,"/src/data/code-examples/cheatsheets/i18n/07-add-languageswitcher-to-the-header.jsx":`import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t } = useTranslation();

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <nav className="flex gap-4">
        <a href="/">{t('header.home')}</a>
        <a href="/learning">{t('header.learning')}</a>
      </nav>

      {/* Language toggle sits in the header alongside nav/theme toggle */}
      <LanguageSwitcher />
    </header>
  );
}

export default Header;
`,"/src/data/code-examples/cheatsheets/i18n/08-localise-page-content-the-content-map-pattern/a-page-component-using-content-map.jsx":`import { useTranslation } from 'react-i18next';
import CheatSheetLayout from '../../components/CheatSheetLayout';
import myTopicEn from '../../data/cheatsheets/myTopic.json';
import myTopicSv from '../../data/sv/cheatsheets/myTopic.json';

const CONTENT_MAP = {
  en: myTopicEn,
  sv: myTopicSv,
};

function MyTopic() {
  const { i18n } = useTranslation();
  // Fall back to English if the current language has no content yet
  const content = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  return (
    <CheatSheetLayout
      title={content.title}
      introduction={content.introduction}
      prerequisites={content.prerequisites}
      steps={content.steps}
    />
  );
}

export default MyTopic;
`,"/src/data/code-examples/cheatsheets/i18n/08-localise-page-content-the-content-map-pattern/b-swedish-content-file-src-data-sv-cheatsheets-myt.json":`{
  "title": "Mitt Ämne – Snabbguide",
  "introduction": {
    "heading": "Kom igång med Mitt Ämne",
    "description": "En kortfattad beskrivning på svenska."
  },
  "prerequisites": [
    "Krav ett",
    "Krav två"
  ],
  "steps": [
    {
      "id": 1,
      "title": "Första steget",
      "description": "Vad du ska göra i detta steg.",
      "code": "npm install something",
      "language": "bash"
    }
  ]
}
`,"/src/data/code-examples/cheatsheets/i18n/08-localise-page-content-the-content-map-pattern-sv/override-sidkomponent-med-content-map.jsx":`import { useTranslation } from 'react-i18next';
import CheatSheetLayout from '../../components/CheatSheetLayout';
import myTopicEn from '../../data/cheatsheets/myTopic.json';
import myTopicSv from '../../data/sv/cheatsheets/myTopic.json';

const CONTENT_MAP = {
  en: myTopicEn,
  sv: myTopicSv,
};

function MyTopic() {
  const { i18n } = useTranslation();
  // Falla tillbaka till engelska om det aktuella språket saknar innehåll
  const content = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;

  return (
    <CheatSheetLayout
      title={content.title}
      introduction={content.introduction}
      prerequisites={content.prerequisites}
      steps={content.steps}
    />
  );
}

export default MyTopic;
`,"/src/data/code-examples/cheatsheets/i18n/08-localise-page-content-the-content-map-pattern.sh":`// File layout
src/data/
  cheatsheets/
    myTopic.json          ← English content (default)
  sv/
    cheatsheets/
      myTopic.json        ← Swedish content (same shape)
`,"/src/data/code-examples/cheatsheets/i18n/09-register-the-new-cheatsheet-in-the-app.js":`// 1. src/data/en/cheatsheets.json – add an entry to the topics array
{
  "id": 7,
  "key": "mytopic",
  "title": "My Topic",
  "description": "Short description shown on the home page card",
  "route": "/mytopic",
  "screenshot": "/images/mytopic.png",
  "difficulty": "beginner",
  "estimatedTime": "15 minutes"
}

// 2. src/data/sv/cheatsheets.json – same entry, translated
{
  "id": 7,
  "key": "mytopic",
  "title": "Mitt Ämne",
  "description": "Kort beskrivning som visas på startsidans kort",
  "route": "/mytopic",
  "screenshot": "/images/mytopic.png",
  "difficulty": "beginner",
  "estimatedTime": "15 minuter"
}

// 3. src/App.jsx – add the lazy import and Route
const MyTopic = lazy(() => import('./pages/cheatsheets/MyTopic'));
// … inside <Routes>:
<Route path="/mytopic" element={<MyTopic />} />
`,"/src/data/code-examples/cheatsheets/i18n-sv/override-bygg-languageswitcher-komponenten.jsx":`import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);  // spara valet
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className={\`px-3 py-1 rounded transition-colors \${
          i18n.language === 'en'
            ? 'bg-blue-600 text-white'           // aktiv
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'  // inaktiv
        }\`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('sv')}
        className={\`px-3 py-1 rounded transition-colors \${
          i18n.language === 'sv'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }\`}
        aria-label="Byt till Svenska"
      >
        SV
      </button>
    </div>
  );
}

export default LanguageSwitcher;
`,"/src/data/code-examples/cheatsheets/i18n-sv/override-importera-i18n-js-i-main-jsx.jsx":`import ReactDOM from 'react-dom/client';
import './i18n';           // ← måste komma före <App />
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
`,"/src/data/code-examples/cheatsheets/i18n-sv/override-lagg-till-languageswitcher-i-header.jsx":`import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t } = useTranslation();

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <nav className="flex gap-4">
        <a href="/">{t('header.home')}</a>
        <a href="/learning">{t('header.learning')}</a>
      </nav>

      {/* Språkväxlaren sitter i headern bredvid nav/temabyte */}
      <LanguageSwitcher />
    </header>
  );
}

export default Header;
`,"/src/data/code-examples/cheatsheets/i18n-sv/override-lokalisera-sidinnehall-content-map-monstret.sh":`// Fillayout
src/data/
  cheatsheets/
    mittÄmne.json          ← Engelskt innehåll (standard)
  sv/
    cheatsheets/
      mittÄmne.json        ← Svenskt innehåll (samma struktur)
`,"/src/data/code-examples/cheatsheets/i18n-sv/override-registrera-den-nya-snabbguiden-i-appen.js":`// 1. src/data/cheatsheets.json – lägg till ett ämne i topics-arrayen
{
  "id": 7,
  "key": "mittamne",
  "title": "My Topic",
  "description": "Kort beskrivning som visas på startsidans kort",
  "route": "/mittamne",
  "screenshot": "/images/mittamne.png",
  "difficulty": "beginner",
  "estimatedTime": "15 minutes"
}

// 2. src/data/sv/cheatsheets.json – samma post, översatt
{
  "id": 7,
  "key": "mittamne",
  "title": "Mitt Ämne",
  "description": "Kort beskrivning som visas på startsidans kort",
  "route": "/mittamne",
  "screenshot": "/images/mittamne.png",
  "difficulty": "beginner",
  "estimatedTime": "15 minuter"
}

// 3. src/App.jsx – lägg till lazy-importen och Route
const MittAmne = lazy(() => import('./pages/cheatsheets/MittAmne'));
// … inuti <Routes>:
<Route path="/mittamne" element={<MittAmne />} />
`,"/src/data/code-examples/cheatsheets/i18n-sv/override-skapa-lokalfiler.sh":`src/
  locales/
    en/
      common.json   ← Engelska UI-strängar (alltid obligatoriska)
    sv/
      common.json   ← Svenska UI-strängar
`,"/src/data/code-examples/cheatsheets/i18n-sv/override-skapa-src-i18n-js.js":`import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en/common.json';
import svTranslations from './locales/sv/common.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    sv: { translation: svTranslations },
  },
  // Återställ sparat språk; falla tillbaka till engelska
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React escapar redan värden
  },
});

export default i18n;
`,"/src/data/code-examples/cheatsheets/llmIntegration/01-choose-an-architecture-backend-proxy-only.js":`// ❌ DON'T: calling the LLM directly from the browser
// Anyone can open devtools → Network tab and steal this key, then run up
// your bill (or worse) using your account.

const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'x-api-key': 'sk-ant-...', // shipped to every visitor's browser
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    model: 'claude-sonnet-5', // check docs.claude.com for the current model ID - these change over time
    max_tokens: 1000,
    messages: [{ role: 'user', content: 'Find patterns in my migraine log' }],
  }),
});

// ✅ DO: the browser only ever talks to YOUR backend, over a route you
// control. Your backend holds the API key and forwards the request.
const analysis = await fetch('/api/migraines/analyze', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ entries: myMigraineLog }),
});
`,"/src/data/code-examples/cheatsheets/llmIntegration/02-install-the-sdk-store-your-api-key.sh":`npm install @anthropic-ai/sdk express cors dotenv

# .env  (never commit this file)
ANTHROPIC_API_KEY=sk-ant-your-real-key-here
PORT=3001

# .gitignore
echo ".env" >> .gitignore
`,"/src/data/code-examples/cheatsheets/llmIntegration/03-create-a-minimal-express-proxy-endpoint.js":`// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post('/api/migraines/analyze', async (req, res) => {
  // Steps 4-7 fill this handler in - for now just prove the wiring works.
  res.json({ received: Array.isArray(req.body.entries) });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(\`Proxy listening on :\${process.env.PORT || 3001}\`);
});
`,"/src/data/code-examples/cheatsheets/llmIntegration/04-shape-your-data-for-the-model.js":`// A migraine log entry, as it already exists in your app's state/DB
const exampleEntry = {
  date: '2026-08-14',
  painLevel: 7, // 1-10
  sleepHours: 5.5,
  stressLevel: 6, // 1-10, self-reported
  weather: 'low pressure system, storm',
  triggersNoted: ['skipped breakfast', 'bright screens'],
  medicationTaken: 'sumatriptan',
};

// Turn a raw array of entries into a compact block of text the model can
// reason over. Keep it dense (no giant JSON with repeated keys) - fewer
// tokens means a faster, cheaper call, and a smaller haystack to search.
function formatEntriesForPrompt(entries) {
  return entries
    .map((e) =>
      [
        \`Date: \${e.date}\`,
        \`Pain: \${e.painLevel}/10\`,
        \`Sleep: \${e.sleepHours}h\`,
        \`Stress: \${e.stressLevel}/10\`,
        \`Weather: \${e.weather || 'n/a'}\`,
        \`Triggers noted: \${e.triggersNoted?.join(', ') || 'none'}\`,
        \`Medication: \${e.medicationTaken || 'none'}\`,
      ].join(' | '),
    )
    .join('\\n');
}

export { formatEntriesForPrompt };
`,"/src/data/code-examples/cheatsheets/llmIntegration/05-write-a-focused-system-prompt.js":`const SYSTEM_PROMPT = \`You analyze a personal migraine log to surface *correlations*, not
diagnoses. You are not a doctor and must never claim causation or give
medical advice.

Rules:
- Only point out a pattern if it shows up in at least 3 separate entries.
- Every pattern must reference the specific dates that support it.
- Be explicit about uncertainty (e.g. "may be associated with", never
  "causes").
- If the log is too short or too noisy to find anything reliable, say so
  instead of inventing a pattern.
- Always end your output by suggesting the person discuss findings with a
  doctor before changing any medication or routine.

Respond with JSON only, matching this shape:
{
  "patterns": [
    { "factor": string, "confidence": "low" | "medium" | "high",
      "supportingDates": string[], "note": string }
  ],
  "summary": string
}\`;

export { SYSTEM_PROMPT };
`,"/src/data/code-examples/cheatsheets/llmIntegration/06-ask-for-structured-output-json.js":`function buildUserPrompt(entries) {
  return \`Here is the migraine log, one entry per line:\\n\\n\${formatEntriesForPrompt(
    entries,
  )}\\n\\nFind any patterns worth flagging.\`;
}

app.post('/api/migraines/analyze', async (req, res) => {
  const { entries } = req.body;

  if (!Array.isArray(entries) || entries.length === 0) {
    return res.status(400).json({ error: 'entries must be a non-empty array' });
  }

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-5', // check docs.claude.com for the current model ID - these change over time
    max_tokens: 1000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildUserPrompt(entries) }],
  });

  // Handled in the next step.
  res.json({ raw: message });
});
`,"/src/data/code-examples/cheatsheets/llmIntegration/07-parse-validate-the-response.js":`function extractJson(text) {
  // Models sometimes wrap JSON in \`\`\`json fences even when asked not to -
  // strip those before parsing rather than trusting the raw string.
  const cleaned = text.replace(/^\`\`\`(?:json)?\\n?/, '').replace(/\\n?\`\`\`$/, '');
  return JSON.parse(cleaned);
}

app.post('/api/migraines/analyze', async (req, res) => {
  const { entries } = req.body;
  if (!Array.isArray(entries) || entries.length === 0) {
    return res.status(400).json({ error: 'entries must be a non-empty array' });
  }

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-5', // check docs.claude.com for the current model ID - these change over time
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: buildUserPrompt(entries) },
      ],
    });

    const textBlock = message.content.find((block) => block.type === 'text');
    const result = extractJson(textBlock?.text ?? '');

    if (!Array.isArray(result.patterns) || typeof result.summary !== 'string') {
      throw new Error('Response did not match the expected shape');
    }

    res.json(result);
  } catch (err) {
    console.error('LLM analysis failed:', err);
    res.status(502).json({ error: 'Analysis is temporarily unavailable' });
  }
});
`,"/src/data/code-examples/cheatsheets/llmIntegration/08-call-the-endpoint-from-react.jsx":`function MigrainePatternInsights({ entries }) {
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [result, setResult] = useState(null);

  async function runAnalysis() {
    setStatus('loading');
    try {
      const res = await fetch('/api/migraines/analyze', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ entries }),
      });
      if (!res.ok) throw new Error(\`Server responded \${res.status}\`);
      setResult(await res.json());
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div>
      <button onClick={runAnalysis} disabled={status === 'loading' || entries.length < 5}>
        {status === 'loading' ? 'Analyzing…' : 'Find patterns'}
      </button>

      {status === 'error' && <p>Something went wrong - try again shortly.</p>}

      {status === 'done' && (
        <ul>
          {result.patterns.map((p) => (
            <li key={p.factor}>
              <strong>{p.factor}</strong> ({p.confidence} confidence) - {p.note}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
`,"/src/data/code-examples/cheatsheets/llmIntegration/09-handle-rate-limits-caching-cost.js":`import crypto from 'node:crypto';

// Cache by a hash of the data being analyzed, not by user id - if nothing
// in the log changed, the answer wouldn't either, so don't pay for (or
// wait on) a repeat call.
const cache = new Map(); // swap for Redis/your DB in production
const CACHE_TTL_MS = 1000 * 60 * 30;

function cacheKeyFor(entries) {
  return crypto.createHash('sha256').update(JSON.stringify(entries)).digest('hex');
}

app.post('/api/migraines/analyze', async (req, res) => {
  const { entries } = req.body;
  const key = cacheKeyFor(entries);
  const cached = cache.get(key);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return res.json(cached.result);
  }

  try {
    const result = await analyzeWithRetry(entries);
    cache.set(key, { result, at: Date.now() });
    res.json(result);
  } catch (err) {
    if (err.status === 429) {
      return res.status(429).json({ error: 'Rate limited - try again in a minute' });
    }
    throw err;
  }
});

// The SDK throws on 429s/5xxs - retry once with backoff instead of
// failing the whole request on a transient blip.
async function analyzeWithRetry(entries, attempt = 1) {
  try {
    return await callModel(entries);
  } catch (err) {
    if (attempt < 3 && (err.status === 429 || err.status >= 500)) {
      await new Promise((r) => setTimeout(r, attempt * 500));
      return analyzeWithRetry(entries, attempt + 1);
    }
    throw err;
  }
}
`,"/src/data/code-examples/cheatsheets/llmIntegration/10-common-errors-fixes.sh":`# "Access-Control-Allow-Origin" / CORS error in the browser console
#   → You called api.anthropic.com directly from the frontend, or forgot
#     app.use(cors()) on your Express server. Fix: only call your own
#     backend route from the browser (see Step 1).

# 401 { "type": "authentication_error" }
#   → ANTHROPIC_API_KEY is missing, wrong, or the .env file isn't loaded.
#     Confirm \`import 'dotenv/config'\` runs before you construct the
#     Anthropic client.

# SyntaxError: Unexpected token '\`' in JSON.parse
#   → The model wrapped its answer in \`\`\`json fences despite being told
#     not to. Strip fences before parsing (see Step 7's extractJson).

# 400 { "type": "invalid_request_error", ... max_tokens ... }
#   → max_tokens is required, and your prompt + expected answer must fit
#     the model's context window. Trim or summarize very long logs before
#     sending them.

# The model gives a diagnosis / medical advice instead of a correlation
#   → The system prompt isn't strict enough. Repeat the constraint in the
#     user message too, and lower temperature for more consistent, less
#     "creative" phrasing.

# Requests are fast locally but time out in production
#   → Set an explicit fetch/client timeout, and don't block the response
#     path on the LLM call for anything real-time - kick it off async and
#     poll, or use streaming (message.stream) for long analyses.
`,"/src/data/code-examples/cheatsheets/mongodb/01-create-mongodb-atlas-account-cluster.sh":`1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up" and create an account
3. Create a new project
4. Create a new Cluster (M0 tier is free)
5. Wait for cluster to be deployed (usually 1-2 minutes)
6. Go to 'Database Access' and create a database user
7. Set a password and save the credentials
8. Go to 'Network Access' and configure IP whitelist
`,"/src/data/code-examples/cheatsheets/mongodb/02-configure-network-access-ip-whitelist.sh":`Steps to configure IP Access List:
1. Go to MongoDB Atlas Dashboard
2. Click 'Network Access' in the left sidebar
3. Click 'Add IP Address' button
4. Choose one of the options:
   - Current IP Address: Adds your current IP (good for development)
   - Allow Access from Anywhere: Add 0.0.0.0/0 (allows all IPs)
5. Click 'Confirm'

For RENDER or cloud deployments:
- Click 'Add IP Address'
- Select 'Allow Access from Anywhere'
- Enter 0.0.0.0/0 in the IP address field
- Click 'Confirm'
- This allows connections from any IP address
`,"/src/data/code-examples/cheatsheets/mongodb/03-get-your-connection-string.sh":`1. Go to MongoDB Atlas Dashboard
2. Click 'Clusters' in the left sidebar
3. Click 'Connect' button on your cluster
4. Choose 'Connect your application'
5. Select 'Node.js' and version '3.0 or later'
6. Copy the connection string
   Example: mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database_name
7. Replace <password> with your actual database password
8. Store in your .env file as DATABASE_URL
`,"/src/data/code-examples/cheatsheets/mongodb/04-install-mongodb-connection-packages/a-env-configuration.sh":`# MongoDB Connection String
DATABASE_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myapp?retryWrites=true&w=majority

# Alternative for local MongoDB
# DATABASE_URL=mongodb://localhost:27017/myapp

# Node Environment
NODE_ENV=development

# Server Port
PORT=3000
`,"/src/data/code-examples/cheatsheets/mongodb/04-install-mongodb-connection-packages/b-basic-connection-setup.js":`require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('✓ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('✗ MongoDB connection error:', err);
    process.exit(1); // Exit if connection fails
  });

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});
`,"/src/data/code-examples/cheatsheets/mongodb/04-install-mongodb-connection-packages-sv/override-env-konfiguration.sh":`# MongoDB-anslutningssträng
DATABASE_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myapp?retryWrites=true&w=majority

# Alternativ för lokal MongoDB
# DATABASE_URL=mongodb://localhost:27017/myapp

# Node-miljö
NODE_ENV=development

# Serverport
PORT=3000
`,"/src/data/code-examples/cheatsheets/mongodb/04-install-mongodb-connection-packages-sv/override-grundlaggande-anslutningsinstallning.js":`require('dotenv').config();
const mongoose = require('mongoose');

// Anslut till MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('✓ Ansluten till MongoDB');
  })
  .catch((err) => {
    console.error('✗ MongoDB-anslutningsfel:', err);
    process.exit(1); // Avsluta om anslutning misslyckas
  });

// Hantera anslutningshändelser
mongoose.connection.on('connected', () => {
  console.log('Mongoose ansluten till MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose-anslutningsfel:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose frånkopplad från MongoDB');
});
`,"/src/data/code-examples/cheatsheets/mongodb/04-install-mongodb-connection-packages.sh":`npm install mongoose dotenv
`,"/src/data/code-examples/cheatsheets/mongodb/05-troubleshooting-connection-errors-dns-fix/a-dns-fix-implementation.js":`// Add this at the VERY TOP of your app.js or server.js file

// Option A: ES Modules (if package.json has "type": "module")
// import dns from "node:dns/promises";
// dns.setServers(["1.1.1.1"]);

// Option B: CommonJS (require) - default in most Node projects
const dns = require('node:dns/promises');
dns.setServers(["1.1.1.1"]);

// Then proceed with dotenv and mongoose
require('dotenv').config();
const mongoose = require('mongoose');

// Now your MongoDB connection should work
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('✓ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('✗ MongoDB connection error:', err);
  });
`,"/src/data/code-examples/cheatsheets/mongodb/05-troubleshooting-connection-errors-dns-fix/b-why-this-works.sh":`DNS Resolution Problem:
- MongoDB Atlas uses domain names (cluster0.xxxxx.mongodb.net)
- Your system needs to resolve these to IP addresses via DNS
- Sometimes default DNS servers are slow or unreliable
- This causes 'ENOTFOUND' or timeout errors

Solution:
- Use Cloudflare's public DNS (1.1.1.1)
- Also works: Google (8.8.8.8) or Quad9 (9.9.9.9)
- This is a proven workaround for Node.js DNS issues

Alternative DNS Servers:
1. Cloudflare: 1.1.1.1 (recommended)
2. Google: 8.8.8.8
3. Quad9: 9.9.9.9
4. OpenDNS: 208.67.222.222
`,"/src/data/code-examples/cheatsheets/mongodb/05-troubleshooting-connection-errors-dns-fix-sv/override-dns-fix-implementering.js":`// Lägg till detta LÄNGST UPP i din app.js eller server.js-fil

// Alternativ A: ES-moduler (om package.json har "type": "module")
// import dns from "node:dns/promises";
// dns.setServers(["1.1.1.1"]);

// Alternativ B: CommonJS (require) - standard i de flesta Node-projekt
const dns = require('node:dns/promises');
dns.setServers(["1.1.1.1"]);

// Fortsätt sedan med dotenv och mongoose
require('dotenv').config();
const mongoose = require('mongoose');

// Nu bör din MongoDB-anslutning fungera
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('✓ Ansluten till MongoDB');
  })
  .catch((err) => {
    console.error('✗ MongoDB-anslutningsfel:', err);
  });
`,"/src/data/code-examples/cheatsheets/mongodb/05-troubleshooting-connection-errors-dns-fix-sv/override-varfor-detta-fungerar.sh":`DNS-upplösningsproblem:
- MongoDB Atlas använder domännamn (cluster0.xxxxx.mongodb.net)
- Ditt system behöver lösa dessa till IP-adresser via DNS
- Ibland är standard-DNS-servrar långsamma eller opålitliga
- Detta orsakar 'ENOTFOUND' eller timeout-fel

Lösning:
- Använd Cloudflares offentliga DNS (1.1.1.1)
- Fungerar också: Google (8.8.8.8) eller Quad9 (9.9.9.9)
- Detta är en beprövad lösning för Node.js DNS-problem

Alternativa DNS-servrar:
1. Cloudflare: 1.1.1.1 (rekommenderas)
2. Google: 8.8.8.8
3. Quad9: 9.9.9.9
4. OpenDNS: 208.67.222.222
`,"/src/data/code-examples/cheatsheets/mongodb/05-troubleshooting-connection-errors-dns-fix.sh":`If you get error like:
- ENOTFOUND: cluster0.xxxxx.mongodb.net
- getaddrinfo ENOTFOUND
- Connection timeout errors

Add this at the very top of your main file (before any MongoDB code):
`,"/src/data/code-examples/cheatsheets/mongodb/06-mongodb-atlas-ip-whitelist-for-render.sh":`When deploying to Render:

1. MongoDB Atlas Dashboard
2. Click 'Network Access'
3. Click 'Add IP Address'
4. In the IP Address field: Enter 0.0.0.0/0
5. Click 'Confirm'
6. Click 'Add IP Address' again if you want to also add your local machine
7. Your local machine IP: Click 'Add Current IP Address'

0.0.0.0/0 means:
- Allow connections from ANY IP address
- Use this for cloud deployments (Render, Heroku, AWS, etc.)
- Less secure than specific IPs, but necessary for dynamic IPs
`,"/src/data/code-examples/cheatsheets/mongodb/07-define-mongoose-schemas-models.js":`const mongoose = require('mongoose');

// Define a user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
`,"/src/data/code-examples/cheatsheets/mongodb/08-basic-crud-operations.js":`const User = require('./models/User'); // Import your model

// CREATE - Add a new user
const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

// READ - Get user by ID
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

// READ - Get all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// UPDATE - Update user
const updateUser = async (userId, updateData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

// DELETE - Delete user
const deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};
`,"/src/data/code-examples/cheatsheets/mongodb/09-query-operators-filters.js":`const User = require('./models/User');

// Find by specific field
const userByEmail = await User.findOne({ email: 'user@example.com' });

// Find with multiple conditions (AND)
const activeAdmins = await User.find({
  role: 'admin',
  createdAt: { $gte: new Date('2024-01-01') }
});

// OR query
const searchResults = await User.find({
  $or: [
    { username: 'john' },
    { email: 'john@example.com' }
  ]
});

// Comparison operators
const users = await User.find({
  createdAt: {
    $gte: startDate,  // Greater than or equal
    $lt: endDate      // Less than
  }
});

// Sorting and limiting
const recentUsers = await User.find()
  .sort({ createdAt: -1 })  // -1 for descending, 1 for ascending
  .limit(10)                 // Limit to 10 results
  .skip(0);                  // Skip first 0 results (for pagination)

// Selecting specific fields
const usernames = await User.find()
  .select('username email')  // Include only these fields
  .select('-password');      // Exclude password field

// Common comparison operators:
// $eq: equal
// $ne: not equal
// $gt: greater than
// $gte: greater than or equal
// $lt: less than
// $lte: less than or equal
// $in: value in array
// $nin: value not in array
// $exists: field exists
// $type: check field type
`,"/src/data/code-examples/cheatsheets/mongodb/10-connection-pooling-best-practices.js":`// Advanced connection options
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      // Connection pooling
      maxPoolSize: 10,        // Maximum pool size
      minPoolSize: 5,         // Minimum pool size
      maxIdleTimeMS: 45000,   // Close connections after 45 seconds of inactivity
      
      // Timeouts
      socketTimeoutMS: 45000,  // Socket timeout (in milliseconds)
      serverSelectionTimeoutMS: 5000,  // Server selection timeout
      
      // Retry logic
      retryWrites: true,      // Automatically retry writes
      retryReads: true,       // Automatically retry reads
      
      // Other options
      family: 4               // Use IPv4
    });
    
    console.log('✓ MongoDB connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// Call this in your main app file
connectDB();

// Best Practices:
// 1. Use connection pooling to reuse connections
// 2. Set appropriate timeouts for your application
// 3. Enable retry logic for better reliability
// 4. Close connections gracefully on app shutdown
// 5. Use indexes on frequently queried fields
// 6. Monitor connection pool usage
`,"/src/data/code-examples/cheatsheets/mongodb/11-common-connection-errors-solutions.sh":`Error: connect ECONNREFUSED 127.0.0.1:27017
Solution: MongoDB server is not running. Start MongoDB service.

Error: MongoAuthenticationError: authentication failed
Solution: Wrong username/password. Check credentials in .env file.

Error: MongoServerError: connect ENOTFOUND
Solution: DNS resolution failed. Add DNS configuration (see DNS Fix step).

Error: connect ETIMEDOUT
Solution: 
- Network/firewall issue
- Timeout too short (increase socketTimeoutMS)
- Server unreachable

Error: FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed
Solution: Out of memory. Reduce pool size or check for memory leaks.

Error: MongooseError: Trying to open an unclosed connection.
Solution: Database already connected. Remove duplicate connection calls.

Debugging checklist:
□ Check .env file has DATABASE_URL set correctly
□ Verify MongoDB service is running
□ Check IP whitelist in MongoDB Atlas (0.0.0.0/0 for cloud)
□ Verify username and password are correct
□ Test connection string manually
□ Check network/firewall settings
□ Review MongoDB logs for errors
`,"/src/data/code-examples/cheatsheets/mongodb-sv/override-connection-pooling-basta-praxis.js":`// Avancerade anslutningsalternativ
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      // Connection pooling
      maxPoolSize: 10,        // Maximal poolstorlek
      minPoolSize: 5,         // Minimal poolstorlek
      maxIdleTimeMS: 45000,   // Stäng anslutningar efter 45 sekunders inaktivitet
      
      // Timeouts
      socketTimeoutMS: 45000,  // Socket timeout (i millisekunder)
      serverSelectionTimeoutMS: 5000,  // Server selection timeout
      
      // Retry-logik
      retryWrites: true,      // Försök automatiskt skriva om
      retryReads: true,       // Försök automatiskt läsa om
      
      // Andra alternativ
      family: 4               // Använd IPv4
    });
    
    console.log('✓ MongoDB ansluten framgångsrikt');
    return mongoose.connection;
  } catch (error) {
    console.error('✗ MongoDB-anslutning misslyckades:', error.message);
    process.exit(1);
  }
};

// Anropa detta i din huvudapp-fil
connectDB();

// Bästa praxis:
// 1. Använd connection pooling för att återanvända anslutningar
// 2. Sätt lämpliga timeouts för din applikation
// 3. Aktivera retry-logik för bättre tillförlitlighet
// 4. Stäng anslutningar på ett korrekt sätt vid app-avstängning
// 5. Använd index på ofta efterfrågade fält
// 6. Övervaka användning av connection pool
`,"/src/data/code-examples/cheatsheets/mongodb-sv/override-definiera-mongoose-scheman-modeller.js":`const mongoose = require('mongoose');

// Definiera ett användarschema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Användarnamn krävs'],
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/, 'Vänligen ange en giltig e-postadress']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // Inkludera inte lösenord i queries som standard
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Skapa och exportera modellen
const User = mongoose.model('User', userSchema);
module.exports = User;
`,"/src/data/code-examples/cheatsheets/mongodb-sv/override-felsokning-anslutningsfel-dns-fix.sh":`Om du får fel som:
- ENOTFOUND: cluster0.xxxxx.mongodb.net
- getaddrinfo ENOTFOUND
- Connection timeout-fel

Lägg till detta längst upp i din huvudfil (före all MongoDB-kod):
`,"/src/data/code-examples/cheatsheets/mongodb-sv/override-grundlaggande-crud-operationer.js":`const User = require('./models/User'); // Importera din modell

// CREATE - Lägg till ny användare
const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    console.error('Fel vid skapande av användare:', error);
  }
};

// READ - Hämta användare via ID
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error('Fel vid hämtning av användare:', error);
  }
};

// READ - Hämta alla användare
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error('Fel vid hämtning av användare:', error);
  }
};

// UPDATE - Uppdatera användare
const updateUser = async (userId, updateData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );
    return updatedUser;
  } catch (error) {
    console.error('Fel vid uppdatering av användare:', error);
  }
};

// DELETE - Ta bort användare
const deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  } catch (error) {
    console.error('Fel vid borttagning av användare:', error);
  }
};
`,"/src/data/code-examples/cheatsheets/mongodb-sv/override-hamta-din-anslutningsstrang.sh":`1. Gå till MongoDB Atlas Dashboard
2. Klicka 'Clusters' i sidofältet
3. Klicka 'Connect'-knappen på ditt kluster
4. Välj 'Connect your application'
5. Välj 'Node.js' och version '3.0 or later'
6. Kopiera anslutningssträngen
   Exempel: mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database_name
7. Ersätt <password> med ditt faktiska databaslösenord
8. Lagra i din .env-fil som DATABASE_URL
`,"/src/data/code-examples/cheatsheets/mongodb-sv/override-konfigurera-natverksatkomst-ip-vitlista.sh":`Steg för att konfigurera IP Access List:
1. Gå till MongoDB Atlas Dashboard
2. Klicka 'Network Access' i sidofältet
3. Klicka 'Add IP Address'-knappen
4. Välj ett av alternativen:
   - Current IP Address: Lägger till din nuvarande IP (bra för utveckling)
   - Allow Access from Anywhere: Lägg till 0.0.0.0/0 (tillåter alla IP:er)
5. Klicka 'Confirm'

För RENDER eller molndistributioner:
- Klicka 'Add IP Address'
- Välj 'Allow Access from Anywhere'
- Ange 0.0.0.0/0 i IP-adressfältet
- Klicka 'Confirm'
- Detta tillåter anslutningar från vilken IP-adress som helst
`,"/src/data/code-examples/cheatsheets/mongodb-sv/override-mongodb-atlas-ip-vitlista-for-render.sh":`Vid distribution till Render:

1. MongoDB Atlas Dashboard
2. Klicka 'Network Access'
3. Klicka 'Add IP Address'
4. I IP Address-fältet: Ange 0.0.0.0/0
5. Klicka 'Confirm'
6. Klicka 'Add IP Address' igen om du också vill lägga till din lokala maskin
7. Din lokala maskin IP: Klicka 'Add Current IP Address'

0.0.0.0/0 betyder:
- Tillåt anslutningar från VILKEN IP-adress som helst
- Använd detta för molndistributioner (Render, Heroku, AWS, etc.)
- Mindre säkert än specifika IP:er, men nödvändigt för dynamiska IP:er
`,"/src/data/code-examples/cheatsheets/mongodb-sv/override-query-operatorer-filter.js":`const User = require('./models/User');

// Hitta via specifikt fält
const userByEmail = await User.findOne({ email: 'user@example.com' });

// Hitta med flera villkor (AND)
const activeAdmins = await User.find({
  role: 'admin',
  createdAt: { $gte: new Date('2024-01-01') }
});

// OR-query
const searchResults = await User.find({
  $or: [
    { username: 'john' },
    { email: 'john@example.com' }
  ]
});

// Jämförelseoperatorer
const users = await User.find({
  createdAt: {
    $gte: startDate,  // Större än eller lika med
    $lt: endDate      // Mindre än
  }
});

// Sortering och begränsning
const recentUsers = await User.find()
  .sort({ createdAt: -1 })  // -1 för fallande, 1 för stigande
  .limit(10)                 // Begränsa till 10 resultat
  .skip(0);                  // Hoppa över första 0 resultat (för paginering)

// Välja specifika fält
const usernames = await User.find()
  .select('username email')  // Inkludera endast dessa fält
  .select('-password');      // Exkludera lösenordsfält

// Vanliga jämförelseoperatorer:
// $eq: lika med
// $ne: inte lika med
// $gt: större än
// $gte: större än eller lika med
// $lt: mindre än
// $lte: mindre än eller lika med
// $in: värde i array
// $nin: värde inte i array
// $exists: fält finns
// $type: kontrollera fälttyp
`,"/src/data/code-examples/cheatsheets/mongodb-sv/override-skapa-mongodb-atlas-konto-kluster.sh":`1. Gå till https://www.mongodb.com/cloud/atlas
2. Klicka "Sign Up" och skapa ett konto
3. Skapa ett nytt projekt
4. Skapa ett nytt Kluster (M0-nivå är gratis)
5. Vänta på att klustret distribueras (vanligtvis 1-2 minuter)
6. Gå till 'Database Access' och skapa en databasanvändare
7. Sätt ett lösenord och spara referenserna
8. Gå till 'Network Access' och konfigurera IP-vitlistan
`,"/src/data/code-examples/cheatsheets/mongodb-sv/override-vanliga-anslutningsfel-losningar.sh":`Error: connect ECONNREFUSED 127.0.0.1:27017
Lösning: MongoDB-server körs inte. Starta MongoDB-tjänsten.

Error: MongoAuthenticationError: authentication failed
Lösning: Fel användarnamn/lösenord. Kontrollera referenser i .env-fil.

Error: MongoServerError: connect ENOTFOUND
Lösning: DNS-upplösning misslyckades. Lägg till DNS-konfiguration (se DNS-fix-steget).

Error: connect ETIMEDOUT
Lösning: 
- Nätverks-/brandväggsproblem
- Timeout för kort (öka socketTimeoutMS)
- Server onåbar

Error: FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed
Lösning: Slut på minne. Minska poolstorlek eller kontrollera minnesläckor.

Error: MongooseError: Trying to open an unclosed connection.
Lösning: Databas redan ansluten. Ta bort dubbletter av anslutningsanrop.

Felsökningschecklista:
□ Kontrollera att .env-fil har DATABASE_URL korrekt satt
□ Verifiera att MongoDB-tjänsten körs
□ Kontrollera IP-vitlista i MongoDB Atlas (0.0.0.0/0 för moln)
□ Verifiera att användarnamn och lösenord är korrekta
□ Testa anslutningssträng manuellt
□ Kontrollera nätverks-/brandväggsinställningar
□ Granska MongoDB-loggar för fel
`,"/src/data/code-examples/cheatsheets/npmLibraries/01-install-core-express-packages.sh":`npm install express express-session cookie-parser dotenv method-override
`,"/src/data/code-examples/cheatsheets/npmLibraries/02-express-web-framework.js":`const express = require('express');
const app = express();

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
`,"/src/data/code-examples/cheatsheets/npmLibraries/03-dotenv-environment-variables/a-sample-env-file.sh":`PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp
SESSION_SECRET=your-secret-key-here
JWT_SECRET=your-jwt-secret-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
`,"/src/data/code-examples/cheatsheets/npmLibraries/03-dotenv-environment-variables.js":`// At the very top of your main file (e.g., app.js or server.js)
require('dotenv').config();

// Now you can access environment variables
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DATABASE_URL;
const SECRET = process.env.SESSION_SECRET;
`,"/src/data/code-examples/cheatsheets/npmLibraries/04-install-database-packages/a-mongoose-mongodb-odm.js":`const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create a model
const User = mongoose.model('User', userSchema);

module.exports = User;
`,"/src/data/code-examples/cheatsheets/npmLibraries/04-install-database-packages-sv/override-mongoose-mongodb-odm.js":`const mongoose = require('mongoose');

// Anslut till MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Ansluten till MongoDB'))
  .catch(err => console.error('MongoDB-anslutningsfel:', err));

// Definiera ett schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Skapa en modell
const User = mongoose.model('User', userSchema);

module.exports = User;
`,"/src/data/code-examples/cheatsheets/npmLibraries/04-install-database-packages.sh":`npm install mongoose connect-mongo
`,"/src/data/code-examples/cheatsheets/npmLibraries/05-express-session-session-management.js":`const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL,
    touchAfter: 24 * 3600 // Lazy session update (in seconds)
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' // HTTPS only in production
  }
}));
`,"/src/data/code-examples/cheatsheets/npmLibraries/06-cookie-parser-parse-cookies.js":`const cookieParser = require('cookie-parser');

app.use(cookieParser());

// Read cookies
app.get('/profile', (req, res) => {
  const theme = req.cookies.theme || 'light';
  res.send(\`Current theme: \${theme}\`);
});

// Set cookies
app.post('/theme', (req, res) => {
  res.cookie('theme', req.body.theme, {
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    httpOnly: true
  });
  res.send('Theme updated');
});
`,"/src/data/code-examples/cheatsheets/npmLibraries/07-install-authentication-security-packages/a-bcrypt-password-hashing.js":`const bcrypt = require('bcrypt');

// Hash a password (during registration)
const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Compare password (during login)
const verifyPassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch; // true or false
};

// Example usage
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await hashPassword(password);
  // Save user with hashedPassword to database
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.send('User registered');
});
`,"/src/data/code-examples/cheatsheets/npmLibraries/07-install-authentication-security-packages/b-jsonwebtoken-jwt-authentication.js":`const jwt = require('jsonwebtoken');

// Generate a token (after login)
const generateToken = (userId) => {
  const token = jwt.sign(
    { userId }, // Payload
    process.env.JWT_SECRET,
    { expiresIn: '7d' } // Token expires in 7 days
  );
  return token;
};

// Verify token (middleware)
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer TOKEN
  
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.userId = decoded.userId;
    next();
  });
};

// Protected route example
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({ userId: req.userId });
});
`,"/src/data/code-examples/cheatsheets/npmLibraries/07-install-authentication-security-packages-sv/override-bcrypt-losenordshashning.js":`const bcrypt = require('bcrypt');

// Hasha ett lösenord (vid registrering)
const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Jämför lösenord (vid inloggning)
const verifyPassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch; // true eller false
};

// Exempel användning
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await hashPassword(password);
  // Spara användare med hashedPassword till databas
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.send('Användare registrerad');
});
`,"/src/data/code-examples/cheatsheets/npmLibraries/07-install-authentication-security-packages-sv/override-jsonwebtoken-jwt-autentisering.js":`const jwt = require('jsonwebtoken');

// Generera en token (efter inloggning)
const generateToken = (userId) => {
  const token = jwt.sign(
    { userId }, // Payload
    process.env.JWT_SECRET,
    { expiresIn: '7d' } // Token går ut om 7 dagar
  );
  return token;
};

// Verifiera token (middleware)
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer TOKEN
  
  if (!token) return res.status(401).json({ error: 'Åtkomst nekad' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Ogiltig token' });
    req.userId = decoded.userId;
    next();
  });
};

// Exempel på skyddad route
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({ userId: req.userId });
});
`,"/src/data/code-examples/cheatsheets/npmLibraries/07-install-authentication-security-packages.sh":`npm install bcrypt jsonwebtoken
`,"/src/data/code-examples/cheatsheets/npmLibraries/08-install-templating-packages/a-ejs-embedded-javascript-templates.js":`const express = require('express');
const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Render a view
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home Page',
    user: { name: 'John', age: 30 }
  });
});
`,"/src/data/code-examples/cheatsheets/npmLibraries/08-install-templating-packages/b-ejs-template-example.html":`<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <h1>Welcome, <%= user.name %>!</h1>
  <p>You are <%= user.age %> years old.</p>
  
  <% if (user.age >= 18) { %>
    <p>You are an adult.</p>
  <% } else { %>
    <p>You are a minor.</p>
  <% } %>
  
  <ul>
    <% ['Apple', 'Banana', 'Orange'].forEach(fruit => { %>
      <li><%= fruit %></li>
    <% }); %>
  </ul>
</body>
</html>
`,"/src/data/code-examples/cheatsheets/npmLibraries/08-install-templating-packages/c-express-ejs-layouts-layout-support.js":`const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.set('layout', 'layouts/main'); // Default layout file

// views/layouts/main.ejs
// <!DOCTYPE html>
// <html>
// <head>
//   <title>My App</title>
// </head>
// <body>
//   <%- body %>
// </body>
// </html>
`,"/src/data/code-examples/cheatsheets/npmLibraries/08-install-templating-packages-sv/override-ejs-embedded-javascript-templates.js":`const express = require('express');
const app = express();

// Sätt EJS som view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Rendera en vy
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Startsida',
    user: { name: 'John', age: 30 }
  });
});
`,"/src/data/code-examples/cheatsheets/npmLibraries/08-install-templating-packages-sv/override-exempel-pa-ejs-mall.html":`<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <h1>Välkommen, <%= user.name %>!</h1>
  <p>Du är <%= user.age %> år gammal.</p>
  
  <% if (user.age >= 18) { %>
    <p>Du är vuxen.</p>
  <% } else { %>
    <p>Du är minderårig.</p>
  <% } %>
  
  <ul>
    <% ['Äpple', 'Banan', 'Apelsin'].forEach(fruit => { %>
      <li><%= fruit %></li>
    <% }); %>
  </ul>
</body>
</html>
`,"/src/data/code-examples/cheatsheets/npmLibraries/08-install-templating-packages-sv/override-express-ejs-layouts-layout-stod.js":`const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.set('layout', 'layouts/main'); // Standard layout-fil

// views/layouts/main.ejs
// <!DOCTYPE html>
// <html>
// <head>
//   <title>Min App</title>
// </head>
// <body>
//   <%- body %>
// </body>
// </html>
`,"/src/data/code-examples/cheatsheets/npmLibraries/08-install-templating-packages.sh":`npm install ejs express-ejs-layouts
`,"/src/data/code-examples/cheatsheets/npmLibraries/09-method-override-http-method-override.js":`const methodOverride = require('method-override');

app.use(methodOverride('_method'));

// HTML form with DELETE method
// <form action="/posts/123?_method=DELETE" method="POST">
//   <button type="submit">Delete Post</button>
// </form>

app.delete('/posts/:id', (req, res) => {
  // Handle DELETE request
  res.send(\`Deleted post \${req.params.id}\`);
});
`,"/src/data/code-examples/cheatsheets/npmLibraries/10-install-email-package/a-nodemailer-send-emails.js":`const nodemailer = require('nodemailer');

// Create a transporter (Gmail example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Use App Password, not regular password
  }
});

// Send an email
const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html // Optional HTML version
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Example usage
app.post('/contact', async (req, res) => {
  const { email, message } = req.body;
  await sendEmail(
    'admin@example.com',
    'New Contact Message',
    message,
    \`<p>\${message}</p><p>From: \${email}</p>\`
  );
  res.send('Message sent!');
});
`,"/src/data/code-examples/cheatsheets/npmLibraries/10-install-email-package/b-nodemailer-email-templates.js":`const sendWelcomeEmail = async (userEmail, username) => {
  const htmlTemplate = \`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .button { background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome, \${username}!</h1>
        <p>Thank you for joining our platform.</p>
        <a href="https://yoursite.com/verify" class="button">Verify Email</a>
      </div>
    </body>
    </html>
  \`;
  
  await sendEmail(
    userEmail,
    'Welcome to Our Platform!',
    \`Welcome, \${username}! Thank you for joining.\`,
    htmlTemplate
  );
};

// Usage after user registration
app.post('/register', async (req, res) => {
  // ... create user ...
  await sendWelcomeEmail(user.email, user.username);
  res.send('Registration successful! Check your email.');
});
`,"/src/data/code-examples/cheatsheets/npmLibraries/10-install-email-package-sv/override-nodemailer-e-postmallar.js":`const sendWelcomeEmail = async (userEmail, username) => {
  const htmlTemplate = \`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .button { background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Välkommen, \${username}!</h1>
        <p>Tack för att du gick med i vår plattform.</p>
        <a href="https://yoursite.com/verify" class="button">Verifiera E-post</a>
      </div>
    </body>
    </html>
  \`;
  
  await sendEmail(
    userEmail,
    'Välkommen till vår plattform!',
    \`Välkommen, \${username}! Tack för att du gick med.\`,
    htmlTemplate
  );
};

// Användning efter användarregistrering
app.post('/register', async (req, res) => {
  // ... skapa användare ...
  await sendWelcomeEmail(user.email, user.username);
  res.send('Registrering lyckad! Kolla din e-post.');
});
`,"/src/data/code-examples/cheatsheets/npmLibraries/10-install-email-package-sv/override-nodemailer-skicka-e-post.js":`const nodemailer = require('nodemailer');

// Skapa en transporter (Gmail-exempel)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Använd App Password, inte vanligt lösenord
  }
});

// Skicka ett e-postmeddelande
const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html // Valfri HTML-version
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-post skickat:', info.messageId);
    return info;
  } catch (error) {
    console.error('Fel vid skickande av e-post:', error);
    throw error;
  }
};

// Exempel användning
app.post('/contact', async (req, res) => {
  const { email, message } = req.body;
  await sendEmail(
    'admin@example.com',
    'Nytt kontaktmeddelande',
    message,
    \`<p>\${message}</p><p>Från: \${email}</p>\`
  );
  res.send('Meddelande skickat!');
});
`,"/src/data/code-examples/cheatsheets/npmLibraries/10-install-email-package.sh":`npm install nodemailer
`,"/src/data/code-examples/cheatsheets/npmLibraries/11-install-all-packages-at-once.sh":`npm install express express-session cookie-parser dotenv method-override mongoose connect-mongo bcrypt jsonwebtoken ejs express-ejs-layouts nodemailer
`,"/src/data/code-examples/cheatsheets/npmLibraries/12-complete-express-app-setup-example.js":`require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

// View engine setup
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});
`,"/src/data/code-examples/cheatsheets/npmLibraries-sv/override-cookie-parser-parsa-cookies.js":`const cookieParser = require('cookie-parser');

app.use(cookieParser());

// Läs cookies
app.get('/profile', (req, res) => {
  const theme = req.cookies.theme || 'light';
  res.send(\`Aktuellt tema: \${theme}\`);
});

// Sätt cookies
app.post('/theme', (req, res) => {
  res.cookie('theme', req.body.theme, {
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 år
    httpOnly: true
  });
  res.send('Tema uppdaterat');
});
`,"/src/data/code-examples/cheatsheets/npmLibraries-sv/override-dotenv-miljovariabler.js":`// Längst upp i din huvudfil (t.ex. app.js eller server.js)
require('dotenv').config();

// Nu kan du komma åt miljövariabler
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DATABASE_URL;
const SECRET = process.env.SESSION_SECRET;
`,"/src/data/code-examples/cheatsheets/npmLibraries-sv/override-express-session-sessionshantering.js":`const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL,
    touchAfter: 24 * 3600 // Lazy session-uppdatering (i sekunder)
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 vecka
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' // Endast HTTPS i produktion
  }
}));
`,"/src/data/code-examples/cheatsheets/npmLibraries-sv/override-express-webbramverk.js":`const express = require('express');
const app = express();

app.use(express.json()); // Parsa JSON-bodies
app.use(express.urlencoded({ extended: true })); // Parsa URL-kodade bodies

app.get('/', (req, res) => {
  res.send('Hej världen!');
});

app.listen(3000, () => {
  console.log('Server körs på port 3000');
});
`,"/src/data/code-examples/cheatsheets/npmLibraries-sv/override-komplett-express-appinstallning-exempel.js":`require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

// Anslut till MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Ansluten till MongoDB'))
  .catch(err => console.error('MongoDB-fel:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Sessionskonfiguration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

// View engine-inställning
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Hem' });
});

// Starta server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server körs på http://localhost:\${PORT}\`);
});
`,"/src/data/code-examples/cheatsheets/npmLibraries-sv/override-method-override-http-method-override.js":`const methodOverride = require('method-override');

app.use(methodOverride('_method'));

// HTML-formulär med DELETE-metod
// <form action="/posts/123?_method=DELETE" method="POST">
//   <button type="submit">Ta bort inlägg</button>
// </form>

app.delete('/posts/:id', (req, res) => {
  // Hantera DELETE-förfrågan
  res.send(\`Tog bort inlägg \${req.params.id}\`);
});
`,"/src/data/code-examples/cheatsheets/projectSetup/01-create-a-vite-react-project.sh":`npm create vite@latest frontend -- --template react
`,"/src/data/code-examples/cheatsheets/projectSetup/02-navigate-to-project-install-dependencies.sh":`cd frontend
npm install
`,"/src/data/code-examples/cheatsheets/projectSetup/03-install-redux-state-management.sh":`npm install @reduxjs/toolkit react-redux
`,"/src/data/code-examples/cheatsheets/projectSetup/04-install-tailwind-css-with-vite-plugin-optional.sh":`npm install tailwindcss @tailwindcss/vite
`,"/src/data/code-examples/cheatsheets/projectSetup/05-configure-tailwind-in-vite-config-js-optional.js":`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
})
`,"/src/data/code-examples/cheatsheets/projectSetup/06-add-tailwind-directives-to-css-optional.css":`@import "tailwindcss";
`,"/src/data/code-examples/cheatsheets/projectSetup/07-install-react-router-for-navigation.sh":`npm install react-router-dom
`,"/src/data/code-examples/cheatsheets/projectSetup/08-create-redux-store-structure.js":`// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // Add your slices here
    // example: exampleSlice,
  },
});
`,"/src/data/code-examples/cheatsheets/projectSetup/09-wrap-your-app-with-redux-provider.js":`// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store } from './redux/store'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
`,"/src/data/code-examples/cheatsheets/projectSetup/10-create-routes-with-react-router.js":`// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
`,"/src/data/code-examples/cheatsheets/projectSetup/11-optional-add-development-tools.sh":`npm install --save-dev eslint prettier
npm install @reduxjs/toolkit redux-devtools
`,"/src/data/code-examples/cheatsheets/projectSetup/12-optional-environment-variables-setup.sh":`# .env.local
VITE_API_URL=http://localhost:3000/api
VITE_API_KEY=your_key_here
`,"/src/data/code-examples/cheatsheets/projectSetup/backend-setup/01-create-backend-directory.sh":`mkdir backend && cd backend && npm init -y
`,"/src/data/code-examples/cheatsheets/projectSetup/backend-setup/02-install-express-and-essentials.sh":`npm install express cors dotenv axios
`,"/src/data/code-examples/cheatsheets/projectSetup/backend-setup/03-basic-express-server.js":`// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(3000, () => console.log('Server on port 3000'));
`,"/src/data/code-examples/cheatsheets/projectSetup/backend-setup-sv/override-grundlaggande-express-server.js":`// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hej från backend!' });
});

app.listen(3000, () => console.log('Server på port 3000'));
`,"/src/data/code-examples/cheatsheets/projectSetup-sv/override-skapa-redux-store-struktur.js":`// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // Lägg till dina slices här
    // exempel: exampleSlice,
  },
});
`,"/src/data/code-examples/cheatsheets/sql/01-set-up-a-database-local-or-hosted.sh":`Option A: Install locally
1. macOS: brew install postgresql@16 && brew services start postgresql@16
2. Windows/Linux: download from https://www.postgresql.org/download/
3. Verify it's running: psql --version

Option B: Use a free hosted instance (no install required)
1. Create an account at Supabase, Neon, or Render
2. Create a new PostgreSQL project/database
3. Wait for it to provision (usually under a minute)
4. Note the host, port, username, password, and database name shown in the dashboard
`,"/src/data/code-examples/cheatsheets/sql/02-get-your-connection-string.sh":`postgresql://username:password@host:5432/database_name

Example (hosted):
postgresql://postgres:mypassword@db.xxxxxxxxxxxx.supabase.co:5432/postgres

Example (local):
postgresql://postgres:postgres@localhost:5432/myapp
`,"/src/data/code-examples/cheatsheets/sql/03-install-driver-packages/a-env-configuration.sh":`# PostgreSQL Connection String
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/myapp

# Node Environment
NODE_ENV=development

# Server Port
PORT=3000
`,"/src/data/code-examples/cheatsheets/sql/03-install-driver-packages-sv/override-env-konfiguration.sh":`# PostgreSQL-anslutningssträng
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/myapp

# Node-miljö
NODE_ENV=development

# Serverport
PORT=3000
`,"/src/data/code-examples/cheatsheets/sql/03-install-driver-packages.sh":`npm install pg dotenv
`,"/src/data/code-examples/cheatsheets/sql/04-connect-from-node-js.js":`require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection
pool.query('SELECT NOW()')
  .then((result) => {
    console.log('✓ Connected to PostgreSQL:', result.rows[0]);
  })
  .catch((err) => {
    console.error('✗ Database connection error:', err);
    process.exit(1);
  });

module.exports = pool;
`,"/src/data/code-examples/cheatsheets/sql/05-create-a-database-table.sql":`CREATE DATABASE myapp;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
`,"/src/data/code-examples/cheatsheets/sql/06-common-data-types.sql":`INT / INTEGER        -- whole numbers
BIGINT                -- large whole numbers
DECIMAL(10, 2)        -- exact decimals (money!)
FLOAT / DOUBLE         -- approximate decimals
VARCHAR(n)             -- variable-length text, max n chars
TEXT                   -- long-form text, no length limit
BOOLEAN                -- true / false
DATE                   -- year, month, day
TIMESTAMP              -- date + time
JSON / JSONB           -- structured data (PostgreSQL: prefer JSONB)
UUID                   -- universally unique identifier
`,"/src/data/code-examples/cheatsheets/sql/07-insert-update-delete-rows.sql":`-- INSERT one row
INSERT INTO users (username, email, role)
VALUES ('jdoe', 'jdoe@example.com', 'admin');

-- INSERT multiple rows at once
INSERT INTO users (username, email)
VALUES
  ('asmith', 'asmith@example.com'),
  ('bwong', 'bwong@example.com');

-- UPDATE existing rows
UPDATE users
SET role = 'admin'
WHERE username = 'jdoe';

-- DELETE rows
DELETE FROM users
WHERE role = 'guest';
`,"/src/data/code-examples/cheatsheets/sql/08-select-filter-with-where.sql":`-- All columns, all rows
SELECT * FROM users;

-- Specific columns, filtered
SELECT username, email FROM users
WHERE role = 'admin';

-- Multiple conditions
SELECT * FROM users
WHERE role = 'admin' AND created_at > '2025-01-01';

-- Pattern matching, ranges, sets
SELECT * FROM users WHERE username LIKE 'j%';
SELECT * FROM users WHERE id BETWEEN 10 AND 20;
SELECT * FROM users WHERE role IN ('admin', 'editor');
SELECT * FROM users WHERE email IS NOT NULL;

-- Sort and page through results
SELECT * FROM users
ORDER BY created_at DESC
LIMIT 10 OFFSET 20;
`,"/src/data/code-examples/cheatsheets/sql/09-joins-across-tables.sql":`-- INNER JOIN: only rows with a match on both sides
SELECT orders.id, users.username, orders.total
FROM orders
INNER JOIN users ON orders.user_id = users.id;

-- LEFT JOIN: every user, even if they have no orders
SELECT users.username, orders.id AS order_id
FROM users
LEFT JOIN orders ON orders.user_id = users.id;

-- Joining three tables
SELECT o.id, u.username, p.name AS product
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON p.id = oi.product_id;
`,"/src/data/code-examples/cheatsheets/sql/10-aggregate-functions-group-by.sql":`-- Count, sum, average across the whole table
SELECT COUNT(*) AS total_users FROM users;
SELECT SUM(total) AS revenue FROM orders;
SELECT AVG(total) AS avg_order FROM orders;

-- One row per group
SELECT role, COUNT(*) AS user_count
FROM users
GROUP BY role;

-- Filter groups with HAVING (not WHERE)
SELECT user_id, COUNT(*) AS order_count
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 5;
`,"/src/data/code-examples/cheatsheets/sql/11-constraints-relationships.sql":`CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total DECIMAL(10, 2) NOT NULL CHECK (total >= 0),
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Common constraint types:
-- PRIMARY KEY   uniquely identifies each row
-- FOREIGN KEY   (REFERENCES) links to another table's primary key
-- NOT NULL      column must always have a value
-- UNIQUE        no two rows can share this value
-- CHECK         value must satisfy a boolean expression
-- DEFAULT       value used when none is provided
`,"/src/data/code-examples/cheatsheets/sql/12-indexes-for-query-performance.sql":`-- Speed up lookups/filters on a column
CREATE INDEX idx_users_email ON users(email);

-- Composite index, for queries that filter on both columns together
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Enforce uniqueness AND speed up lookups
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- See what an index actually does for a query
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'jdoe@example.com';
`,"/src/data/code-examples/cheatsheets/sql/13-transactions.sql":`BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- If both updates succeeded, make them permanent
COMMIT;

-- If anything went wrong, undo everything since BEGIN
-- ROLLBACK;
`,"/src/data/code-examples/cheatsheets/sql/14-common-errors-fixes.sh":`Error: duplicate key value violates unique constraint
Cause: Inserting a value that already exists in a UNIQUE or PRIMARY KEY column.
Fix: Check for an existing row first, or use an upsert (INSERT ... ON CONFLICT).

Error: null value in column violates not-null constraint
Cause: Missing a required column in an INSERT.
Fix: Provide a value, or give the column a DEFAULT.

Error: syntax error at or near "..."
Cause: Usually a missing comma, unmatched quote, or a keyword used as a column name.
Fix: Read the query right-to-left from the pointed-to token; SQL errors report where parsing broke, not necessarily the real mistake.

Error: relation "table_name" does not exist
Cause: Typo in the table name, wrong schema/database, or the table was never created.
Fix: \\dt in psql (or SHOW TABLES; in MySQL) to list what actually exists.

Error: column "x" does not exist / Unknown column 'x' in 'field list'
Cause: Typo, or referencing a column that isn't in scope for a JOIN.
Fix: Qualify the column with its table alias, e.g. u.username instead of username.

Error: current transaction is aborted, commands ignored until end of transaction block
Cause: An earlier statement inside a transaction failed, and PostgreSQL blocks further commands until you resolve it.
Fix: ROLLBACK, then retry the whole transaction.
`,"/src/data/code-examples/cheatsheets/sql-sv/override-aggregeringsfunktioner-group-by.sql":`-- Räkna, summera, genomsnitt över hela tabellen
SELECT COUNT(*) AS total_users FROM users;
SELECT SUM(total) AS revenue FROM orders;
SELECT AVG(total) AS avg_order FROM orders;

-- En rad per grupp
SELECT role, COUNT(*) AS user_count
FROM users
GROUP BY role;

-- Filtrera grupper med HAVING (inte WHERE)
SELECT user_id, COUNT(*) AS order_count
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 5;
`,"/src/data/code-examples/cheatsheets/sql-sv/override-anslut-fran-node-js.js":`require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Testa anslutningen
pool.query('SELECT NOW()')
  .then((result) => {
    console.log('✓ Ansluten till PostgreSQL:', result.rows[0]);
  })
  .catch((err) => {
    console.error('✗ Databasanslutningsfel:', err);
    process.exit(1);
  });

module.exports = pool;
`,"/src/data/code-examples/cheatsheets/sql-sv/override-constraints-relationer.sql":`CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total DECIMAL(10, 2) NOT NULL CHECK (total >= 0),
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Vanliga constraint-typer:
-- PRIMARY KEY   identifierar unikt varje rad
-- FOREIGN KEY   (REFERENCES) länkar till en annan tabells primärnyckel
-- NOT NULL      kolumn måste alltid ha ett värde
-- UNIQUE        inga två rader kan dela detta värde
-- CHECK         värde måste uppfylla ett booleskt uttryck
-- DEFAULT       värde som används när inget anges
`,"/src/data/code-examples/cheatsheets/sql-sv/override-hamta-din-anslutningsstrang.sh":`postgresql://username:password@host:5432/database_name

Exempel (hosted):
postgresql://postgres:mypassword@db.xxxxxxxxxxxx.supabase.co:5432/postgres

Exempel (lokal):
postgresql://postgres:postgres@localhost:5432/myapp
`,"/src/data/code-examples/cheatsheets/sql-sv/override-index-for-query-prestanda.sql":`-- Snabba upp uppslagningar/filter på en kolumn
CREATE INDEX idx_users_email ON users(email);

-- Sammansatt index, för queries som filtrerar på båda kolumnerna tillsammans
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Upprätthåll unikhet OCH snabba upp uppslagningar
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- Se vad ett index faktiskt gör för en query
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'jdoe@example.com';
`,"/src/data/code-examples/cheatsheets/sql-sv/override-infoga-uppdatera-ta-bort-rader.sql":`-- INSERT en rad
INSERT INTO users (username, email, role)
VALUES ('jdoe', 'jdoe@example.com', 'admin');

-- INSERT flera rader på en gång
INSERT INTO users (username, email)
VALUES
  ('asmith', 'asmith@example.com'),
  ('bwong', 'bwong@example.com');

-- UPDATE befintliga rader
UPDATE users
SET role = 'admin'
WHERE username = 'jdoe';

-- DELETE rader
DELETE FROM users
WHERE role = 'guest';
`,"/src/data/code-examples/cheatsheets/sql-sv/override-joins-over-tabeller.sql":`-- INNER JOIN: endast rader med en matchning på båda sidor
SELECT orders.id, users.username, orders.total
FROM orders
INNER JOIN users ON orders.user_id = users.id;

-- LEFT JOIN: varje användare, även om de inte har några ordrar
SELECT users.username, orders.id AS order_id
FROM users
LEFT JOIN orders ON orders.user_id = users.id;

-- Joina tre tabeller
SELECT o.id, u.username, p.name AS product
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON p.id = oi.product_id;
`,"/src/data/code-examples/cheatsheets/sql-sv/override-satt-upp-en-databas-lokal-eller-hosted.sh":`Alternativ A: Installera lokalt
1. macOS: brew install postgresql@16 && brew services start postgresql@16
2. Windows/Linux: ladda ner från https://www.postgresql.org/download/
3. Verifiera att det körs: psql --version

Alternativ B: Använd en gratis hosted instans (ingen installation krävs)
1. Skapa ett konto på Supabase, Neon, eller Render
2. Skapa ett nytt PostgreSQL-projekt/databas
3. Vänta på att det provisioner (vanligtvis under en minut)
4. Notera host, port, username, password och databasnamn som visas i dashboarden
`,"/src/data/code-examples/cheatsheets/sql-sv/override-select-filtrera-med-where.sql":`-- Alla kolumner, alla rader
SELECT * FROM users;

-- Specifika kolumner, filtrerade
SELECT username, email FROM users
WHERE role = 'admin';

-- Flera villkor
SELECT * FROM users
WHERE role = 'admin' AND created_at > '2025-01-01';

-- Mönstermatchning, intervall, mängder
SELECT * FROM users WHERE username LIKE 'j%';
SELECT * FROM users WHERE id BETWEEN 10 AND 20;
SELECT * FROM users WHERE role IN ('admin', 'editor');
SELECT * FROM users WHERE email IS NOT NULL;

-- Sortera och bläddra genom resultat
SELECT * FROM users
ORDER BY created_at DESC
LIMIT 10 OFFSET 20;
`,"/src/data/code-examples/cheatsheets/sql-sv/override-transaktioner.sql":`BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Om båda uppdateringarna lyckades, gör dem permanenta
COMMIT;

-- Om något gick fel, ångra allt sedan BEGIN
-- ROLLBACK;
`,"/src/data/code-examples/cheatsheets/sql-sv/override-vanliga-datatyper.sql":`INT / INTEGER        -- heltal
BIGINT                -- stora heltal
DECIMAL(10, 2)        -- exakta decimaler (pengar!)
FLOAT / DOUBLE         -- ungefärliga decimaler
VARCHAR(n)             -- text med variabel längd, max n tecken
TEXT                   -- långformig text, ingen längdgräns
BOOLEAN                -- true / false
DATE                   -- år, månad, dag
TIMESTAMP              -- datum + tid
JSON / JSONB           -- strukturerad data (PostgreSQL: föredra JSONB)
UUID                   -- universellt unik identifierare
`,"/src/data/code-examples/cheatsheets/sql-sv/override-vanliga-fel-fixar.sh":`Error: duplicate key value violates unique constraint
Orsak: Infoga ett värde som redan finns i en UNIQUE eller PRIMARY KEY-kolumn.
Fix: Kontrollera för en befintlig rad först, eller använd en upsert (INSERT ... ON CONFLICT).

Error: null value in column violates not-null constraint
Orsak: Saknar en obligatorisk kolumn i en INSERT.
Fix: Ange ett värde, eller ge kolumnen en DEFAULT.

Error: syntax error at or near "..."
Orsak: Vanligtvis ett saknat kommatecken, omatchad citattecken, eller ett nyckelord som används som kolumnnamn.
Fix: Läs queryn från höger till vänster från den pekade token; SQL-fel rapporterar var parsing bröt, inte nödvändigtvis det verkliga misstaget.

Error: relation "table_name" does not exist
Orsak: Stavfel i tabellnamnet, fel schema/databas, eller tabellen skapades aldrig.
Fix: \\dt i psql (eller SHOW TABLES; i MySQL) för att lista vad som faktiskt finns.

Error: column "x" does not exist / Unknown column 'x' in 'field list'
Orsak: Stavfel, eller referera till en kolumn som inte är i scope för en JOIN.
Fix: Kvalificera kolumnen med dess tabellalias, t.ex. u.username istället för username.

Error: current transaction is aborted, commands ignored until end of transaction block
Orsak: En tidigare sats inuti en transaktion misslyckades, och PostgreSQL blockerar ytterligare kommandon tills du löser det.
Fix: ROLLBACK, försök sedan igen med hela transaktionen.
`,"/src/data/code-examples/cheatsheets/textReveal/01-add-the-reduced-motion-hook.sh":`// src/hooks/useReducedMotion.js
import { useEffect, useState } from "react";

function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e) => setReduced(e.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}

export default useReducedMotion;
`,"/src/data/code-examples/cheatsheets/textReveal/02-add-the-usescrollreveal-hook.sh":`// src/hooks/useScrollReveal.js
import { useEffect, useRef, useState } from "react";
import useReducedMotion from "./useReducedMotion";

function useScrollReveal({ threshold = 0.2, rootMargin = "0px 0px -10% 0px" } = {}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, threshold, rootMargin]);

  return { ref, isVisible };
}

export default useScrollReveal;
`,"/src/data/code-examples/cheatsheets/textReveal/03-add-the-reveal-component-content-reveal.jsx":`// src/components/motion/Reveal.jsx
import useScrollReveal from "../../hooks/useScrollReveal";

function Reveal({
  children,
  as: Tag = "div",
  direction = "up",
  variant = "default",
  index = 0,
  className = "",
  ...rest
}) {
  const { ref, isVisible } = useScrollReveal();

  if (variant === "fade") {
    return (
      <Tag
        ref={ref}
        className={\`reveal-fade \${isVisible ? "is-visible" : ""} \${className}\`}
        style={{ "--stagger-index": index }}
        {...rest}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={\`reveal reveal-\${direction} \${isVisible ? "is-visible" : ""} \${className}\`}
      style={{ "--stagger-index": index }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
`,"/src/data/code-examples/cheatsheets/textReveal/04-add-the-textreveal-component-word-by-word-text-r.jsx":`// src/components/motion/TextReveal.jsx
import useScrollReveal from "../../hooks/useScrollReveal";

function TextReveal({ text, as: Tag = "h2", className = "", wordDelay = 40 }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.4 });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span
            key={i}
            style={{ overflow: "hidden", display: "inline-block" }}
          >
            <span
              className={\`text-reveal-piece \${isVisible ? "is-visible" : ""}\`}
              style={{ transitionDelay: \`\${i * wordDelay}ms\` }}
            >
              {word}
              {i < words.length - 1 ? "\\u00A0" : ""}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

export default TextReveal;
`,"/src/data/code-examples/cheatsheets/textReveal/05-add-the-css-tokens-reveal-text-reveal-rules.jsx":`/* src/styles/motion.css */
:root {
  --duration-base: 280ms; /* used for the reduced-motion opacity fallback */
  --duration-moderate: 420ms; /* reveal + text-reveal transition length */
  --ease-emerge: cubic-bezier(0.16, 1, 0.3, 1); /* fast start, soft landing */
  --reveal-distance: 24px; /* how far content travels in from */
}

/* ---- Text reveal (per word/char, driven by <TextReveal>) ---- */
.text-reveal-piece {
  display: inline-block;
  transform: translateY(110%);
  opacity: 0;
  transition:
    transform var(--duration-moderate) var(--ease-emerge),
    opacity var(--duration-moderate) var(--ease-emerge);
}
.text-reveal-piece.is-visible {
  transform: translateY(0);
  opacity: 1;
}

/* ---- Content reveal (driven by <Reveal>) ---- */
.reveal {
  opacity: 0;
  transition:
    opacity var(--duration-moderate) var(--ease-emerge),
    transform var(--duration-moderate) var(--ease-emerge);
  will-change: opacity, transform;
}
.reveal-up {
  transform: translateY(var(--reveal-distance));
}
.reveal-down {
  transform: translateY(calc(var(--reveal-distance) * -1));
}
.reveal-left {
  transform: translateX(var(--reveal-distance));
}
.reveal-right {
  transform: translateX(calc(var(--reveal-distance) * -1));
}
.reveal-scale {
  transform: scale(0.96);
}
.reveal.is-visible {
  opacity: 1;
  transform: translate(0, 0) scale(1);
  will-change: auto;
}

/* Stagger children of a revealed container - pair with the
   --stagger-index custom property Reveal sets inline per child. */
.stagger-children > * {
  transition-delay: calc(var(--stagger-index, 0) * 70ms);
}

/* ---- Reduced motion: keep the fade, drop the travel ---- */
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-moderate: 1ms;
  }

  .reveal,
  .reveal-up,
  .reveal-down,
  .reveal-left,
  .reveal-right,
  .reveal-scale {
    transform: none !important;
    transition: opacity var(--duration-base) linear;
  }

  .text-reveal-piece {
    transform: none;
  }
}

/* ---- Reveal variant: fading ---- */
.reveal-fade {
  opacity: 0.2;
  transition: opacity var(--duration-moderate) var(--ease-emerge);
  will-change: opacity;
}
.reveal-fade.is-visible {
  opacity: 1;
  will-change: auto;
}

@media (prefers-reduced-motion: reduce) {
  .reveal-fade {
    transition: opacity var(--duration-base) linear;
  }
}
`,"/src/data/code-examples/cheatsheets/textReveal/06-import-the-css-once.js":`// src/main.jsx (or App.jsx)
import "./styles/motion.css";
`,"/src/data/code-examples/cheatsheets/textReveal/07-use-textreveal-for-headings.jsx":`import TextReveal from "./components/motion/TextReveal";

function Hero() {
  return (
    <TextReveal
      as="h1"
      text="Welcome to the Playground"
      className="text-4xl font-bold"
    />
  );
}
`,"/src/data/code-examples/cheatsheets/textReveal/08-use-reveal-for-content-blocks.jsx":`import Reveal from "./components/motion/Reveal";

function FeatureGrid({ items }) {
  return (
    <div className="stagger-children grid grid-cols-2 gap-8">
      {items.map((item, i) => (
        <Reveal key={item.id} index={i % 4} direction="up">
          <div className="card">{item.title}</div>
        </Reveal>
      ))}
    </div>
  );
}
`,"/src/data/code-examples/java/diagrams/library-model.txt":`// UML class model - lending library
class Book        { Long id; String title; String isbn }
class BookCopy    { Long id; String barcode; String shelf }
class Author      { Long id; String name }
class Member      { Long id; String name; String email }
class Loan        { Long id; LocalDate borrowedOn;
                    LocalDate dueOn; LocalDate returnedOn }

// Reading the relationship lines below:
//   <>  filled diamond = composition
//   1, 0..*, 1..*, *   = multiplicity at that end
//   an association with its own attributes (Loan)
//   becomes an entity / table in its own right
// ---------------------------------------------------

Book "1" <>-- "1..*" BookCopy
  // every copy belongs to exactly one Book;
  // delete the Book and its copies go too (cascade)

Book "*" -- "*" Author
  // shared authorship in both directions, so this
  // becomes the book_author join table

Member   "1" -- "0..*" Loan
BookCopy "1" -- "0..*" Loan
  // Loan sits between a Member and a BookCopy and
  // records borrowed_on / due_on / returned_on -
  // attributes that belong to neither end alone

ER DIAGRAM (crow's-foot: | = one, < = many)
-------------------------------------------
book        (id PK, title, isbn)
  |----<  book_copy (id PK, barcode, shelf,
                     book_id FK -> book.id)

book        >----<  author   (via join table)
book_author (book_id FK -> book.id,
             author_id FK -> author.id,
             PRIMARY KEY (book_id, author_id))
author      (id PK, name)

member      (id PK, name, email)
  |----<  loan (id PK, borrowed_on, due_on,
            returned_on, member_id FK, book_copy_id FK)
`,"/src/data/code-examples/java/diagrams/library.sql":`-- Relational schema translated from the class / ER model above
CREATE TABLE book (
    id    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    isbn  VARCHAR(20) UNIQUE
);

CREATE TABLE author (
    id   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(120) NOT NULL
);

-- composition: a copy cannot exist without its book -> ON DELETE CASCADE
CREATE TABLE book_copy (
    id      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    barcode VARCHAR(40) NOT NULL UNIQUE,
    shelf   VARCHAR(20),
    book_id BIGINT NOT NULL REFERENCES book(id) ON DELETE CASCADE
);

-- many-to-many: identity is the pair of foreign keys, no surrogate id
CREATE TABLE book_author (
    book_id   BIGINT NOT NULL REFERENCES book(id)   ON DELETE CASCADE,
    author_id BIGINT NOT NULL REFERENCES author(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, author_id)
);

CREATE TABLE member (
    id    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name  VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- Loan: the association-with-attributes becomes its own table
CREATE TABLE loan (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    borrowed_on  DATE NOT NULL,
    due_on       DATE NOT NULL,
    returned_on  DATE,
    member_id    BIGINT NOT NULL REFERENCES member(id),
    book_copy_id BIGINT NOT NULL REFERENCES book_copy(id)
);
`,"/src/data/code-examples/java/spring/Application.java":`import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Turns on component scanning + auto-configuration for this package and below.
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
`,"/src/data/code-examples/java/spring/Customer.java":`import jakarta.persistence.*;

@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;

    protected Customer() {}          // JPA needs a no-arg constructor
    public Customer(String name, String email) {
        this.name = name;
        this.email = email;
    }
    // id/name/email getters omitted for brevity
}
`,"/src/data/code-examples/java/spring/CustomerController.java":`import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService service;   // the service, never the repository

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    @GetMapping
    public List<Customer> list() {
        return service.findAll();
    }

    @PostMapping
    public Customer create(@RequestBody NewCustomer body) {
        return service.create(body.name(), body.email());
    }

    record NewCustomer(String name, String email) {}
}
`,"/src/data/code-examples/java/spring/CustomerRepository.java":`import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

// No implementation class - Spring Data generates one at startup.
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Parsed into: select c from Customer c where c.email = ?1
    Optional<Customer> findByEmail(String email);
}
`,"/src/data/code-examples/java/spring/CustomerService.java":`import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerService {

    private final CustomerRepository repository;

    // Single constructor - Spring injects the generated repository, no @Autowired.
    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public List<Customer> findAll() {
        return repository.findAll();
    }

    @Transactional
    public Customer create(String name, String email) {
        repository.findByEmail(email).ifPresent(c -> {
            throw new IllegalStateException("email already registered");
        });
        return repository.save(new Customer(name, email));
    }
}
`,"/src/data/code-examples/java/streams/OrderAnalysis.java":`import java.util.*;
import java.util.stream.*;
import static java.util.stream.Collectors.*;

/** A few questions about a list of orders, answered with stream pipelines. */
public class OrderAnalysis {

    enum Status { NEW, PAID, SHIPPED, CANCELLED }

    record Order(long id, String customer, long total, Status status) {}

    private final List<Order> orders;

    OrderAnalysis(List<Order> orders) {
        this.orders = orders;
    }

    /** Total revenue from orders that actually shipped. */
    long shippedRevenue() {
        return orders.stream()
                .filter(o -> o.status() == Status.SHIPPED)
                .mapToLong(Order::total)
                .sum();
    }

    /** The single biggest order for each customer. */
    Map<String, Optional<Order>> biggestOrderPerCustomer() {
        return orders.stream()
                .collect(groupingBy(
                        Order::customer,
                        maxBy(Comparator.comparingLong(Order::total))
                ));
    }

    /** How many orders sit in each status. */
    Map<Status, Long> countByStatus() {
        return orders.stream()
                .collect(groupingBy(Order::status, counting()));
    }

    /** The first order still waiting to ship, if there is one. */
    Optional<Order> firstUnshipped() {
        return orders.stream()
                .filter(o -> o.status() == Status.NEW || o.status() == Status.PAID)
                .findFirst();
    }
}
`,"/src/data/code-examples/learning/auth/example.js":`const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

// 1. Register: hash the password before storing anything
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.users.create({ email, passwordHash });
  res.status(201).json({ id: user.id, email: user.email });
});

// 2. Login: verify the password, then issue a signed token
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await db.users.findOne({ email });
  const valid = user && (await bcrypt.compare(password, user.passwordHash));
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ sub: user.id, role: user.role }, SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// 3. Middleware: verify the token on every protected request
function requireAuth(req, res, next) {
  const header = req.get("Authorization") || "";
  const token = header.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, SECRET); // throws if invalid or expired
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// 4. Authorization: identity alone isn't permission
app.delete("/posts/:id", requireAuth, async (req, res) => {
  const post = await db.posts.findById(req.params.id);
  const isOwner = post.authorId === req.user.sub;
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) {
    return res.status(403).json({ error: "Not allowed to delete this post" });
  }
  await post.delete();
  res.status(204).end();
});
`,"/src/data/code-examples/learning/deployment/example.js":`name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v5

      - name: Set up Node.js
        uses: actions/setup-node@v5
        with:
          node-version: 22

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

  deploy:
    needs: build-and-test
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v5

      - name: Deploy to Vercel
        run: npx vercel deploy --prod --token=$VERCEL_TOKEN
        env:
          VERCEL_TOKEN: \${{ secrets.VERCEL_TOKEN }}
`,"/src/data/code-examples/learning/docker/Dockerfile":`# ---- Stage 1: build the React app ----
FROM node:20-alpine AS build
WORKDIR /app

# Copy only the dependency manifests first - Docker caches each layer,
# so this layer (and npm ci below) is skipped on rebuilds unless
# package.json/package-lock.json actually changed
COPY package.json package-lock.json ./
RUN npm ci

# Now bring in the rest of the source and build the production bundle
COPY . .
RUN npm run build

# ---- Stage 2: serve the built files with nginx ----
FROM nginx:1.27-alpine AS runtime

# Custom config so client-side routes (React Router) don't 404 on refresh
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy ONLY the compiled output from the build stage - node_modules,
# source files, and the whole Node toolchain never reach this image
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Run nginx in the foreground so it is PID 1 and receives SIGTERM directly
CMD ["nginx", "-g", "daemon off;"]
`,"/src/data/code-examples/learning/docker/docker-compose.yml":`services:
  client:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "5173:80"
    depends_on:
      - api

  api:
    build:
      context: ./server
    ports:
      - "4000:4000"
    environment:
      DATABASE_URL: postgres://app:app@db:5432/app
      NODE_ENV: production
    depends_on:
      db:
        condition: service_healthy
    # Named volume, not a bind mount: keeps the image's own node_modules
    # instead of letting the host's (possibly missing/wrong-OS) copy win
    volumes:
      - api_node_modules:/app/node_modules

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app
      POSTGRES_DB: app
    volumes:
      - db_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  db_data:
  api_node_modules:
`,"/src/data/code-examples/learning/docker/dockerignore":`node_modules
dist
.git
.env
npm-debug.log
Dockerfile
docker-compose.yml
`,"/src/data/code-examples/learning/express/example.js":`const express = require("express");
const app = express();

// Built-in middleware: parses JSON request bodies into req.body
app.use(express.json());

// Custom middleware: runs for every request, in registration order
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // hand off to the next middleware/route - don't forget this!
});

// In-memory "database" for this example
let users = [{ id: 1, name: "Ada Lovelace" }];

// A router groups related routes and can be mounted at a path prefix
const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
  res.json(users);
});

usersRouter.get("/:id", (req, res, next) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) return next({ status: 404, message: "User not found" });
  res.json(user);
});

usersRouter.post("/", (req, res, next) => {
  if (!req.body.name) {
    return next({ status: 400, message: "name is required" });
  }
  const user = { id: users.length + 1, name: req.body.name };
  users.push(user);
  res.status(201).json(user);
});

app.use("/users", usersRouter);

// 404 fallback - runs if no route above matched
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Error-handling middleware - 4 args is what marks it as an error handler.
// Must be registered last, after every other app.use()/route.
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
`,"/src/data/code-examples/learning/git/example.sh":`# 1. Get a local copy of a shared repository
git clone https://github.com/team/project.git
cd project

# 2. Create a branch so main stays untouched while you work
git checkout -b feature/login-form

# 3. Edit files, then stage the ones you want to commit
git add src/LoginForm.jsx

# 4. Record a snapshot of the staged changes
git commit -m "Add login form component"

# 5. Bring in anything teammates pushed to main while you worked
git checkout main
git pull origin main

# 6. Bring those updates into your feature branch too
git checkout feature/login-form
git rebase main

# 7. Publish the branch so others - and a pull request - can see it
git push origin feature/login-form
`,"/src/data/code-examples/learning/http/example.js":`async function getUser(id, { signal } = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(\`/api/users/\${id}\`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: \`Bearer \${getToken()}\`,
      },
      signal: signal ?? controller.signal,
    });

    if (!response.ok) {
      throw new Error(\`Request failed: \${response.status}\`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request timed out or was cancelled");
    } else {
      console.error("Fetch failed:", error.message);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
`,"/src/data/code-examples/learning/javascript/example.js":`function createTaskTracker() {
  let tasks = [];

  return {
    add(title, ...tags) {
      const task = { id: tasks.length + 1, title, tags, done: false };
      tasks = [...tasks, task];
      return task;
    },
    complete(id) {
      tasks = tasks.map((t) => (t.id === id ? { ...t, done: true } : t));
    },
    summary() {
      const { length } = tasks;
      const done = tasks.filter((t) => t.done).length;
      return \`\${done}/\${length} tasks done\`;
    },
  };
}

async function loadAndTrack(urls) {
  const tracker = createTaskTracker();

  for (const url of urls) {
    const response = await fetch(url);
    const { title } = await response.json();
    tracker.add(title, "fetched");
  }

  return tracker.summary();
}

const tracker = createTaskTracker();
tracker.add("Write tests", "code");
tracker.complete(1);
console.log(tracker.summary()); // "1/1 tasks done"
`,"/src/data/code-examples/learning/javascript-sv/example.js":`function createTaskTracker() {
  let tasks = [];

  return {
    add(title, ...tags) {
      const task = { id: tasks.length + 1, title, tags, done: false };
      tasks = [...tasks, task];
      return task;
    },
    complete(id) {
      tasks = tasks.map((t) => (t.id === id ? { ...t, done: true } : t));
    },
    summary() {
      const { length } = tasks;
      const done = tasks.filter((t) => t.done).length;
      return \`\${done}/\${length} uppgifter klara\`;
    },
  };
}

async function loadAndTrack(urls) {
  const tracker = createTaskTracker();

  for (const url of urls) {
    const response = await fetch(url);
    const { title } = await response.json();
    tracker.add(title, "hämtad");
  }

  return tracker.summary();
}

const tracker = createTaskTracker();
tracker.add("Skriv tester", "kod");
tracker.complete(1);
console.log(tracker.summary()); // "1/1 uppgifter klara"
`,"/src/data/code-examples/learning/node/example.js":`const http = require("http");

// In-memory quotes list - loaded once when the module starts, and
// shared by every request this server handles for as long as the
// process keeps running.
let quotes = ["Node.js runs JavaScript outside the browser."];

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/quotes") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(quotes));
    return;
  }

  if (req.method === "POST" && req.url === "/quotes") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      quotes.push(JSON.parse(body).quote);
      res.writeHead(201);
      res.end("Saved");
    });

    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

module.exports = server;
`,"/src/data/code-examples/learning/payments/example.js":`const express = require("express");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

// 1. Create a PaymentIntent for this order - amount is set on the server
//    (never trust an amount sent from the client), and an idempotency key
//    means retrying this request can't create a second charge
app.post("/create-payment-intent", express.json(), async (req, res) => {
  const { orderId } = req.body;
  const order = await db.orders.findById(orderId);
  const intent = await stripe.paymentIntents.create(
    { amount: order.amountCents, currency: "usd", metadata: { orderId } },
    { idempotencyKey: \`order_\${orderId}\` },
  );
  res.json({ clientSecret: intent.client_secret });
});

// 2. Webhooks need the RAW request body to verify the signature - this
//    route must come before any app.use(express.json()) that would parse
//    and reserialize the body before the signature check sees it
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const signature = req.get("stripe-signature");
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch {
      return res.status(400).send("Webhook signature verification failed");
    }

    // 3. The webhook, not the browser, is what actually confirms payment
    if (event.type === "payment_intent.succeeded") {
      const { orderId } = event.data.object.metadata;
      db.orders.update(orderId, { status: "paid" });
    }

    if (event.type === "payment_intent.payment_failed") {
      const { orderId } = event.data.object.metadata;
      db.orders.update(orderId, { status: "payment_failed" });
    }

    res.json({ received: true });
  },
);

// 4. Refunding is a separate flow from the original charge
app.post("/orders/:id/refund", express.json(), async (req, res) => {
  const order = await db.orders.findById(req.params.id);
  await stripe.refunds.create({ payment_intent: order.paymentIntentId });
  await db.orders.update(order.id, { status: "refunded" });
  res.json({ status: "refunded" });
});

module.exports = app;
`,"/src/data/code-examples/learning/react/example.jsx":`import { useEffect, useState } from "react";

// A small presentational component - it only reads the "name" prop,
// it never touches state directly.
function Greeting({ name }) {
  return <h2>Hello, {name}!</h2>;
}

function App() {
  // useState gives this component its own piece of memory that
  // survives between re-renders.
  const [name, setName] = useState("Explorer");
  const [count, setCount] = useState(0);

  // useEffect runs after React commits this render to the screen.
  // Because count is in the dependency array, it only re-runs
  // when count actually changes.
  useEffect(() => {
    document.title = \`Clicked \${count} times\`;
  }, [count]);

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Greeting name={name} />

      <button onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </button>
    </div>
  );
}

export default App;
`,"/src/data/code-examples/learning/redux/Counter.jsx":`// Counter.jsx - a component connected to the store
import { useDispatch, useSelector } from "react-redux";
import { incremented } from "./counterSlice";

function Counter() {
  const value = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(incremented())}>
      Count: {value}
    </button>
  );
}
`,"/src/data/code-examples/learning/redux/counterSlice.js":`// counterSlice.js - defines one slice of state
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
  },
});

export const { incremented } = counterSlice.actions;
export default counterSlice.reducer;
`,"/src/data/code-examples/learning/redux/store.js":`// store.js - combines every slice into one store
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: { counter: counterReducer },
});
`,"/src/data/code-examples/learning/testing/example.js":`// Step 1 (Red): write the test first, before the implementation exists
test("formatPrice adds a dollar sign and 2 decimals", () => {
  expect(formatPrice(9)).toBe("$9.00");
});

// Step 2 (Green): write the simplest code that makes it pass
function formatPrice(amount) {
  return \`$\${amount.toFixed(2)}\`;
}

// Step 3: a new test describes a case the simple version ignores
test("formatPrice rejects non-numeric input", () => {
  expect(() => formatPrice("nine")).toThrow(TypeError);
});

// Refactor: make the failure explicit, without changing passing tests
function formatPrice(amount) {
  if (typeof amount !== "number") {
    throw new TypeError("formatPrice expects a number");
  }
  return \`$\${amount.toFixed(2)}\`;
}
`,"/src/data/code-examples/learning/typescript/example.jsx":`interface Task {
  id: number;
  title: string;
  done: boolean;
  dueDate?: string; // optional - not every task has one
}

function formatTask(task: Task): string {
  const status = task.done ? "✓" : "○";
  const due = task.dueDate ? \` (due \${task.dueDate})\` : "";
  return \`\${status} \${task.title}\${due}\`;
}

function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}

const tasks: Task[] = [
  { id: 1, title: "Write tests", done: false },
  { id: 2, title: "Ship it", done: true, dueDate: "2026-09-01" },
];

console.log(tasks.map(formatTask));
console.log(pluck(tasks, "title")); // string[]
console.log(pluck(tasks, "done"));  // boolean[]
`,"/src/data/code-examples/learning/webSockets/example.js":`const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 8080 });
const clients = new Set();

wss.on("connection", (socket) => {
  clients.add(socket);
  console.log(\`Client joined - \${clients.size} connected\`);

  socket.on("message", (raw) => {
    const message = JSON.parse(raw);

    // Broadcast to every other connected client
    for (const client of clients) {
      if (client !== socket && client.readyState === client.OPEN) {
        client.send(JSON.stringify(message));
      }
    }
  });

  socket.on("close", () => {
    clients.delete(socket);
    console.log(\`Client left - \${clients.size} connected\`);
  });
});

// --- Browser client ---
const socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => {
  socket.send(JSON.stringify({ user: "Isa", text: "hello!" }));
};

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log(\`\${message.user}: \${message.text}\`);
};
`})).map(([e,t])=>[e.replace(/^\/src\/data\//,``),t.replace(/\n$/,``)]));function g(e){let t=h[e];if(t===void 0)throw Error(`codeExamples: no extracted file found for "${e}". Run \`node scripts/extract-code-examples.mjs\` if you just added it by hand.`);return t}function _(e){let t=[];return e.forEach((e,n)=>{n>0&&t.push(``),t.push(...g(e).split(`
`))}),t}export{p as i,_ as n,m as r,g as t};