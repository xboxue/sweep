import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutPaymentForm = ({ onBack }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (user) => {
    if (!stripe || !elements) return;

    // setLoading(true);
    setError(null);
    try {
      //   const { data } = await createBooking({
      //     variables: {
      //       input: {
      //         numGuests: parseInt(numGuests, 10),
      //         offeringId,
      //         startDateTime,
      //         stripePaymentIntentId,
      //         user,
      //       },
      //     },
      //   });

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: "if_required",
      });

      if (result.error) {
        setError(result.error.message);
      } else if (
        result.paymentIntent.status === "succeeded" ||
        result.paymentIntent.status === "processing"
      ) {
      } else if (result.paymentIntent.status === "requires_payment_method") {
        setError("Payment failed. Please try another payment method.");
      } else {
        setError("Something went wrong.");
      }
    } catch (err) {
      setError("Something went wrong");
    }
    // setLoading(false);
  };

  return (
    <>
      <PaymentElement />
      {error && <Typography>{error}</Typography>}
      {/* <Typography variant="subtitle2" mt={2}>
        Cancellation policy
      </Typography>
      <Typography variant="body2">
        All sales are final and nonrefundable. Contact us at least 72 hours
        prior to your reservation if you wish to reschedule. All reschedules are
        subject to availability
      </Typography> */}
      <Button
        size="large"
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Pay now
      </Button>
      <Button
        onClick={onBack}
        startIcon={<ArrowBackIosNew sx={{ width: 14, height: 14 }} />}
      >
        Back
      </Button>
    </>
  );
};

export default CheckoutPaymentForm;
