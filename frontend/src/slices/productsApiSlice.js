/**
 * RTK Query API Slice Extension for Products:
 * This module extends the base `apiSlice` to include endpoints for fetching product data.
 * It uses `injectEndpoints` to define and manage product-related API calls.
 */

import { PRODUCTS_URL, UPLOAD_URL } from '../constants'; // Import the base URL for product-related API endpoints.
import { apiSlice } from './apiSlice'; // Import the base API slice configured with RTK Query.

// Extend the base `apiSlice` to include product-specific endpoints.
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint to fetch all products:
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL, // API endpoint for retrieving the list of products.
        params: { keyword, pageNumber },
      }),
      providesTags: ['Products'],
      keepUnusedDataFor: 5, // Keeps unused data in the cache for 5 seconds before removing it.
    }),
    // Endpoint to fetch details of a single product:
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`, // Constructs the URL using the product ID.
      }),
      keepUnusedDataFor: 5, // Keeps unused data in the cache for 5 seconds.
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    getTopProducts: builder.query({
      query: () => `${PRODUCTS_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
});

// Export auto-generated hooks for the defined endpoints:
// `useGetProductsQuery` for fetching all products.
// `useGetProductDetailsQuery` for fetching details of a specific product.
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery
} = productsApiSlice;
