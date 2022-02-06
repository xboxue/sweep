import { Box, Stack } from "@mui/material";
import * as yup from "yup";
import FormikTextField from "../common/FormikTextField/FormikTextField";

interface Props {
  formik: any;
}

export const validationSchema = yup.object({
  minGuests: yup.number().required("Required").positive("Required").integer(),
  maxGuests: yup
    .number()
    .required("Required")
    .positive("Required")
    .integer()
    .min(yup.ref("minGuests"), "Cannot be less than minimum capacity"),
});

export const initialValues = {
  minGuests: undefined,
  maxGuests: undefined,
};

const CapacityForm = ({ formik }: Props) => {
  return (
    <Stack spacing={2}>
      <Box>
        <FormikTextField
          type="number"
          label="Max guests"
          field="maxGuests"
          formik={formik}
          numberOptions={{ integer: true }}
        />
      </Box>
      <Box>
        <FormikTextField
          type="number"
          label="Min guests"
          field="minGuests"
          formik={formik}
          numberOptions={{ integer: true }}
        />
      </Box>
    </Stack>
  );
};

export default CapacityForm;
