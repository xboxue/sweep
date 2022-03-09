import { ContentCopy } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { useContext, useState } from "react";
import { HeaderProps } from "react-big-calendar";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CopyTimesMenu from "./CopyTimesMenu";
import { ScheduleContext } from "./ScheduleBuilder";

const DayHeader = ({ date }: HeaderProps) => {
  const { onCopy } = useContext(ScheduleContext);
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CopyTimesMenu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        onCopy={(to: number[]) => onCopy(DateTime.fromJSDate(date).weekday, to)}
      />
      <Typography>{DateTime.fromJSDate(date).toFormat("ccc")}</Typography>

      <IconButton
        size="small"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <ContentCopy sx={{ height: 18, width: 18 }} />
      </IconButton>
    </Box>
  );
};

export default DayHeader;
