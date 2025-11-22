import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WeatherDetailsPage from "./pages/WeatherDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/weather/:cityName" element={<WeatherDetailsPage />} />
    </Routes>
  );
}

export default App;
