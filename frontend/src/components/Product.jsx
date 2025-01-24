/**
 * Product Component:
 * This React component displays a product card with its image, name, rating, 
 * number of reviews, and price. It uses React-Bootstrap components for styling 
 * and React Router's `Link` for navigation.
 * 
 * Key Features:
 * - Displays product details such as image, name, rating, reviews, and price.
 * - Provides clickable links to navigate to the individual product page.
 * - Integrates the `Rating` component to visually display the product's rating.
 */

import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      {/* Link to the product details page */}
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        {/* Link to the product details page */}
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        {/* Display the product rating and number of reviews */}
        <Card.Text as='div'>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>

        {/* Display the product price */}
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
