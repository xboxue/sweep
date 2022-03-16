import {
  Avatar,
  Box,
  Button,
  Link,
  MenuItem,
  Skeleton,
  Typography,
} from "@mui/material";
import { range, sortBy } from "lodash";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  if (loading) return <Skeleton />;

  if (!data?.myCart?.cartBookings) {
    return <Typography>No items in cart</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Cart
      </Typography>
      {sortBy(data.myCart.cartBookings, "id").map((cartBooking) => (
        <Box sx={{ display: "flex", mt: 2 }} key={cartBooking.id}>
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

      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={() => navigate("/orders/new")}
      >
        Check out
      </Button>
    </Box>
  );
};

export default CartCard;
