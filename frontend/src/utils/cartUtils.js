/**
 * Cart Price Calculations:
 * This module contains utility functions for calculating prices related to items in the cart,
 * including the total price, shipping, tax, and individual item prices. It also saves the cart state
 * to local storage.
 * 
 * Key Features:
 * - `addDecimals` rounds numbers to two decimal places and formats them as strings.
 * - `updateCart` calculates and updates various price values in the cart, such as items price, shipping,
 *   tax, and total price. The updated cart is then saved to localStorage.
 */

export const addDecimals = (num) => {
  // Round the number to two decimal places and format it as a string
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate the total price of all items in the cart
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate the shipping price (free shipping if items price is above 100)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calculate the tax price (15% tax rate)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  // Calculate the total price by adding items, shipping, and tax
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // Save the updated cart state to localStorage for persistence
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
