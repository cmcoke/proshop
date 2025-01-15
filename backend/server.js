/**
 * This is the main entry point for the Express.js application.
 * It sets up the server, connects to the database, and defines routes for the API.
 * 
 * Features:
 * - Loads environment variables using `dotenv`.
 * - Connects to the MongoDB database.
 * - Defines a root route and a route for handling product-related requests.
 * - Starts the server on a specified port.
 */

import express from 'express'; // Import Express.js to create the server.
import dotenv from 'dotenv'; // Import dotenv to manage environment variables.
dotenv.config(); // Load environment variables from a `.env` file.
import connectDB from './config/db.js'; // Import the database connection utility.
import productRoutes from './routes/productRoutes.js'; // Import product-related routes.
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // Import error handling middleware.

const port = process.env.PORT || 5000; // Define the port for the server, defaulting to 5000 if not set in the `.env` file.

connectDB(); // Connect to the MongoDB database.

const app = express(); // Initialize the Express application.

// Root route to confirm the API is running.
app.get('/', (req, res) => {
  res.send('API is running...'); // Sends a basic response for the root URL.
});

// Route for handling product-related requests.
// Any requests to `/api/products` are forwarded to the `productRoutes` router.
app.use('/api/products', productRoutes);

app.use(notFound); // Middleware to handle requests to non-existent routes. Responds with a 404 status code.
app.use(errorHandler); // Middleware to handle errors in the application. Responds with a 500 status code.

// Start the server and listen on the defined port.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Log a confirmation message.
});
