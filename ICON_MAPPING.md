# Weather Icon Mapping System

This document explains how the app maps weather data from the API to visual weather icons.

## 🔄 Complete Flow

```
API Response (weather_code: 61)
    ↓
mapWeatherCodeToIcon(61)
    ↓
Icon Name: "Moderate_Rain"
    ↓
getWeatherIconPath("Moderate_Rain", "light")
    ↓
File Path: "/WeatherIconsLight/Moderate_Rain.svg"
    ↓
Displayed in UI
```

## 📊 Step-by-Step Process

### 1. API Returns Weather Code

The Open-Meteo API returns a `weather_code` field (WMO Weather Interpretation Code, 0-99):

```json
{
  "current": {
    "temperature_2m": 15.5,
    "weather_code": 61  // This is the key!
  }
}
```

### 2. Map Code to Icon Name

The `mapWeatherCodeToIcon()` function in `src/utils/weatherIconMapper.js` converts the numeric code to an icon name:

```javascript
// Example: weather_code = 61
export function mapWeatherCodeToIcon(weatherCode) {
  const code = Number(weatherCode);
  
  // Rain codes (61-65) → "Moderate_Rain"
  if (code >= 61 && code <= 65) return "Moderate_Rain";
  
  // ... other mappings
}
```

**WMO Weather Code Mapping:**

| Code Range | Weather Condition | Icon Name |
|------------|------------------|-----------|
| 0, 1 | Clear sky | `Sunny` |
| 2, 3 | Partly cloudy | `Partly_Cloudy` |
| 4 | Overcast | `Overcast` |
| 45, 48 | Fog | `Foggy` |
| 51-55 | Drizzle | `Light_Rain` |
| 56-57 | Freezing drizzle | `Light_Rain` |
| 61-65 | Rain | `Moderate_Rain` |
| 66-67 | Freezing rain | `Moderate_Rain` |
| 71-75 | Snow | `Light_Snow` |
| 77 | Snow grains | `Heavy_Snow` |
| 80-82 | Rain showers | `Light_Rain` |
| 85-86 | Snow showers | `Light_Snow` |
| 95 | Thunderstorm | `Thunderstorm` |
| 96-99 | Thunderstorm with hail | `Thunderstorm` |
| Default | Unknown | `Partly_Cloudy` |

### 3. Resolve Icon Name to File Path

The `getWeatherIconPath()` function in `src/utils/weatherIcons.js` converts the icon name to an actual file path:

```javascript
export const getWeatherIconPath = (iconName, theme = "light") => {
  // Normalize: "Moderate_Rain" → "moderaterain"
  const normalized = sanitize(iconName);
  
  // Lookup in available icons
  const resolved = resolveFromLookup(normalized);
  
  // Build path: "/WeatherIconsLight/Moderate_Rain.svg"
  const folder = theme === "dark" ? "WeatherIconsDark" : "WeatherIconsLight";
  return `/${folder}/${resolved}.svg`;
};
```

**Available Icon Files:**
- `Blowing_Sand.svg`
- `Foggy.svg`
- `Hail.svg`
- `Haze.svg`
- `Heavy_Snow.svg`
- `Light_Rain.svg`
- `Light_Snow.svg`
- `Moderate_Rain.svg`
- `Moderate_Snow.svg`
- `Night.svg`
- `Overcast.svg`
- `Partly_Cloudy.svg`
- `Sunny.svg`
- `Thunderstorm.svg`
- `Unknown.svg`

### 4. Display in UI

Components use the icon path to display the weather icon:

```javascript
// In CityCard.jsx or WeatherDetails.jsx
import { getWeatherIconPath } from "../../utils/weatherIcons";

const iconSrc = getWeatherIconPath(icon, theme);
<img src={iconSrc} alt="Weather icon" />
```

## 🎨 Theme Support

Icons are stored in two folders:
- `public/WeatherIconsLight/` - Light theme icons
- `public/WeatherIconsDark/` - Dark theme icons

The same icon name maps to different folders based on the current theme.

## 📍 Where Mapping Happens

### Current Weather (Home Page)
```javascript
// src/utils/weatherIconMapper.js
export async function getCurrentWeather(lat, lon) {
  const data = await fetch(/* API call */);
  const weatherCode = data.current.weather_code;
  
  return {
    temperature: data.current.temperature_2m,
    icon: mapWeatherCodeToIcon(weatherCode)  // ← Mapping happens here
  };
}
```

### Detailed Forecast
```javascript
// src/services/weatherService.js
function transformOpenMeteoData(data) {
  const weatherCode = current.weather_code || 0;
  const iconName = mapWeatherCodeToIcon(weatherCode);  // ← Mapping here
  
  // Also maps daily forecast codes
  forecast.push({
    icon: mapWeatherCodeToIcon(dayCode)  // ← Each day mapped
  });
}
```

## 🔍 Icon Name Resolution

The `getWeatherIconPath()` function handles various icon name formats:

1. **Exact match**: `"Moderate_Rain"` → `"Moderate_Rain.svg"`
2. **Case insensitive**: `"moderate_rain"` → `"Moderate_Rain.svg"`
3. **Without extension**: `"Moderate_Rain.png"` → `"Moderate_Rain.svg"`
4. **Fallback**: Unknown names → `"Unknown.svg"`

## 🛡️ Error Handling

If something goes wrong:
1. Invalid weather code → `"Partly_Cloudy"` (default)
2. Missing icon name → `"Unknown"` icon
3. Missing icon file → Fallback to `"Unknown.svg"`

## 📚 References

- [WMO Weather Interpretation Codes](https://open-meteo.com/en/docs#weathervariables)
- [Open-Meteo API Documentation](https://open-meteo.com/en/docs)

