import { FormEvent, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";
import { AppDispatch } from "../store";
import { ReduxState } from "../types/ReduxState";

const PaymentPage = () => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
  
    const cart = useSelector((state: ReduxState) => state.cart);
    const { shippingAddress: SA } = cart;
  
    if (!SA?.address) {
      navigate('/shipping');
    }
  
    const [paymentMethod, setPaymentMethod] = useState<string>('MercadoPago');
  
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMethod));
      navigate('../placeorder');
    };
  
  return (
    <>
      <Meta title="Payment Method" />
      <FormContainer>
        <CheckoutSteps stepThree />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Payment Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type="radio"
                label="Stripe"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Link to="/shipping" className="btn btn-dark">
            Back
          </Link>
          <Button type="submit" variant="primary" className="ml-3">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentPage;