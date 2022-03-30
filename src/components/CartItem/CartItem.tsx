import { Avatar, Box, Link, MenuItem, Stack, Typography } from "@mui/material";
import { range } from "lodash";
import { DateTime } from "luxon";
import { CartBooking } from "../../generated/graphql";
import TextField from "../common/TextField/TextField";

interface Props {
  cartBooking: CartBooking;
  onRemove: () => void;
  onUpdate: (numGuests: number) => void;
}

const CartItem = ({ cartBooking, onUpdate, onRemove }: Props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Avatar
        variant="rounded"
        src={cartBooking.offering.featuredImage?.url}
        sx={{ width: 56, height: 56 }}
      />
      <Stack sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{cartBooking.offering.name}</Typography>
        <Typography variant="body2">
          {DateTime.fromISO(cartBooking.timeSlot.startDateTime).toFormat(
            "EEE, MMM d, h:mm a"
          )}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            select
            size="small"
            value={cartBooking.numGuests}
            onChange={(event) => onUpdate(event.target.value)}
          >
            {/* TODO: FIX */}
            {range(1, 11).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>
          <Link component="button" sx={{ ml: 1 }} onClick={onRemove}>
            Remove
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};

export default CartItem;