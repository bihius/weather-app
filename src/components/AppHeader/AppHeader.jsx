function AppHeader() {
  return (
    <header className="bg-white text-gray-800 py-4 shadow-lg rounded-lg flex items-center justify-between">
      <h1 className="text-3xl font-bold px-2">Weather App</h1>
      <button className=" hover:bg-gray-100 rounded">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </header>
  );
}

export default AppHeader;
