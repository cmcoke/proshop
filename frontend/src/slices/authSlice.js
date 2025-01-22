/**
 * This code defines a Redux slice for managing user authentication using Redux Toolkit's `createSlice` method.
 * 
 * Summary:
 * - Initializes authentication state from `localStorage` if available, defaulting to `null` otherwise.
 * - Provides two main actions: 
 *   1. `setCredentials`: Updates user authentication information and saves it in `localStorage`.
 *      - Additionally sets an expiration time for the session in `localStorage`.
 *   2. `logout`: Clears user authentication information from the state and removes associated data from `localStorage`.
 * 
 * Purpose:
 * - This slice simplifies managing user authentication state and ensures session persistence across browser refreshes.
 */

// Import the `createSlice` function from Redux Toolkit to define a Redux slice easily.
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state object.
// Initialize the `userInfo` property:
// - If `localStorage` contains `userInfo`, parse and assign it.
// - Otherwise, set `userInfo` to `null` (no user is logged in).
const initialState = { userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null };

// Create the `authSlice` using `createSlice`.
const authSlice = createSlice({
  // Name the slice `auth` to identify it in Redux.
  name: 'auth',

  // Set the initial state for this slice.
  initialState,

  // Define the reducer functions for managing the authentication state.
  reducers: {

    // Action to set user credentials (e.g., when a user logs in).
    setCredentials: (state, action) => {

      // Update the `userInfo` state with the data provided in the action payload.
      state.userInfo = action.payload;

      // Store the user information in `localStorage` as a string to persist across sessions.
      localStorage.setItem('userInfo', JSON.stringify(action.payload));

      // Calculate the session expiration time (current time + 1 day in milliseconds).
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;

      // Alternative for testing: Set expiration time to 1 minute from now.
      // const expirationTime = new Date().getTime() + 60 * 1000; 

      // Save the expiration time in `localStorage` for session management.
      localStorage.setItem('expirationTime', expirationTime);
    },

    // Action to log out the user and clear authentication data.
    logout: (state, action) => {

      // Reset the `userInfo` state to `null` (no user logged in).
      state.userInfo = null;

      // Remove the `userInfo` data from `localStorage`.
      localStorage.removeItem('userInfo');

      // Remove the `expirationTime` from `localStorage`.
      localStorage.removeItem('expirationTime');
    },
  },
});

// Export the actions (`setCredentials` and `logout`) for use in components.
export const { setCredentials, logout } = authSlice.actions;

// Export the slice reducer to integrate into the Redux store.
export default authSlice.reducer;
