import { Box, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { useCallback, useState } from "react";
import { useGetMyCartQuery } from "../../generated/graphql";
import { useUpdateCartEmailMutation } from "../../generated/public/graphql";
import theme from "../../styles/theme";
import getStripe from "../../utils/getStripe";
import CartSummaryCard from "../CartSummaryCard/CartSummaryCard";
import CheckoutInfoForm from "../CheckoutInfoForm/CheckoutInfoForm";
import Dialog from "../common/Dialog/Dialog";
import CheckoutPaymentForm from "../CheckoutPaymentForm/CheckoutPaymentForm";

const CheckoutDialog = ({ open, onClose }) => {
  const [step, setStep] = useState(0);
  const [updateCartEmail] = useUpdateCartEmailMutation();
  const { loading, error, data, refetch } = useGetMyCartQuery();

  const handleEmailChange = useCallback(
    async (email) => {
      try {
        await updateCartEmail({ variables: { input: { email } } });
        await refetch();
      } catch (error) {
        console.log(error);
      }
    },
    [updateCartEmail, refetch]
  );

  return (
    <Dialog
      title="Complete Reservation"
      open={open}
      onClose={onClose}
      fullWidth
      PaperProps={{ sx: { maxWidth: 700 } }}
    >
      <Box sx={{ display: "flex" }}>
        {step === 0 && (
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1">Reservation details</Typography>
            <CheckoutInfoForm
              onSubmit={() => setStep(1)}
              email={data?.myCart?.email}
              onEmailChange={handleEmailChange}
            />
          </Box>
        )}
        {step === 1 && (
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1">Payment details</Typography>
            <Elements
              stripe={getStripe()}
              options={{
                clientSecret: data?.myCart?.stripeClientSecret,
                appearance: {
                  fontFamily: theme.typography.fontFamily,
                },
              }}
            >
              <CheckoutPaymentForm
                onSubmit={() => setStep(1)}
                email={data?.myCart?.email}
                onEmailChange={handleEmailChange}
                onBack={() => setStep(0)}
              />
            </Elements>
          </Box>
        )}
        <Box sx={{ ml: 5, width: 300 }}>
          <CartSummaryCard />
        </Box>
      </Box>
    </Dialog>
  );
};

export default CheckoutDialog;
