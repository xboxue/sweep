import { Add, ContentCopy, DeleteOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Popover,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { DateTime, Info, Interval } from "luxon";

const ScheduleBuilderColumn = ({
  day,
  onCopy,
  onAdd,
  onChange,
  onDelete,
  timeSlots,
}: {
  day: number;
  onAdd: () => void;
  onCopy: (from: number, to: number[]) => void;
  onChange: (day: number, index: number, value: string) => void;
  onDelete: (day: number, index: number) => void;
  timeSlots: string[];
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [copyTo, setCopyTo] = useState({});

  return (
    <Box>
      <Popover
        id="copy-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        sx={{ p: 2 }}
      >
        <>
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2">Copy times to...</Typography>
          </Box>
          {Info.weekdays("short").map((name, day) => (
            <MenuItem
              key={name}
              sx={{ py: 0 }}
              onClick={(event) => {
                event.stopPropagation();

                setCopyTo({ ...copyTo, [day]: !copyTo[day] });
              }}
            >
              <Typography variant="inherit" sx={{ mr: "auto" }}>
                {name}
              </Typography>
              <Checkbox
                checked={!!copyTo[day]}
                onChange={() => setCopyTo({ ...copyTo, [day]: !copyTo[day] })}
                name="wtf"
                size="small"
                inputProps={{ "aria-label": "controlled" }}
              />
            </MenuItem>
          ))}
          <Box sx={{ px: 2, py: 1 }}>
            <Button
              fullWidth
              size="small"
              variant="contained"
              onClick={() =>
                onCopy(
                  day,
                  Object.keys(copyTo).filter((to) => copyTo[to])
                )
              }
            >
              Apply
            </Button>
          </Box>
        </>
      </Popover>
      <Paper
        variant="outlined"
        sx={{ flex: 1, display: "flex", alignItems: "center", p: 1 }}
      >
        <Typography variant="subtitle2" sx={{ mr: "auto" }}>
          {Info.weekdays("short")[day]}
        </Typography>
        <IconButton
          size="small"
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <ContentCopy sx={{ width: 16, height: 16 }} />
        </IconButton>
        <IconButton size="small" onClick={onAdd}>
          <Add fontSize="small" />
        </IconButton>
      </Paper>
      {timeSlots.map((time, index) => (
        <Select
          fullWidth
          key={time}
          value={time}
          onChange={(event) => onChange(day, index, event.target.value)}
          IconComponent={null}
          MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
          size="small"
          sx={{
            mt: 1,
            pr: 1,
            "& .MuiSelect-select": { pr: "0 !important" },
            fontSize: (theme) => theme.typography.body2,
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => onDelete(day, index)}>
                <DeleteOutlined fontSize="small" />
              </IconButton>
            </InputAdornment>
          }
        >
          {Interval.fromDateTimes(
            DateTime.now().startOf("year"),
            DateTime.now().startOf("year").plus({ days: 1 })
          )
            .splitBy({ minutes: 15 })
            .map((duration) => {
              const time = duration.start.toFormat("h:mm a");
              return (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              );
            })}
        </Select>
      ))}
    </Box>
  );
};

export default ScheduleBuilderColumn;
