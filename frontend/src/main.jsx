import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './store';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App.jsx';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen.jsx';
import AdminRoute from './components/AdminRoute';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen.jsx';
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx';
import UserListScreen from './screens/admin/UserListScreen.jsx';
import UserEditScreen from './screens/admin/UserEditScreen.jsx';


// The router configuration is created using the `createBrowserRouter` function.
const router = createBrowserRouter(

  // The `createRoutesFromElements` function creates a route configuration from JSX elements.
  createRoutesFromElements(

    // Route path='/' element={<App />} creates a route that renders the `App` component when the URL matches `/`.
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} /> {/* creates a route that renders the `HomeScreen` component when the URL matches `/`  */}
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} /> {/* creates a route that renders the `ProductScreen` component when the URL matches `/product/:id`. */}
      <Route path='/cart' element={<CartScreen />} /> {/* creates a route that renders the `CartScreen` component when the URL matches `/cart`. */}
      <Route path='/login' element={<LoginScreen />} /> {/* creates a route that renders the `LoginScreen` component when the URL matches `/login`. */}
      <Route path='/register' element={<RegisterScreen />} />; {/* creates a route that renders the `RegisterScreen` component when the URL matches `/register`. */}

      {/* The `PrivateRoute` component is used to protect the following routes, allowing access only to authenticated users. */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>;

      {/* The `AdminRoute` component is used to protect the following routes, allowing access only to authenticated users with admin privileges. */}
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>;

    </Route>

  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}> {/* The `Provider` component provides the Redux store to the rest of the application. */}
        <PayPalScriptProvider deferLoading={true}> {/* The `PayPalScriptProvider` component provides the PayPal SDK script to the rest of the application. */}
          <RouterProvider router={router} /> {/* The `RouterProvider` component provides the router configuration to the rest of the application. */}
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
