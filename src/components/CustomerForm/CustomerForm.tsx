import { Stack } from "@mui/material";
import FormikTextField from "../common/FormikTextField/FormikTextField";

export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  //   taxExempt: false,
};

const CustomerForm = () => {
  return (
    <Stack spacing={2}>
      <FormikTextField label="First name" field="firstName" />
      <FormikTextField label="Last name" field="lastName" />
      <FormikTextField label="Email" field="email" />
      <FormikTextField label="Phone number" field="phoneNumber" />
    </Stack>
  );
};

export default CustomerForm;
