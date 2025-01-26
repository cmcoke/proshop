/**
 * Controller functions for handling product-related routes in the application.
 * 
 * Features:
 * - `getProducts`: Fetches and returns a list of all products from the database.
 * - `getProductById`: Fetches and returns a single product based on its ID.
 * 
 * These functions are wrapped with `asyncHandler` to handle errors in asynchronous code and ensure clean error management.
 */

import asyncHandler from '../middleware/asyncHandler.js'; // Middleware to handle errors in async functions.
import Product from '../models/productModel.js'; // Mongoose model for the Product collection.

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}); // Query the database to fetch all products.
  res.json(products); // Respond with the list of products in JSON format.
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {

  // Query the database to fetch a single product by its ID (from the request parameters).
  const product = await Product.findById(req.params.id);

  // If the product exists, send it as a JSON response.
  if (product) {
    return res.json(product);
  }

  // If the product does not exist, set the status to 404 (Not Found).
  res.status(404);

  // Throw an error, which will be caught by the error-handling middleware.
  throw new Error('Resource not found');
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {

  const { name, price, description, image, brand, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'Product deleted' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }

});

// Export the controller functions for use in route definitions.
export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
