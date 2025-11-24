# Weather App

This is a simple weather application built with React and Vite. It allows users to search for the current weather in any city.

## Features

- Search for any city in the world using OpenWeatherMap Geocoding API
- View weather details for selected cities
- Light/Dark mode toggle
- Celsius/Fahrenheit temperature unit selector
- Responsive design

## Setup

### 1. Install Dependencies

**Note:** This app uses the **Open-Meteo API**, which is completely FREE and doesn't require an API key! It works worldwide for any location on Earth.

For city search, we use **Nominatim** (OpenStreetMap's geocoding service), which is also free and doesn't require an API key.

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run the Development Server

```bash
pnpm dev
```

## Usage

Once the app is running:

1. Type a city name in the search bar (minimum 2 characters)
2. Select a city from the dropdown results
3. View weather details for that city

The search uses debouncing (500ms delay) to minimize API calls while you type.

**Great news:** The app now works worldwide! You can search for and get weather data for any city on Earth. The Open-Meteo API provides free weather forecasts for locations all over the world.

## Docker

Build and run with Docker:

```bash
docker build -t weather-app .
docker run -p 80:80 weather-app
```
