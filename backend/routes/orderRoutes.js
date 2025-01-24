/**
 * This router handles all order-related functionality in the application.
 * It includes routes for creating orders, fetching orders for the logged-in user,
 * retrieving all orders (admin-only), getting specific orders by ID, and
 * updating order statuses (e.g., to "Paid" or "Delivered").
 * 
 * routes 
 *   POST   /api/orders          - Create a new order (protected)
 *   GET    /api/orders          - Get all orders (admin-only)
 *   GET    /api/orders/mine     - Get the logged-in user's orders (protected)
 *   GET    /api/orders/:id      - Get a specific order by ID (protected)
 *   PUT    /api/orders/:id/pay  - Update order to "Paid" (protected)
 *   PUT    /api/orders/:id/deliver - Update order to "Delivered" (admin-only)
 */

import express from 'express'; // Import the Express library
const router = express.Router(); // Create a new router instance

// Import controller functions that handle the order-related operations
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/orderController.js';

// Import middleware functions to protect routes and enforce admin access
import { protect, admin } from '../middleware/authMiddleware.js';

/**
 * @desc   Define the routes for order-related actions.
 *         This router handles requests related to creating orders, fetching orders,
 *         and updating order statuses.
 */

// Route: POST /api/orders - Create a new order (protected)
// Route: GET /api/orders - Get all orders (protected, admin-only)
router.route('/')
  .post(protect, addOrderItems) // Protected route for creating orders
  .get(protect, admin, getOrders); // Admin-only route for retrieving all orders

// Route: GET /api/orders/mine - Get the logged-in user's orders (protected)
router.route('/mine')
  .get(protect, getMyOrders); // Protected route for fetching the current user's orders

// Route: GET /api/orders/:id - Get an order by ID (protected, admin-only)
router.route('/:id')
  .get(protect, getOrderById); // Admin-only route for retrieving a specific order by ID

// Route: PUT /api/orders/:id/pay - Update an order's status to "Paid" (protected)
router.route('/:id/pay')
  .put(protect, updateOrderToPaid); // Protected route for updating an order's payment status

// Route: PUT /api/orders/:id/deliver - Update an order's status to "Delivered" (protected, admin-only)
router.route('/:id/deliver')
  .put(protect, admin, updateOrderToDelivered); // Admin-only route for updating an order's delivery status

// Export the router for use in the main application
export default router;
