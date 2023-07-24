import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CheckoutStepper from "./CheckoutStepper";

interface Props {
  stepOne?: boolean;
  stepTwo?: boolean;
  stepThree?: boolean;
  stepFour?: boolean;
}

const renderCheckoutSteps = (
  stepTwo?: boolean,
  stepThree?: boolean,
  stepFour?: boolean
) => {
  if (stepTwo) {
    return <CheckoutStepper currentStep={1} />;
  } else if (stepThree) {
    return <CheckoutStepper currentStep={2} />;
  } else if (stepFour) {
    return <CheckoutStepper currentStep={3} />;
  }
};

const CheckoutSteps = ({ stepOne, stepTwo, stepThree, stepFour }: Props) => {
  return (
    <Nav className="justify-content-center mb-4">
      {renderCheckoutSteps(stepTwo, stepThree, stepFour)}
    </Nav>
  );
};

export default CheckoutSteps;
