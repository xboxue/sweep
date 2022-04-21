import { LoadingButton } from "@mui/lab";
import { Alert } from "@mui/material";
import { PaymentElement } from "@stripe/react-stripe-js";
import useStripePayment from "../../hooks/useStripePayment";
import Dialog from "../common/Dialog/Dialog";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
}

const PaymentDialog = ({ open, onClose, onSuccess, amount }: Props) => {
  const [confirmPayment, { loading, error }] = useStripePayment(onSuccess);

  return (
    <Dialog open={open} onClose={onClose} title="Enter credit card">
      <PaymentElement />
      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
      <LoadingButton
        loading={loading}
        variant="contained"
        onClick={confirmPayment}
      >
        Charge ${(amount / 100).toFixed(2)}
      </LoadingButton>
    </Dialog>
  );
};

export default PaymentDialog;
