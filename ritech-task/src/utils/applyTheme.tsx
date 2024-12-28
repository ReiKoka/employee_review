import { Theme } from "../context/ThemeContext";

export function applyTheme(theme: Theme): void {
  const root = window.document.documentElement;

  // Remove existing theme classes
  root.classList.remove("light", "dark");

  // Determine the effective theme
  const effectiveTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  // Apply the effective theme
  root.classList.add(effectiveTheme);
}

