import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { cloneDeep } from "lodash";
import { DateTime, Settings, WeekdayNumbers } from "luxon";
import React, { useMemo } from "react";
import { Calendar, Event, luxonLocalizer, SlotInfo } from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ScheduleTimeSlot } from "../../generated/graphql";
import DayHeader from "./DayHeader";
import EventContent from "./EventContent";
import TimeSlotContent from "./TimeSlotContent";

const StyledCalendar = styled(withDragAndDrop(Calendar))({
  // Prevent hover events on time column
  ".rbc-time-gutter": {
    pointerEvents: "none",
    fontSize: 14,
  },
  // Hide time indicator
  ".rbc-current-time-indicator": {
    display: "none",
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
    "border-bottom": "none",
  },
  // Hide default event label
  ".rbc-event-label": {
    display: "none",
  },
  // Dim event when dragged into different day
  ".rbc-addons-dnd-drag-preview": {
    opacity: "50%",
  },
  ".rbc-addons-dnd-dragged-event ~ .rbc-addons-dnd-drag-preview": {
    opacity: "100%",
  },
});

export const ScheduleContext = React.createContext();

interface Props {
  duration: number;
  timeSlots: ScheduleTimeSlot[];
  onChange: (timeSlots: ScheduleTimeSlot[]) => void;
}

const ScheduleBuilder = ({ duration, timeSlots, onChange }: Props) => {
  const events = useMemo(() => {
    return timeSlots
      .map((event) => {
        const startTime = DateTime.fromISO(event.startTime).set({
          weekday: event.day,
        });
        const endTime = startTime.plus({ minutes: duration });

        return [
          { start: startTime.toJSDate(), end: endTime.toJSDate() },
          {
            start: startTime.minus({ week: 1 }).toJSDate(),
            end: endTime.minus({ week: 1 }).toJSDate(),
          },
        ];
      })
      .flat();
  }, [timeSlots, duration]);

  Settings.defaultLocale = "en";
  Settings.defaultZone = "utc";

  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    const oldStartDateTime = DateTime.fromJSDate(data.event.start);
    const newStartTime = DateTime.fromJSDate(data.start);

    const newEvents = cloneDeep(timeSlots);
    const changedEvent = newEvents.find(
      (event) =>
        event.startTime === oldStartDateTime.toFormat("HH:mm:ss") &&
        event.day === oldStartDateTime.weekday
    );
    if (changedEvent && oldStartDateTime.weekday === newStartTime.weekday) {
      changedEvent.startTime = newStartTime.toFormat("HH:mm:ss");
      changedEvent.day = newStartTime.weekday;
      onChange(newEvents);
    }
  };

  const onSelectSlot = (info: SlotInfo) => {
    const startDateTime = DateTime.fromJSDate(info.start);

    onChange([
      ...timeSlots,
      {
        startTime: startDateTime.toFormat("HH:mm:ss"),
        day: startDateTime.weekday,
      },
    ]);
  };

  const onDelete = (event: Event) => {
    const startDateTime = DateTime.fromJSDate(event.start);

    onChange(
      timeSlots.filter(
        (e) =>
          e.startTime !== startDateTime.toFormat("HH:mm:ss") ||
          e.day !== startDateTime.weekday
      )
    );
  };

  const onCopy = (from: number, to: WeekdayNumbers[]) => {
    const filteredEvents = timeSlots.filter((event) => !to.includes(event.day));
    const fromEvents = timeSlots.filter((event) => event.day === from);

    const newEvents = fromEvents
      .map((event) => to.map((day) => ({ startTime: event.startTime, day })))
      .flat();

    onChange([...filteredEvents, ...newEvents]);
  };

  return (
    <Box sx={{ height: 400 }}>
      <ScheduleContext.Provider
        value={{ eventDuration: duration, onDelete, onCopy }}
      >
        <StyledCalendar
          defaultView="week"
          views={["week"]}
          events={events}
          localizer={luxonLocalizer(DateTime)}
          toolbar={false}
          step={15}
          timeslots={4}
          eventPropGetter={() => ({ style: { zIndex: 11 } })}
          selectable
          onSelecting={() => false}
          components={{
            week: { header: DayHeader },
            event: EventContent,
            timeSlotWrapper: TimeSlotContent,
          }}
          onSelectSlot={onSelectSlot}
          onEventDrop={onEventDrop}
          showMultiDayTimes
          scrollToTime={DateTime.fromISO("09:00").toJSDate()}
          resizable={false}
        />
      </ScheduleContext.Provider>
    </Box>
  );
};

export default ScheduleBuilder;
