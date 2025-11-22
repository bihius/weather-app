import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import WeatherDetails from "../components/WeatherDetails/WeatherDetails";

// Available weather icons
const WEATHER_ICONS = [
  "Blowing_Sand",
  "Foggy",
  "Hail",
  "Haze",
  "Heavy_Snow",
  "Light_Rain",
  "Light_Snow",
  "Moderate_Rain",
  "Moderate_Snow",
  "Night",
  "Overcast",
  "Partly_Cloudy",
  "Sunny",
  "Thunderstorm",
];

const PRECIPITATION_TYPES = ["rain", "snow", "hail", "none"];

const WIND_DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
const WIND_DEGREES = [0, 45, 90, 135, 180, 225, 270, 315];

const DAYS = ["Tomorrow", "Wed", "Thu", "Fri", "Sat"];

// Simple seeded random number generator
function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

// Generate random weather data based on city name (for consistency)
function generateRandomWeatherData(cityName) {
  // Use city name as seed for consistent random data
  const seed = cityName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = seededRandom(seed);
  
  const randomInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;
  const getRandomItem = (array) => array[randomInt(0, array.length - 1)];

  return {
    temperature: randomInt(-5, 35),
    icon: getRandomItem(WEATHER_ICONS),
    precipitation: {
      probability: randomInt(0, 100),
      type: getRandomItem(PRECIPITATION_TYPES),
      amount: randomInt(0, 50) / 10,
    },
    wind: {
      speed: randomInt(5, 30),
      direction: getRandomItem(WIND_DIRECTIONS),
      degree: getRandomItem(WIND_DEGREES),
    },
    cloudCover: randomInt(0, 100),
    forecast: DAYS.map((day) => ({
      day,
      temperature: randomInt(-5, 35),
      icon: getRandomItem(WEATHER_ICONS),
    })),
  };
}

function WeatherDetailsPage() {
  const { cityName } = useParams();
  const decodedCityName = decodeURIComponent(cityName || "Unknown City");

  const weatherData = useMemo(
    () => generateRandomWeatherData(decodedCityName),
    [decodedCityName]
  );

  return <WeatherDetails city={decodedCityName} weatherData={weatherData} />;
}

export default WeatherDetailsPage;
