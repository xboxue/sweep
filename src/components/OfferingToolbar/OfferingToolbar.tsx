import { CalendarToday, PersonOutline } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterLuxon from "@mui/lab/AdapterLuxon";
import {
  Avatar,
  Box,
  InputAdornment,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { range } from "lodash";
import { DateTime, Interval } from "luxon";
import { useMemo, useState } from "react";
import TextField from "../common/TextField/TextField";

interface Props {
  numGuests: number;
  onNumGuestsChange: (numGuests: number) => void;
  date: DateTime;
  onDateChange: (date: DateTime) => void;
}

const NUM_DAYS_TO_SHOW = 10;

const OfferingToolbar = ({
  numGuests,
  onNumGuestsChange,
  date,
  onDateChange,
}: Props) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const inputFormat = useMemo(() => {
    if (date.toISODate() === DateTime.now().toISODate()) return "'Today'";
    if (date.toISODate() === DateTime.now().plus({ day: 1 }).toISODate())
      return "'Tomorrow'";
    return "EEE, MMM d";
  }, [date]);

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <TextField
          select
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutline />
              </InputAdornment>
            ),
            sx: {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              width: 250,
            },
          }}
          value={numGuests}
          onChange={(event) => onNumGuestsChange(event.target.value)}
        >
          {range(1, 50).map((value) => (
            <MenuItem key={value} value={value}>
              {value} players
            </MenuItem>
          ))}
        </TextField>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <DatePicker
            open={datePickerOpen}
            onClose={() => setDatePickerOpen(false)}
            value={date}
            onChange={onDateChange}
            disableOpenPicker
            views={["day"]}
            minDate={DateTime.now()}
            maxDate={DateTime.now().plus({ year: 1 })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday fontSize="small" />
                </InputAdornment>
              ),
              sx: {
                borderLeft: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                width: 250,
              },
            }}
            inputFormat={inputFormat}
            renderInput={(params) => (
              <TextField {...params} onClick={() => setDatePickerOpen(true)} />
            )}
          />
        </LocalizationProvider>
      </Box>
      {date.diff(DateTime.now().startOf("day"), "days").days <
        NUM_DAYS_TO_SHOW && (
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          {Interval.fromDateTimes(
            DateTime.now(),
            DateTime.now().plus({ days: NUM_DAYS_TO_SHOW })
          )
            .splitBy({ day: 1 })
            .map((interval) => (
              <Box
                key={interval.start.toISO()}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" color="textSecondary">
                  {interval.start.toFormat("EEE")}
                </Typography>
                <Avatar
                  sx={{
                    bgcolor: "inherit",
                    border: 1,
                    borderColor: (theme) => theme.palette.divider,
                    ...(interval.start.toISODate() === date.toISODate() && {
                      bgcolor: (theme) => theme.palette.primary.main,
                    }),
                    cursor: "pointer",
                  }}
                  onClick={() => onDateChange(interval.start.startOf("day"))}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: (theme) =>
                        interval.start.toISODate() !== date.toISODate()
                          ? theme.palette.primary.main
                          : "inherit",
                    }}
                  >
                    {interval.start.toFormat("d")}
                  </Typography>
                </Avatar>
              </Box>
            ))}
        </Stack>
      )}
      {/* <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccessTime />
            </InputAdornment>
          ),
        }}
        sx={{ mr: 2 }}
      /> */}
    </Box>
  );
};

export default OfferingToolbar;
