import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-3 py-1 rounded transition-colors ${
          i18n.language === "en"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("sv")}
        className={`px-3 py-1 rounded transition-colors ${
          i18n.language === "sv"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
        }`}
        aria-label="Byt till Svenska"
      >
        SV
      </button>
    </div>
  );
}

export default LanguageSwitcher;
