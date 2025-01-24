/**
 * This module defines route handlers for managing orders in an e-commerce application.
 * It includes functions for creating orders, retrieving user-specific orders, fetching orders by ID,
 * updating order statuses (e.g., marking orders as paid or delivered), and retrieving all orders.
 * These handlers interact with the MongoDB database using Mongoose models.
 */

import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Private
 */
const addOrderItems = asyncHandler(async (req, res) => {
  // Extract order details from the request body
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // Check if the orderItems array is empty
  if (orderItems && orderItems.length === 0) {
    res.status(400); // Set response status to 400 (Bad Request)
    throw new Error('No order items'); // Throw an error if no items are provided
  } else {
    // Create a new order object with the provided data
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x, // Spread operator to copy all properties of the order item
        product: x._id, // Assign the product ID
        _id: undefined, // Remove the existing _id to prevent conflicts
      })),
      user: req.user._id, // Associate the order with the logged-in user
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // Save the order to the database
    const createdOrder = await order.save();

    // Respond with the created order data and HTTP status 201 (Created)
    res.status(201).json(createdOrder);
  }
});

/**
 * @desc    Get orders for the logged-in user
 * @route   GET /api/orders/myorders
 * @access  Private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  // Fetch orders belonging to the currently authenticated user
  const orders = await Order.find({ user: req.user._id });

  // Respond with the retrieved orders
  res.json(orders);
});

/**
 * @desc    Get an order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
const getOrderById = asyncHandler(async (req, res) => {
  // Find the order by ID and populate user details (name and email)
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.json(order); // Return the order data if found
  } else {
    res.status(404); // Set response status to 404 (Not Found)
    throw new Error('Order not found'); // Throw an error if order is not found
  }
});

/**
 * @desc    Update an order to "Paid"
 * @route   PUT /api/orders/:id/pay
 * @access  Private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // Find the order by ID
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true; // Mark the order as paid
    order.paidAt = Date.now(); // Store the current timestamp as the payment date
    order.paymentResult = { // Store payment details from the request body
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    // Save the updated order
    const updatedOrder = await order.save();
    res.json(updatedOrder); // Respond with the updated order
  } else {
    res.status(404); // Set response status to 404 (Not Found)
    throw new Error('Order not found'); // Throw an error if order is not found
  }
});

/**
 * @desc    Update an order to "Delivered"
 * @route   PUT /api/orders/:id/deliver
 * @access  Private/Admin
 */
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('update order to delivered'); // Placeholder response
});

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private/Admin
 */
const getOrders = asyncHandler(async (req, res) => {
  res.send('get all orders'); // Placeholder response
});

// Export all order-related functions for use in the routes
export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
