/**
 * This code defines a Mongoose schema and model for a `User` entity in a MongoDB database.
 * The schema includes fields to represent user details such as name, email, password, and admin status.
 * It also ensures unique email addresses and includes automatic timestamps for `createdAt` and `updatedAt`.
 * The `User` model is exported for use in other parts of the application.
 */

// Imports the `mongoose` library for working with MongoDB.
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Defines the schema for the `User` model.
const userSchema = mongoose.Schema(
  {
    // Name of the user.
    name: {
      type: String, // Data type for the name is a string.
      required: true, // Field is mandatory.
    },
    // Email address of the user.
    email: {
      type: String, // Data type for the email is a string.
      required: true, // Field is mandatory.
      unique: true, // Ensures email addresses are unique in the database.
    },
    // Password for the user's account.
    password: {
      type: String, // Data type for the password is a string.
      required: true, // Field is mandatory.
    },
    // Indicates whether the user has admin privileges.
    isAdmin: {
      type: Boolean, // Data type for admin status is a boolean.
      required: true, // Field is mandatory.
      default: false, // Default value is `false` (not an admin).
    },
  },
  {
    // Automatically adds `createdAt` and `updatedAt` timestamps to the schema.
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Creates the `User` model based on the `userSchema`.
const User = mongoose.model('User', userSchema);

// Exports the `User` model for use in other parts of the application.
export default User;
