import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import SearchBar from "./SearchBar";
import { useProgress } from "../context/ProgressContext";

// English content
import cheatsheetsEn from "../data/en/cheatsheets.json";
import learningContentEn from "../data/en/learningContent.json";
import javascriptContentEn from "../data/en/learning/javascriptContent.json";
import typescriptContentEn from "../data/en/learning/typescriptContent.json";
import gitContentEn from "../data/en/learning/gitContent.json";
import httpContentEn from "../data/en/learning/httpContent.json";
import nodeContentEn from "../data/en/learning/nodeContent.json";
import reactContentEn from "../data/en/learning/reactContent.json";
import reduxContentEn from "../data/en/learning/reduxContent.json";
import testingContentEn from "../data/en/learning/testingContent.json";
import expressContentEn from "../data/en/learning/expressContent.json";
import authContentEn from "../data/en/learning/authContent.json";
import webSocketsContentEn from "../data/en/learning/webSocketsContent.json";
import deploymentContentEn from "../data/en/learning/deploymentContent.json";
import dockerContentEn from "../data/en/learning/dockerContent.json";

// Swedish content
import cheatsheetsSv from "../data/sv/cheatsheets.json";
import learningContentSv from "../data/sv/learningContent.json";
import javascriptContentSv from "../data/sv/learning/javascriptContent.json";
import typescriptContentSv from "../data/sv/learning/typescriptContent.json";
import gitContentSv from "../data/sv/learning/gitContent.json";
import httpContentSv from "../data/sv/learning/httpContent.json";
import nodeContentSv from "../data/sv/learning/nodeContent.json";
import reactContentSv from "../data/sv/learning/reactContent.json";
import reduxContentSv from "../data/sv/learning/reduxContent.json";
import testingContentSv from "../data/sv/learning/testingContent.json";
import expressContentSv from "../data/sv/learning/expressContent.json";
import authContentSv from "../data/sv/learning/authContent.json";
import webSocketsContentSv from "../data/sv/learning/webSocketsContent.json";
import deploymentContentSv from "../data/sv/learning/deploymentContent.json";
import dockerContentSv from "../data/sv/learning/dockerContent.json";

// Content maps
const CONTENT_BY_LANG = {
  en: {
    learning: learningContentEn,
    cheatsheets: cheatsheetsEn,
    details: {
      javascript: javascriptContentEn,
      typescript: typescriptContentEn,
      git: gitContentEn,
      http: httpContentEn,
      node: nodeContentEn,
      react: reactContentEn,
      redux: reduxContentEn,
      testing: testingContentEn,
      express: expressContentEn,
      auth: authContentEn,
      websockets: webSocketsContentEn,
      deployment: deploymentContentEn,
      docker: dockerContentEn,
    },
  },
  sv: {
    learning: learningContentSv,
    cheatsheets: cheatsheetsSv,
    details: {
      javascript: javascriptContentSv,
      typescript: typescriptContentSv,
      git: gitContentSv,
      http: httpContentSv,
      node: nodeContentSv,
      react: reactContentSv,
      redux: reduxContentSv,
      testing: testingContentSv,
      express: expressContentSv,
      auth: authContentSv,
      websockets: webSocketsContentSv,
      deployment: deploymentContentSv,
      docker: dockerContentSv,
    },
  },
};

function HomeIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 9.5V19a1 1 0 0 0 1 1H10a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3.5a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function StarIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-4 h-4 shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const { pathname } = useLocation();
  const { getTopicSubtopicCount } = useProgress();
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language;
  const learningContent =
    CONTENT_BY_LANG[currentLang]?.learning || CONTENT_BY_LANG.en.learning;
  const cheatsheets =
    CONTENT_BY_LANG[currentLang]?.cheatsheets || CONTENT_BY_LANG.en.cheatsheets;
  const CONTENT_BY_KEY =
    CONTENT_BY_LANG[currentLang]?.details || CONTENT_BY_LANG.en.details;

  const TOPICS = learningContent.topics.map((topic) => ({
    to: topic.route,
    label: topic.title,
    key: topic.key,
  }));

  const CHEATSHEETS = cheatsheets.topics.map((topic) => ({
    to: topic.route,
    label: topic.title,
    key: topic.key,
  }));

  // Close the menu whenever the route changes (e.g. a topic link was
  // clicked), so navigating away always leaves the menu tucked back in.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close on outside click or Escape, only while open.
  useEffect(() => {
    if (!menuOpen) return undefined;

    function handlePointerDown(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-navbar text-menu-text shadow-lg shadow-black/10 border-b border-white/10">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center gap-4 px-4 py-3">
          {/* Brand */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 no-underline text-menu-text shrink-0"
          >
            <img src="book.png" alt="Book Icon" className="w-7 h-7" />
            <h1 className="m-0 text-1xl font-semibold tracking-tight hidden sm:block">
              WebDev Playground
            </h1>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="flex-1 max-w-md hidden md:block">
            <SearchBar />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
            <Link
              to="/"
              aria-label={t("header.home")}
              aria-current={isHome ? "page" : undefined}
              className={`grid place-items-center w-9 h-9 rounded-full transition-colors duration-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${
                isHome ? "text-accent" : "text-header-icon"
              }`}
              title={t("header.home")}
            >
              <HomeIcon />
            </Link>

            <span className="w-px h-6 bg-white/15 mx-1" aria-hidden="true" />

            <LanguageSwitcher />

            <span className="w-px h-6 bg-white/15 mx-1" aria-hidden="true" />

            <ThemeToggle />

            <span className="w-px h-6 bg-white/15 mx-1" aria-hidden="true" />

            {/* Hamburger */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open topics menu"}
              aria-expanded={menuOpen}
              aria-controls="topics-menu"
              className="relative grid place-items-center w-9 h-9 rounded-full transition-colors duration-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 text-header-icon"
            >
              <span className="relative block w-5 h-4" aria-hidden="true">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${
                    menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-5 bg-current rounded-full transition-opacity duration-200 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 bottom-0 h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${
                    menuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden px-4 pb-3">
          <SearchBar />
        </div>
      </div>

      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Topics dropdown */}
      <nav
        id="topics-menu"
        ref={menuRef}
        aria-label="Topics and Cheat Sheets"
        className={`absolute right-4 top-full mt-2 origin-top-right rounded-xl border border-white/10 bg-navbar shadow-xl shadow-black/20 transition-all duration-200 ${
          menuOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
        }`}
      >
        <div className="flex divide-x divide-white/10">
          {/* Topics Column */}
          <div className="flex-1 min-w-64">
            <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-menu-text/40">
              {t("header.learning")}
            </p>
            <ul className="list-none m-0 p-2 flex flex-col">
              {TOPICS.map((topic) => {
                const completedCount = getTopicSubtopicCount(topic.key);
                const totalCount =
                  CONTENT_BY_KEY[topic.key]?.practiceTopics?.length || 0;
                const isPartiallyComplete =
                  completedCount > 0 && completedCount < totalCount;
                const isFullyComplete =
                  completedCount > 0 && completedCount === totalCount;
                const showStar = completedCount > 0;

                return (
                  <li key={topic.to}>
                    <NavLink
                      to={topic.to}
                      className={`group flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-[15px] hover:bg-white/10 ${
                        pathname === topic.to ? "bg-accent/15" : ""
                      }`}
                    >
                      <span className="flex items-center gap-2 text-left">
                        {showStar && (
                          <StarIcon
                            className={
                              isFullyComplete ? "opacity-100" : "opacity-30"
                            }
                          />
                        )}
                        <span className={`${showStar ? "font-bold pl-0" : ""}`}>
                          {topic.label}
                        </span>
                      </span>
                      <ChevronIcon />
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Cheat Sheets Column */}
          <div className="flex-1 min-w-64">
            <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-menu-text/40">
              {t("header.cheatsheets")}
            </p>
            <ul className="list-none m-0 p-2 flex flex-col">
              {CHEATSHEETS.map((sheet) => {
                const completedCount = getTopicSubtopicCount(sheet.key);
                const showStar = completedCount > 0;

                return (
                  <li key={sheet.to}>
                    <NavLink
                      to={sheet.to}
                      className={`group flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-[15px] hover:bg-white/10 ${
                        pathname === sheet.to ? "bg-accent/15" : ""
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {showStar && <StarIcon className="opacity-100" />}
                        <span>{sheet.label}</span>
                      </span>
                      <ChevronIcon />
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
