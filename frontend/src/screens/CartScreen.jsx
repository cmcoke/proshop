/**
 * This component renders a shopping cart screen using React and Redux.
 *
 * Summary:
 * - Displays the user's shopping cart items, allowing them to update quantities or remove items.
 * - Shows a summary of the total items and price in the cart.
 * - Provides a button to proceed to checkout.
 * - Utilizes React Bootstrap for styling and layout, and React Router for navigation.
 */

// Import necessary modules and components for the cart screen.
import { Link, useNavigate } from 'react-router-dom'; // Provides navigation and linking functionality.
import { useDispatch, useSelector } from 'react-redux'; // Allows interaction with the Redux store.
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap'; // Bootstrap components for layout and styling.
import { FaTrash } from 'react-icons/fa'; // FontAwesome trash icon for the delete button.
import Message from '../components/Message'; // Component to display messages (e.g., empty cart message).
import { addToCart, removeFromCart } from '../slices/cartSlice'; // Redux actions for managing the cart.

const CartScreen = () => {
  // Hook to navigate programmatically within the app.
  const navigate = useNavigate();

  // Hook to dispatch actions to the Redux store.
  const dispatch = useDispatch();

  // Retrieve the cart state from the Redux store.
  const cart = useSelector((state) => state.cart);

  // Destructure the cartItems array from the cart state.
  const { cartItems } = cart;

  // Handler to add/update an item in the cart with a specified quantity.
  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty })); // Dispatch the addToCart action with updated quantity.
  };

  // Handler to remove an item from the cart.
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id)); // Dispatch the removeFromCart action with the item's ID.
  };

  // Handler to navigate to the login page, with redirection to the shipping page after login.
  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Row>
      {/* Main column to display the cart items */}
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {/* Show a message if the cart is empty */}
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          // Display the list of cart items
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  {/* Display the item image */}
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  {/* Display the item name as a link */}
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  {/* Display the item price */}
                  <Col md={2}>${item.price}</Col>
                  {/* Dropdown to select the quantity */}
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    >
                      {/* Generate options based on the item's stock count */}
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  {/* Button to remove the item from the cart */}
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      {/* Summary column to display cart totals */}
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            {/* Subtotal: display total quantity and price */}
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </h2>
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            {/* Button to proceed to checkout */}
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
