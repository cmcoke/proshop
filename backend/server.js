import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); // Load the dotenv module and call the config method to read the .env file and make the environment variables available
import products from './data/products.js'; // Import the products data from the products.js file in the data folder


const port = process.env.PORT || 5000; // Set the port number to the value of the PORT environment variable or 5000 if it's not set

const app = express(); // Create an express app instance and store it in a variable called app

// Listen on the port number and log a message to the console to indicate that the server is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Create a route to get all products and send the products data as a JSON response to the client when the route is hit
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Create a route to get a single product by id and send the product data as a JSON response to the client when the route is hit
app.get('/api/products/:id', (req, res) => {

  // Using the products data array, find the product that matches the id in the request parameters and store it in a variable called product 
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});


// Start the server on the specified port number and log a message to the console to indicate that the server is running on that port number 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});