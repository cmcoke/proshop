/**
 * This code defines API endpoints for user-related operations using Redux Toolkit Query.
 *
 * Summary:
 * - Extends an existing `apiSlice` by injecting endpoints for login, registration, and logout functionality.
 * - Uses Redux Toolkit Query's `builder.mutation` to define mutations for these operations.
 * - Exports hooks (`useLoginMutation`, `useLogoutMutation`, and `useRegisterMutation`) for easy use in React components.
 */

// Import the `apiSlice` object to extend it with additional endpoints.
import { apiSlice } from './apiSlice';

// Import the base URL for user-related API endpoints.
import { USERS_URL } from '../constants';

// Extend the existing `apiSlice` to inject new endpoints related to user authentication and management.
export const usersApiSlice = apiSlice.injectEndpoints({
  // Define the endpoints as a function that receives the `builder` object.
  endpoints: (builder) => ({
    // Define the `login` endpoint for user authentication.
    login: builder.mutation({
      // Specify the API request details for the `login` mutation.
      query: (data) => ({
        // Set the endpoint URL for user authentication.
        url: `${USERS_URL}/auth`,
        // Use the POST method to send authentication data.
        method: 'POST',
        // Pass the login data (e.g., email and password) as the request body.
        body: data,
      }),
    }),

    // Define the `register` endpoint for user registration.
    register: builder.mutation({
      // Specify the API request details for the `register` mutation.
      query: (data) => ({
        // Set the endpoint URL for user registration.
        url: `${USERS_URL}`,
        // Use the POST method to send registration data.
        method: 'POST',
        // Pass the registration data (e.g., name, email, password) as the request body.
        body: data,
      }),
    }),

    // Define the `logout` endpoint for logging out users.
    logout: builder.mutation({
      // Specify the API request details for the `logout` mutation.
      query: () => ({
        // Set the endpoint URL for user logout.
        url: `${USERS_URL}/logout`,
        // Use the POST method to trigger the logout process.
        method: 'POST',
      }),
    }),
  }),
});

// Export hooks for the defined mutations, making them accessible in React components.
export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;
