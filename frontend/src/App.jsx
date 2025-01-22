/**
 * The `App` component serves as the main layout for the application.
 * It includes the `Header` and `Footer` components and wraps the main content inside a `Container`.
 * The component also includes a `ToastContainer` for showing toast notifications and handles user logout if the stored session expiration time has passed.
 * The `useEffect` hook checks the expiration time from `localStorage` and dispatches a logout action if the session has expired.
 * The `Outlet` component from React Router is used to render nested routes.
 */

import { Container } from "react-bootstrap"; // Import Bootstrap container component for layout
import { Outlet } from "react-router-dom"; // Import Outlet for nested routes
import Header from "./components/Header"; // Import the Header component
import Footer from "./components/Footer"; // Import the Footer component
import { ToastContainer } from 'react-toastify'; // Import ToastContainer for toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS for styling
import { useEffect } from 'react'; // Import useEffect hook for side effects
import { useDispatch } from 'react-redux'; // Import useDispatch hook for Redux state management
import { logout } from './slices/authSlice.js'; // Import logout action to clear user state

// Main App component
const App = () => {

  // Dispatch hook for Redux actions
  const dispatch = useDispatch();

  // useEffect hook to check session expiration on component mount
  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime'); // Retrieve expiration time from localStorage
    if (expirationTime) {
      const currentTime = new Date().getTime(); // Get the current timestamp
      if (currentTime > expirationTime) {
        dispatch(logout()); // Dispatch logout action if session has expired
      }
    }
  }, [dispatch]); // Dependency array ensures this effect runs only once when the component mounts

  return (
    <>
      {/* ToastContainer for notifications */}
      <ToastContainer />
      {/* Header component for site navigation */}
      <Header />
      <main className='py-3'>
        <Container>
          {/* Outlet renders the current nested route */}
          <Outlet />
        </Container>
      </main>
      {/* Footer component for footer content */}
      <Footer />
    </>
  );
};

export default App; // Export the App component for use in other parts of the application
