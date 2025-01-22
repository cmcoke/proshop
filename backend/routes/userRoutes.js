/**
 * User Routes:
 * This module defines the routes for handling user-related operations such as authentication,
 * registration, profile management, and admin-only actions.
 * 
 * Key Features:
 * - Handles user registration, login, and logout.
 * - Provides functionality for user profile retrieval and updating.
 * - Provides admin routes for fetching, updating, and deleting users.
 * - Protects sensitive routes with authentication and admin authorization middleware.
 */

import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for user registration and fetching users (admin only)
router.route('/').post(registerUser).get(protect, admin, getUsers);

// Route for user login
router.post('/auth', authUser);

// Route for user logout
router.post('/logout', logoutUser);

// Route for viewing and updating user profile
router
  .route('/profile')
  .get(protect, getUserProfile) // Only accessible if authenticated
  .put(protect, updateUserProfile); // Only accessible if authenticated

// Route for admin actions (delete, get by ID, update)
router
  .route('/:id')
  .delete(protect, admin, deleteUser) // Only accessible to admins
  .get(protect, admin, getUserById) // Only accessible to admins
  .put(protect, admin, updateUser); // Only accessible to admins

export default router;
