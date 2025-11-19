import React from "react";

function CityCard({ city, temperature, icon }) {
  const iconSrc = `/src/assets/WeatherIcons/${icon}.png`;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 h-32 flex items-center justify-between gap-6 hover:shadow-lg hover:border-gray-300 transition-shadow duration-200 w-full border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">{city}</h3>
      <div className="flex items-center gap-3">
        <img
          src={iconSrc}
          alt={`${icon} weather`}
          onError={(e) => {
            e.currentTarget.src = "/src/assets/WeatherIcons/grey.png";
          }}
          className="w-12 h-12 object-contain"
        />
        <p className="text-2xl font-bold text-gray-700">{temperature}°C</p>
      </div>
    </div>
  );
}

export default CityCard;
