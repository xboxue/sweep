import {
  Box,
  Button,
  Drawer,
  Popover,
  Skeleton,
  Toolbar,
  Typography,
  Stack,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { sortBy } from "lodash";
import { DateTime, Settings } from "luxon";
import { useMemo, useState } from "react";
import { Calendar, Event, luxonLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarEventContent from "../components/CalendarEventCard/CalendarEventContent";
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
  // Hide header borders
  ".rbc-header, .rbc-row.rbc-row-resource": {
    borderBottom: 0,
  },
  ".rbc-time-header-content": {
    borderLeft: 0,
  },
  ".rbc-time-header-gutter": {
    borderRight: 0,
  },
  ".rbc-time-header.rbc-overflowing": {
    borderRight: 0,
  },
  // Hide calendar container border
  ".rbc-time-view": {
    border: 0,
  },
  // Add space between resource names and calendar
  ".rbc-time-view .rbc-row": {
    minHeight: 24,
  },
  // Add padding around time label
  ".rbc-label": {
    paddingLeft: 16,
    paddingRight: 8,
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
  const [previewEventId, setPreviewEventId] = useState<string | null>(null);
  const { loading, error, data, refetch } = useGetOfferingSchedulesQuery({
    variables: { date },
    fetchPolicy: "network-only",
  });
  const {
    loading: cartLoading,
    error: cartError,
    data: cartData,
    refetch: refetchCart,
  } = useGetMyCartQuery({ fetchPolicy: "network-only" });
  const theme = useTheme();

  const events = useMemo(
    () =>
      data?.offerings
        .map((offering) =>
          offering.timeSlots.map((timeSlot) => ({
            id: timeSlot.id,
            resourceId: offering.id,
            resourceTitle: offering.name,
            offering,
            block: timeSlot.block,
            cartBooking: cartData?.myCart?.cartBookings?.find(
              (cartBooking) => cartBooking.timeSlot.id === timeSlot.id
            ),
            booking: timeSlot.booking,
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

  const upcomingEvents = sortBy(
    events?.filter(
      (event) =>
        event.booking &&
        event.start > new Date() &&
        event.start < DateTime.now().plus({ minutes: 30 }).toJSDate()
    ),
    "start"
  );

  const renderSidebar = () => {
    if (previewEvent)
      return (
        <EventPreviewCard
          event={previewEvent}
          onBlockChange={refetch}
          onCartChange={refetchCart}
        />
      );

    return (
      <>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Upcoming bookings
        </Typography>
        <Stack spacing={2}>
          {upcomingEvents.map((event) => (
            <Box
              key={event.id}
              sx={{
                p: 2,
                borderRadius: 1,
                bgcolor: (theme) => theme.palette.grey[200],
              }}
            >
              <Typography variant="caption">
                {DateTime.fromJSDate(event.start).toFormat("t")}
              </Typography>
              <Typography variant="subtitle2">
                {event.booking.order.customer.firstName}{" "}
                {event.booking.order.customer.lastName}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {event.offering.name} | {event.booking.numGuests} players
              </Typography>
              <Button variant="contained" fullWidth size="small">
                Check in
              </Button>
            </Box>
          ))}
        </Stack>
      </>
    );
  };

  return (
    <Box sx={{ display: "flex", m: -3, height: "calc(100vh - 56px)" }}>
      <Box sx={{ flex: 1, overflowY: "auto", pt: 2 }}>
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
            let style = { border: 0, ...theme.typography.subtitle1 };
            if (event.booking) {
              style = {
                ...style,
                backgroundColor: "#DEFEE3",
                color: "#037B27",
                borderLeft: "4px solid #49CA7F",
              };
            } else if (event.block) {
              style = {
                ...style,
                backgroundColor: "#FFE2C8",
                color: "#A32F01",
                borderLeft: "4px solid #FE6F32",
              };
            } else if (event.cartBooking) {
              style = {
                ...style,
                backgroundColor: "#FFDDEF",
                color: "#A91555",
                borderLeft: "4px solid #AE0054",
              };
            } else {
              style = {
                ...style,
                backgroundColor: "#E2F9FF",
                color: "#066CBF",
                borderLeft: "4px solid #33A5E4",
              };
            }
            return { style };
          }}
          selectable
          onSelecting={() => false}
          components={{
            toolbar: CalendarToolbar,
            event: CalendarEventContent,
          }}
          // onSelectSlot={onSelectSlot}
          // onEventDrop={onEventDrop}
          onSelectEvent={(event, e) => {
            setPreviewEventId(event.id);
          }}
          showMultiDayTimes
          scrollToTime={DateTime.fromISO("09:00").toJSDate()}
          resizable={false}
        />
      </Box>
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: 300,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 300, boxSizing: "border-box" },
          zIndex: (theme) => theme.zIndex.appBar - 1,
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2 }}>{renderSidebar()}</Box>
      </Drawer>
    </Box>
  );
};

export default CalendarPage;
