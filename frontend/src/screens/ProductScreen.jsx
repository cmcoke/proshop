/**
 * ProductScreen Component:
 * This component is responsible for displaying detailed information about a specific product.
 * It handles fetching product data from the API and displays it along with loading and error states.
 */

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Hook to access route parameters (e.g., product ID).
import { Link } from 'react-router-dom'; // Link component for navigation.
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'; // Import layout and UI components from react-bootstrap.
import Rating from '../components/Rating'; // Component to display product ratings with stars and review count.
import Loader from '../components/Loader'; // Component to show a loading spinner while data is being fetched.
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice'; // Hook to fetch product details from the API.
import Message from '../components/Message'; // Component to display error or informational messages.
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice'; // Import the addToCart action from the cart slice.
import { toast } from 'react-toastify';
import Meta from '../components/Meta';

const ProductScreen = () => {

  // Extract the product ID from the URL using useParams hook.
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  /**  
   * Use the `useGetProductDetailsQuery` hook to fetch product details by ID.
    * Destructure the hook's return values:
    * - data: products: The fetched product data, renamed to `products` for easier reference.
    * - isLoading: Boolean indicating if the API call is in progress.
    * - error: Contains error information if the API call fails.
  */
  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {/* Button to navigate back to the homepage. */}
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        // Display the loader while the API call is in progress.
        <Loader />
      ) : error ? (
        // Display an error message if the API call fails.
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        // Display the product details if data is successfully fetched.
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              {/* Display the product image. The `fluid` prop ensures responsiveness. */}
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              {/* Display product details in a list format. */}
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3> {/* Display the product name. */}
                </ListGroup.Item>
                <ListGroup.Item>
                  {/* Display product rating and the number of reviews using the Rating component. */}
                  <Rating
                    value={product.rating} // Rating value (e.g., 4.5 stars).
                    text={`${product.numReviews} reviews`} // Number of reviews (e.g., "10 reviews").
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: ${product.price} {/* Display the product price. */}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description} {/* Display the product description. */}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              {/* Display product purchase details (price, stock status, add-to-cart button). */}
              <Card>
                <ListGroup variant="flush">
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
                        {/* Check stock status and display accordingly. */}
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* Display the quantity dropdown if the product is in stock. */}
                  {
                    product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as='select'
                              value={qty}
                              onChange={(e) => setQty(Number(e.target.value))}
                            >
                              {[...Array(product.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                  <ListGroup.Item>
                    {/* Add to Cart button. Disabled if the product is out of stock. */}
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0} // Button is disabled if countInStock is 0.
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          {/* Customers Reviews */}
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                {/* Write a review */}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>

                  {loadingProductReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className='my-2' controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className='my-2' controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
