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
import {
  useGetMyCartQuery,
  useUpdateCartEmailMutation,
} from "../../generated/public/graphql";
import stripeTheme from "../../styles/stripeTheme";
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
    async (email: string) => {
      try {
        await updateCartEmail({ variables: { input: { email } } });
        await refetch();
      } catch (error) {}
    },
    [updateCartEmail, refetch]
  );

  const steps = [
    {
      title: "Complete Reservation",
      subtitle: "Reservation details",
      component: (
        <CheckoutInfoForm
          onSubmit={() => {
            refetch();
            setStep(1);
          }}
          cart={data?.myCart}
          onEmailChange={handleEmailChange}
          onClose={onClose}
        />
      ),
    },
    {
      title: "Complete Reservation",
      subtitle: "Payment details",
      component: (
        <CheckoutPaymentForm
          onBack={() => setStep(0)}
          onSuccess={() => setStep(2)}
        />
      ),
    },
    {
      title: `Thank you ${data?.myCart?.firstName}!`,
      subtitle: "Your reservation is confirmed.",
      component: (
        <>
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
        </>
      ),
    },
  ];

  const renderStep = () => {
    if (loading) return <Skeleton sx={{ flex: 1 }} />;
    const cart = data?.myCart;
    if (!cart) return null;

    return (
      <Elements
        stripe={getStripe()}
        options={{
          ...stripeTheme,
          clientSecret: cart.stripeClientSecret,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1">{steps[step].subtitle}</Typography>
          {steps[step].component}
        </Box>
      </Elements>
    );
  };

  const renderCartSummary = () => {
    if (loading && !isMobile) return <Skeleton sx={{ flex: 1 }} />;

    const cart = data?.myCart;
    if (!cart) return null;

    if (isMobile) {
      return (
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
          <CartSummaryCard cart={cart} onUpdate={refetch} editable={step < 2} />
        </Popover>
      );
    }

    return (
      <Box
        sx={{
          ml: 5,
          width: 300,
          maxHeight: 400,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CartSummaryCard cart={cart} onUpdate={refetch} editable={step < 2} />
      </Box>
    );
  };

  const renderMobileHeader = () => {
    if (!isMobile) return null;

    const cart = data?.myCart;
    if (!cart) return null;

    if (loading) {
      return (
        <DialogTitle>
          {steps[step].title}
          <Skeleton
            sx={{ width: 80, position: "absolute", top: 16, right: 24 }}
          />
        </DialogTitle>
      );
    }

    return (
      <DialogTitle>
        {steps[step].title}
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
          ${(cart.total / 100).toFixed(2)}
        </Button>
      </DialogTitle>
    );
  };

  return (
    <Dialog
      open={open}
      title={steps[step].title}
      onClose={() => {
        setStep(0);
        onClose();
      }}
      fullWidth
      PaperProps={{ sx: { maxWidth: 700 } }}
      fullScreen={isMobile}
      titleComponent={renderMobileHeader()}
    >
      <Box sx={{ display: "flex" }}>
        {renderStep()}
        {renderCartSummary()}
      </Box>
    </Dialog>
  );
};

export default CheckoutDialog;
