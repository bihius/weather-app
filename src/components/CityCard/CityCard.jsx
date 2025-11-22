import React from "react";
import { useNavigate } from "react-router-dom";
import { FALLBACK_ICON, getWeatherIconPath } from "../../utils/weatherIcons";

function CityCard({ city, temperature, icon }) {
  const navigate = useNavigate();
  const iconSrc = getWeatherIconPath(icon);

  const handleClick = () => {
    navigate(`/weather/${encodeURIComponent(city)}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 border border-gray-100 cursor-pointer group"
    >
      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
        {city}
      </h3>
      <div className="flex items-center">
        <img
          src={iconSrc}
          alt={`${icon} weather`}
          onError={(e) => {
            e.currentTarget.src = FALLBACK_ICON;
          }}
          className="w-16 h-16 object-contain mr-4"
        />
        <p className="text-3xl font-bold text-gray-800 min-w-[80px]">{temperature}°C</p>
      </div>
    </div>
  );
}

export default CityCard;
