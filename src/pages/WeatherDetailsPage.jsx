import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import WeatherDetails from "../components/WeatherDetails/WeatherDetails";
import { getWeatherForecast } from "../services/weatherService";
import { searchCities } from "../services/citySearch";

function WeatherDetailsPage() {
  const { cityName } = useParams();
  const [searchParams] = useSearchParams();
  const decodedCityName = decodeURIComponent(cityName || "Unknown City");

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        let lat, lon;

        // Try to get coordinates from URL params first
        const latParam = searchParams.get("lat");
        const lonParam = searchParams.get("lon");

        if (latParam && lonParam) {
          lat = parseFloat(latParam);
          lon = parseFloat(lonParam);
        } else {
          // If no coordinates in URL, search for the city to get coordinates
          const cities = await searchCities(decodedCityName, 1);
          if (cities.length === 0) {
            throw new Error(`City "${decodedCityName}" not found`);
          }
          lat = cities[0].lat;
          lon = cities[0].lon;
        }

        // Store coordinates for favorites
        setCoordinates({ lat, lon });

        // Fetch weather data from NWS API
        const data = await getWeatherForecast(lat, lon);
        setWeatherData(data);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError(err.message || "Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [decodedCityName, searchParams]);

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Error</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Please try again later or search for a different city.
          </p>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  return <WeatherDetails city={decodedCityName} weatherData={weatherData} lat={coordinates.lat} lon={coordinates.lon} />;
}

export default WeatherDetailsPage;
