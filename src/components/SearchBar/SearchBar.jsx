import { useState, useCallback, useRef, useEffect } from "react";
import { trimCityName } from "../../utils/cityName";

function SearchBar({ onSearchChange, searchResults, isLoading, onCitySelect }) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const handleInputChange = useCallback((e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setShowResults(newQuery.trim().length >= 2);
    onSearchChange(newQuery);
  }, [onSearchChange]);

  const handleSearch = useCallback(() => {
    if (query.trim().length >= 2) {
    onSearchChange(query);
      setShowResults(true);
    }
  }, [onSearchChange, query]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }, [handleSearch]);

  const handleFocus = useCallback(() => {
    if (query.trim().length >= 2 && searchResults && searchResults.length > 0) {
      setShowResults(true);
    }
  }, [query, searchResults]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-center py-6">
      <div ref={searchRef} className="relative w-full max-w-[600px] mx-auto">
        <div className="flex items-center bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all duration-200">
          <div className="flex items-center px-4 text-gray-400 dark:text-gray-500">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={query}
            onChange={handleInputChange}
          onKeyPress={handleKeyPress}
            onFocus={handleFocus}
          placeholder="Search for a city..."
            className="flex-1 px-2 py-4 text-base text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none bg-transparent"
        />
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!query.trim()}
        >
          Search
        </button>
        </div>
        {showResults && (
          <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-600 dark:text-gray-400">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <p className="mt-2">Searching...</p>
              </div>
            ) : searchResults && searchResults.length > 0 ? (
              searchResults.map((city, index) => (
                <button
                  key={`${city.name}-${city.country}-${index}`}
                  onClick={() => {
                    onCitySelect(city);
                    setQuery(trimCityName(city.displayName || city.name));
                    setShowResults(false);
                  }}
                  className="w-full text-left px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {city.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {city.state && `${city.state}, `}
                        {city.country}
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 dark:text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              ))
            ) : query.trim().length >= 2 ? (
              <div className="p-4 text-center text-gray-600 dark:text-gray-400">
                <p>No cities found</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
