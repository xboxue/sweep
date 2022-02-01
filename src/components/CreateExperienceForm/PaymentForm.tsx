import { Box, Button, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "../common/Dropzone/Dropzone";
import Editor from "../common/Editor/Editor";
import ScheduleBuilder from "../common/ScheduleBuilder/ScheduleBuilder";
import TextField from "../common/TextField/TextField";
import CapacityForm from "./CapacityForm";
import GeneralForm from "./GeneralForm";
import PricingForm from "./PricingForm";

const PaymentForm = () => {
  const validationSchema = yup.object({
    paymentType: yup.string(),
    depositType: yup.string(),
    depositPerPerson: yup.number().when(["paymentType", "depositType"], {
      is: (paymentType: string, depositType: string) =>
        paymentType === "deposit" && depositType === "perPerson",
      then: yup.number().required("Required"),
    }),
    depositFixedAmount: yup.number().when(["paymentType", "depositType"], {
      is: (paymentType: string, depositType: string) =>
        paymentType === "deposit" && depositType === "fixedAmount",
      then: yup.number().required("Required"),
    }),
    depositPercent: yup.number().when(["paymentType", "depositType"], {
      is: (paymentType: string, depositType: string) =>
        paymentType === "deposit" && depositType === "percent",
      then: yup.number().required("Required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      paymentType: "none",
      depositType: "fixedAmount",
      depositPerPerson: undefined,
      depositFixedAmount: undefined,
      depositPercent: undefined,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const paymentTypes = [
    { type: "none", title: "No payment" },
    { type: "fullAmount", title: "Pay full amount" },
    { type: "deposit", title: "Pay deposit" },
  ];

  const depositTypes = [
    { type: "perPerson", title: "Per person" },
    { type: "fixedAmount", title: "Fixed amount" },
    { type: "percent", title: "Percentage" },
  ];

  return (
    <Stack spacing={2}>
      <Box>
        <TextField
          select
          label="Payment Type"
          id="paymentType"
          name="paymentType"
          value={formik.values.paymentType}
          onChange={formik.handleChange}
        >
          {paymentTypes.map(({ type, title }) => (
            <MenuItem key={type} value={type}>
              {title}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {formik.values.paymentType === "deposit" && (
        <>
          <Box>
            <TextField
              select
              label="Deposit Type"
              id="depositType"
              name="depositType"
              value={formik.values.depositType}
              onChange={formik.handleChange}
            >
              {depositTypes.map(({ type, title }) => (
                <MenuItem key={type} value={type}>
                  {title}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box>
            {formik.values.depositType === "percent" && (
              <TextField
                type="number"
                label="Deposit percentage"
                id="depositPercent"
                value={formik.values.depositPercent}
                onChange={formik.handleChange}
                error={
                  formik.touched.depositPercent &&
                  Boolean(formik.errors.depositPercent)
                }
                helperText={
                  formik.touched.depositPercent && formik.errors.depositPercent
                }
              />
            )}
            {formik.values.depositType === "fixedAmount" && (
              <TextField
                type="number"
                label="Deposit amount"
                id="depositFixedAmount"
                value={formik.values.depositFixedAmount}
                onChange={formik.handleChange}
                error={
                  formik.touched.depositFixedAmount &&
                  Boolean(formik.errors.depositFixedAmount)
                }
                helperText={
                  formik.touched.depositFixedAmount &&
                  formik.errors.depositFixedAmount
                }
              />
            )}
            {formik.values.depositType === "perPerson" && (
              <TextField
                type="number"
                label="Deposit per person"
                id="depositPerPerson"
                value={formik.values.depositPerPerson}
                onChange={formik.handleChange}
                error={
                  formik.touched.depositPerPerson &&
                  Boolean(formik.errors.depositPerPerson)
                }
                helperText={
                  formik.touched.depositPerPerson &&
                  formik.errors.depositPerPerson
                }
              />
            )}
          </Box>
        </>
      )}
    </Stack>
  );
};

export default PaymentForm;
