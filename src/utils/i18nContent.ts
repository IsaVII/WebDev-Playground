/**
 * Load content based on current language
 * @param {string} basePath - The base path of the content file (without language prefix)
 * @param {string} language - Current language (en, sv)
 * @returns {Promise} - The loaded content
 */
export async function loadContent(basePath, language = "en") {
  try {
    // Try to load language-specific version
    const langPath =
      language === "en"
        ? basePath
        : basePath.replace("/data/", `/data/${language}/`);

    const content = await import(/* @vite-ignore */ langPath);
    return content.default || content;
  } catch (error) {
    // Fallback to English if translation doesn't exist
    if (language !== "en") {
      console.warn(
        `Translation not found for ${basePath} in ${language}, falling back to English`,
      );
      return loadContent(basePath, "en");
    }
    throw error;
  }
}

/**
 * Get the appropriate data file based on language
 */
export function getLocalizedPath(basePath, language = "en") {
  if (language === "en") {
    return basePath;
  }
  return basePath.replace("/data/", `/data/${language}/`);
}
