import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {

  // Get the current year for the footer text using the Date object and its getFullYear method
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>ProShop &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;