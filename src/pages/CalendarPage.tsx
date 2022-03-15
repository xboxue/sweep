import { Box, Popover, Skeleton } from "@mui/material";
import { styled } from "@mui/system";
import { DateTime, Settings } from "luxon";
import { useMemo, useState } from "react";
import { Calendar, Event, luxonLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarToolbar from "../components/CalendarToolbar/CalendarToolbar";
import EventPreviewCard from "../components/EventPreviewCard/EventPreviewCard";
import {
  useGetMyCartQuery,
  useGetOfferingSchedulesQuery,
} from "../generated/graphql";

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
  const [previewEventId, setPreviewEventId] = useState<Event | null>(null);
  const { loading, error, data, refetch } = useGetOfferingSchedulesQuery({
    variables: { date },
  });
  const {
    loading: cartLoading,
    error: cartError,
    data: cartData,
    refetch: refetchCart,
  } = useGetMyCartQuery();

  const events = useMemo(
    () =>
      data?.offerings
        .map((offering) =>
          offering.timeSlots.map((timeSlot) => ({
            id: timeSlot.id,
            resourceId: offering.id,
            resourceTitle: offering.name,
            block: timeSlot.block,
            cartBooking: cartData?.myCart?.cartBookings?.find(
              (cartBooking) => cartBooking.timeSlot.id === timeSlot.id
            ),
            start: DateTime.fromISO(timeSlot.startDateTime).toJSDate(),
            end: DateTime.fromISO(timeSlot.endDateTime).toJSDate(),
          }))
        )
        .flat(),
    [data, cartData]
  );

  const previewEvent = useMemo(
    () => events?.find((event) => event.id === previewEventId),
    [events, previewEventId]
  );

  Settings.defaultLocale = "en";

  if (loading) return <Skeleton />;

  return (
    <Box sx={{ height: 800 }}>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ vertical: "center", horizontal: "right" }}
        onClose={() => setAnchorEl(null)}
      >
        <EventPreviewCard
          event={previewEvent}
          onBlockChange={refetch}
          onCartChange={refetchCart}
        />
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
        eventPropGetter={(event) => {
          if (event.block) {
            return { style: { backgroundColor: "grey" } };
          }
          if (event.cartBooking) {
            return { style: { backgroundColor: "green" } };
          }
          return {};
        }}
        selectable
        onSelecting={() => false}
        components={{ toolbar: CalendarToolbar }}
        // onSelectSlot={onSelectSlot}
        // onEventDrop={onEventDrop}
        onSelectEvent={(event, e) => {
          setPreviewEventId(event.id);
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
