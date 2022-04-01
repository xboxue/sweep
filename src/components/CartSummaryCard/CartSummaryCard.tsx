import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import { sortBy } from "lodash";
import {
  useGetMyCartQuery,
  useRemoveCartBookingsMutation,
  useUpdateCartBookingsMutation,
} from "../../generated/graphql";
import CartItem from "../CartItem/CartItem";

const CartSummaryCard = () => {
  const { loading, error, data, refetch } = useGetMyCartQuery({
    fetchPolicy: "network-only",
  });
  const [removeCartBookings] = useRemoveCartBookingsMutation();
  const [updateCartBookings] = useUpdateCartBookingsMutation();

  if (loading) return <Skeleton />;

  if (!data?.myCart?.cartBookings?.length) {
    return null;
  }

  return (
    <>
      <Stack spacing={1} sx={{ mb: 1 }}>
        {sortBy(data.myCart.cartBookings, "id").map((cartBooking) => (
          <CartItem
            key={cartBooking.id}
            cartBooking={cartBooking}
            onRemove={async () => {
              try {
                await removeCartBookings({
                  variables: { input: { cartBookingIds: [cartBooking.id] } },
                });
                await refetch();
              } catch (error) {
                console.log(error);
              }
            }}
            onUpdate={async (numGuests) => {
              try {
                await updateCartBookings({
                  variables: {
                    input: {
                      cartBookings: [{ id: cartBooking.id, numGuests }],
                    },
                  },
                });
                await refetch();
              } catch (error) {
                console.log(error);
              }
            }}
          />
        ))}
      </Stack>

      <Divider />
      <Stack spacing="4px" sx={{ mt: 1 }}>
        <Typography variant="subtitle1" mt={1}>
          Pricing details
        </Typography>

        {[
          { label: "Subtotal", value: data.myCart.subtotal },
          { label: "Taxes", value: data.myCart.tax },
          { label: "Total", value: data.myCart.total, variant: "subtitle1" },
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
