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

import path from 'path';
import express from 'express'; // Import Express.js to create the server.
import dotenv from 'dotenv'; // Import dotenv to manage environment variables.
import cookieParser from 'cookie-parser';
dotenv.config(); // Load environment variables from a `.env` file.
import connectDB from './config/db.js'; // Import the database connection utility.
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // Import error handling middleware.
import productRoutes from './routes/productRoutes.js'; // Import product-related routes.
import userRoutes from './routes/userRoutes.js'; // Import user-related routes. 
import orderRoutes from './routes/orderRoutes.js'; // Import order-related routes. 
import uploadRoutes from './routes/uploadRoutes.js';


const port = process.env.PORT || 5000; // Define the port for the server, defaulting to 5000 if not set in the `.env` file.

connectDB(); // Connect to the MongoDB database.

const app = express(); // Initialize the Express application.

app.use(express.json()); // Enable parsing of JSON bodies sent in requests. 
app.use(express.urlencoded({ extended: true })); // Enable parsing of URL-encoded bodies sent in requests. 

app.use(cookieParser()); // Enable parsing of cookies sent in requests. 

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Route for handling product-related requests.
// Any requests to `/api/products` are forwarded to the `productRoutes` router.
app.use('/api/products', productRoutes);

// Route for handling user-related requests. 
app.use('/api/users', userRoutes);

// Route for handling order-related requests.
app.use('/api/orders', orderRoutes);


// Route for handling PayPal client ID requests. 
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);



app.use(notFound); // Middleware to handle requests to non-existent routes. Responds with a 404 status code.
app.use(errorHandler); // Middleware to handle errors in the application. Responds with a 500 status code.

// Start the server and listen on the defined port.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Log a confirmation message.
});
