import React from "react";
import WeatherDetails from "../components/WeatherDetails/WeatherDetails";

function WeatherDetailsPage() {
  const sampleWeatherData = {
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

  return <WeatherDetails city="Warsaw" weatherData={sampleWeatherData} />;
}

export default WeatherDetailsPage;
