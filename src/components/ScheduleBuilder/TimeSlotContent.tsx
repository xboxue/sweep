import { Box, Typography } from "@mui/material";
import { DateTime } from "luxon";
import React, { useContext, useRef } from "react";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ScheduleContext } from "./ScheduleBuilder";

const TimeSlotContent = (props) => {
  const { eventDuration } = useContext(ScheduleContext);
  const [open, setOpen] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const cell = ref.current?.getBoundingClientRect();

  return (
    <>
      {!!open && (
        <Box
          sx={{
            position: "fixed",
            bgcolor: (theme) => theme.palette.grey[200],
            left: cell?.left,
            top: cell?.top,
            height: (cell?.height * eventDuration) / 15,
            width: cell?.width,
            zIndex: 100,
            py: "3px",
            px: "6px",
            borderRadius: 1,
            pointerEvents: "none",
          }}
        >
          <Typography variant="body2">
            {DateTime.fromJSDate(props.value).toFormat("t")}
          </Typography>
        </Box>
      )}
      <Box
        ref={ref}
        sx={{ flex: 1, cursor: "pointer", zIndex: 10 }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {props.children}
      </Box>
    </>
  );
};

export default TimeSlotContent;
