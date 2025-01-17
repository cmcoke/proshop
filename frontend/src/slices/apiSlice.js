/**
 * Redux Toolkit Query (RTK Query) API Configuration:
 * This module sets up a reusable API slice for managing data fetching, caching, and synchronization 
 * with a backend API using RTK Query.
 */

import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'; // RTK Query utilities for creating an API slice.
import { BASE_URL } from '../constants'; // Import the base URL for API requests from a centralized constants file.

// Base query configuration:
// Configures the base URL for all API requests made using this API slice.
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Create an API slice:
// `createApi` is the core function of RTK Query used to define an API service.
// It simplifies data fetching, caching, and state management for API calls.
export const apiSlice = createApi({
  baseQuery, // Uses the predefined base query with the base URL.
  tagTypes: ['Product', 'Order', 'User'], // Defines "tags" for cache invalidation and refetching logic.
  endpoints: (builder) => ({}), // Placeholder for defining API endpoints (to be expanded as needed).
});
