/**
 * This component, `RegisterScreen`, handles user registration in a React application.
 * It includes a registration form where users can input their name, email, password,
 * and confirm their password. The form is connected to a Redux store and interacts 
 * with an API using RTK Query for registering users. Upon successful registration,
 * the user's credentials are saved in the Redux store, and they are redirected to 
 * a specified page. The component also includes error handling and validation for 
 * matching passwords, and it displays a loader while the registration API is in progress.
 */

import { useState, useEffect } from 'react'; // React hooks for state and side effects
import { Link, useLocation, useNavigate } from 'react-router-dom'; // React Router for navigation
import { Form, Button, Row, Col } from 'react-bootstrap'; // Bootstrap components for styling and layout
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks for dispatching actions and selecting state
import Loader from '../components/Loader'; // Loader component to show a loading spinner
import FormContainer from '../components/FormContainer'; // Wrapper component to center forms

// Import API slice and Redux actions
import { useRegisterMutation } from '../slices/usersApiSlice'; // Mutation hook for user registration API call
import { setCredentials } from '../slices/authSlice'; // Redux action to save user credentials
import { toast } from 'react-toastify'; // Library for displaying notifications

// Main component for the register screen
const RegisterScreen = () => {
  // State variables for managing form inputs
  const [name, setName] = useState(''); // Stores the user's name
  const [email, setEmail] = useState(''); // Stores the user's email
  const [password, setPassword] = useState(''); // Stores the user's password
  const [confirmPassword, setConfirmPassword] = useState(''); // Stores the confirmation password

  // Redux-related hooks
  const dispatch = useDispatch(); // Dispatch function to send actions to the Redux store
  const navigate = useNavigate(); // React Router hook for programmatic navigation

  // Register mutation hook with loading state
  const [register, { isLoading }] = useRegisterMutation();

  // Select the userInfo object from the Redux state
  const { userInfo } = useSelector((state) => state.auth);

  // Parse the 'redirect' query parameter from the URL
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // Create a URLSearchParams object to parse query parameters
  const redirect = sp.get('redirect') || '/'; // Default redirect path is the home page ('/')

  // Redirect the user if they are already logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect); // Navigate to the redirect path
    }
  }, [navigate, redirect, userInfo]);

  // Form submission handler
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if the password and confirmPassword match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match'); // Show an error notification
    } else {
      try {
        // Attempt to register the user using the API mutation
        const res = await register({ name, email, password }).unwrap(); // Call the mutation and unwrap the response
        dispatch(setCredentials({ ...res })); // Dispatch the user credentials to the Redux store
        navigate(redirect); // Navigate to the redirect path after successful registration
      } catch (err) {
        // Handle errors and show a notification
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1> {/* Page title */}
      <Form onSubmit={submitHandler}>
        {/* Name field */}
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name} // Controlled component value
            onChange={(e) => setName(e.target.value)} // Update state on input change
          ></Form.Control>
        </Form.Group>

        {/* Email field */}
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email} // Controlled component value
            onChange={(e) => setEmail(e.target.value)} // Update state on input change
          ></Form.Control>
        </Form.Group>

        {/* Password field */}
        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password} // Controlled component value
            onChange={(e) => setPassword(e.target.value)} // Update state on input change
          ></Form.Control>
        </Form.Group>

        {/* Confirm Password field */}
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword} // Controlled component value
            onChange={(e) => setConfirmPassword(e.target.value)} // Update state on input change
          ></Form.Control>
        </Form.Group>

        {/* Submit button */}
        <Button disabled={isLoading} type='submit' variant='primary'>
          Register
        </Button>

        {/* Show loader if the registration API is loading */}
        {isLoading && <Loader />}
      </Form>

      <Row className='py-3'>
        <Col>
          {/* Link to the login page with a redirect query parameter */}
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen; // Export the component for use in the application
