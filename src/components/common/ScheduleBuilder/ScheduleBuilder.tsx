import { Box } from "@mui/material";
import { DateTime } from "luxon";
import { useState } from "react";
import ScheduleBuilderColumn from "./ScheduleBuilderColumn";

const TIME_SLOT_INTERVAL = 15;

const ScheduleBuilder = ({ duration }: { duration: number }) => {
  const [schedule, setSchedule] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  });

  const handleCopy = (
    from: keyof typeof schedule,
    to: (keyof typeof schedule)[]
  ) => {
    setSchedule({
      ...schedule,
      ...to.reduce((acc, day) => {
        acc[day] = schedule[from];
        return acc;
      }, {}),
    });
  };

  const handleDelete = (day: keyof typeof schedule, index: number) => {
    setSchedule({
      ...schedule,
      [day]: schedule[day].filter((_, i) => index !== i),
    });
  };

  const handleChange = (
    day: keyof typeof schedule,
    index: number,
    value: string
  ) => {
    const newTimeSlots = [...schedule[day]];
    newTimeSlots[index] = value;

    setSchedule({
      ...schedule,
      [day]: newTimeSlots,
    });
  };

  const handleAdd = (day: keyof typeof schedule) => {
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
