/**
 * This code defines a function to establish a connection to a MongoDB database using Mongoose.
 * It retrieves the database connection string from an environment variable (`MONGO_URI`), 
 * logs the connection details if successful, and terminates the process if an error occurs.
 */

// Imports the `mongoose` library for interacting with MongoDB.
import mongoose from 'mongoose';

// Defines an asynchronous function to connect to the MongoDB database.
const connectDB = async () => {
  try {
    // Tries to connect to the MongoDB database using the connection string from the environment variable.
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Logs a success message with the host name of the connected MongoDB server.
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Logs an error message if the connection fails.
    console.error(`Error: ${error.message}`);

    // Exits the process with a non-zero status code to indicate failure.
    process.exit(1);
  }
};

// Exports the `connectDB` function for use in other parts of the application.
export default connectDB;
