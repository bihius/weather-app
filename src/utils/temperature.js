export function convertTemperature(celsius, unit) {
  if (unit === "fahrenheit") {
    return Math.round((celsius * 9) / 5 + 32);
  }
  if (unit === "kelvin") {
    return Math.round(celsius + 273.15);
  }
  return celsius;
}

export function getTemperatureUnit(unit) {
  if (unit === "fahrenheit") return "°F";
  if (unit === "kelvin") return "K";
  return "°C";
}

