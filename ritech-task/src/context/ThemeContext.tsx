import { createContext, useContext, useState, ReactNode } from "react";
import { applyTheme } from "../utils/applyTheme";

export type Theme = "light" | "dark" | "system";

const initializeTheme = (): Theme => {
  const theme = (localStorage.getItem("theme") as Theme) || "system";
  applyTheme(theme);
  return theme;
};

// Context Creation
const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | null>(null);

// Context Provider
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(initializeTheme());

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
