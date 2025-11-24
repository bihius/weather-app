/**
 * Weather Service using Open-Meteo API
 * 
 * Documentation: https://open-meteo.com/en/docs
 * 
 * Open-Meteo is completely FREE and doesn't require an API key!
 * Works worldwide for any location on Earth.
 */

import { mapWeatherCodeToIcon } from "../utils/weatherIconMapper";

const OPEN_METEO_API_BASE = "https://api.open-meteo.com/v1/forecast";

/**
 * Get weather forecast for a location using coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Weather data object
 */
export async function getWeatherForecast(lat, lon) {
  try {
    // Fetch current weather and daily forecast in one request
    const url = new URL(OPEN_METEO_API_BASE);
    url.searchParams.append("latitude", lat.toString());
    url.searchParams.append("longitude", lon.toString());
    url.searchParams.append("current", "temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,precipitation,cloud_cover");
    url.searchParams.append("daily", "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max");
    url.searchParams.append("timezone", "auto");
    url.searchParams.append("forecast_days", "6"); // Today + 5 days

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Failed to get weather data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Transform Open-Meteo data to our app's format
    return transformOpenMeteoData(data);
  } catch (error) {
    console.error("Error fetching weather forecast:", error);
    throw error;
  }
}

/**
 * Transform Open-Meteo API response to our app's data format
 */
function transformOpenMeteoData(data) {
  const current = data.current || {};
  const daily = data.daily || {};

  // Current temperature (already in Celsius)
  const tempC = Math.round(current.temperature_2m || 0);

  // Map weather code to our icon names using shared utility
  const weatherCode = current.weather_code || 0;
  const iconName = mapWeatherCodeToIcon(weatherCode);

  // Wind information
  const windSpeed = Math.round(current.wind_speed_10m || 0);
  const windDirectionDeg = current.wind_direction_10m || 0;
  const windDirection = getWindDirectionFromDegrees(windDirectionDeg);

  // Precipitation
  const precipitationProbability = Math.round(current.precipitation || 0);
  const precipitationType = getPrecipitationTypeFromCode(weatherCode);

  // Cloud cover
  const cloudCover = Math.round(current.cloud_cover || 0);

  // Daily forecast (skip today, get next 5 days)
  const forecast = [];
  const dailyCodes = daily.weather_code || [];
  const dailyMaxTemps = daily.temperature_2m_max || [];
  const dailyMinTemps = daily.temperature_2m_min || [];
  const dailyPrecipProb = daily.precipitation_probability_max || [];

  for (let i = 1; i <= 5 && i < dailyCodes.length; i++) {
    const maxTemp = Math.round(dailyMaxTemps[i] || 0);
    const minTemp = Math.round(dailyMinTemps[i] || 0);
    const avgTemp = Math.round((maxTemp + minTemp) / 2);
    const dayCode = dailyCodes[i] || 0;
    const dayName = getDayNameFromIndex(i);

    forecast.push({
      day: dayName,
      temperature: avgTemp,
      icon: mapWeatherCodeToIcon(dayCode),
    });
  }

  return {
    temperature: tempC,
    icon: iconName,
    precipitation: {
      probability: precipitationProbability,
      type: precipitationType,
      amount: 0, // Open-Meteo provides probability, not amount in current endpoint
    },
    wind: {
      speed: windSpeed,
      direction: windDirection,
      degree: windDirectionDeg,
    },
    cloudCover: cloudCover,
    forecast: forecast,
  };
}

// mapWeatherCodeToIcon is now imported from utils/weatherIconMapper

/**
 * Get precipitation type from weather code
 */
function getPrecipitationTypeFromCode(code) {
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 85 && code <= 86) return "snow";
  if (code >= 96 && code <= 99) return "hail";
  if (code >= 51 && code <= 67) return "rain";
  if (code >= 80 && code <= 82) return "rain";
  return "none";
}

/**
 * Convert wind direction in degrees to compass direction
 */
function getWindDirectionFromDegrees(degrees) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degrees / 45) % 8;
  return directions[index] || "N";
}

/**
 * Get day name from index (1 = tomorrow, 2 = day after, etc.)
 */
function getDayNameFromIndex(index) {
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + index);
  
  // Check if it's tomorrow
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  if (targetDate.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return dayNames[targetDate.getDay()];
}
