import { LoadingButton } from "@mui/lab";
import { Button, MenuItem, Stack, Typography } from "@mui/material";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Formik, useFormik, useFormikContext } from "formik";
import { useEffect, useCallback } from "react";
// import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";
import useDebounce from "../../hooks/useDebounce";
import FormikTextField from "../common/FormikTextField/FormikTextField";

interface Props {
  onSubmit: () => void;
}

// const PhoneTextField = React.forwardRef((props, ref) => {
//   return <TextField {...props} inputRef={ref} />;
// });
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  // phoneNumber: "",
};

const CountrySelect = ({ options, onChange, onBlur, ...rest }) => {
  const handleChange = useCallback(
    (event) => onChange(event.target.value),
    [onChange]
  );

  return (
    <TextField
      {...rest}
      fullWidth
      label="Country"
      onChange={handleChange}
      select
    >
      {options.map((option) => (
        <MenuItem value={option.value}>{option.label}</MenuItem>
      ))}
    </TextField>
  );
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  // phoneNumber: Yup.string()
  // .test(
  //   "valid-phone-number",
  //   "Invalid phone number",
  //   (value) => Boolean(value) && isValidPhoneNumber(value)
  // )
  // .required("Required"),
});

const Autosave = ({ onEmailChange }) => {
  const { values } = useFormikContext<typeof initialValues>();
  const debouncedEmail = useDebounce(values.email, 1000);

  useEffect(() => {
    try {
      validationSchema.validateSyncAt("email", { email: debouncedEmail });
      onEmailChange(debouncedEmail);
    } catch (error) {}
  }, [debouncedEmail, onEmailChange]);

  return null;
};

const BookingForm = ({ onSubmit, onEmailChange, email }: Props) => {
  return (
    <Formik
      initialValues={{ ...initialValues, email: email || initialValues.email }}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values) => {
        console.log(values);

        onSubmit(values);
      }}
      validateOnChange={false}
    >
      {(formik) => (
        <Stack spacing={2} component="form" onSubmit={formik.handleSubmit}>
          <Autosave onEmailChange={onEmailChange} />
          <FormikTextField label="Email" field="email" />
          <FormikTextField label="First name" field="firstName" />
          <FormikTextField label="Last name" field="lastName" />
          {/* <PhoneInput
          inputComponent={PhoneTextField}
          countrySelectComponent={CountrySelect}
          style={{ display: "flex" }}
          defaultCountry="CA"
          fullWidth
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          value={formik.values.phoneNumber}
          onChange={(value) => formik.setFieldValue("phoneNumber", value)}
          onBlur={formik.handleBlur}
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        /> 
           <Typography variant="subtitle1" mt={4}>
        Payment method
      </Typography>
      <PaymentElement />
      <Typography variant="subtitle1" mt={4}>
        Cancellation policy
      </Typography>
      <Typography>
        All sales are final and nonrefundable. Contact us at least 72 hours
        prior to your reservation if you wish to reschedule. All reschedules are
        subject to availability
      </Typography> */}

          <Button size="large" variant="contained" type="submit">
            Continue
          </Button>
        </Stack>
      )}
    </Formik>
  );
};

export default BookingForm;
