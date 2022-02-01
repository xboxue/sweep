import { Box, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "../common/TextField/TextField";

const PricingForm = () => {
  const validationSchema = yup.object({
    pricingType: yup.string(),
    pricePerPerson: yup.number().when("pricingType", {
      is: "perPerson",
      then: yup.number().required("Required"),
    }),
    priceTotalAmount: yup.number().when("pricingType", {
      is: "totalAmount",
      then: yup.number().required("Required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      pricingType: "perPerson",
      pricePerPerson: undefined,
      priceTotalAmount: undefined,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const pricingTypes = [
    { type: "perPerson", title: "Per person" },
    { type: "totalAmount", title: "Total amount" },
  ];

  return (
    <Stack spacing={2}>
      <Box>
        <TextField
          select
          label="Pricing type"
          id="pricingType"
          name="pricingType"
          value={formik.values.pricingType}
          onChange={formik.handleChange}
        >
          {pricingTypes.map(({ type, title }) => (
            <MenuItem key={type} value={type}>
              {title}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box>
        {formik.values.pricingType === "perPerson" ? (
          <TextField
            type="number"
            label="Price per person"
            id="pricePerPerson"
            value={formik.values.pricePerPerson}
            onChange={formik.handleChange}
            error={
              formik.touched.pricePerPerson &&
              Boolean(formik.errors.pricePerPerson)
            }
            helperText={
              formik.touched.pricePerPerson && formik.errors.pricePerPerson
            }
          />
        ) : (
          <TextField
            type="number"
            label="Total price"
            id="priceTotalAmount"
            value={formik.values.priceTotalAmount}
            onChange={formik.handleChange}
            error={
              formik.touched.priceTotalAmount &&
              Boolean(formik.errors.priceTotalAmount)
            }
            helperText={
              formik.touched.priceTotalAmount && formik.errors.priceTotalAmount
            }
          />
        )}
      </Box>
    </Stack>
  );
};

export default PricingForm;
