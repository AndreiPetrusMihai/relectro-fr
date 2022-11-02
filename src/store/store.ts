import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { relectroApi } from "./api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(relectroApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
