import { Box, Button, Skeleton, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { useCallback, useState } from "react";
import { useGetMyCartQuery } from "../../generated/graphql";
import {
  Cart,
  useUpdateCartEmailMutation,
} from "../../generated/public/graphql";
import theme from "../../styles/theme";
import getStripe from "../../utils/getStripe";
import CartSummaryCard from "../CartSummaryCard/CartSummaryCard";
import CheckoutInfoForm from "../CheckoutInfoForm/CheckoutInfoForm";
import CheckoutPaymentForm from "../CheckoutPaymentForm/CheckoutPaymentForm";
import Dialog from "../common/Dialog/Dialog";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CheckoutDialog = ({ open, onClose }: Props) => {
  const [step, setStep] = useState(0);
  const [updateCartEmail] = useUpdateCartEmailMutation();
  const { data, loading, error, refetch } = useGetMyCartQuery({
    fetchPolicy: "network-only",
  });

  const handleEmailChange = useCallback(
    async (email) => {
      try {
        await updateCartEmail({ variables: { input: { email } } });
        await refetch();
      } catch (error) {}
    },
    [updateCartEmail, refetch]
  );

  const renderStep = () => {
    if (loading) return <Skeleton />;
    const cart = data?.myCart;
    if (!cart) return null;

    if (step === 0)
      return (
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1">Reservation details</Typography>
          <CheckoutInfoForm
            onSubmit={() => {
              refetch();
              setStep(1);
            }}
            cart={cart}
            onEmailChange={handleEmailChange}
          />
        </Box>
      );
    if (step === 1)
      return (
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1">Payment details</Typography>
          <Elements
            stripe={getStripe()}
            options={{
              clientSecret: cart.stripeClientSecret,
              appearance: {
                variables: {
                  fontFamily: theme.typography.fontFamily,
                },
                rules: {
                  ".Label": {
                    ...theme.typography.subtitle2,
                  },
                },
              },
            }}
          >
            <CheckoutPaymentForm
              onBack={() => setStep(0)}
              onSuccess={() => setStep(2)}
            />
          </Elements>
        </Box>
      );

    if (step === 2)
      return (
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1">
            Your reservation is confirmed.
          </Typography>
          <Typography variant="body2">
            Please check your inbox for a confirmation email.
          </Typography>
          <Typography mt={2} variant="subtitle2">
            Know before you go
          </Typography>
          <Typography variant="body2">
            Please show up 15 minutes before your booking to ensure a prompt
            start!
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={onClose}
            sx={{ mt: 2 }}
          >
            Done
          </Button>
        </Box>
      );
  };

  return (
    <Dialog
      disablePortal
      title={
        step === 2
          ? `Thank you ${data?.myCart?.firstName}!`
          : "Complete Reservation"
      }
      open={open}
      onClose={() => {
        setStep(0);
        onClose();
      }}
      fullWidth
      PaperProps={{ sx: { maxWidth: 700 } }}
    >
      <Box sx={{ display: "flex" }}>
        {renderStep()}
        <Box sx={{ ml: 5, width: 300 }}>
          <CartSummaryCard editable={step !== 2} />
        </Box>
      </Box>
    </Dialog>
  );
};

export default CheckoutDialog;
