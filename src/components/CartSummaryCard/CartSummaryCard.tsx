import { Box, Divider, Stack, Typography } from "@mui/material";
import { Cart } from "../../generated/public/graphql";
import CartItemList from "../CartItemList/CartItemList";
import PaymentSummary from "../common/PaymentSummary/PaymentSummary";

interface Props {
  editable: boolean;
  cart: Cart;
  onUpdate: () => void;
}

const CartSummaryCard = ({ cart, editable, onUpdate }: Props) => {
  return (
    <>
      <Stack spacing={1} sx={{ mb: 1, overflow: "auto" }}>
        <CartItemList
          cartBookings={cart.cartBookings}
          onUpdate={onUpdate}
          editable={editable}
        />
      </Stack>

      <Divider />
      <Stack spacing="4px" sx={{ mt: 1 }}>
        <Typography variant="subtitle1" mt={1}>
          Pricing details
        </Typography>
        <PaymentSummary
          tax={cart.tax}
          total={cart.total}
          subtotal={cart.subtotal}
        />
      </Stack>
    </>
  );
};

export default CartSummaryCard;
