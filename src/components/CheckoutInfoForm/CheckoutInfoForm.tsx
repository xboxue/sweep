import { ArrowBackIosNew } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { Formik, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";
import {
  Cart,
  useUpdateCartContactInfoMutation,
} from "../../generated/public/graphql";
import useDebounce from "../../hooks/useDebounce";
import FormikTextField from "../common/FormikTextField/FormikTextField";
import FormikPhoneInput from "../common/FormikPhoneInput/FormikPhoneInput";

interface Props {
  onSubmit: () => void;
  onEmailChange: (email: string) => void;
  cart: Cart;
  onClose: () => void;
}

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
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

const CheckoutInfoForm = ({
  onSubmit,
  onEmailChange,
  cart,
  onClose,
}: Props) => {
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
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <Autosave onEmailChange={onEmailChange} />
            <FormikTextField label="Email" field="email" />
            <FormikTextField label="First name" field="firstName" />
            <FormikTextField label="Last name" field="lastName" />
            <FormikPhoneInput
              style={{ display: "flex" }}
              defaultCountry="CA"
              international={false}
              onChange={(value) => formik.setFieldValue("phoneNumber", value)}
              value={formik.values.phoneNumber || ""}
              field="phoneNumber"
              label="Phone number"
            />
          </Stack>
          <Button
            size="large"
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 3 }}
          >
            Continue
          </Button>
          <Button
            size="small"
            onClick={onClose}
            startIcon={<ArrowBackIosNew sx={{ width: 12, height: 12 }} />}
            sx={{ mt: 1, "& .MuiButton-startIcon": { mr: 0.5 } }}
            fullWidth
          >
            Exit checkout
          </Button>
        </Box>
      )}
    </Formik>
  );
};

export default CheckoutInfoForm;
