import { deleteCookie, getCookie, setCookie } from "./cookies";

describe("cookies", () => {
  describe("setCookie / getCookie", () => {
    it("round-trips a plain string value", () => {
      setCookie("theme", "dark");
      expect(getCookie("theme")).toBe("dark");
    });

    it("URI-encodes and decodes values containing special characters", () => {
      const value = JSON.stringify({ topics: { git: true }, note: "a,b;c" });
      setCookie("progress", value);
      expect(getCookie("progress")).toBe(value);
    });

    it("returns null for a cookie that was never set", () => {
      expect(getCookie("does-not-exist")).toBeNull();
    });

    it("does not confuse a cookie with another one that has it as a prefix", () => {
      // e.g. "theme" and "themeAlt" must not collide when read back.
      setCookie("theme", "dark");
      setCookie("themeAlt", "light");
      expect(getCookie("theme")).toBe("dark");
      expect(getCookie("themeAlt")).toBe("light");
    });

    it("overwrites a previous value when set again", () => {
      setCookie("theme", "dark");
      setCookie("theme", "light");
      expect(getCookie("theme")).toBe("light");
    });
  });

  describe("deleteCookie", () => {
    it("removes a previously set cookie", () => {
      setCookie("session", "abc123");
      expect(getCookie("session")).toBe("abc123");

      deleteCookie("session");
      expect(getCookie("session")).toBeNull();
    });

    it("is a no-op when the cookie was never set", () => {
      expect(() => deleteCookie("never-set")).not.toThrow();
      expect(getCookie("never-set")).toBeNull();
    });
  });
});
