import { Box, Divider, Stack, Typography } from "@mui/material";
import { Order } from "../../generated/graphql";

interface Props {
  order: Order;
}

const OrderPaymentSummary = ({ order }: Props) => {
  return (
    <Stack spacing={1} sx={{ maxWidth: 300 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2">Subtotal</Typography>
        <Typography variant="body2">
          ${(order.subtotal / 100).toFixed(2)}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2">Tax</Typography>
        <Typography variant="body2">${(order.tax / 100).toFixed(2)}</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="subtitle2">Total</Typography>
        <Typography variant="subtitle2">
          ${(order.total / 100).toFixed(2)}
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2">Paid by customer</Typography>
        <Typography variant="body2">
          $
          {(
            order.transactions.reduce(
              (acc, transaction) => acc + transaction.amount,
              0
            ) / 100
          ).toFixed(2)}
        </Typography>
      </Box>
    </Stack>
  );
};

export default OrderPaymentSummary;
