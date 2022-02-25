import { Box, Stack } from "@mui/material";
import * as yup from "yup";
import FormikTextField from "../common/FormikTextField/FormikTextField";

export const validationSchema = yup.object({
  minGuests: yup
    .number()
    .nullable()
    .required("Required")
    .positive("Required")
    .integer(),
  maxGuests: yup
    .number()
    .nullable()
    .required("Required")
    .positive("Required")
    .integer()
    .min(yup.ref("minGuests"), "Cannot be less than minimum capacity"),
});

export const initialValues = {
  minGuests: null,
  maxGuests: null,
};

const CapacityForm = () => {
  return (
    <Stack spacing={2}>
      <Box>
        <FormikTextField
          type="number"
          label="Max guests"
          field="maxGuests"
          numberOptions={{ integer: true }}
        />
      </Box>
      <Box>
        <FormikTextField
          type="number"
          label="Min guests"
          field="minGuests"
          numberOptions={{ integer: true }}
        />
      </Box>
    </Stack>
  );
};

export default CapacityForm;
