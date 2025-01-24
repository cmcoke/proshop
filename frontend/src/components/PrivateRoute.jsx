/**
 * PrivateRoute Component:
 * This React component protects routes by allowing access only to authenticated users.
 * 
 * Key Features:
 * - Checks if the user is authenticated by verifying the `userInfo` state from the Redux store.
 * - If the user is authenticated, it renders the child routes using `Outlet`.
 * - If the user is not authenticated, it redirects them to the login page using `Navigate`.
 * 
 * Implementation Details:
 * - `useSelector`: Extracts the `userInfo` state from the `auth` slice of the Redux store.
 * - `Outlet`: Renders nested child routes dynamically, used for protected routes.
 * - `Navigate`: Redirects unauthenticated users to the `/login` page with the `replace` flag to avoid creating a history entry.
 * 
 * Usage Example:
 * <PrivateRoute>
 *   <ProtectedComponent />
 * </PrivateRoute>
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  // Access user authentication information from the Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // If the user is authenticated, render child routes. Otherwise, redirect to login.
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
