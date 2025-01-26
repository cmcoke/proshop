
/**
 * CheckoutSteps Component
 * This component displays the checkout steps navigation bar.
 * Each step is represented as a navigation link, which is enabled or disabled based on the props received.
 * 
 * @param {boolean} step1 - Determines if the 'Sign In' step is enabled
 * @param {boolean} step2 - Determines if the 'Shipping' step is enabled
 * @param {boolean} step3 - Determines if the 'Payment' step is enabled
 * @param {boolean} step4 - Determines if the 'Place Order' step is enabled
 */


import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>

      {/* Navigation item for Sign In */}
      <Nav.Item>
        {step1 ? (
          <Nav.Link as={Link} to='/login'> {/* Enabled link if step1 is true */}
            Sign In
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>  // Disabled link if step1 is false
        )}
      </Nav.Item>

      {/* Navigation item for Shipping */}
      <Nav.Item>
        {step2 ? (
          <Nav.Link as={Link} to='/shipping'> {/* Enabled link if step2 is true */}
            Shipping
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link> // Disabled link if step2 is false
        )}
      </Nav.Item>

      {/* Navigation item for Payment */}
      <Nav.Item>
        {step3 ? (
          <Nav.Link as={Link} to='/payment'> {/* Enabled link if step3 is true */}
            Payment
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link> // Disabled link if step3 is false
        )}
      </Nav.Item>

      {/* Navigation item for Place Order */}
      <Nav.Item>
        {step4 ? (
          <Nav.Link as={Link} to='/placeorder'> {/* Enabled link if step4 is true */}
            Place Order
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link> // Disabled link if step4 is false
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
