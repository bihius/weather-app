/**
 * Utility function to map weather codes to app icon names
 * 
 * Maps WMO Weather Interpretation Codes (used by Open-Meteo) to our app's icon names
 * Based on: https://open-meteo.com/en/docs#weathervariables
 * 
 * @param {number} weatherCode - WMO weather code (0-99)
 * @returns {string} Icon name matching our app's icon files
 */

import axios from "axios";

export function mapWeatherCodeToIcon(weatherCode) {
  if (weatherCode === undefined || weatherCode === null) {
    return "Unknown";
  }

  const code = Number(weatherCode);

  // Clear sky
  if (code === 0 || code === 1) return "Sunny";
  
  // Partly cloudy
  if (code === 2 || code === 3) return "Partly_Cloudy";
  
  // Overcast
  if (code === 4) return "Overcast";
  
  // Fog
  if (code === 45 || code === 48) return "Foggy";
  
  // Drizzle
  if (code >= 51 && code <= 55) return "Light_Rain";
  // Freezing drizzle
  if (code >= 56 && code <= 57) return "Light_Rain";
  
  // Rain
  if (code >= 61 && code <= 65) return "Moderate_Rain";
  // Freezing rain
  if (code >= 66 && code <= 67) return "Moderate_Rain";
  
  // Snow
  if (code >= 71 && code <= 75) return "Light_Snow";
  // Snow grains
  if (code === 77) return "Heavy_Snow";
  
  // Rain showers
  if (code >= 80 && code <= 82) return "Light_Rain";
  // Snow showers
  if (code >= 85 && code <= 86) return "Light_Snow";
  
  // Thunderstorm
  if (code === 95) return "Thunderstorm";
  // Thunderstorm with hail
  if (code >= 96 && code <= 99) return "Thunderstorm";
  
  // Default fallback
  return "Partly_Cloudy";
}

/**
 * Get current weather for a city (simplified version for home page)
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Object with temperature and icon
 */
export async function getCurrentWeather(lat, lon) {
  try {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.append("latitude", lat.toString());
    url.searchParams.append("longitude", lon.toString());
    url.searchParams.append("current", "temperature_2m,weather_code");
    url.searchParams.append("timezone", "auto");

    const response = await axios.get(url.toString());
    const data = response.data;
    const current = data.current || {};

    return {
      temperature: Math.round(current.temperature_2m || 0),
      icon: mapWeatherCodeToIcon(current.weather_code || 0),
    };
  } catch (error) {
    console.error("Error fetching current weather:", error);
    // Return fallback data
    return {
      temperature: 0,
      icon: "Unknown",
    };
  }
}

