import { configureStore } from "@reduxjs/toolkit";
import stockSlice from "./features/stock/stockSlice";

export const createStore = () => {
  return configureStore({
    reducer: {
      stockSlice: stockSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof createStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
