import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
import AppHeader from "../components/AppHeader/AppHeader";
import CityCard from "../components/CityCard/CityCard";
import { searchCities } from "../services/citySearch";
import { getCurrentWeather } from "../utils/weatherIconMapper";

// Cities data with coordinates (works worldwide now!)
const INITIAL_CITIES = [
  { city: "New York", lat: 40.7128, lon: -74.0060 },
  { city: "London", lat: 51.5074, lon: -0.1278 },
  { city: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { city: "Paris", lat: 48.8566, lon: 2.3522 },
  { city: "Warsaw", lat: 52.2297, lon: 21.0122 },
  { city: "Sydney", lat: -33.8688, lon: 151.2093 },
  { city: "Berlin", lat: 52.5200, lon: 13.4050 },
  { city: "Dubai", lat: 25.2048, lon: 55.2708 },
  { city: "Toronto", lat: 43.6532, lon: -79.3832 },
  { city: "Barcelona", lat: 41.3851, lon: 2.1734 },
];

function HomePage() {

  const [cities, setCities] = useState(
    INITIAL_CITIES.map((city) => ({
      ...city,
      temperature: 0,
      icon: "Unknown",
      loading: true,
    }))
  );

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const debounceTimer = useRef(null);

  // Debounced city search
  const handleSearchChange = useCallback((query) => {

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // If query is too short, clear results
    if (query.trim().length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    // Set loading state
    setIsSearching(true);

    // Debounce the API call
    debounceTimer.current = setTimeout(async () => {
      try {
        const results = await searchCities(query, 10);
        setSearchResults(results || []);
      } catch (error) {
        console.error("Error searching cities:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500); // 500ms debounce
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Fetch real weather data for all cities on mount
  useEffect(() => {
    const fetchWeatherForCities = async () => {
      // Fetch weather for all cities in parallel
      const weatherPromises = INITIAL_CITIES.map(async (city) => {
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
      setCities(citiesWithWeather);
    };

    fetchWeatherForCities();
  }, []);

  const handleCitySelect = useCallback((city) => {
    // Pass coordinates as URL params for NWS API
    navigate(`/weather/${encodeURIComponent(city.displayName)}?lat=${city.lat}&lon=${city.lon}`);
    setSearchResults([]);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="px-4 py-6 max-w-6xl mx-auto space-y-6">
        <AppHeader />
        <SearchBar
          onSearchChange={handleSearchChange}
          searchResults={searchResults}
          isLoading={isSearching}
          onCitySelect={handleCitySelect}
        />
        
        {/* Default Cities Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Popular Cities
          </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cities.map((cityData, index) => (
            <CityCard
                key={`${cityData.city}-${index}`}
              city={cityData.city}
              temperature={cityData.temperature}
              icon={cityData.icon}
                lat={cityData.lat}
                lon={cityData.lon}
                loading={cityData.loading}
            />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

