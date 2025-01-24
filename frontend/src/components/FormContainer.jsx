/**
 * FormContainer Component:
 * This React component provides a responsive container for forms or other child elements.
 * It uses React-Bootstrap's grid system to center content horizontally on the page.
 * 
 * Key Features:
 * - Wraps children elements inside a responsive grid layout.
 * - Centers content on medium-sized screens and above (`md`) with appropriate spacing.
 * - Provides a clean and consistent layout for forms or other components.
 */

import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      {/* Center content horizontally */}
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {/* Render child elements */}
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
