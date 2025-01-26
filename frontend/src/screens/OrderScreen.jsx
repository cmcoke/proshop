/*
  OrderScreen Component:
  This component displays the details of a specific order, including the shipping address,
  payment method, order items, and order summary. It integrates PayPal for payment processing
  and allows the user to complete the payment. The component fetches order details from the API,
  updates payment status upon successful transaction, and shows appropriate messages for order status.
*/

import { useEffect } from 'react'; // Import useEffect to handle side effects
import { Link, useParams } from 'react-router-dom'; // Import Link for navigation and useParams to get URL parameters
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'; // Import Bootstrap components
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'; // Import PayPal integration components
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state
import { toast } from 'react-toastify'; // Import toast notifications
import Message from '../components/Message'; // Import Message component for displaying alerts
import Loader from '../components/Loader'; // Import Loader component for showing loading states
import {
  useGetOrderDetailsQuery, // API hook to fetch order details
  usePayOrderMutation, // API hook to process payment
  useGetPaypalClientIdQuery, // API hook to fetch PayPal client ID
  useDeliverOrderMutation, // API hook to update order status
} from '../slices/ordersApiSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams(); // Get order ID from URL parameters

  // Fetch order details from API
  const {
    data: order,
    refetch, // Function to refetch order data after payment
    isLoading, // Loading state for order data
    error, // Error state for order data
  } = useGetOrderDetailsQuery(orderId);

  // Mutation hook to process order payment
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  // Mutation hook to update order status to 'delivered' after payment completion by admin user 
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  // Access PayPal script reducer to manage script loading state
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // Fetch PayPal client ID
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth); // Get user info from Redux store

  // Load PayPal script when required
  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId, // Set PayPal client ID
            currency: 'USD', // Set currency to USD
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' }); // Mark PayPal script as pending
      };
      if (order && !order.isPaid) { // Load script only if order exists and is unpaid
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  // Handle successful PayPal payment approval
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }); // Process payment in backend
        refetch(); // Refresh order details
        toast.success('Order is paid'); // Show success message
      } catch (err) {
        toast.error(err?.data?.message || err.error); // Show error message
      }
    });
  }

  // Handle PayPal payment error
  function onError(err) {
    toast.error(err.message); // Display error message
  }

  // Test payment function for manual order completion
  // async function onApproveTest() {
  //   await payOrder({ orderId, details: { payer: {} } }); // Simulate payment
  //   refetch();
  //   toast.success('Order is paid');
  // }

  // Create PayPal order before processing payment
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice }, // Set order total price
          },
        ],
      })
      .then((orderID) => {
        return orderID; // Return order ID for PayPal transaction
      });
  }

  // Handle order delivery by admin user 
  const deliverHandler = async () => {

    try {
      await deliverOrder(orderId); // Update order status to 'delivered'
      refetch(); // Refresh order details
      toast.success('Order is delivered'); // Show success message  
    } catch (err) {
      toast.error(err?.data?.message || err.message); // Show error message if delivery fails
    }

  };

  return isLoading ? (
    <Loader /> // Show loading spinner if order data is loading
  ) : error ? (
    <Message variant='danger'>{error}</Message> // Show error message if order fetch fails
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            {/* Shipping Information */}
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            {/* Payment Information */}
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            {/* Order Items */}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Order Summary & Payment */}
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* PayPal Payment Section */}
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? <Loader /> : (
                    <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} />
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )
              }

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
