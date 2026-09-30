import { useTranslation } from "react-i18next";

/**
 * Returns the localised version of a content object.
 *
 * Every learning and cheatsheet page previously repeated the same three lines:
 *   const CONTENT_MAP = { en: ..., sv: ... };
 *   const { i18n } = useTranslation();
 *   const content = CONTENT_MAP[i18n.language] || CONTENT_MAP.en;
 *
 * This hook collapses that into one call:
 *   const content = useLocalizedContent(enData, svData);
 *
 * @param {object} en  - The English (default) content object.
 * @param {object} sv  - The Swedish content object.
 * @returns {object}   - The content for the current language, falling back to English.
 */
export function useLocalizedContent(en, sv) {
  const { i18n } = useTranslation();
  const map = { en, sv };
  return map[i18n.language] ?? en;
}
