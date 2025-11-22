import "./App.css";
import React from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import AppHeader from "./components/AppHeader/AppHeader";

function App() {
  return (
    <div className="px-4 py-6 max-w-6xl mx-auto space-y-4">
      <AppHeader />
      <SearchBar onSearchChange={() => {}} />
    </div>
  );
}

export default App;
