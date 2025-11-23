import React, { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  // Apply theme synchronously before React renders
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    const initialTheme = saved || "light";
    
    // Apply theme immediately to prevent flash
    const root = document.documentElement;
    if (initialTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    return initialTheme;
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const [temperatureUnit, setTemperatureUnit] = useState(() => {
    const saved = localStorage.getItem("temperatureUnit");
    return saved || "celsius";
  });

  // Apply theme when it changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
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

