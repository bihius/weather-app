import React from "react";
import { FALLBACK_ICON, getWeatherIconPath } from "../../utils/weatherIcons";
import { useSettings } from "../../contexts/useSettings";
import { convertTemperature, getTemperatureUnit } from "../../utils/temperature";

function WeatherDetails({ city, weatherData, lat, lon }) {
  const { temperatureUnit, theme, isFavorite, toggleFavorite } = useSettings();
  const getIcon = (iconName) => getWeatherIconPath(iconName, theme);
  const isFav = isFavorite(city, lat, lon);

  // Sample weather data structure - replace with actual API data
  const defaultData = {
    temperature: 15,
    icon: "Partly_Cloudy",
    precipitation: {
      probability: 65,
      type: "rain",
      amount: 2.5,
    },
    wind: {
      speed: 12,
      direction: "NW",
      degree: 315,
    },
    cloudCover: 75,
    forecast: [
      { day: "Tomorrow", temperature: 16, icon: "Partly_Cloudy" },
      { day: "Wed", temperature: 18, icon: "Sunny" },
      { day: "Thu", temperature: 14, icon: "Light_Rain" },
      { day: "Fri", temperature: 12, icon: "Thunderstorm" },
      { day: "Sat", temperature: 17, icon: "Blowing_Sand" },
    ],
  };

  const data = weatherData || defaultData;
  const tempUnit = getTemperatureUnit(temperatureUnit);

  return (
    <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="h-full overflow-y-auto p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
            {city || "Weather Details"}
          </h1>
          <button
            onClick={() => toggleFavorite(city, lat, lon)}
            className="flex-shrink-0 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              className={`w-8 h-8 transition-colors ${
                isFav
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-none text-gray-400 hover:text-yellow-400"
              }`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400">Current conditions and forecast</p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Current Weather Card */}
        <div className="lg:col-span-1 rounded-2xl shadow-lg p-8 bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
            Current Weather
          </h2>

          {/* Temperature and Icon */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={getIcon(data.icon)}
              alt="weather icon"
              className="w-24 h-24 mb-4 object-contain"
              onError={(e) => {
                const fallbackIcon = theme === "dark" ? "/WeatherIconsDark/Unknown.svg" : "/WeatherIconsLight/Unknown.svg";
                e.currentTarget.src = fallbackIcon;
              }}
            />
            <div className="text-5xl font-bold text-gray-800 dark:text-white">
              {convertTemperature(data.temperature, temperatureUnit)}{tempUnit}
            </div>
          </div>

          {/* Cloud Cover */}
          <div className="mb-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Cloud Cover</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {data.cloudCover}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${data.cloudCover}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Precipitation and Wind Card */}
        <div className="lg:col-span-1 rounded-2xl shadow-lg p-8 bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
            Conditions
          </h2>

          {/* Precipitation */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Precipitation
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Probability</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {data.precipitation.probability}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Type</span>
                <span className="font-bold text-gray-800 dark:text-white capitalize">
                  {data.precipitation.type}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Amount</span>
                <span className="font-bold text-gray-800 dark:text-white">
                  {data.precipitation.amount} mm/m²
                </span>
              </div>
            </div>
          </div>

          {/* Wind */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Wind</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Speed</span>
                <span className="font-bold text-gray-800 dark:text-white">
                  {data.wind.speed} km/h
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Direction</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800 dark:text-white">
                    {data.wind.direction}
                  </span>
                  <div
                    className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center transform"
                    style={{
                      transform: `rotate(${data.wind.degree}deg)`,
                    }}
                  >
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">↑</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast Card */}
        <div className="lg:col-span-1 rounded-2xl shadow-lg p-8 bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
            5-Day Forecast
          </h2>
          <div className="space-y-2">
            {data.forecast.map((day, index) => (
              <div
                key={index}
                className="flex items-center px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              >
                <p className="font-semibold text-gray-800 dark:text-white w-20 text-left text-sm">
                  {day.day}
                </p>
                <p className="font-bold text-gray-800 dark:text-white ml-auto pr-3 text-base">
                  {convertTemperature(day.temperature, temperatureUnit)}{tempUnit}
                  </p>
                  <img
                    src={getIcon(day.icon)}
                    alt={day.day}
                  className="w-10 h-10 object-contain"
                    onError={(e) => {
                    const fallbackIcon = theme === "dark" ? "/WeatherIconsDark/Unknown.svg" : "/WeatherIconsLight/Unknown.svg";
                    e.currentTarget.src = fallbackIcon;
                    }}
                  />
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default WeatherDetails;
