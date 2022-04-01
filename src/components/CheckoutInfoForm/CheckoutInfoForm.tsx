import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Formik, useFormikContext } from "formik";
import React, { useEffect } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";
import useDebounce from "../../hooks/useDebounce";
import FormikTextField from "../common/FormikTextField/FormikTextField";
import TextField from "../common/TextField/TextField";

interface Props {
  onSubmit: () => void;
  onEmailChange: (email: string) => void;
  email?: string;
}

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  // phoneNumber: "",
};

const PhoneCountrySelect = ({ options, onChange, iconComponent, ...props }) => {
  return (
    <TextField
      onChange={(event) => onChange(event.target.value)}
      select
      sx={{ "& .MuiInputBase-input.MuiSelect-select": { pr: 0 }, width: 70 }}
      SelectProps={{
        renderValue: (value) => (
          <>
            <Box
              component="img"
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${value.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${value.toLowerCase()}.png 2x`}
              alt={`Flag of ${value}`}
            />
          </>
        ),
      }}
      {...props}
    >
      {/* Remove international option */}
      {options.slice(1).map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <Box
            component="img"
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.value.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.value.toLowerCase()}.png 2x`}
            alt={`Flag of ${option.label}`}
            sx={{ mr: 1 }}
          />
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

const PhoneTextField = React.forwardRef((props, ref) => {
  return <FormikTextField {...props} inputRef={ref} />;
});

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
  phoneNumber: Yup.string()
    .test(
      "valid-phone-number",
      "Invalid phone number",
      (value) => Boolean(value) && isValidPhoneNumber(value)
    )
    .required("Required"),
});

const Autosave = ({ onEmailChange }) => {
  const { values } = useFormikContext<typeof initialValues>();
  const debouncedEmail = useDebounce(values.email, 1000);

  useEffect(() => {
    try {
      validationSchema.validateSyncAt("email", { email: debouncedEmail });
      onEmailChange(debouncedEmail);
    } catch (error) {}
  }, [debouncedEmail]);

  return null;
};

const CheckoutInfoForm = ({ onSubmit, onEmailChange, email }: Props) => {
  return (
    <Formik
      initialValues={{ ...initialValues, email }}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
      validateOnChange={false}
    >
      {(formik) => (
        <Stack spacing={2} component="form" onSubmit={formik.handleSubmit}>
          <Autosave onEmailChange={onEmailChange} email={email} />
          <FormikTextField label="Email" field="email" />
          <FormikTextField label="First name" field="firstName" />
          <FormikTextField label="Last name" field="lastName" />
          <Box>
            <Typography variant="subtitle2">Phone number</Typography>
            <PhoneInput
              inputComponent={PhoneTextField}
              countrySelectComponent={PhoneCountrySelect}
              style={{ display: "flex" }}
              defaultCountry="CA"
              onChange={(value) => formik.setFieldValue("phoneNumber", value)}
              field="phoneNumber"
              fullWidth
            />
          </Box>

          <Button size="large" variant="contained" type="submit">
            Continue
          </Button>
        </Stack>
      )}
    </Formik>
  );
};

export default CheckoutInfoForm;
