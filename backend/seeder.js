/**
 * This script is used for managing data seeding and deletion in a MongoDB database.
 * It imports user, product, and order data models and utilities for database connection.
 * The `importData` function seeds the database with predefined user and product data.
 * The `destroyData` function clears all data from the database.
 * The script execution depends on the provided command-line argument:
 *   - Run without arguments to import data.
 *   - Run with `-d` to delete all data.
 */

// Imports necessary libraries and files.
import mongoose from 'mongoose'; // For database interaction.
import dotenv from 'dotenv'; // For environment variable configuration.
import colors from 'colors'; // For colorful console messages.
import users from './data/users.js'; // Predefined user data.
import products from './data/products.js'; // Predefined product data.
import User from './models/userModel.js'; // User model.
import Product from './models/productModel.js'; // Product model.
import Order from './models/orderModel.js'; // Order model.
import connectDB from './config/db.js'; // Database connection utility.

// Configures environment variables.
dotenv.config();

// Connects to the database.
connectDB();

/**
 * Function to import data into the database.
 * - Deletes existing orders, products, and users.
 * - Inserts predefined users and associates an admin user with sample products.
 */
const importData = async () => {
  try {
    // Clears existing data from the database.
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Inserts predefined users and retrieves the created users.
    const createdUsers = await User.insertMany(users);

    // Selects the first user as the admin user.
    const adminUser = createdUsers[0]._id;

    // Maps sample products to include the admin user as the owner.
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Inserts sample products into the database.
    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse); // Logs success message.
    process.exit(); // Exits the process.
  } catch (error) {
    console.error(`${error}`.red.inverse); // Logs error message.
    process.exit(1); // Exits the process with an error code.
  }
};

/**
 * Function to destroy all data in the database.
 * - Deletes all orders, products, and users.
 */
const destroyData = async () => {
  try {
    // Clears existing data from the database.
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse); // Logs success message.
    process.exit(); // Exits the process.
  } catch (error) {
    console.error(`${error}`.red.inverse); // Logs error message.
    process.exit(1); // Exits the process with an error code.
  }
};

/**
 * Determines the script behavior based on the provided command-line argument.
 * - `-d`: Executes `destroyData` to delete all data.
 * - Default: Executes `importData` to seed the database.
 */
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
