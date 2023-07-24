import { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { ReduxState } from "../types/ReduxState";
import { ShippingAddress } from "../types";

const PlaceOrderOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const { cartItems, paymentMethod, shippingAddress } = useSelector(
    (state: ReduxState) => state.cart
  );

  const { order, success, error } = useSelector(
    (state: ReduxState) => state.orderCreate
  );

  useEffect(() => {
    if (success) {
      navigate(`/order/${order?._id}`);
    }

    if (!shippingAddress) {
      navigate("/shipping");
    }
    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [navigate, success]);

  const addDecimals = (num: number) => (Math.round(num * 100) / 100).toFixed(2);

  const itemsPrice = Number(
    addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
  );

  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);

  const taxPrice = addDecimals(0.15 * itemsPrice);

  const totalPrice = Number(
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
  ).toFixed(2);

  const placeOrderHandler = () => {
    const shipp = shippingAddress as ShippingAddress;
    const payment = paymentMethod as string;
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shipp,
        paymentMethod: payment,
        itemsPrice,
        shippingPrice: parseFloat(shippingPrice),
        taxPrice: parseFloat(taxPrice),
        totalPrice: parseFloat(totalPrice),
      })
    );
  };

  return (
    <>
      <CheckoutSteps stepFour />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress?.address}, {shippingAddress?.city}{" "}
                {shippingAddress?.postalCode} {shippingAddress?.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method:</strong>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((cartItem, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={cartItem.image}
                            alt={cartItem.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${cartItem.product}`}>
                            {cartItem.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {cartItem.qty} x {cartItem.price} = $
                          {cartItem.qty * cartItem.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <Link to="/cart" className="btn btn-dark">
                      Edit Cart
                    </Link>
                  </Col>
                  <Col>
                    <Button
                      type="button"
                      className="btn-block"
                      disabled={cartItems.length === 0}
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderOrder;
