import { Avatar, Box, Link, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { useGetMyCartQuery } from "../../generated/graphql";
import TextField from "../common/TextField/TextField";

const CartCard = () => {
  const { loading, error, data } = useGetMyCartQuery({
    fetchPolicy: "cache-only",
  });

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
              <TextField select value={cartBooking.numGuests} />
              <Link component="button" sx={{ ml: 1 }} onClick={() => {}}>
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
