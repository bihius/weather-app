import React, { createContext, useState, useEffect, useLayoutEffect } from "react";

export const SettingsContext = createContext();

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

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
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

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTemperatureUnitDirect = (unit) => {
    if (["celsius", "fahrenheit", "kelvin"].includes(unit)) {
      setTemperatureUnit(unit);
    }
  };

  // Helper function to create a unique city ID
  const getCityId = (city, lat, lon) => {
    if (lat && lon) {
      return `${city}-${lat}-${lon}`;
    }
    return city;
  };

  const isFavorite = (city, lat, lon) => {
    const cityId = getCityId(city, lat, lon);
    return favorites.includes(cityId);
  };

  const toggleFavorite = (city, lat, lon) => {
    const cityId = getCityId(city, lat, lon);
    setFavorites((prev) => {
      if (prev.includes(cityId)) {
        return prev.filter((id) => id !== cityId);
      } else {
        return [...prev, cityId];
      }
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        temperatureUnit,
        toggleTheme,
        setTemperatureUnit: setTemperatureUnitDirect,
        favorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

