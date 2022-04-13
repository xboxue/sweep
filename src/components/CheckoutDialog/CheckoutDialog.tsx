import { ArrowDropDown, ShoppingCartOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  DialogTitle,
  Popover,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { useCallback, useEffect, useState } from "react";
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
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [updateCartEmail] = useUpdateCartEmailMutation();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { data, loading, error, refetch } = useGetMyCartQuery({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.myCart && !data.myCart.cartBookings.length) {
      onClose();
    }
  }, [data, onClose]);

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
    if (loading) return <Skeleton sx={{ flex: 1 }} />;
    const cart = data?.myCart;

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
            onClose={onClose}
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
              fonts: [
                {
                  family: "Roboto",
                  cssSrc:
                    "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
                },
              ],
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

  const title =
    step === 2
      ? `Thank you ${data?.myCart?.firstName}!`
      : "Complete Reservation";
  const titleComponent = (
    <DialogTitle>
      {title}
      {loading ? (
        <Skeleton
          sx={{ width: 80, position: "absolute", top: 16, right: 24 }}
        />
      ) : (
        <Button
          size="small"
          variant="contained"
          color="background"
          startIcon={<ShoppingCartOutlined fontSize="small" color="action" />}
          endIcon={<ArrowDropDown color="action" />}
          onClick={(event) => setAnchorEl(event.currentTarget)}
          sx={{
            "& .MuiButton-startIcon": { mr: 0.5 },
            "& .MuiButton-endIcon": { ml: 0.5 },
            position: "absolute",
            right: 24,
            top: 16,
          }}
        >
          ${(data?.myCart?.total / 100).toFixed(2)}
        </Button>
      )}
    </DialogTitle>
  );

  return (
    <Dialog
      open={open}
      title={title}
      onClose={() => {
        setStep(0);
        onClose();
      }}
      fullWidth
      PaperProps={{ sx: { maxWidth: 700 } }}
      fullScreen={isMobile}
      titleComponent={isMobile ? titleComponent : undefined}
    >
      <Box sx={{ display: "flex" }}>
        <Popover
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            sx: {
              width: 350,
              maxHeight: "calc(100% - 128px)",
              p: 2,
              display: "flex",
              flexDirection: "column",
            },
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Order summary
          </Typography>
          <CartSummaryCard editable={step < 2} />
        </Popover>
        {renderStep()}
        {!isMobile && (
          <Box
            sx={{
              ml: 5,
              width: 300,
              maxHeight: 400,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CartSummaryCard editable={step < 2} />
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default CheckoutDialog;
