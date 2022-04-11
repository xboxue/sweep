import {
  Box,
  Button,
  InputAdornment,
  ListItemIcon,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Formik, useFormikContext } from "formik";
import React, { useEffect } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";
import {
  Cart,
  useUpdateCartContactInfoMutation,
} from "../../generated/public/graphql";
import useDebounce from "../../hooks/useDebounce";
import FormikTextField from "../common/FormikTextField/FormikTextField";
import TextField from "../common/TextField/TextField";

interface Props {
  onSubmit: () => void;
  onEmailChange: (email: string) => void;
  cart: Cart;
}

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const CountryFlag = ({ country }: { country: string }) => (
  <Box
    component="img"
    loading="lazy"
    width="20"
    src={`https://flagcdn.com/w20/${country.toLowerCase()}.png`}
    srcSet={`https://flagcdn.com/w40/${country.toLowerCase()}.png 2x`}
    alt={country}
  />
);

const PhoneCountrySelect = ({
  options,
  onChange,
  iconComponent: _,
  ...props
}) => {
  return (
    <TextField
      onChange={(event) => onChange(event.target.value)}
      select
      InputProps={{
        sx: { border: 0, px: 0, "&.Mui-focused": { boxShadow: "none" } },
      }}
      size="small"
      SelectProps={{
        renderValue: (value) => <CountryFlag country={value} />,
      }}
      {...props}
    >
      {/* Remove international option */}
      {options.slice(1).map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <Box sx={{ mr: 1 }}>
            <CountryFlag country={option.value} />
          </Box>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

const PhoneTextField = React.forwardRef((props, ref) => {
  return <FormikTextField {...props} inputRef={ref} />;
});

const PhoneInputContainer = ({ children }) => {
  return React.cloneElement(React.Children.toArray(children)[1], {
    InputProps: {
      startAdornment: (
        <InputAdornment position="start" sx={{ mr: 0 }}>
          {React.Children.toArray(children)[0]}
        </InputAdornment>
      ),
    },
  });
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
  }, [debouncedEmail, onEmailChange]);

  return null;
};

const CheckoutInfoForm = ({ onSubmit, onEmailChange, cart }: Props) => {
  const [updateCartContactInfo] = useUpdateCartContactInfoMutation();

  return (
    <Formik
      initialValues={{
        email: cart.email || "",
        firstName: cart.firstName || "",
        lastName: cart.lastName || "",
        phoneNumber: cart.phoneNumber || "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          await updateCartContactInfo({ variables: { input: values } });
          onSubmit(values);
        } catch (error) {}
      }}
      validateOnChange={false}
    >
      {(formik) => (
        <Stack spacing={2} component="form" onSubmit={formik.handleSubmit}>
          <Autosave onEmailChange={onEmailChange} />
          <FormikTextField label="Email" field="email" />
          <FormikTextField label="First name" field="firstName" />
          <FormikTextField label="Last name" field="lastName" />
          <PhoneInput
            inputComponent={PhoneTextField}
            countrySelectComponent={PhoneCountrySelect}
            containerComponent={PhoneInputContainer}
            style={{ display: "flex" }}
            defaultCountry="CA"
            international={false}
            onChange={(value) => formik.setFieldValue("phoneNumber", value)}
            value={formik.values.phoneNumber || ""}
            field="phoneNumber"
            label="Phone number"
          />

          <Button size="large" variant="contained" type="submit">
            Continue
          </Button>
        </Stack>
      )}
    </Formik>
  );
};

export default CheckoutInfoForm;
