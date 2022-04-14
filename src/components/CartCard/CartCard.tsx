import { Button, Stack, Typography } from "@mui/material";
import { CartBooking } from "../../generated/public/graphql";
import CartItemList from "../CartItemList/CartItemList";

interface Props {
  onCheckout: () => void;
  cartBookings?: CartBooking[];
  onUpdate: () => void;
}

const CartCard = ({ onCheckout, onUpdate, cartBookings }: Props) => {
  if (!cartBookings?.length)
    return (
      <>
        <Typography variant="subtitle1">Your cart</Typography>
        <Typography>No items in cart</Typography>
      </>
    );

  return (
    <>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Your cart
      </Typography>
      <Stack spacing={2} sx={{ overflow: "auto", mb: 2 }}>
        <CartItemList cartBookings={cartBookings} onUpdate={onUpdate} />
      </Stack>
      <Button variant="contained" onClick={onCheckout}>
        Check out
      </Button>
    </>
  );
};

export default CartCard;
