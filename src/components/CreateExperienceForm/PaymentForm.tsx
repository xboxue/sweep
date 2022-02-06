import {
  ChairOutlined,
  CreditCardOffOutlined,
  Percent,
  SellOutlined,
} from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import * as yup from "yup";
import { DepositType, PaymentType } from "../../generated/graphql";
import FormikTextField from "../common/FormikTextField/FormikTextField";
import CardSelect from "./CardSelect";

interface Props {
  formik: any;
}

export const validationSchema = yup.object({
  paymentType: yup.string(),
  depositType: yup.string(),
  depositPerPerson: yup.number().when(["paymentType", "depositType"], {
    is: (paymentType: PaymentType, depositType: DepositType) =>
      paymentType === PaymentType.Deposit &&
      depositType === DepositType.PerPerson,
    then: (schema) => schema.required("Required").positive("Required"),
  }),
  depositFixedAmount: yup.number().when(["paymentType", "depositType"], {
    is: (paymentType: PaymentType, depositType: DepositType) =>
      paymentType === PaymentType.Deposit &&
      depositType === DepositType.FixedAmount,
    then: (schema) => schema.required("Required").positive("Required"),
  }),
  depositPercent: yup.number().when(["paymentType", "depositType"], {
    is: (paymentType: PaymentType, depositType: DepositType) =>
      paymentType === PaymentType.Deposit &&
      depositType === DepositType.Percent,
    then: (schema) =>
      schema.required("Required").positive("Required").integer(),
  }),
});

export const initialValues = {
  paymentType: PaymentType.None,
  depositType: DepositType.FixedAmount,
  depositPerPerson: undefined,
  depositFixedAmount: undefined,
  depositPercent: undefined,
};
const PaymentForm = ({ formik }: Props) => {
  const paymentOptions = [
    {
      Icon: CreditCardOffOutlined,
      value: PaymentType.None,
      title: "No payment",
    },
    {
      Icon: SellOutlined,
      value: PaymentType.FullAmount,
      title: "Pay full amount",
    },
    {
      Icon: ChairOutlined,
      value: PaymentType.Deposit,
      title: "Pay deposit",
    },
  ];

  const depositOptions = [
    { Icon: ChairOutlined, value: DepositType.PerPerson, title: "Per person" },
    {
      Icon: SellOutlined,
      value: DepositType.FixedAmount,
      title: "Fixed amount",
    },
    { Icon: Percent, value: DepositType.Percent, title: "Percentage" },
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

      {formik.values.paymentType === PaymentType.Deposit && (
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
            {formik.values.depositType === DepositType.Percent && (
              <FormikTextField
                type="number"
                label="Deposit percentage"
                field="depositPercent"
                formik={formik}
                numberOptions={{ integer: true }}
              />
            )}
            {formik.values.depositType === DepositType.FixedAmount && (
              <FormikTextField
                type="number"
                label="Deposit amount"
                field="depositFixedAmount"
                formik={formik}
              />
            )}
            {formik.values.depositType === DepositType.PerPerson && (
              <FormikTextField
                type="number"
                label="Deposit per person"
                field="depositPerPerson"
                formik={formik}
              />
            )}
          </Box>
        </>
      )}
    </Stack>
  );
};

export default PaymentForm;
