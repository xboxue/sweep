import { Box, MenuItem, Stack, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import * as yup from "yup";
import {
  DurationFormat,
  MaxAdvanceFormat,
  MinAdvanceFormat,
} from "../../generated/graphql";
import FormikTextField from "../common/FormikTextField/FormikTextField";
import ScheduleBuilder from "../common/ScheduleBuilder/ScheduleBuilder";

export const initialValues = {
  durationMinutes: 60,
  durationHours: 1,
  durationFormat: DurationFormat.Minute,
  minAdvance: 1,
  minAdvanceFormat: MinAdvanceFormat.Day,
  maxAdvance: 6,
  maxAdvanceFormat: MaxAdvanceFormat.Month,
  schedule: {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  },
};

export const validationSchema = yup.object({
  durationMinutes: yup
    .number()
    .required("Required")
    .integer()
    .when("durationFormat", {
      is: DurationFormat.Minute,
      then: (schema) => schema.positive("Required"),
      otherwise: (schema) => schema.min(0).max(59),
    }),
  durationHours: yup.number().when("durationFormat", {
    is: DurationFormat.Hour,
    then: (schema) =>
      schema.required("Required").positive("Required").integer(),
  }),
  minAdvance: yup.number().required("Required").positive("Required").integer(),
  maxAdvance: yup.number().required("Required").positive("Required").integer(),
});

const ScheduleForm = () => {
  const formik = useFormikContext<typeof initialValues>();

  const durationFormats = [
    { type: DurationFormat.Hour, title: "hours" },
    { type: DurationFormat.Minute, title: "minutes" },
  ];

  const minAdvanceFormats = [
    { type: MinAdvanceFormat.Hour, title: "hours" },
    { type: MinAdvanceFormat.Minute, title: "minutes" },
    { type: MinAdvanceFormat.Day, title: "days" },
  ];

  const maxAdvanceFormats = [
    { type: MaxAdvanceFormat.Hour, title: "hours" },
    { type: MaxAdvanceFormat.Day, title: "days" },
    { type: MaxAdvanceFormat.Week, title: "weeks" },
    { type: MaxAdvanceFormat.Month, title: "months" },
  ];

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="subtitle2">Duration</Typography>
        <Stack direction="row" spacing={1}>
          {formik.values.durationFormat === DurationFormat.Hour ? (
            <>
              <FormikTextField
                sx={{ width: 100 }}
                type="number"
                field="durationHours"
                numberOptions={{ integer: true }}
              />
              <FormikTextField select field="durationFormat">
                {durationFormats.map(({ type, title }) => (
                  <MenuItem key={type} value={type}>
                    {title}
                  </MenuItem>
                ))}
              </FormikTextField>
              <FormikTextField
                sx={{ width: 100 }}
                type="number"
                field="durationMinutes"
                numberOptions={{ integer: true, max: 59 }}
              />
              <Typography variant="body2" sx={{ alignSelf: "center" }}>
                minutes
              </Typography>
            </>
          ) : (
            <>
              <FormikTextField
                sx={{ width: 100 }}
                type="number"
                field="durationMinutes"
                numberOptions={{ integer: true }}
              />
              <FormikTextField
                select
                field="durationFormat"
                onChange={(event) => {
                  if (
                    event.target.value === DurationFormat.Hour &&
                    formik.values.durationMinutes > 59
                  )
                    formik.setFieldValue("durationMinutes", 0);
                  formik.handleChange(event);
                }}
              >
                {durationFormats.map(({ type, title }) => (
                  <MenuItem key={type} value={type}>
                    {title}
                  </MenuItem>
                ))}
              </FormikTextField>
            </>
          )}
        </Stack>
      </Box>

      <Box>
        <Typography variant="subtitle2">
          Customers must book at least
        </Typography>
        <Stack direction="row" spacing={1}>
          <FormikTextField
            sx={{ width: 100 }}
            type="number"
            field="minAdvance"
            numberOptions={{ integer: true }}
          />
          <FormikTextField select field="minAdvanceFormat">
            {minAdvanceFormats.map(({ type, title }) => (
              <MenuItem key={type} value={type}>
                {title}
              </MenuItem>
            ))}
          </FormikTextField>
          <Typography variant="body2" sx={{ alignSelf: "center" }}>
            in advance
          </Typography>
        </Stack>
      </Box>

      <Box>
        <Typography variant="subtitle2">
          Customers cannot book more than
        </Typography>

        <Stack direction="row" spacing={1}>
          <FormikTextField
            sx={{ width: 100 }}
            type="number"
            field="maxAdvance"
            numberOptions={{ integer: true }}
          />
          <FormikTextField select field="maxAdvanceFormat">
            {maxAdvanceFormats.map(({ type, title }) => (
              <MenuItem key={type} value={type}>
                {title}
              </MenuItem>
            ))}
          </FormikTextField>
          <Typography variant="body2" sx={{ alignSelf: "center" }}>
            in advance
          </Typography>
        </Stack>
      </Box>

      <Box>
        <Typography variant="subtitle2">Schedule</Typography>
        <ScheduleBuilder
          duration={
            formik.values.durationFormat === DurationFormat.Minute
              ? formik.values.durationMinutes
              : formik.values.durationHours * 60 + formik.values.durationMinutes
          }
          schedule={formik.values.schedule}
          setSchedule={(schedule) => formik.setFieldValue("schedule", schedule)}
        />
      </Box>
    </Stack>
  );
};

export default ScheduleForm;
