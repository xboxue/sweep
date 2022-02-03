import { Box, Stack } from "@mui/material";
import React from "react";
import * as yup from "yup";
import TextField from "../common/TextField/TextField";

interface Props {
  formik: any;
}

export const validationSchema = yup.object({
  minGuests: yup.number().required("Required"),
  maxGuests: yup.number().required("Required"),
});

export const initialValues = {
  minGuests: undefined,
  maxGuests: undefined,
};

const CapacityForm = ({ formik }: Props) => {
  return (
    <Stack spacing={2}>
      <Box>
        <TextField
          type="number"
          label="Max guests"
          id="maxGuests"
          value={formik.values.maxGuests}
          onChange={formik.handleChange}
          error={formik.touched.maxGuests && Boolean(formik.errors.maxGuests)}
          helperText={formik.touched.maxGuests && formik.errors.maxGuests}
        />
      </Box>
      <Box>
        <TextField
          type="number"
          label="Min guests"
          id="minGuests"
          value={formik.values.minGuests}
          onChange={formik.handleChange}
          error={formik.touched.minGuests && Boolean(formik.errors.minGuests)}
          helperText={formik.touched.minGuests && formik.errors.minGuests}
        />
      </Box>
    </Stack>
  );
};

export default CapacityForm;
