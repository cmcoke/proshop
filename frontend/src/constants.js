/**
 * API Endpoint Configuration:
 * This module defines constants for base URLs and API endpoint paths used across the application.
 * It simplifies and centralizes the management of API endpoints, ensuring consistency and maintainability.
 */

// Uncomment and use the following line during development to point to the backend server running locally.
// The condition checks if the app is running in the development environment.
// export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';

// Base URL for API requests. If a proxy is configured, this can remain an empty string.
export const BASE_URL = ''; // Defaults to proxy configuration, making API calls relative.

// Endpoint for products API.
export const PRODUCTS_URL = '/api/products'; // Path to fetch product-related data (e.g., list of products, single product details).

// Endpoint for users API.
export const USERS_URL = '/api/users'; // Path for user-related operations (e.g., authentication, registration).

// Endpoint for orders API.
export const ORDERS_URL = '/api/orders'; // Path for order-related operations (e.g., placing, viewing orders).

// Endpoint for PayPal configuration.
export const PAYPAL_URL = '/api/config/paypal'; // Path to fetch PayPal client ID for payment integration.
