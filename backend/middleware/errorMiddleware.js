/**
 * Middleware functions for handling errors in an Express.js application.
 * 
 * Features:
 * - `notFound`: Handles requests to undefined routes and generates a 404 error.
 * - `errorHandler`: Handles all application errors, customizing error responses based on the error type.
 * 
 * These middleware functions improve error handling and provide user-friendly error messages.
 */

// Middleware to handle 404 errors (routes not found).
const notFound = (req, res, next) => {
  // Create an error object with a message that includes the requested URL.
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); // Set the response status to 404 (Not Found).
  next(error); // Pass the error to the next middleware (error handler).
};

// Middleware to handle all application errors.
const errorHandler = (err, req, res, next) => {
  // Determine the status code:
  // If the current status code is 200 (OK), it defaults to 500 (Internal Server Error).
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Use the error's message or a custom message if not provided.
  let message = err.message;

  // Special handling for CastError (e.g., invalid MongoDB ObjectId).
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404; // Resource not found.
    message = 'Resource not found'; // Custom message for this error type.
  }

  // Respond with the error details in JSON format.
  res.status(statusCode).json({
    message: message, // Error message to be sent in the response.
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Include the stack trace only in non-production environments.
  });
};

// Export the middleware functions for use in other parts of the application.
export { notFound, errorHandler };
