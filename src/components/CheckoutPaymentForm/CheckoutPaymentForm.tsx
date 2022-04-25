import { ArrowBackIosNew } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Alert, Button } from "@mui/material";
import { PaymentElement } from "@stripe/react-stripe-js";
import useStripePayment from "../../hooks/useStripePayment";

interface Props {
  onBack: () => void;
  onSuccess: () => void;
}

const CheckoutPaymentForm = ({ onBack, onSuccess }: Props) => {
  const [confirmPayment, { loading, error }] = useStripePayment(onSuccess);

  return (
    <>
      <PaymentElement />
      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
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
        onClick={confirmPayment}
        sx={{ mt: 3 }}
        loading={loading}
      >
        Pay now
      </LoadingButton>
      <Button
        size="small"
        fullWidth
        onClick={onBack}
        startIcon={<ArrowBackIosNew sx={{ width: 12, height: 12 }} />}
        sx={{ mt: 1, "& .MuiButton-startIcon": { mr: 0.5 } }}
      >
        Back
      </Button>
    </>
  );
};

export default CheckoutPaymentForm;
