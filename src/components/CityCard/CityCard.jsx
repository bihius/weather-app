import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FALLBACK_ICON, getWeatherIconPath } from "../../utils/weatherIcons";
import { useSettings } from "../../contexts/SettingsContext";
import { convertTemperature, getTemperatureUnit } from "../../utils/temperature";

function CityCard({ city, temperature, icon }) {
  const navigate = useNavigate();
  const { temperatureUnit, theme } = useSettings();
  const iconSrc = useMemo(() => getWeatherIconPath(icon, theme), [icon, theme]);

  const handleClick = () => {
    navigate(`/weather/${encodeURIComponent(city)}`);
  };

  const displayTemp = convertTemperature(temperature, temperatureUnit);
  const tempUnit = getTemperatureUnit(temperatureUnit);

  return (
    <div 
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 border border-gray-100 dark:border-gray-700 cursor-pointer group"
    >
      <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {city}
      </h3>
      <div className="flex items-center">
        <img
          src={iconSrc}
          alt={`${icon} weather`}
          onError={(e) => {
            const fallbackIcon = theme === "dark" ? "/WeatherIconsDark/Unknown.svg" : "/WeatherIconsLight/Unknown.svg";
            e.currentTarget.src = fallbackIcon;
          }}
          className="w-16 h-16 object-contain mr-4"
        />
        <p className="text-3xl font-bold text-gray-800 dark:text-white min-w-[80px]">{displayTemp}{tempUnit}</p>
      </div>
    </div>
  );
}

export default CityCard;
