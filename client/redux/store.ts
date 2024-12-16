"use client";

import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
import { progressApi } from "./features/progress/progressApi";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [progressApi.reducerPath]: progressApi.reducer,
    auth: authSlice,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, progressApi.middleware),
});

const intializeApp = async () => {
  // get load user data on every page reload
  await store.dispatch(
    apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};

intializeApp();
