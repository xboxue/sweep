import { DeleteOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { useContext } from "react";
import { EventProps } from "react-big-calendar";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ScheduleContext } from "./ScheduleBuilder";

const EventContent = ({ event }: EventProps) => {
  const { onDelete } = useContext(ScheduleContext);

  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      <Typography variant="body2">
        {DateTime.fromJSDate(event.start).toFormat("t")}
      </Typography>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(event);
        }}
        sx={{ position: "absolute", top: -4, right: -4 }}
      >
        <DeleteOutline
          fontSize="small"
          sx={{ color: "white", pointerEvents: "none" }}
        />
      </IconButton>
    </Box>
  );
};

export default EventContent;
