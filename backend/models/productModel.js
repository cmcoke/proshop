/**
 * This code defines Mongoose schemas and models for a `Product` entity and a `Review` entity in a MongoDB database.
 * The `reviewSchema` defines the structure for individual reviews, including fields for the reviewer's name, rating, comment, and user reference.
 * The `productSchema` includes fields to represent product details such as user reference, name, image, brand, category, description, reviews (linked to `reviewSchema`), ratings, price, and stock count.
 * Both schemas include automatic timestamps for `createdAt` and `updatedAt`.
 * The `Product` model is exported for use in other parts of the application.
 */

// Imports the `mongoose` library for working with MongoDB.
import mongoose from 'mongoose';

// Defines the schema for individual reviews.
const reviewSchema = mongoose.Schema(
  {
    // Name of the reviewer.
    name: {
      type: String, // Data type for the reviewer's name is a string.
      required: true, // Field is mandatory.
    },
    // Rating given by the reviewer.
    rating: {
      type: Number, // Data type for the rating is a number.
      required: true, // Field is mandatory.
    },
    // Review comment provided by the reviewer.
    comment: {
      type: String, // Data type for the comment is a string.
      required: true, // Field is mandatory.
    },
    // Reference to the user who created the review.
    user: {
      type: mongoose.Schema.Types.ObjectId, // Stores the ID of a user.
      required: true, // Field is mandatory.
      ref: 'User', // Refers to the `User` model for population.
    },
  },
  {
    // Automatically adds `createdAt` and `updatedAt` timestamps to the schema.
    timestamps: true,
  }
);

// Defines the schema for the `Product` model.
const productSchema = mongoose.Schema(
  {
    // References the user who created or owns the product.
    user: {
      type: mongoose.Schema.Types.ObjectId, // Stores the ID of a user.
      required: true, // Field is mandatory.
      ref: 'User', // Refers to the `User` model for population.
    },
    // Name of the product.
    name: {
      type: String, // Data type for the name is a string.
      required: true, // Field is mandatory.
    },
    // URL or path of the product image.
    image: {
      type: String, // Data type for the image is a string.
      required: true, // Field is mandatory.
    },
    // Brand of the product.
    brand: {
      type: String, // Data type for the brand is a string.
      required: true, // Field is mandatory.
    },
    // Category of the product.
    category: {
      type: String, // Data type for the category is a string.
      required: true, // Field is mandatory.
    },
    // Description of the product.
    description: {
      type: String, // Data type for the description is a string.
      required: true, // Field is mandatory.
    },
    // Array of reviews related to the product.
    reviews: [reviewSchema], // Links the product with multiple reviews via `reviewSchema`.
    // Overall rating of the product.
    rating: {
      type: Number, // Data type for the rating is a number.
      required: true, // Field is mandatory.
      default: 0, // Default rating is 0 if none is provided.
    },
    // Number of reviews for the product.
    numReviews: {
      type: Number, // Data type for the number of reviews is a number.
      required: true, // Field is mandatory.
      default: 0, // Default is 0 if no reviews exist.
    },
    // Price of the product.
    price: {
      type: Number, // Data type for the price is a number.
      required: true, // Field is mandatory.
      default: 0, // Default price is 0 if none is provided.
    },
    // Number of items of the product available in stock.
    countInStock: {
      type: Number, // Data type for the stock count is a number.
      required: true, // Field is mandatory.
      default: 0, // Default stock count is 0 if none is provided.
    },
  },
  {
    // Automatically adds `createdAt` and `updatedAt` timestamps to the schema.
    timestamps: true,
  }
);

// Creates the `Product` model based on the `productSchema`.
const Product = mongoose.model('Product', productSchema);

// Exports the `Product` model for use in other parts of the application.
export default Product;
