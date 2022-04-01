import { ArrowBackIosNew } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Typography } from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutPaymentForm = ({ onBack, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (user) => {
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);
    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: "" },
        redirect: "if_required",
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        onSuccess();
      }
    } catch (err) {
      setError("Something went wrong");
    }
    setLoading(false);
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
      <LoadingButton
        size="large"
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        sx={{ mt: 2 }}
        loading={loading}
      >
        Pay now
      </LoadingButton>
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
