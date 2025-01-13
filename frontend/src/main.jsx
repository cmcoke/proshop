import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App.jsx';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

// The router configuration is created using the `createBrowserRouter` function.
const router = createBrowserRouter(

  // The `createRoutesFromElements` function creates a route configuration from JSX elements.
  createRoutesFromElements(

    // Route path='/' element={<App />} creates a route that renders the `App` component when the URL matches `/`.
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} /> {/* creates a route that renders the `HomeScreen` component when the URL matches `/`  */}
      <Route path='/product/:id' element={<ProductScreen />} /> {/* creates a route that renders the `ProductScreen` component when the URL matches `/product/:id`. */}
    </Route>

  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} /> {/* The `RouterProvider` component provides the router configuration to the rest of the application. */}
  </StrictMode>,
);
