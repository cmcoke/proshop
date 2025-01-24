/**
 * Loader Component:
 * This React component displays a spinner for indicating a loading state.
 * It uses React-Bootstrap's `Spinner` component with customized styles.
 * 
 * Key Features:
 * - Displays a circular spinner with a 'border' animation.
 * - Styled to appear centered and prominent with specific dimensions.
 * - Can be reused wherever a loading indicator is required in the application.
 */

import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation='border' // Specifies the spinner animation style
      role='status' // Improves accessibility by providing a role attribute
      style={{
        width: '100px', // Sets the width of the spinner
        height: '100px', // Sets the height of the spinner
        margin: 'auto', // Centers the spinner horizontally
        display: 'block', // Ensures the spinner behaves as a block element
      }}
    ></Spinner>
  );
};

export default Loader;
