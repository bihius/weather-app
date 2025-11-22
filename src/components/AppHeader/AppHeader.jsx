function AppHeader() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 px-6 shadow-xl rounded-2xl flex items-center justify-between backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Weather App</h1>
      </div>
      <button className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95">
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
