/**
 * This module defines route handlers for managing orders in an e-commerce application.
 * It includes functions for creating orders, retrieving user-specific orders, fetching orders by ID,
 * updating order statuses (e.g., marking orders as paid or delivered), and retrieving all orders.
 * These handlers interact with the MongoDB database using Mongoose models.
 */

import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { calcPrices } from '../utils/calcPrices.js';
import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal.js';

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Private
 */
const addOrderItems = asyncHandler(async (req, res) => {

  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    // get the ordered items from our database
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    // map over the order items and use the price from our items from database
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    // calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

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
  const { verified, value } = await verifyPayPalPayment(req.body.id);
  if (!verified) throw new Error('Payment not verified');

  // check if this transaction has been used before
  const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  if (!isNewTransaction) throw new Error('Transaction has been used before');

  const order = await Order.findById(req.params.id);

  if (order) {
    // check the correct amount was paid
    const paidCorrectAmount = order.totalPrice.toString() === value;
    if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

/**
 * @desc    Update an order to "Delivered"
 * @route   PUT /api/orders/:id/deliver
 * @access  Private/Admin
 */
const updateOrderToDelivered = asyncHandler(async (req, res) => {

  // Find the order by ID
  const order = await Order.findById(req.params.id);

  // Check if the order exists and update the delivery status and date if found 
  if (order) {
    order.isDelivered = true; // Mark the order as delivered 
    order.deliveredAt = Date.now(); // Store the current timestamp as the delivery date 

    const updatedOrder = await order.save(); // Save the updated order 

    res.json(updatedOrder); // Respond with the updated order 
  } else {
    res.status(404); // Set response status to 404 (Not Found) 
    throw new Error('Order not found'); // Throw an error if order is not found 
  }

});

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private/Admin
 */
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name'); // Fetch all orders and populate user details (id and name) for each order item in the list of orders 
  res.json(orders); // Respond with the list of orders in JSON format 
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
