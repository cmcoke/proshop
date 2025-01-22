/**
 * Authentication and Authorization Middleware:
 * This module contains middleware functions to protect routes and ensure
 * proper authorization for user and admin roles.
 * 
 * Key Features:
 * - Protects routes by verifying the user's JWT token and attaching the user object to the request.
 * - Ensures that only authorized users can access protected routes.
 * - Restricts access to certain routes based on admin privileges.
 */

import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// @desc    Protect routes by verifying JWT token
// @route   Middleware
// @access  Private
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user object to the request
      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// @desc    Middleware to check if user is an admin
// @route   Middleware
// @access  Private/Admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
