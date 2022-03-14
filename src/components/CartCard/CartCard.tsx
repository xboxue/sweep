import {
  Avatar,
  Box,
  Link,
  MenuItem,
  Skeleton,
  Typography,
} from "@mui/material";
import { range } from "lodash";
import { DateTime } from "luxon";
import {
  useGetMyCartQuery,
  useRemoveCartBookingsMutation,
  useUpdateCartBookingsMutation,
} from "../../generated/graphql";
import TextField from "../common/TextField/TextField";

const CartCard = () => {
  const { loading, error, data, refetch } = useGetMyCartQuery();
  const [removeCartBookings] = useRemoveCartBookingsMutation();
  const [updateCartBookings] = useUpdateCartBookingsMutation();

  if (loading) return <Skeleton />;

  if (!data?.myCart?.cartBookings) {
    return <Typography>No items in cart</Typography>;
  }

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="subtitle1" sx={{ px: 2 }}>
        Cart
      </Typography>
      {data.myCart.cartBookings.map((cartBooking) => (
        <Box sx={{ display: "flex", p: 2 }} key={cartBooking.id}>
          <Avatar
            variant="rounded"
            src={cartBooking.offering.featuredImage?.url}
            sx={{ width: 56, height: 56 }}
          />
          <Box ml={1}>
            <Typography variant="subtitle2">
              {cartBooking.offering.name}
            </Typography>
            <Typography variant="body2">
              {DateTime.fromISO(cartBooking.timeSlot.startDateTime).toFormat(
                "DDDD t"
              )}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                select
                value={cartBooking.numGuests}
                onChange={async (event) => {
                  try {
                    await updateCartBookings({
                      variables: {
                        input: {
                          cartBookings: [
                            {
                              id: cartBooking.id,
                              numGuests: event.target.value,
                            },
                          ],
                        },
                      },
                    });
                    await refetch();
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                {/* TODO: FIX */}
                {range(1, 11).map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
              <Link
                component="button"
                sx={{ ml: 1 }}
                onClick={async () => {
                  try {
                    await removeCartBookings({
                      variables: {
                        input: { cartBookingIds: [cartBooking.id] },
                      },
                    });
                    await refetch();
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Remove
              </Link>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CartCard;
