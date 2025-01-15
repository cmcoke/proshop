/**
 * This utility function wraps asynchronous route handlers and middleware in Express.js.
 * It simplifies error handling by automatically catching and passing errors to the `next` middleware.
 * 
 * Usage:
 * - Wrap your asynchronous route handlers or middleware functions with `asyncHandler`.
 * - It eliminates the need for repetitive `try-catch` blocks.
 */

// Defines the asyncHandler function as a higher-order function.
const asyncHandler = (fn) => (req, res, next) => {
  // Wraps the provided function (`fn`) in a Promise and resolves it.
  // If the promise rejects (an error occurs), it is passed to the `next` middleware.
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Exports the asyncHandler function for use in other files.
export default asyncHandler;
