import { Typography, Button, Divider } from "@mui/material";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLICK_KEY);

const PaymentForm = ({
  shippingData,
  checkoutToken,
  backStep,
  onCaptureCheckout,
  nextStep,
}) => {
  const {
    live: {
      subtotal: { formatted_with_symbol },
      line_items,
    },
  } = checkoutToken;

  const {
    firstName,
    lastName,
    email,
    address1,
    city,
    shippingSubdivision,
    zip,
    shippingCountry,
    shippingOption,
  } = shippingData;

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderDate = {
        line_items,
        customer: {
          firstname: firstName,
          lastname: lastName,
          email,
        },
        shipping: {
          name: "Primary",
          street: address1,
          town_city: city,
          county_state: shippingSubdivision,
          postal_zip_code: zip,
          country: shippingCountry,
        },
        fulfillment: { shipping_method: shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(checkoutToken.id, orderDate);

      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay {formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
