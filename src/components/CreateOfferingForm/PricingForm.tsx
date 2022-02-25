import { ChairOutlined, SellOutlined } from "@mui/icons-material";
import { Box, InputAdornment, Stack, Typography } from "@mui/material";
import React from "react";
import * as yup from "yup";
import { PricingType } from "../../generated/graphql";
import FormikTextField from "../common/FormikTextField/FormikTextField";
import CardSelect from "./CardSelect";

interface Props {
  formik: any;
}

export const validationSchema = yup.object({
  pricingType: yup.string(),
  pricePerPerson: yup
    .number()
    .nullable()
    .when("pricingType", {
      is: PricingType.PerPerson,
      then: (schema) => schema.required("Required"),
    }),
  priceTotalAmount: yup
    .number()
    .nullable()
    .when("pricingType", {
      is: PricingType.TotalAmount,
      then: (schema) => schema.required("Required"),
    }),
});

export const initialValues = {
  pricingType: PricingType.PerPerson,
  pricePerPerson: null,
  priceTotalAmount: null,
};

const PricingForm = ({ formik }: Props) => {
  const pricingOptions = [
    { Icon: ChairOutlined, value: PricingType.PerPerson, title: "Per person" },
    {
      Icon: SellOutlined,
      value: PricingType.TotalAmount,
      title: "Total amount",
    },
  ];

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Pricing Type
        </Typography>
        <CardSelect
          options={pricingOptions}
          onChange={(value) => formik.setFieldValue("pricingType", value)}
          value={formik.values.pricingType}
        />
      </Box>

      <Box>
        {formik.values.pricingType === PricingType.PerPerson && (
          <FormikTextField
            type="number"
            label="Price per person"
            field="pricePerPerson"
            formik={formik}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" disableTypography>
                  $
                </InputAdornment>
              ),
            }}
          />
        )}
        {formik.values.pricingType === PricingType.TotalAmount && (
          <FormikTextField
            type="number"
            label="Total price"
            field="priceTotalAmount"
            formik={formik}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" disableTypography>
                  $
                </InputAdornment>
              ),
            }}
          />
        )}
      </Box>
    </Stack>
  );
};

export default PricingForm;
