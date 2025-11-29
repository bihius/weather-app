import React, { useState, useEffect } from "react";
import AppHeader from "../components/AppHeader/AppHeader";
import CityCard from "../components/CityCard/CityCard";
import { useSettings } from "../contexts/useSettings";
import { getCurrentWeather } from "../utils/weatherIconMapper";

function FavoritesPage() {
  const { favorites } = useSettings();

  // Parse favorite IDs to extract city, lat, lon
  const parseFavoriteId = (favoriteId) => {
    // Format: "city|lat|lon" (using pipe separator to avoid issues with negative coordinates)
    const parts = favoriteId.split("|");
    if (parts.length >= 3) {
      // Last two parts are always lat and lon
      const lon = parseFloat(parts[parts.length - 1]);
      const lat = parseFloat(parts[parts.length - 2]);
      // City name is everything before the last two parts
      const city = parts.slice(0, -2).join("|");
      
      if (!isNaN(lat) && !isNaN(lon)) {
        return { city, lat, lon };
      }
    }
    // Fallback: try to parse old format with hyphens (for backward compatibility)
    const hyphenParts = favoriteId.split("-");
    if (hyphenParts.length >= 3) {
      // Try to parse last two parts as numbers
      const lastTwo = hyphenParts.slice(-2);
      const lon = parseFloat(lastTwo[1]);
      const lat = parseFloat(lastTwo[0]);
      const city = hyphenParts.slice(0, -2).join("-");
      
      if (!isNaN(lat) && !isNaN(lon)) {
        return { city, lat, lon };
      }
    }
    return null;
  };

  const [favoriteCities, setFavoriteCities] = useState([]);

  // Fetch weather data for all favorites
  useEffect(() => {
    const fetchWeatherForFavorites = async () => {
      if (favorites.length === 0) {
        setFavoriteCities([]);
        return;
      }

      // Parse all favorite IDs
      const parsedFavorites = favorites
        .map(parseFavoriteId)
        .filter((city) => city !== null);

      // Initialize with loading state
      const initialCities = parsedFavorites.map((city) => ({
        ...city,
        temperature: 0,
        icon: "Unknown",
        loading: true,
      }));
      setFavoriteCities(initialCities);

      // Fetch weather for all favorites in parallel
      const weatherPromises = parsedFavorites.map(async (city) => {
        try {
          const weather = await getCurrentWeather(city.lat, city.lon);
          return {
            ...city,
            temperature: weather.temperature,
            icon: weather.icon,
            loading: false,
          };
        } catch (error) {
          console.error(`Error fetching weather for ${city.city}:`, error);
          return {
            ...city,
            temperature: 0,
            icon: "Unknown",
            loading: false,
          };
        }
      });

      const citiesWithWeather = await Promise.all(weatherPromises);
      setFavoriteCities(citiesWithWeather);
    };

    fetchWeatherForFavorites();
  }, [favorites]);

  return (
    <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 transition-colors overflow-hidden">
      <div className="h-full overflow-y-auto px-4 py-6 max-w-6xl mx-auto space-y-6">
        <AppHeader />
        
        {/* Favorites Cities Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Favorite Cities
          </h2>
          {favoriteCities.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No favorite cities yet
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                Add cities to favorites by clicking the star icon on weather details pages
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoriteCities.map((cityData, index) => (
                <CityCard
                  key={`${cityData.city}-${cityData.lat}-${cityData.lon}-${index}`}
                  city={cityData.city}
                  temperature={cityData.temperature}
                  icon={cityData.icon}
                  lat={cityData.lat}
                  lon={cityData.lon}
                  loading={cityData.loading}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoritesPage;

