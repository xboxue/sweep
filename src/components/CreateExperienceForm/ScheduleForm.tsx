import { Box, MenuItem, Stack, Typography } from "@mui/material";
import React from "react";
import * as yup from "yup";
import ScheduleBuilder from "../common/ScheduleBuilder/ScheduleBuilder";
import TextField from "../common/TextField/TextField";

interface Props {
  formik: any;
}

export const initialValues = {
  duration: 60,
  durationFormat: "minute",
  minAdvance: 1,
  minAdvanceFormat: "day",
  maxAdvance: 6,
  maxAdvanceFormat: "month",
};

export const validationSchema = yup.object({});

const ScheduleForm = ({ formik }: Props) => {
  const durationFormats = [
    { type: "hour", title: "hours" },
    { type: "minute", title: "minutes" },
  ];

  const minAdvanceFormats = [
    { type: "hour", title: "hours" },
    { type: "minute", title: "minutes" },
    { type: "day", title: "days" },
  ];

  const maxAdvanceFormats = [
    { type: "hour", title: "hours" },
    { type: "day", title: "days" },
    { type: "week", title: "weeks" },
    { type: "month", title: "months" },
  ];

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="subtitle2">Duration</Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            type="number"
            id="duration"
            value={formik.values.duration}
            onChange={formik.handleChange}
            error={formik.touched.duration && Boolean(formik.errors.duration)}
            helperText={formik.touched.duration && formik.errors.duration}
          />
          <TextField
            select
            id="durationFormat"
            name="durationFormat"
            value={formik.values.durationFormat}
            onChange={formik.handleChange}
          >
            {durationFormats.map(({ type, title }) => (
              <MenuItem key={type} value={type}>
                {title}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Box>

      <Box>
        <Typography variant="subtitle2">
          Customers must book at least
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <TextField
            type="number"
            id="duration"
            value={formik.values.minAdvance}
            onChange={formik.handleChange}
            error={
              formik.touched.minAdvance && Boolean(formik.errors.minAdvance)
            }
            helperText={formik.touched.minAdvance && formik.errors.minAdvance}
          />
          <TextField
            select
            id="minAdvanceFormat"
            name="minAdvanceFormat"
            value={formik.values.minAdvanceFormat}
            onChange={formik.handleChange}
          >
            {minAdvanceFormats.map(({ type, title }) => (
              <MenuItem key={type} value={type}>
                {title}
              </MenuItem>
            ))}
          </TextField>
          <Typography variant="body2">in advance</Typography>
        </Stack>
      </Box>

      <Box>
        <Typography variant="subtitle2">
          Customers cannot book more than
        </Typography>

        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <TextField
            type="number"
            id="maxAdvance"
            value={formik.values.maxAdvance}
            onChange={formik.handleChange}
            error={
              formik.touched.maxAdvance && Boolean(formik.errors.maxAdvance)
            }
            helperText={formik.touched.maxAdvance && formik.errors.maxAdvance}
          />
          <TextField
            select
            id="maxAdvanceFormat"
            name="maxAdvanceFormat"
            value={formik.values.maxAdvanceFormat}
            onChange={formik.handleChange}
          >
            {maxAdvanceFormats.map(({ type, title }) => (
              <MenuItem key={type} value={type}>
                {title}
              </MenuItem>
            ))}
          </TextField>
          <Typography variant="body2">in advance</Typography>
        </Stack>
      </Box>

      <Box>
        <Typography variant="subtitle2">Schedule</Typography>
        <ScheduleBuilder
          duration={
            formik.values.durationFormat === "minute"
              ? formik.values.duration
              : formik.values.duration * 60
          }
        />
      </Box>
    </Stack>
  );
};

export default ScheduleForm;
