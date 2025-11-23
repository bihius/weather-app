import React, { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import AppHeader from "../components/AppHeader/AppHeader";
import CityCard from "../components/CityCard/CityCard";

function HomePage() {
  // Sample cities data - replace with actual API data
  const [cities] = useState([
    { city: "New York", temperature: 22, icon: "Partly_Cloudy" },
    { city: "London", temperature: 15, icon: "Light_Rain" },
    { city: "Tokyo", temperature: 28, icon: "Sunny" },
    { city: "Paris", temperature: 18, icon: "Overcast" },
    { city: "Sydney", temperature: 25, icon: "Sunny" },
    { city: "Berlin", temperature: 12, icon: "Foggy" },
    { city: "Warsaw", temperature: 5, icon: "Light_Snow" },
    { city: "Dubai", temperature: 35, icon: "Sunny" },
    { city: "Toronto", temperature: 8, icon: "Moderate_Rain" },
    { city: "Barcelona", temperature: 20, icon: "Partly_Cloudy" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Filter cities based on search query (case-insensitive)
  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) {
      return cities;
    }
    const query = searchQuery.toLowerCase().trim();
    return cities.filter((cityData) =>
      cityData.city.toLowerCase().includes(query)
    );
  }, [cities, searchQuery]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="px-4 py-6 max-w-6xl mx-auto space-y-6">
        <AppHeader />
        <SearchBar onSearchChange={handleSearchChange} />
        
        {/* Cities Grid */}
        {filteredCities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCities.map((cityData, index) => (
              <CityCard
                key={index}
                city={cityData.city}
                temperature={cityData.temperature}
                icon={cityData.icon}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No cities found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;

