import { DeleteOutline } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { Event } from "react-big-calendar";
import { useNavigate } from "react-router-dom";
import {
  useCreateTimeSlotBlockMutation,
  useDeleteTimeSlotBlockMutation,
} from "../../generated/graphql";
import TextField from "../common/TextField/TextField";

interface Props {
  event: Event & { resourceId: number; resourceTitle: string; block: any };
  onBlock: () => void;
}

const EventPreviewCard = ({ event, onBlock }: Props) => {
  const navigate = useNavigate();
  const [createTimeSlotBlock] = useCreateTimeSlotBlockMutation();
  const [deleteTimeSlotBlock] = useDeleteTimeSlotBlockMutation();

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
        {event.block ? (
          <Button
            variant="contained"
            onClick={async () => {
              try {
                await deleteTimeSlotBlock({
                  variables: { input: { id: event.block.id } },
                });
                onBlock();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Remove block
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={async () => {
                try {
                  await createTimeSlotBlock({
                    variables: { input: { timeSlotId: event.id } },
                  });
                  onBlock();
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Block off
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
        )}
      </Stack>
    </Box>
  );
};

export default EventPreviewCard;
