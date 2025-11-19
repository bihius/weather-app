import "./App.css";
import React from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import AppHeader from "./components/AppHeader/AppHeader";
import CityCard from "./components/CityCard/CityCard";
import WeatherDetailsPage from "./pages/WeatherDetailsPage";

function App() {
  return (
    <>
      <WeatherDetailsPage />
    </>
  );
}

export default App;
