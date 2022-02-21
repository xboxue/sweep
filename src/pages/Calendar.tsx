import FullCalendar, { EventContentArg } from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { Box, Button, Popover, Skeleton, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateDraftOrderMutation,
  useGetOfferingSchedulesQuery,
} from "../generated/graphql";

interface Props {
  eventInfo: EventContentArg;
}

const EventContent = ({ eventInfo }: Props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [createDraftOrder] = useCreateDraftOrderMutation();

  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{ flex: 1, cursor: "pointer" }}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <Typography variant="body2">{eventInfo.timeText}</Typography>
      </Box>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ vertical: "center", horizontal: "right" }}
        onClose={() => setAnchorEl(null)}
      >
        <Box sx={{ p: 2 }}>
          <Button variant="contained">Block off</Button>
          <Button
            variant="contained"
            onClick={async () => {
              try {
                navigate(
                  `/draft-orders/new?offeringId=${
                    eventInfo.event.extendedProps.offeringId
                  }&startDateTime=${DateTime.fromJSDate(
                    eventInfo.event.start
                  ).toISO()}`
                );
              } catch (error) {}
            }}
          >
            Add booking
          </Button>
        </Box>
      </Popover>
    </>
  );
};

const Calendar = () => {
  const { loading, error, data } = useGetOfferingSchedulesQuery({
    variables: { businessId: "1" },
  });

  if (loading) return <Skeleton />;

  const events = data?.business.offerings
    .map((offering) =>
      offering.schedule.timeSlots.map((timeSlot) => ({
        resourceId: offering.id,
        startTime: timeSlot.startTime,
        endTime: DateTime.fromFormat(timeSlot.startTime, "HH:mm:ss")
          .plus({ minutes: offering.duration })
          .toFormat("HH:mm:ss"),
        daysOfWeek: [(timeSlot.day + 1) % 7],
        extendedProps: {
          offeringId: offering.id,
        },
      }))
    )
    .flat();

  return (
    <>
      <FullCalendar
        plugins={[resourceTimeGridPlugin, interactionPlugin]}
        initialView="resourceTimeGridDay"
        slotMinTime="07:00:00"
        dateClick={(info) => console.log(info)}
        resources={data?.business.offerings.map((offering) => ({
          id: offering.id,
          title: offering.name,
        }))}
        events={events}
        eventContent={(eventInfo) => <EventContent eventInfo={eventInfo} />}
      />
    </>
  );
};

export default Calendar;
