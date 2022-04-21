import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { DateTime } from "luxon";
import { useState } from "react";
import { Order, Transaction } from "../../generated/graphql";
import stripeTheme from "../../styles/stripeTheme";
import getStripe from "../../utils/getStripe";
import PaymentSummary from "../common/PaymentSummary/PaymenSummary";
import PaymentDialog from "../PaymentDialog/PaymentDialog";

interface Props {
  order: Order;
  transactions: Transaction[];
  onPaymentSuccess: () => void;
}

const OrderPaymentSummary = ({
  order,
  transactions,
  onPaymentSuccess,
}: Props) => {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const totalPaid = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  return (
    <Box sx={{ maxWidth: 300 }}>
      <Stack spacing={1}>
        <PaymentSummary
          tax={order.tax}
          total={order.total}
          subtotal={order.subtotal}
        />
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2">Paid by customer</Typography>
          <Typography variant="body2">
            ${(totalPaid / 100).toFixed(2)}
          </Typography>
        </Box>
        {totalPaid < order.total && (
          <>
            <Button
              variant="contained"
              onClick={() => setPaymentDialogOpen(true)}
            >
              Enter credit card
            </Button>
            <Elements
              stripe={getStripe()}
              options={{
                ...stripeTheme,
                clientSecret: order.stripeClientSecret,
              }}
            >
              <PaymentDialog
                amount={order.total - totalPaid}
                open={paymentDialogOpen}
                onClose={() => setPaymentDialogOpen(false)}
                onSuccess={() => {
                  onPaymentSuccess();
                  setPaymentDialogOpen(false);
                }}
              />
            </Elements>
          </>
        )}
      </Stack>
      <Typography variant="subtitle2" sx={{ mt: 2 }}>
        Payments
      </Typography>
      {transactions.map((transaction) => (
        <Box
          key={transaction.id}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="body2">
            {DateTime.fromISO(transaction.createdAt).toFormat(
              "EEE, MMM d, h:mm a"
            )}
          </Typography>
          <Typography variant="body2">
            ${(transaction.amount / 100).toFixed(2)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default OrderPaymentSummary;
