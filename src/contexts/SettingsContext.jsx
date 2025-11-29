import React, { useReducer, useEffect, useLayoutEffect } from "react";
import { SettingsContext } from "./SettingsContext";

// Initial state from localStorage
const getInitialState = () => {
  const savedTheme = localStorage.getItem("theme");
  let savedFavorites = [];
  try {
    const favoritesData = localStorage.getItem("favorites");
    savedFavorites = favoritesData ? JSON.parse(favoritesData) : [];
  } catch {
    savedFavorites = [];
  }

  return {
    theme: savedTheme || "light",
    favorites: savedFavorites,
  };
};

// Action types
const SETTINGS_ACTIONS = {
  TOGGLE_THEME: "TOGGLE_THEME",
  TOGGLE_FAVORITE: "TOGGLE_FAVORITE",
};

// Reducer function
const settingsReducer = (state, action) => {
  switch (action.type) {
    case SETTINGS_ACTIONS.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };

    case SETTINGS_ACTIONS.TOGGLE_FAVORITE: {
      const { cityId } = action.payload;
      const isFavorite = state.favorites.includes(cityId);
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter((id) => id !== cityId)
          : [...state.favorites, cityId],
      };
    }

    default:
      return state;
  }
};

export function SettingsProvider({ children }) {
  const [state, dispatch] = useReducer(settingsReducer, getInitialState());

  // Apply theme on mount and when it changes - use useLayoutEffect for synchronous update
  useLayoutEffect(() => {
    const root = document.documentElement;
    // Remove dark class first to ensure clean state
    root.classList.remove("dark");
    // Add dark class if theme is dark
    if (state.theme === "dark") {
      root.classList.add("dark");
    }
  }, [state.theme]);

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("theme", state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  }, [state.favorites]);

  // Action creators
  const toggleTheme = () => {
    dispatch({ type: SETTINGS_ACTIONS.TOGGLE_THEME });
  };

  // Helper function to create a unique city ID
  // Uses pipe separator to avoid issues with negative coordinates (which would create double hyphens)
  // Note: Must check typeof === 'number' instead of truthiness to handle lat=0 or lon=0 (valid coordinates)
  const getCityId = (city, lat, lon) => {
    if (typeof lat === 'number' && typeof lon === 'number' && !isNaN(lat) && !isNaN(lon)) {
      return `${city}|${lat}|${lon}`;
    }
    return city;
  };

  const isFavorite = (city, lat, lon) => {
    const cityId = getCityId(city, lat, lon);
    return state.favorites.includes(cityId);
  };

  const toggleFavorite = (city, lat, lon) => {
    const cityId = getCityId(city, lat, lon);
    dispatch({ type: SETTINGS_ACTIONS.TOGGLE_FAVORITE, payload: { cityId } });
  };

  return (
    <SettingsContext.Provider
      value={{
        theme: state.theme,
        toggleTheme,
        favorites: state.favorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

