import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";
import commerce from "../../../lib/commerce";
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [checkoutToken, setCheckoutToken] = useState(null);

  let Confirmation = () => {
    if (order.customer) {
      return (
        <>
          <div>
            <Typography variant="h5">
              Thank you for your purchase, {order.customer.firstname}{" "}
              {order.customer.lastname}
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">
              Order ref: {order.customer_reference}
            </Typography>
          </div>
          <br />
          <Button component={Link} to="/" variant="outlined" type="button">
            Back to home
          </Button>
        </>
      );
    } else {
      return (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      );
    }
  };

  if (error) {
    <>
      <Typography variant="h5">Error: {error}</Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to home
      </Button>
    </>;
  }

  const Form = () => {
    return activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
      />
    );
  };

  const nextStep = () => setActiveStep((prev) => prev + 1);
  const backStep = () => setActiveStep((prev) => prev - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        setCheckoutToken(token);
        console.log("generated");
      } catch (error) {
        navigate("/");
      }
    };

    generateToken();
  }, [cart.id, navigate]);

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
