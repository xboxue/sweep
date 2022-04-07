import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { sortBy } from "lodash";
import {
  useGetMyCartQuery,
  useRemoveCartBookingsMutation,
  useUpdateCartBookingsMutation,
} from "../../generated/graphql";
import CartItem from "../CartItem/CartItem";

interface Props {
  onCheckout: () => void;
}

const CartCard = ({ onCheckout }: Props) => {
  const { loading, error, data, refetch } = useGetMyCartQuery({
    fetchPolicy: "network-only",
  });
  const [removeCartBookings] = useRemoveCartBookingsMutation();
  const [updateCartBookings] = useUpdateCartBookingsMutation();

  if (loading) return <Skeleton />;

  if (!data?.myCart?.cartBookings?.length) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>No items in cart</Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Typography variant="subtitle1">Cart</Typography>
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
      <Button variant="contained" onClick={onCheckout}>
        Check out
      </Button>
    </Stack>
  );
};

export default CartCard;
