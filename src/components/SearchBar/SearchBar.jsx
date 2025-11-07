import { useState } from "react";
import { useCallback } from "react";

function SearchBar({ onSearchChange }) {
  const [query, setQuery] = useState("");

  const handleSearch = useCallback(() => {
    onSearchChange(query);
  }, [onSearchChange, query]);

  return (
    <div className="w-full flex items-center justify-center py-8">
      <div className="w-full max-w-[500px] mx-auto px-0 flex items-center bg-gray-50 shadow-sm rounded-lg overflow-hidden border border-gray-100">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="flex-grow px-3 py-2 text-sm focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-5 py-3 text-sm rounded-2xl hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
