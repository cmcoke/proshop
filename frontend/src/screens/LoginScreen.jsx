import { useState, useEffect } from 'react'; // Import React hooks for managing state and side effects
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import React Router components for navigation
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks for state management
import { Form, Button, Row, Col } from 'react-bootstrap'; // Import Bootstrap components for styling and layout
import Loader from '../components/Loader'; // Loader component to display a loading spinner
import FormContainer from '../components/FormContainer'; // Custom component for centering forms
import { useLoginMutation } from '../slices/usersApiSlice'; // Import the login mutation from the users API slice
import { setCredentials } from '../slices/authSlice'; // Redux action to store user credentials in the state
import { toast } from 'react-toastify'; // Import toast for displaying notifications

const LoginScreen = () => {
  // State variables to manage email and password input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // React Router hook to programmatically navigate

  // Destructure the login mutation function and loading state
  const [login, { isLoading }] = useLoginMutation();

  // Access user information from Redux state
  const { userInfo } = useSelector((state) => state.auth);

  // Parse query parameters from the URL to determine redirect path
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // Parse the query string
  const redirect = sp.get('redirect') || '/'; // Default to '/' if no redirect is specified

  // Redirect to the specified page if the user is already logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  // Handler for form submission
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Call the login mutation with email and password
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res })); // Save the user credentials in Redux
      navigate(redirect); // Redirect the user after successful login
    } catch (err) {
      // Display an error message using toast notifications
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      {/* Form heading */}
      <h1>Sign In</h1>

      {/* Login form */}
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-3' controlId='email'>
          {/* Email input field */}
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update state on change
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-3' controlId='password'>
          {/* Password input field */}
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update state on change
          ></Form.Control>
        </Form.Group>

        {/* Submit button */}
        <Button disabled={isLoading} type='submit' variant='primary' className='mt-2'>
          Sign In
        </Button>

        {/* Show loader if isLoading is true */}
        {isLoading && <Loader />}
      </Form>

      {/* Link to the registration page */}
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
