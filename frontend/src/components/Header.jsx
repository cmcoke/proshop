/**
 * The `Header` component represents the navigation bar of the application.
 * It includes links to the home page, cart, and profile or login, depending on the user's authentication state.
 * If there are items in the cart, the cart icon will display a badge showing the total quantity of items.
 * If the user is logged in, their name is displayed in a dropdown menu with options for viewing their profile and logging out.
 * The logout functionality is connected to the Redux state and API.
 * The component uses Bootstrap for styling and React Router for navigation.
 */

import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap'; // Bootstrap components for layout and styling
import { FaShoppingCart, FaUser } from 'react-icons/fa'; // Icons for cart and user
import { Link, useNavigate } from 'react-router-dom'; // React Router hooks for navigation
import logo from '../assets/logo.png'; // Logo image import
import { useSelector, useDispatch } from 'react-redux'; // Redux hooks for managing state
import { useLogoutMutation } from '../slices/usersApiSlice'; // RTK Query hook for logout API call
import { logout } from '../slices/authSlice'; // Redux action to clear user info on logout

// Header component
const Header = () => {
  // Accessing cart items and user info from Redux state
  const { cartItems } = useSelector((state) => state.cart); // Access cart items
  const { userInfo } = useSelector((state) => state.auth); // Access user authentication info

  // Dispatch and navigate hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout API hook
  const [logoutApiCall] = useLogoutMutation();

  // Logout handler function
  const logoutHandler = async () => {
    try {
      // Perform logout API call and dispatch Redux action
      await logoutApiCall().unwrap(); // Unwrap the response to handle errors
      dispatch(logout()); // Clear user authentication data from Redux
      navigate('/login'); // Redirect user to login page
    } catch (err) {
      console.error(err); // Log any errors
    }
  };

  return (
    <header>
      {/* Navbar for navigation */}
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          {/* Navbar brand with logo and link to the home page */}
          <Navbar.Brand as={Link} to='/'>
            <img src={logo} alt='ProShop' />
            ProShop
          </Navbar.Brand>
          {/* Toggle for collapsing the navbar on small screens */}
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          {/* Navbar collapse section with navigation links */}
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {/* Cart link with cart icon and quantity badge */}
              <Nav.Link as={Link} to='/cart'>
                <FaShoppingCart /> Cart
                {
                  cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)} {/* Total cart quantity */}
                    </Badge>
                  )
                }
              </Nav.Link>

              {/* User authentication check: Show profile and logout if logged in, else show login */}
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <NavDropdown.Item as={Link} to='/profile'>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <FaUser /> Sign In
                </Nav.Link>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <NavDropdown.Item as={Link} to='/admin/productlist'>
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/orderlist'>
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/userlist'>
                    Users
                  </NavDropdown.Item>
                </NavDropdown>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header; // Export the Header component for use in the application
