/**
 * This code defines a Redux slice for managing shopping cart functionality using Redux Toolkit's `createSlice`.
 * 
 * Summary:
 * - Initializes the cart state from `localStorage`, defaulting to an empty cart if not available.
 * - Provides two main actions:
 *   1. `addToCart`: Adds an item to the cart or updates its quantity if it already exists.
 *   2. `removeFromCart`: Removes an item from the cart.
 * - Updates the cart state in `localStorage` using the `updateCart` utility function.
 */

// Import the `createSlice` function from Redux Toolkit to define the slice.
import { createSlice } from '@reduxjs/toolkit';

// Import the `updateCart` utility function for updating cart data in `localStorage` and recalculating totals.
import { updateCart } from '../utils/cartUtils';

// Retrieve cart data from `localStorage` if available, otherwise initialize an empty cart state.
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart')) // Parse stored cart data if it exists.
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' }; // Default to an empty `cartItems` array if no data is stored.

// Define the `cartSlice` using Redux Toolkit's `createSlice` function.
const cartSlice = createSlice({

  name: 'cart',  // Name of the slice.

  // Initial state of the slice.
  initialState,

  // Reducer functions to handle state changes for this slice.
  reducers: {
    // Reducer to handle adding items to the cart.
    addToCart: (state, action) => {
      // Extract the item to be added from the action payload.
      const item = action.payload;

      // Check if the item already exists in the cart by matching its `_id`.
      const existItem = state.cartItems.find((x) => x._id === item._id);

      // If the item already exists, update its details in the cart.
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // If the item does not exist, add it to the cart.
        state.cartItems = [...state.cartItems, item];
      }

      // Call the `updateCart` utility to save the updated cart and recalculate totals.
      return updateCart(state, item);
    },

    // Reducer to handle removing items from the cart.
    removeFromCart: (state, action) => {
      // Filter out the item to be removed based on its `_id`.
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      // Call the `updateCart` utility to save the updated cart and recalculate totals.
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

// Export the `addToCart` and `removeFromCart` actions for use in components.
export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;

// Export the slice reducer to integrate into the Redux store.
export default cartSlice.reducer;
