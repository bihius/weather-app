import { useState } from "react";
import { useCallback } from "react";

function SearchBar({ onSearchChange }) {
  const [query, setQuery] = useState("");

  const handleSearch = useCallback(() => {
    onSearchChange(query);
  }, [onSearchChange, query]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }, [handleSearch]);

  return (
    <div className="w-full flex items-center justify-center py-6">
      <div className="w-full max-w-[600px] mx-auto flex items-center bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all duration-200">
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
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
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
    </div>
  );
}

export default SearchBar;
