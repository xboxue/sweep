import { DeleteOutline } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { Event } from "react-big-calendar";
import { useNavigate } from "react-router-dom";
import {
  useAddCartBookingsMutation,
  useCreateTimeSlotBlockMutation,
  useGetMyCartQuery,
  useRemoveTimeSlotBlockMutation,
  useRemoveCartBookingsMutation,
} from "../../generated/graphql";
import TextField from "../common/TextField/TextField";

interface Props {
  event: Event & {
    resourceId: number;
    resourceTitle: string;
    block: any;
    cartBooking: any;
  };
  onCartChange: () => void;
  onBlockChange: () => void;
}

const EventPreviewCard = ({ event, onBlockChange, onCartChange }: Props) => {
  const navigate = useNavigate();
  const [createTimeSlotBlock] = useCreateTimeSlotBlockMutation();
  const [removeTimeSlotBlock] = useRemoveTimeSlotBlockMutation();
  const [removeCartBookings] = useRemoveCartBookingsMutation();
  const [addCartBookings] = useAddCartBookingsMutation();

  const renderActions = (event) => {
    if (event.cartBooking) {
      return (
        <Button
          variant="contained"
          onClick={async () => {
            try {
              await removeCartBookings({
                variables: {
                  input: { cartBookingIds: [event.cartBooking.id] },
                },
              });
              await onCartChange();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Remove from cart
        </Button>
      );
    }

    if (event.block) {
      return (
        <Button
          variant="contained"
          onClick={async () => {
            try {
              await removeTimeSlotBlock({
                variables: { input: { id: event.block.id } },
              });
              onBlockChange();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Remove block
        </Button>
      );
    }
    return (
      <>
        <Button
          variant="contained"
          onClick={async () => {
            try {
              await createTimeSlotBlock({
                variables: { input: { timeSlotId: event.id } },
              });
              onBlockChange();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Block off
        </Button>
        <Button
          variant="contained"
          onClick={async () => {
            try {
              await addCartBookings({
                variables: {
                  input: {
                    // TODO: Fix
                    cartBookings: [
                      {
                        timeSlotId: event.id,
                        numGuests: 2,
                        offeringId: event.resourceId,
                      },
                    ],
                  },
                },
              });
              await onCartChange();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Add to cart
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            navigate(
              `/draft-orders/new?offeringId=${
                event.resourceId
              }&startDateTime=${DateTime.fromJSDate(event.start).toISO()}`
            )
          }
        >
          Add booking
        </Button>
      </>
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle1">{event.resourceTitle}</Typography>
        <IconButton size="small">
          <DeleteOutline fontSize="small" />
        </IconButton>
      </Box>
      <Typography>
        {DateTime.fromJSDate(event.start).toFormat("DDDD t")}
      </Typography>
      <Typography>Notes</Typography>
      <TextField multiline minRows={2} />
      <Stack
        spacing={1}
        direction="row"
        sx={{ justifyContent: "flex-end", mt: 1 }}
      >
        {renderActions(event)}
      </Stack>
    </Box>
  );
};

export default EventPreviewCard;
