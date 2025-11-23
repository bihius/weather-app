import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  // Get initial theme from localStorage
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    return saved || "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const [temperatureUnit, setTemperatureUnit] = useState(() => {
    const saved = localStorage.getItem("temperatureUnit");
    return saved || "celsius";
  });

  // Apply theme on mount and when it changes - use useLayoutEffect for synchronous update
  useLayoutEffect(() => {
    const root = document.documentElement;
    // Remove dark class first to ensure clean state
    root.classList.remove("dark");
    // Add dark class if theme is dark
    if (theme === "dark") {
      root.classList.add("dark");
    }
  }, [theme]);

  // Save theme to localStorage (can be async)
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("temperatureUnit", temperatureUnit);
  }, [temperatureUnit]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prev) => (prev === "celsius" ? "fahrenheit" : "celsius"));
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        temperatureUnit,
        toggleTheme,
        toggleTemperatureUnit,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

