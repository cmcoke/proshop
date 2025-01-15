/**
 * This code defines a Mongoose schema and model for an `Order` entity in a MongoDB database.
 * The schema includes fields to store information about the user placing the order, order items, 
 * shipping details, payment details, and order status. It also includes pricing information and timestamps.
 * The `Order` model is exported for use in other parts of the application.
 */

// Imports the `mongoose` library for working with MongoDB.
import mongoose from 'mongoose';

// Defines the schema for the `Order` model.
const orderSchema = mongoose.Schema(
  {
    // References the user who placed the order.
    user: {
      type: mongoose.Schema.Types.ObjectId, // Stores the ID of a user.
      required: true, // Field is mandatory.
      ref: 'User', // Refers to the `User` model for population.
    },
    // Array of items included in the order.
    orderItems: [
      {
        // Name of the product.
        name: { type: String, required: true }, // Mandatory string field.
        // Quantity of the product ordered.
        qty: { type: Number, required: true }, // Mandatory numeric field.
        // URL or path of the product image.
        image: { type: String, required: true }, // Mandatory string field.
        // Price of the product.
        price: { type: Number, required: true }, // Mandatory numeric field.
        // References the product being ordered.
        product: {
          type: mongoose.Schema.Types.ObjectId, // Stores the ID of a product.
          required: true, // Field is mandatory.
          ref: 'Product', // Refers to the `Product` model for population.
        },
      },
    ],
    // Shipping address details for the order.
    shippingAddress: {
      // Street address.
      address: { type: String, required: true }, // Mandatory string field.
      // City name.
      city: { type: String, required: true }, // Mandatory string field.
      // Postal code.
      postalCode: { type: String, required: true }, // Mandatory string field.
      // Country name.
      country: { type: String, required: true }, // Mandatory string field.
    },
    // Payment method used for the order.
    paymentMethod: {
      type: String, // Data type for the payment method is a string.
      required: true, // Field is mandatory.
    },
    // Details of the payment result.
    paymentResult: {
      id: { type: String }, // Transaction ID of the payment.
      status: { type: String }, // Status of the payment (e.g., 'completed').
      update_time: { type: String }, // Timestamp of the last payment update.
      email_address: { type: String }, // Email address of the payer.
    },
    // Total price of all items in the order before tax and shipping.
    itemsPrice: {
      type: Number, // Data type for the items price is a number.
      required: true, // Field is mandatory.
      default: 0.0, // Default price is 0 if none is provided.
    },
    // Tax amount for the order.
    taxPrice: {
      type: Number, // Data type for the tax price is a number.
      required: true, // Field is mandatory.
      default: 0.0, // Default tax is 0 if none is provided.
    },
    // Shipping cost for the order.
    shippingPrice: {
      type: Number, // Data type for the shipping price is a number.
      required: true, // Field is mandatory.
      default: 0.0, // Default shipping price is 0 if none is provided.
    },
    // Total price of the order including items, tax, and shipping.
    totalPrice: {
      type: Number, // Data type for the total price is a number.
      required: true, // Field is mandatory.
      default: 0.0, // Default total price is 0 if none is provided.
    },
    // Indicates whether the order has been paid for.
    isPaid: {
      type: Boolean, // Data type for payment status is a boolean.
      required: true, // Field is mandatory.
      default: false, // Default is `false` (not paid).
    },
    // Timestamp when the order was paid.
    paidAt: {
      type: Date, // Data type for the payment date is a date object.
    },
    // Indicates whether the order has been delivered.
    isDelivered: {
      type: Boolean, // Data type for delivery status is a boolean.
      required: true, // Field is mandatory.
      default: false, // Default is `false` (not delivered).
    },
    // Timestamp when the order was delivered.
    deliveredAt: {
      type: Date, // Data type for the delivery date is a date object.
    },
  },
  {
    // Automatically adds `createdAt` and `updatedAt` timestamps to the schema.
    timestamps: true,
  }
);

// Creates the `Order` model based on the `orderSchema`.
const Order = mongoose.model('Order', orderSchema);

// Exports the `Order` model for use in other parts of the application.
export default Order;
