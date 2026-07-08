import { createContext, useContext, useEffect, useState, useCallback } from "react";

/**
 * ThemeContext
 * -----------------------------------------------------------------------------
 * Provides `theme` ("light" | "dark"), a `toggleTheme()` handler, and a
 * `mounted` flag (to avoid hydration mismatches). The active theme is applied
 * by toggling the `dark` class on <html> and is persisted to localStorage so a
 * returning visitor keeps their preference.
 *
 * A tiny inline script in _document.jsx sets the class BEFORE React hydrates,
 * which prevents the "flash of wrong theme" on first paint.
 */

const ThemeContext = createContext(undefined);

const STORAGE_KEY = "a1-buller-theme";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  // On mount, read the theme already resolved by the pre-hydration script
  // (or fall back to the OS preference) so React state matches the DOM.
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    setMounted(true);
  }, []);

  const applyTheme = useCallback((next) => {
    const root = document.documentElement;
    if (next === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage can be unavailable (private mode) — ignore */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  }, [applyTheme]);

  const setThemeExplicit = useCallback(
    (next) => {
      setTheme(next);
      applyTheme(next);
    },
    [applyTheme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeExplicit, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return ctx;
}
