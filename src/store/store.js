import { configureStore } from "@reduxjs/toolkit";
import temperatureUnitReducer from "./temperatureUnitSlice";

export const store = configureStore({
  reducer: {
    temperatureUnit: temperatureUnitReducer,
  },
});

