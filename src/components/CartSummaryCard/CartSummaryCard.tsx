import { Box, Divider, Stack, Typography } from "@mui/material";
import { Cart } from "../../generated/public/graphql";
import CartItemList from "../CartItemList/CartItemList";

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

        {[
          { label: "Subtotal", value: cart.subtotal },
          { label: "Taxes", value: cart.tax },
          { label: "Total", value: cart.total, variant: "subtitle1" },
        ].map(({ label, value, ...props }) => (
          <Box display="flex" justifyContent="space-between" key={label}>
            <Typography variant="body2" {...props}>
              {label}
            </Typography>
            <Typography variant="body2" {...props}>
              ${(value / 100).toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default CartSummaryCard;
