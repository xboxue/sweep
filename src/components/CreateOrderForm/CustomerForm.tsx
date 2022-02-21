import { Box, Stack } from "@mui/material";
import { useFormikContext } from "formik";
import FormikTextField from "../common/FormikTextField/FormikTextField";

export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  //   taxExempt: false,
};

const CustomerForm = () => {
  const formik = useFormikContext();

  return (
    <Stack spacing={2}>
      <Box>
        <FormikTextField label="First name" field="firstName" formik={formik} />
      </Box>
      <Box>
        <FormikTextField label="Last name" field="lastName" formik={formik} />
      </Box>
      <Box>
        <FormikTextField label="Email" field="email" formik={formik} />
      </Box>
    </Stack>
  );
};

export default CustomerForm;
