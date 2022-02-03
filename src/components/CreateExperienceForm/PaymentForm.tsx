import {
  ChairOutlined,
  Percent,
  CreditCardOffOutlined,
  SellOutlined,
} from "@mui/icons-material";
import { Box, MenuItem, Stack, Typography } from "@mui/material";
import React from "react";
import * as yup from "yup";
import TextField from "../common/TextField/TextField";
import CardSelect from "./CardSelect";

interface Props {
  formik: any;
}

export const validationSchema = yup.object({
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

export const initialValues = {
  paymentType: "none",
  depositType: "fixedAmount",
  depositPerPerson: undefined,
  depositFixedAmount: undefined,
  depositPercent: undefined,
};
const PaymentForm = ({ formik }: Props) => {
  const paymentOptions = [
    { Icon: CreditCardOffOutlined, value: "none", title: "No payment" },
    { Icon: SellOutlined, value: "fullAmount", title: "Pay full amount" },
    {
      Icon: ChairOutlined,
      value: "deposit",
      title: "Pay deposit",
    },
  ];

  const depositOptions = [
    { Icon: ChairOutlined, value: "perPerson", title: "Per person" },
    { Icon: SellOutlined, value: "fixedAmount", title: "Fixed amount" },
    { Icon: Percent, value: "percent", title: "Percentage" },
  ];

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Payment Type
        </Typography>
        <CardSelect
          options={paymentOptions}
          onChange={(value) => formik.setFieldValue("paymentType", value)}
          value={formik.values.paymentType}
        />
      </Box>

      {formik.values.paymentType === "deposit" && (
        <>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Deposit Type
            </Typography>
            <CardSelect
              options={depositOptions}
              onChange={(value) => formik.setFieldValue("depositType", value)}
              value={formik.values.depositType}
            />
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
