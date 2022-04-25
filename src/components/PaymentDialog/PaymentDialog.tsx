import { AddCardOutlined, CreditCardOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, MenuItem } from "@mui/material";
import { PaymentElement } from "@stripe/react-stripe-js";
import { startCase } from "lodash";
import { useState } from "react";
import {
  CreditCard,
  useCreateTransactionMutation,
} from "../../generated/graphql";
import useStripePayment from "../../hooks/useStripePayment";
import Dialog from "../common/Dialog/Dialog";
import TextField from "../common/TextField/TextField";
import CardSelect from "../CreateOfferingForm/CardSelect";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
  orderId: string;
  creditCards: CreditCard[];
}

enum PaymentType {
  SavedCard = "savedCard",
  NewCard = "newCard",
}

const PaymentDialog = ({
  open,
  onClose,
  onSuccess,
  amount,
  creditCards,
  orderId,
}: Props) => {
  const [confirmPayment, { loading: loadingNewCard, error: errorNewCard }] =
    useStripePayment(onSuccess);
  const [
    createTransaction,
    { loading: loadingSavedCard, error: errorSavedCard },
  ] = useCreateTransactionMutation();
  const [paymentType, setPaymentType] = useState(PaymentType.SavedCard);
  const [paymentMethodId, setPaymentMethodId] = useState(creditCards[0]?.id);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Enter credit card"
      fullWidth
      maxWidth="sm"
    >
      <CardSelect
        value={paymentType}
        onChange={setPaymentType}
        options={[
          {
            title: "Saved card",
            Icon: CreditCardOutlined,
            value: PaymentType.SavedCard,
          },
          {
            title: "New card",
            Icon: AddCardOutlined,
            value: PaymentType.NewCard,
          },
        ]}
      />
      <Box sx={{ mt: 2 }}>
        {paymentType === PaymentType.SavedCard && (
          <TextField
            select
            label="Credit card"
            value={paymentMethodId}
            onChange={(event) => setPaymentMethodId(event.target.value)}
            fullWidth
          >
            {creditCards.map((creditCard) => (
              <MenuItem key={creditCard.id} value={creditCard.id}>
                {startCase(creditCard.brand)} {creditCard.lastDigits}
              </MenuItem>
            ))}
          </TextField>
        )}
        <Box
          sx={{
            display: paymentType === PaymentType.NewCard ? "block" : "none",
          }}
        >
          <PaymentElement />
        </Box>
      </Box>
      {errorNewCard && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {errorNewCard}
        </Alert>
      )}
      <LoadingButton
        loading={loadingNewCard || loadingSavedCard}
        variant="contained"
        onClick={async () => {
          if (paymentType === PaymentType.NewCard) confirmPayment();
          else if (paymentType === PaymentType.SavedCard) {
            try {
              await createTransaction({
                variables: { input: { orderId, paymentMethodId } },
              });
              onSuccess();
            } catch (error) {
              console.log(error);
            }
          }
        }}
        fullWidth
        sx={{ mt: 3 }}
      >
        Charge ${(amount / 100).toFixed(2)}
      </LoadingButton>
    </Dialog>
  );
};

export default PaymentDialog;
