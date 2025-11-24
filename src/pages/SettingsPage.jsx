import React from "react";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../contexts/SettingsContext";

function SettingsPage() {
  const navigate = useNavigate();
  const { theme, temperatureUnit, toggleTheme, toggleTemperatureUnit } = useSettings();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header and Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-2 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Customize your weather app experience</p>
        </div>

        {/* Theme Toggle */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                  Theme
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Switch between light and dark mode
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                  theme === "dark" ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    theme === "dark" ? "translate-x-10" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Current: <span className="font-semibold capitalize">{theme} mode</span>
            </div>
          </div>

          {/* Temperature Unit Toggle */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                  Temperature Unit
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Choose between Celsius and Fahrenheit
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (temperatureUnit !== "celsius") toggleTemperatureUnit();
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    temperatureUnit === "celsius"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  °C
                </button>
                <button
                  onClick={() => {
                    if (temperatureUnit !== "fahrenheit") toggleTemperatureUnit();
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    temperatureUnit === "fahrenheit"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  °F
                </button>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Current: <span className="font-semibold capitalize">{temperatureUnit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;

