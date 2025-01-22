/**
 * Redux Store Configuration:
 * This module sets up the Redux store for state management in the application.
 * 
 * Key Features:
 * - Integrates Redux Toolkit for simplified setup and usage.
 * - Configures API slice with its reducer and middleware.
 * - Enables Redux DevTools for debugging during development.
 */

import { configureStore } from '@reduxjs/toolkit'; // Importing the Redux Toolkit configureStore function.
import { apiSlice } from './slices/apiSlice'; // Importing the API slice for handling API-related state and actions.
import cartSliceReducer from './slices/cartSlice'; // Importing the cart slice reducer to manage cart-related state.
import authSliceReducer from './slices/authSlice'; // Importing the auth slice reducer to manage authentication-related state.

// Create and configure the Redux store.
export const store = configureStore({
  // Define the reducers for the store.
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Add the API slice reducer under its specific path.
    cart: cartSliceReducer, // Add the cart slice reducer.
    auth: authSliceReducer // Add the auth slice reducer.
  },
  // Configure middleware for the store.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add the default middleware with the API slice middleware.
  devTools: true, // Enable Redux DevTools for easier debugging in development.
});

// Export the store for use in the application.
export default store;
