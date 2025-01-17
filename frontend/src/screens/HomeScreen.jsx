/**
 * HomeScreen Component:
 * This component is responsible for displaying the homepage of the e-commerce site.
 * It fetches and displays the latest products, along with loading and error handling states.
 */

import { Row, Col } from 'react-bootstrap'; // Import layout components from react-bootstrap for responsive grids.
import Product from '../components/Product'; // Component to display individual product details.
import Loader from '../components/Loader'; // Component to show a loading spinner while data is being fetched.
import { useGetProductsQuery } from '../slices/productsApiSlice'; // Hook to fetch the products from the API.
import Message from '../components/Message'; // Component to display error or informational messages.

const HomeScreen = () => {


  /**  
    * Use the `useGetProductsQuery` hook to fetch product data from the API.
    * Destructure the hook's return values:
    * - data: products: The fetched product data, renamed to `products` for easier reference.
    * - isLoading: Boolean indicating if the API call is in progress.
    * - error: Contains error information if the API call fails.
   */
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        // Display the loader while the API call is in progress.
        <Loader />
      ) : error ? (
        // Display an error message if the API call fails.
        <Message variant="danger">
          {error?.data?.message || error.error} {/* Display a detailed error message if available. */}
        </Message>
      ) : (
        // Display the list of products if data is successfully fetched.
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                {/* Render a `Product` component for each product in the data array. */}
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
