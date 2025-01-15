/**
 * This code defines an array of user objects to seed a database with initial user data.
 * Each user has attributes such as name, email, hashed password, and an optional admin flag.
 * The `bcryptjs` library is used to securely hash passwords before storing them.
 * The `users` array is exported for use in other parts of the application.
 */

// Imports the `bcryptjs` library for hashing passwords securely.
import bcrypt from 'bcryptjs';

// Defines an array of user objects with initial data.
const users = [
  {
    // Admin user with elevated privileges.
    name: 'Admin User', // Name of the admin user.
    email: 'admin@email.com', // Admin user's email address.
    password: bcrypt.hashSync('123456', 10), // Hashed password using bcrypt.
    isAdmin: true, // Indicates that this user is an admin.
  },
  {
    // Regular user named John Doe.
    name: 'John Doe', // Name of the user.
    email: 'john@email.com', // User's email address.
    password: bcrypt.hashSync('123456', 10), // Hashed password using bcrypt.
  },
  {
    // Regular user named Jane Doe.
    name: 'Jane Doe', // Name of the user.
    email: 'jane@email.com', // User's email address.
    password: bcrypt.hashSync('123456', 10), // Hashed password using bcrypt.
  },
];

// Exports the `users` array for use in other parts of the application, such as database seeding.
export default users;
