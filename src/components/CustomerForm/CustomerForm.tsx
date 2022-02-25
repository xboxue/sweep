import { Stack } from "@mui/material";
import { useFormikContext } from "formik";
import FormikTextField from "../common/FormikTextField/FormikTextField";

export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  //   taxExempt: false,
};

const CustomerForm = () => {
  const formik = useFormikContext();

  return (
    <Stack spacing={2}>
      <FormikTextField label="First name" field="firstName" formik={formik} />
      <FormikTextField label="Last name" field="lastName" formik={formik} />
      <FormikTextField label="Email" field="email" formik={formik} />
      <FormikTextField
        label="Phone number"
        field="phoneNumber"
        formik={formik}
      />
    </Stack>
  );
};

export default CustomerForm;
