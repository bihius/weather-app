/**
 * City Search Service using Nominatim (OpenStreetMap) Geocoding API
 * 
 * This is a free, open-source geocoding service that doesn't require an API key.
 * Rate limit: 1 request per second (we use debouncing to respect this)
 * 
 * Documentation: https://nominatim.org/release-docs/develop/api/Search/
 */

import { trimCityName } from "../utils/cityName";

const API_BASE_URL = "https://nominatim.openstreetmap.org/search";

/**
 * Search for cities by name
 * @param {string} query - City name to search for
 * @param {number} limit - Maximum number of results (default: 5)
 * @returns {Promise<Array>} Array of city objects with name, country, state, lat, lon
 */
export async function searchCities(query, limit = 10) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    const url = new URL(API_BASE_URL);
    url.searchParams.append("q", query.trim());
    url.searchParams.append("format", "json");
    // Request more results to ensure we get good city matches
    url.searchParams.append("limit", "50");
    url.searchParams.append("addressdetails", "1");
    url.searchParams.append("extratags", "1");
    
    // Required by Nominatim: User-Agent header
    const response = await fetch(url.toString(), {
      headers: {
        "User-Agent": "WeatherApp/1.0 (contact: weather-app@example.com)",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return [];
    }

    // Transform the API response to a simpler format
    // VERY lenient filtering - accept almost everything
    const places = data
      .filter((item) => {
        // Only exclude obvious non-places
        const excludeTypes = ["house", "building"];
        const excludeClasses = ["highway", "building"];
        
        if (excludeTypes.includes(item.type) || excludeClasses.includes(item.class)) {
          return false;
        }
        
        // Accept everything else that has coordinates and a name
        return item.lat && item.lon && item.name;
      })
      .sort((a, b) => {
        // Sort by importance (higher is better) and place_rank (lower is better for cities)
        // Prioritize cities/towns over administrative boundaries
        const importanceA = (a.importance || 0) * 1000;
        const importanceB = (b.importance || 0) * 1000;
        const rankA = 1000 - (a.place_rank || 100);
        const rankB = 1000 - (b.place_rank || 100);
        
        // Boost cities and towns
        const typeBoostA = (a.type === "city" || a.type === "town") ? 500 : 0;
        const typeBoostB = (b.type === "city" || b.type === "town") ? 500 : 0;
        const addresstypeBoostA = (a.addresstype === "city" || a.addresstype === "town") ? 300 : 0;
        const addresstypeBoostB = (b.addresstype === "city" || b.addresstype === "town") ? 300 : 0;
        
        return (importanceB + rankB + typeBoostB + addresstypeBoostB) - 
               (importanceA + rankA + typeBoostA + addresstypeBoostA);
      })
      .map((item) => {
        const address = item.address || {};
        
        // Extract city name - try multiple fields, prioritize actual city names
        // For "Greater London" type entries, use the name directly
        let name = item.name ||
                   address.city || 
                   address.town || 
                   address.village || 
                   address.municipality ||
                   address.administrative ||
                   address.county ||
                   address.state_district ||
                   item.display_name.split(",")[0].trim();
        
        // Clean up name - remove "Greater" prefix if present, but keep the city name
        name = name.replace(/^Greater\s+/i, "").trim();
        
        // If name is still "Greater London" or similar, extract just the city part
        if (name.includes("Greater")) {
          const parts = name.split(/\s+/);
          if (parts.length > 1 && parts[0].toLowerCase() === "greater") {
            name = parts.slice(1).join(" ");
          }
        }
        
        // Trim name to only the part before the first comma (in case API returns full location)
        name = trimCityName(name);
        
        // Extract state/region
        const state = address.state || 
                      address.region || 
                      address.province || 
                      address.state_district || 
                      "";
        
        // Extract country
        const country = address.country || "";
        
        // Build display name - use just the city name (already trimmed)
        // Keep full location info in separate fields for reference
        let displayName = name; // Already trimmed to first comma
        
        return {
          name: name,
          country: country,
          state: state,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          displayName: displayName, // Just the city name, trimmed to first comma
        };
      })
      .filter((item) => {
        // Remove invalid entries
        if (!item.name || isNaN(item.lat) || isNaN(item.lon)) {
          return false;
        }
        // Remove entries with coordinates that are clearly wrong (0,0 or out of bounds)
        if (item.lat === 0 && item.lon === 0) {
          return false;
        }
        if (Math.abs(item.lat) > 90 || Math.abs(item.lon) > 180) {
          return false;
        }
        return true;
      })
      // Remove duplicates based on similar coordinates (within 0.1 degrees)
      .filter((item, index, self) => {
        return index === self.findIndex((t) => 
          Math.abs(t.lat - item.lat) < 0.1 && Math.abs(t.lon - item.lon) < 0.1
        );
      })
      .slice(0, limit);

    return places;
  } catch (error) {
    console.error("Error searching for cities:", error);
    throw error;
  }
}

