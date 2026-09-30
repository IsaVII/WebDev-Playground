import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : null;
}

function applyTheme(theme) {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
}

/**
 * Sun/moon toggle that switches the site between light and dark mode.
 *
 * On first load the theme simply mirrors the browser/OS preference
 * (`prefers-color-scheme`, handled in index.css). The moment the user
 * clicks this button, that choice becomes an explicit `light`/`dark`
 * class on <html> - overriding the browser default - and is remembered
 * in localStorage for the next visit. See the inline script in
 * index.html for how the flash of the wrong theme is avoided on load.
 */
function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => getStoredTheme() ?? getSystemTheme(),
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    // Keep following the OS setting live, but only until the user
    // overrides it by clicking the toggle at least once.
    if (getStoredTheme()) return undefined;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => {
      setTheme(event.matches ? "dark" : "light");
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="grid place-items-center w-9 h-9 rounded-full transition-colors duration-300 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 text-header-icon"
    >
      {isDark ? (
        // Sun icon - shown when dark mode is active, click to go light.
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
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M4.93 4.93l1.41 1.41" />
          <path d="M17.66 17.66l1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="M6.34 17.66l-1.41 1.41" />
          <path d="M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        // Moon icon - shown when light mode is active, click to go dark.
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
        >
          <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.024.606.492.319.782a6 6 0 0 0 8.374 8.374c.29-.287.806-.086.78.316" />
        </svg>
      )}
    </button>
  );
}

export default ThemeToggle;
