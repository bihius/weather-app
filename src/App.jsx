import "./App.css";
import React from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import AppHeader from "./components/AppHeader/AppHeader";

function App() {
  return (
    <>
      <div className="overflow-x-hidden">
        <AppHeader />
        <SearchBar />
      </div>
    </>
  );
}

export default App;
