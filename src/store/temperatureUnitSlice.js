import { createSlice } from "@reduxjs/toolkit";

// Get initial temperature unit from localStorage
const getInitialTemperatureUnit = () => {
  const saved = localStorage.getItem("temperatureUnit");
  return saved || "celsius";
};

const temperatureUnitSlice = createSlice({
  name: "temperatureUnit",
  initialState: getInitialTemperatureUnit(),
  reducers: {
    setTemperatureUnit: (state, action) => {
      const unit = action.payload;
      if (["celsius", "fahrenheit", "kelvin"].includes(unit)) {
        // Save to localStorage
        localStorage.setItem("temperatureUnit", unit);
        return unit;
      }
      return state;
    },
  },
});

export const { setTemperatureUnit } = temperatureUnitSlice.actions;
export default temperatureUnitSlice.reducer;

