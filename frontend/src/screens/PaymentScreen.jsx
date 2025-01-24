/*
  This component handles the payment method selection process in the checkout flow.
  - It ensures the user has entered a shipping address before proceeding.
  - It allows the user to choose a payment method (default is PayPal).
  - Once submitted, the selected payment method is saved in the Redux store and the user is redirected to the place order page.
*/

import { useState, useEffect } from 'react'; // Import React hooks for managing state and side effects
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks for state management
import { useNavigate } from 'react-router-dom'; // Import navigation hook for redirecting users
import { Form, Button, Col } from 'react-bootstrap'; // Import UI components from react-bootstrap
import FormContainer from '../components/FormContainer'; // Import a reusable form container component
import CheckoutSteps from '../components/CheckoutSteps'; // Import checkout steps component
import { savePaymentMethod } from '../slices/cartSlice'; // Import action to save payment method in Redux

const PaymentScreen = () => {
  // State to store the selected payment method, defaulting to 'PayPal'
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const navigate = useNavigate(); // Hook to navigate between pages

  const cart = useSelector((state) => state.cart); // Get cart state from Redux store
  const { shippingAddress } = cart; // Extract shipping address from cart state

  useEffect(() => {
    // Redirect user to shipping page if shipping address is missing
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    dispatch(savePaymentMethod(paymentMethod)); // Save selected payment method in Redux store
    navigate('/placeorder'); // Redirect to the place order page
  };

  return (
    <FormContainer> {/* Wrap the form in a reusable container */}
      <CheckoutSteps step1 step2 step3 /> {/* Display checkout steps with active steps */}
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}> {/* Form to select and submit payment method */}
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              className='my-2'
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> {/* Radio button for selecting PayPal as payment method */}
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button> {/* Submit button to proceed to the next step */}
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen; // Export the component for use in other parts of the app
