import { CalendarToday, PersonOutline } from "@mui/icons-material";
import { CalendarPicker, LocalizationProvider } from "@mui/lab";
import AdapterLuxon from "@mui/lab/AdapterLuxon";
import {
  Avatar,
  Box,
  Divider,
  InputAdornment,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { range } from "lodash";
import { DateTime, Interval } from "luxon";
import { useMemo } from "react";
import TextField from "../common/TextField/TextField";

interface Props {
  numGuests: number;
  onNumGuestsChange: (numGuests: number) => void;
  date: DateTime;
  onDateChange: (date: DateTime) => void;
  cartIcon?: React.ReactNode;
}

const NUM_DAYS_TO_SHOW = 10;

const OfferingToolbar = ({
  numGuests,
  onNumGuestsChange,
  date,
  onDateChange,
  cartIcon,
}: Props) => {
  const inputFormat = useMemo(() => {
    if (date.toISODate() === DateTime.now().toISODate()) return "'Today'";
    if (date.toISODate() === DateTime.now().plus({ day: 1 }).toISODate())
      return "'Tomorrow'";
    return "EEE, MMM d";
  }, [date]);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Stack
          direction="row"
          spacing="2px"
          divider={<Divider orientation="vertical" flexItem />}
          sx={{
            border: 1,
            borderColor: (theme) => theme.palette.divider,
            borderRadius: 2,
            p: "2px",
            width: 400,
          }}
        >
          <TextField
            select
            fullWidth
            size={isMobile ? "small" : "medium"}
            InputProps={{
              // startAdornment: (
              //   <InputAdornment
              //     position="start"
              //     sx={(theme) => ({
              //       [theme.breakpoints.down("sm")]: { mr: 0.5 },
              //     })}
              //   >
              //     <PersonOutline />
              //   </InputAdornment>
              // ),
              sx: (theme) => ({
                border: 0,
                [theme.breakpoints.up("sm")]: {
                  p: 1,
                },
              }),
            }}
            value={numGuests}
            onChange={(event) => onNumGuestsChange(event.target.value)}
          >
            {range(2, 21).map((value) => (
              <MenuItem key={value} value={value}>
                {value} guests
              </MenuItem>
            ))}
          </TextField>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <TextField
              select
              fullWidth
              size={isMobile ? "small" : "medium"}
              InputProps={{
                // startAdornment: (
                //   <InputAdornment
                //     position="start"
                //     sx={(theme) => ({
                //       [theme.breakpoints.down("sm")]: { mr: 0.5 },
                //     })}
                //   >
                //     <CalendarToday sx={{ height: 18, width: 18 }} />
                //   </InputAdornment>
                // ),
                sx: (theme) => ({
                  border: 0,
                  [theme.breakpoints.up("sm")]: {
                    p: 1,
                  },
                }),
              }}
              SelectProps={{
                displayEmpty: true,
                renderValue: () => date.toFormat(inputFormat),
                MenuProps: { sx: { maxHeight: "none" } },
              }}
            >
              <CalendarPicker
                date={date}
                onChange={(date) => onDateChange(date)}
                minDate={DateTime.now()}
                maxDate={DateTime.now().plus({ year: 1 })}
              />
            </TextField>
          </LocalizationProvider>
        </Stack>
        <Box sx={{ ml: [1, 2] }}>{cartIcon}</Box>
      </Box>
      {date.diff(DateTime.now().startOf("day"), "days").days <
        NUM_DAYS_TO_SHOW && (
        <Stack direction="row" spacing={2} sx={{ mt: 1, overflow: "auto" }}>
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
                  sx={(theme) => ({
                    bgcolor: "inherit",
                    border: 1,
                    borderColor: (theme) => theme.palette.divider,
                    ...(interval.start.toISODate() === date.toISODate() && {
                      bgcolor: (theme) => theme.palette.primary.main,
                    }),
                    cursor: "pointer",
                    height: 36,
                    width: 36,
                    [theme.breakpoints.down("sm")]: {
                      height: 32,
                      width: 32,
                    },
                  })}
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
    </Box>
  );
};

export default OfferingToolbar;
