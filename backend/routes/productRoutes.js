/**
 * Product Routes:
 * This module defines the routes for handling product-related requests in the API.
 * 
 * - `GET /api/products`: Fetch all products.
 * - `GET /api/products/:id`: Fetch a single product by its ID.
 * 
 * The routes use controller functions (`getProducts` and `getProductById`) for handling requests.
 */

import express from 'express'; // Importing Express for route handling.
const router = express.Router(); // Creating an Express router instance.

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js'; // Importing controller functions for products.
import { protect, admin } from '../middleware/authMiddleware.js';

// Route to handle fetching all products.
router.route('/').get(getProducts).post(protect, admin, createProduct);

// Route to handle fetching a single product by its ID.
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

// Export the router to use in the main application.
export default router;
