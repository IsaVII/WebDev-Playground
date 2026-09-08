import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import learningContentEn from "../data/en/learningContent.json";
import cheatsheetsEn from "../data/en/cheatsheets.json";
import javaBackendEn from "../data/en/javaBackend.json";
import learningContentSv from "../data/sv/learningContent.json";
import cheatsheetsSv from "../data/sv/cheatsheets.json";
import javaBackendSv from "../data/sv/javaBackend.json";

const CONTENT_MAP = {
  en: {
    learning: learningContentEn,
    cheatsheets: cheatsheetsEn,
    javaBackend: javaBackendEn,
  },
  sv: {
    learning: learningContentSv,
    cheatsheets: cheatsheetsSv,
    javaBackend: javaBackendSv,
  },
};

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Get language-specific content
  const currentLang = i18n.language;
  const learningContent =
    CONTENT_MAP[currentLang]?.learning || CONTENT_MAP.en.learning;
  const cheatsheets =
    CONTENT_MAP[currentLang]?.cheatsheets || CONTENT_MAP.en.cheatsheets;
  const javaBackend =
    CONTENT_MAP[currentLang]?.javaBackend || CONTENT_MAP.en.javaBackend;

  // Combine all searchable content
  const ALL_CONTENT = [
    ...learningContent.topics.map((topic) => ({
      ...topic,
      type: t("header.learning"),
    })),
    ...javaBackend.topics.map((topic) => ({
      ...topic,
      type: t("header.javaBackend"),
    })),
    ...cheatsheets.topics.map((topic) => ({
      ...topic,
      type: t("header.cheatsheets"),
    })),
  ];

  // Search function
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = ALL_CONTENT.filter((item) => {
      return (
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.difficulty?.toLowerCase().includes(searchTerm) ||
        item.type.toLowerCase().includes(searchTerm)
      );
    }).slice(0, 8); // Limit to 8 results

    setResults(filtered);
    setIsOpen(filtered.length > 0);
    setSelectedIndex(0);
  }, [query]);

  // Close on outside click or Escape
  useEffect(() => {
    function handlePointerDown(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + results.length) % results.length,
        );
        break;
      case "Enter":
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
        break;
      default:
        break;
    }
  };

  const handleSelect = (item) => {
    navigate(item.route);
    setQuery("");
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return "text-green-400";
      case "intermediate":
        return "text-yellow-400";
      case "advanced":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="relative flex">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-menu-text/40">
          <SearchIcon />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("main.searchPlaceholder")}
          className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-menu-text placeholder:text-menu-text/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          aria-label="Search learning topics and cheat sheets"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={isOpen}
        />
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          id="search-results"
          role="listbox"
          className="absolute top-full mt-2 w-full sm:w-96 max-h-96 overflow-y-auto bg-navbar border border-white/10 rounded-lg shadow-xl shadow-black/20 z-50"
        >
          {results.map((item, index) => (
            <button
              key={item.route}
              type="button"
              role="option"
              aria-selected={index === selectedIndex}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`w-full text-left px-4 py-3 border-b border-white/5 last:border-b-0 transition-colors duration-150 ${
                index === selectedIndex ? "bg-accent/15" : "hover:bg-white/5"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-menu-text truncate">
                    {item.title}
                  </div>
                  <div className="text-sm text-menu-text/60 line-clamp-2 mt-1">
                    {item.description}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="text-menu-text/40">{item.type}</span>
                    {item.difficulty && (
                      <>
                        <span className="text-menu-text/20">•</span>
                        <span className={getDifficultyColor(item.difficulty)}>
                          {item.difficulty}
                        </span>
                      </>
                    )}
                    {item.estimatedTime && (
                      <>
                        <span className="text-menu-text/20">•</span>
                        <span className="text-menu-text/40">
                          {item.estimatedTime}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
