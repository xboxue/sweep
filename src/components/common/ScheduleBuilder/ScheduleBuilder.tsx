import { Box } from "@mui/material";
import { DateTime } from "luxon";
import { useState } from "react";
import ScheduleBuilderColumn from "./ScheduleBuilderColumn";

const TIME_SLOT_INTERVAL = 15;

type Schedule = {
  0: string[];
  1: string[];
  2: string[];
  3: string[];
  4: string[];
  5: string[];
  6: string[];
};
interface Props {
  duration: number;
  schedule: Schedule;
  setSchedule: (schedule: Schedule) => void;
}

const ScheduleBuilder = ({ duration, schedule, setSchedule }: Props) => {
  const handleCopy = (from: keyof Schedule, to: (keyof Schedule)[]) => {
    setSchedule({
      ...schedule,
      ...to.reduce((acc, day) => {
        acc[day] = schedule[from];
        return acc;
      }, {}),
    });
  };

  const handleDelete = (day: keyof Schedule, index: number) => {
    setSchedule({
      ...schedule,
      [day]: schedule[day].filter((_, i) => index !== i),
    });
  };

  const handleChange = (day: keyof Schedule, index: number, value: string) => {
    const newTimeSlots = [...schedule[day]];
    newTimeSlots[index] = value;

    setSchedule({
      ...schedule,
      [day]: newTimeSlots,
    });
  };

  const handleAdd = (day: keyof Schedule) => {
    const lastTimeSlot = schedule[day][schedule[day].length - 1];
    const remainder = duration % TIME_SLOT_INTERVAL;
    const newTimeSlot = lastTimeSlot
      ? DateTime.fromFormat(lastTimeSlot, "h:mm a")
          .plus({
            minutes:
              remainder === 0
                ? duration
                : duration + TIME_SLOT_INTERVAL - remainder,
          })
          .toFormat("h:mm a")
      : DateTime.now().set({ hour: 9, minute: 0 }).toFormat("h:mm a");

    setSchedule({
      ...schedule,
      [day]: [...schedule[day], newTimeSlot],
    });
  };

  return (
    <Box sx={{ display: "flex" }} mx="-4px">
      {Object.values(schedule).map((timeSlots, day) => (
        <Box key={day} width={1 / 7} mx="4px">
          <ScheduleBuilderColumn
            day={day}
            onAdd={() => handleAdd(day)}
            onCopy={handleCopy}
            onChange={handleChange}
            onDelete={handleDelete}
            timeSlots={timeSlots}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ScheduleBuilder;
