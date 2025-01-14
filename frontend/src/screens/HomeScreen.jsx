import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';


const HomeScreen = () => {

  // products is the state variable and setProducts is the function that updates the state variable products with the new value.
  const [products, setProducts] = useState([]);

  // Fetch the list of products from the backend and update the products state variable with the fetched products. 
  useEffect(() => {

    // Define an async function to fetch the list of products from the backend. 
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products'); // Send a GET request to the backend to fetch the list of products. 
      setProducts(data); // Update the products state variable with the fetched products. 
    };

    fetchProducts(); // Call the fetchProducts function. 
  }, []); // The useEffect hook will run the callback function only once after the initial render.

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;