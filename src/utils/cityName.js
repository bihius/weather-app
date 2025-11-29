/**
 * Trims city name to only the part before the first comma
 * @param {string} cityName - Full city name (e.g., "Faro, Portugal")
 * @returns {string} - Trimmed city name (e.g., "Faro")
 */
export function trimCityName(cityName) {
  if (!cityName) return "";
  const commaIndex = cityName.indexOf(",");
  if (commaIndex === -1) {
    return cityName.trim();
  }
  return cityName.substring(0, commaIndex).trim();
}

