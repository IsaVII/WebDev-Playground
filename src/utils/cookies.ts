const DEFAULT_MAX_AGE_DAYS = 365;

/**
 * Write a cookie. Values are URI-encoded so JSON strings (commas, quotes,
 * etc.) survive the round trip through document.cookie.
 */
export function setCookie(name, value, days = DEFAULT_MAX_AGE_DAYS) {
  if (typeof document === "undefined") return;

  const maxAgeSeconds = days * 24 * 60 * 60;
  const encodedValue = encodeURIComponent(value);
  document.cookie = `${name}=${encodedValue}; max-age=${maxAgeSeconds}; path=/; SameSite=Lax`;
}

/** Read a cookie by name, or null if it isn't set. */
export function getCookie(name) {
  if (typeof document === "undefined") return null;

  const prefix = `${name}=`;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(prefix));

  if (!match) return null;
  return decodeURIComponent(match.slice(prefix.length));
}

/** Remove a cookie by name. */
export function deleteCookie(name) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; max-age=0; path=/; SameSite=Lax`;
}
