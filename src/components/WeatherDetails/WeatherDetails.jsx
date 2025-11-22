import React from "react";
import { FALLBACK_ICON, getWeatherIconPath } from "../../utils/weatherIcons";

function WeatherDetails({ city, weatherData }) {
  const getIcon = (iconName) => getWeatherIconPath(iconName);

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

  return (
    <div className="min-h-screen bg-linear-to-br p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          {city || "Weather Details"}
        </h1>
        <p className="text-gray-600">Current conditions and forecast</p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Weather Card */}
        <div className="lg:col-span-1 rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Current Weather
          </h2>

          {/* Temperature and Icon */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={getIcon(data.icon)}
              alt="weather icon"
              className="w-24 h-24 mb-4 object-contain"
              onError={(e) => {
                e.currentTarget.src = FALLBACK_ICON;
              }}
            />
            <div className="text-5xl font-bold text-gray-800">
              {data.temperature}°C
            </div>
          </div>

          {/* Cloud Cover */}
          <div className="mb-6 pt-6 border-t">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-medium">Cloud Cover</span>
              <span className="text-2xl font-bold text-blue-600">
                {data.cloudCover}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${data.cloudCover}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Precipitation and Wind Card */}
        <div className="lg:col-span-1 rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Conditions
          </h2>

          {/* Precipitation */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Precipitation
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Probability</span>
                <span className="font-bold text-blue-600">
                  {data.precipitation.probability}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type</span>
                <span className="font-bold text-gray-800 capitalize">
                  {data.precipitation.type}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-bold text-gray-800">
                  {data.precipitation.amount} mm/m²
                </span>
              </div>
            </div>
          </div>

          {/* Wind */}
          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Wind</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Speed</span>
                <span className="font-bold text-gray-800">
                  {data.wind.speed} km/h
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Direction</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800">
                    {data.wind.direction}
                  </span>
                  <div
                    className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center transform"
                    style={{
                      transform: `rotate(${data.wind.degree}deg)`,
                    }}
                  >
                    <span className="text-blue-600 font-bold text-sm">↑</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast Card */}
        <div className="lg:col-span-1 rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            5-Day Forecast
          </h2>
          <div className="space-y-1">
            {data.forecast.map((day, index) => (
              <div
                key={index}
                className="flex items-center px-2 py-1 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <p className="font-semibold text-gray-800 w-20 text-left">
                  {day.day}
                </p>
                <p className="font-bold text-gray-800 ml-auto pr-3">
                  {day.temperature}°C
                </p>
                <img
                  src={getIcon(day.icon)}
                  alt={day.day}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_ICON;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;
