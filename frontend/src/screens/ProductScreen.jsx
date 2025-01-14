import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';


const ProductScreen = () => {

  // product is the state variable and setProduct is the function that updates the state variable product with the new value.
  const [product, setProduct] = useState({});

  // Destructure the id parameter from the URL and rename it to productId for clarity. 
  const { id: productId } = useParams();

  // Fetch the product with the given productId from the backend and update the product state variable with the fetched product.
  useEffect(() => {

    // Define an async function to fetch the product with the given productId from the backend.
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`); // Send a GET request to the backend to fetch the product with the given productId.
      setProduct(data); // Update the product state variable with the fetched product. 
    };

    fetchProduct(); // Call the fetchProduct function. 

  }, [productId]); // The useEffect hook will re-run the callback function whenever the productId changes.

  return (
    <>

      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>

      <Row>

        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {/* If the product is in stock, display 'In Stock'. Otherwise, display 'Out Of Stock'. */}
                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0} // Disable the button if the product is out of stock.
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

      </Row>
    </>
  );
};
export default ProductScreen;