/**
 * Token Generation:
 * This module defines a utility function to generate a JWT (JSON Web Token) for user authentication.
 * The token is signed with a user ID and is set as an HTTP-only cookie in the response.
 * 
 * Key Features:
 * - Generates a JWT with an expiration time of 1 hour.
 * - Sets the token in an HTTP-only cookie to enhance security.
 * - Configures the cookie for production (secure cookies) and adds protections against CSRF.
 * - The token can be used for user authentication in subsequent requests.
 */

import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  // Generate a JWT token with the user ID and a 1-hour expiration time
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  // Set JWT as an HTTP-Only cookie with appropriate security options
  res.cookie('jwt', token, {
    httpOnly: true, // Make the cookie inaccessible via JavaScript
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks by restricting cookie sending
    maxAge: 60 * 60 * 1000, // Set cookie expiration to 1 hour in milliseconds
  });
};

export default generateToken;
