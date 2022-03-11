import { Box, Popover, Skeleton } from "@mui/material";
import { styled } from "@mui/system";
import { DateTime, Settings } from "luxon";
import { useState } from "react";
import { Calendar, Event, luxonLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventPreviewCard from "../components/EventPreviewCard/EventPreviewCard";
import { useGetOfferingSchedulesQuery } from "../generated/graphql";

const StyledCalendar = styled(withDragAndDrop(Calendar))({
  // Prevent hover events on time column
  ".rbc-time-gutter": {
    pointerEvents: "none",
    fontSize: 14,
  },
  // Don't change today column color
  ".rbc-today": {
    background: "inherit",
  },
  // Hide header
  ".rbc-allday-cell": {
    display: "none",
  },
  ".rbc-time-view .rbc-header ": {
    borderBottom: "none",
  },
  // Hide default event label
  // ".rbc-event-label": {
  //   display: "none",
  // },
  // Dim event when dragged into different day
  ".rbc-addons-dnd-drag-preview": {
    opacity: "50%",
  },
  ".rbc-addons-dnd-dragged-event ~ .rbc-addons-dnd-drag-preview": {
    opacity: "100%",
  },
  // Cell height
  ".rbc-timeslot-group": {
    minHeight: 100,
  },
});

const CalendarPage = () => {
  const [date, setDate] = useState(DateTime.now().startOf("day").toJSDate());
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [previewEvent, setPreviewEvent] = useState<Event | null>(null);
  const { loading, error, data } = useGetOfferingSchedulesQuery({
    variables: { date },
  });

  Settings.defaultLocale = "en";

  if (loading) return <Skeleton />;

  const events = data?.offerings
    .map((offering) =>
      offering.timeSlots.map((timeSlot) => ({
        id: timeSlot.id,
        resourceId: offering.id,
        resourceTitle: offering.name,
        start: DateTime.fromISO(timeSlot.startDateTime).toJSDate(),
        end: DateTime.fromISO(timeSlot.endDateTime).toJSDate(),
      }))
    )
    .flat();

  return (
    <Box sx={{ height: 800 }}>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ vertical: "center", horizontal: "right" }}
        onClose={() => setAnchorEl(null)}
      >
        <EventPreviewCard event={previewEvent} />
      </Popover>
      <StyledCalendar
        date={date}
        onNavigate={(date) => setDate(date)}
        defaultView="day"
        // views={["day"]}
        resources={data?.offerings.map((offering) => ({
          id: offering.id,
          title: offering.name,
        }))}
        events={events}
        localizer={luxonLocalizer(DateTime)}
        step={15}
        timeslots={4}
        // eventPropGetter={() => ({ style: { zIndex: 11 } })}
        selectable
        onSelecting={() => false}
        // onSelectSlot={onSelectSlot}
        // onEventDrop={onEventDrop}
        onSelectEvent={(event, e) => {
          setPreviewEvent(event);
          setAnchorEl(e.currentTarget);
        }}
        showMultiDayTimes
        scrollToTime={DateTime.fromISO("09:00").toJSDate()}
        resizable={false}
      />
    </Box>
  );
};

export default CalendarPage;
