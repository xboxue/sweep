import { Box, Button, Stack, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { uniqBy } from "lodash";
import { DateTime } from "luxon";
import { useState } from "react";
import { Order } from "../../generated/graphql";
import stripeTheme from "../../styles/stripeTheme";
import getStripe from "../../utils/getStripe";
import PaymentSummary from "../common/PaymentSummary/PaymentSummary";
import PaymentDialog from "../PaymentDialog/PaymentDialog";

interface Props {
  order: Order;
  onPaymentSuccess: () => void;
  showTransactions?: boolean;
}

const OrderPaymentSummary = ({
  order,
  onPaymentSuccess,
  showTransactions = true,
}: Props) => {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  return (
    <Box sx={{ maxWidth: 300 }}>
      <Stack spacing={1}>
        <PaymentSummary
          tax={order.tax}
          total={order.total}
          subtotal={order.subtotal}
          totalPaid={order.totalPaid}
        />
        {order.totalPaid < order.total && (
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
                amount={order.total - order.totalPaid}
                open={paymentDialogOpen}
                onClose={() => setPaymentDialogOpen(false)}
                creditCards={uniqBy(
                  order.transactions.map(
                    (transaction) => transaction.creditCard
                  ),
                  "id"
                )}
                onSuccess={() => {
                  onPaymentSuccess();
                  setPaymentDialogOpen(false);
                }}
                orderId={order.id}
              />
            </Elements>
          </>
        )}
      </Stack>
      {order.transactions.length > 0 && showTransactions && (
        <>
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Payments
          </Typography>
          {order.transactions.map((transaction) => (
            <Box
              key={transaction.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">
                {DateTime.fromISO(transaction.createdAt).toFormat(
                  "MMM d, h:mm a"
                )}
              </Typography>
              <Typography variant="body2">
                ${(transaction.amount / 100).toFixed(2)}
              </Typography>
              <Button onClick={() => {}}>Refund</Button>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default OrderPaymentSummary;
