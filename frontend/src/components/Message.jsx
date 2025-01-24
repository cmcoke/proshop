/**
 * Message Component:
 * This React component displays a customizable alert message using React-Bootstrap's `Alert` component.
 * 
 * Key Features:
 * - Displays a styled alert box with a configurable variant and message content.
 * - Accepts two props:
 *   1. `variant`: Specifies the style of the alert (e.g., 'success', 'danger', 'warning').
 *   2. `children`: The content or message to be displayed inside the alert.
 * - Sets a default variant of 'info' if none is provided.
 * 
 * Usage Example:
 * <Message variant="success">Operation successful!</Message>
 */

import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>; // Renders the alert with the specified variant and content
};

// Default props for the component
Message.defaultProps = {
  variant: 'info', // Default alert style is 'info'
};

export default Message;
