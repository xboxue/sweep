import { Box, Divider, Stack, Typography } from "@mui/material";
import { Order, Transaction } from "../../generated/graphql";
import PaymentSummary from "../common/PaymentSummary/PaymenSummary";

interface Props {
  order: Order;
  transactions: Transaction[];
}

const OrderPaymentSummary = ({ order, transactions }: Props) => {
  return (
    <Stack spacing={1} sx={{ maxWidth: 300 }}>
      <PaymentSummary
        tax={order.tax}
        total={order.total}
        subtotal={order.subtotal}
      />
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2">Paid by customer</Typography>
        <Typography variant="body2">
          $
          {(
            transactions.reduce(
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
