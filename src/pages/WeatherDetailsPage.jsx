import React from "react";
import WeatherDetails from "../components/WeatherDetails/WeatherDetails";

function WeatherDetailsPage() {
  const sampleWeatherData = {
    temperature: 15,
    icon: "lcloud",
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
      { day: "Tomorrow", temperature: 16, icon: "lcloud-lsunny" },
      { day: "Wed", temperature: 18, icon: "lsun" },
      { day: "Thu", temperature: 14, icon: "lcloud-ldrops" },
      { day: "Fri", temperature: 12, icon: "lstorm" },
      { day: "Sat", temperature: 17, icon: "lsun-lwind" },
    ],
  };

  return <WeatherDetails city="Warsaw" weatherData={sampleWeatherData} />;
}

export default WeatherDetailsPage;
