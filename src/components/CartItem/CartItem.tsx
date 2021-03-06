import {
  Avatar,
  Box,
  Link,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { range } from "lodash";
import { DateTime } from "luxon";
import { CartBooking } from "../../generated/graphql";
import { PaymentType } from "../../generated/public/graphql";
import TextField from "../common/TextField/TextField";

interface Props {
  cartBooking: CartBooking;
  onRemove: () => void;
  onUpdate: (numGuests: number) => void;
  editable?: boolean;
}

const CartItem = ({
  cartBooking,
  onUpdate,
  onRemove,
  editable = true,
}: Props) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex" }}>
      <Avatar
        variant="rounded"
        src={cartBooking.offering.featuredImage?.url}
        sx={{ width: 56, height: 56 }}
      />
      <Stack sx={{ ml: 2, flex: 1, minWidth: 0 }}>
        <Typography
          variant="subtitle2"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {cartBooking.offering.name}{" "}
          {cartBooking.offering.paymentType === PaymentType.Deposit &&
            "(Deposit)"}
        </Typography>
        <Typography variant="body2">
          {DateTime.fromISO(cartBooking.timeSlot.startDateTime).toFormat(
            "EEE, MMM d, h:mm a"
          )}
        </Typography>
        {editable ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              select
              size="small"
              value={cartBooking.numGuests}
              onChange={(event) => onUpdate(parseInt(event.target.value, 10))}
              SelectProps={{ native: isMobile }}
            >
              {range(
                cartBooking.offering.minGuests,
                cartBooking.offering.maxGuests + 1
              ).map((value) => {
                if (isMobile)
                  return (
                    <option key={value} value={value}>
                      {value} guests
                    </option>
                  );

                return (
                  <MenuItem key={value} value={value}>
                    {value} guests
                  </MenuItem>
                );
              })}
            </TextField>
            <Link
              component="button"
              variant="body2"
              sx={{ ml: 1 }}
              onClick={onRemove}
            >
              Remove
            </Link>
          </Box>
        ) : (
          <Typography variant="body2">
            <strong>{cartBooking.numGuests}</strong> players
          </Typography>
        )}
      </Stack>
      <Typography variant="body2">
        ${(cartBooking.total / 100).toFixed(2)}
      </Typography>
    </Box>
  );
};

export default CartItem;
