import { Box, Button, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "../common/Dropzone/Dropzone";
import Editor from "../common/Editor/Editor";
import TextField from "../common/TextField/TextField";

const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Paper sx={{ p: 2 }} variant="outlined">
    <Typography variant="subtitle1">{title}</Typography>
    {children}
  </Paper>
);

const CreateExperienceForm = () => {
  const validationSchema = yup.object({
    minGuests: yup.number().required("Required"),
    maxGuests: yup.number().required("Required"),
    name: yup.string().required("Required"),
    pricingType: yup.string(),
    pricePerPerson: yup.number().when("pricingType", {
      is: "perPerson",
      then: yup.number().required("Required"),
    }),
    priceTotalAmount: yup.number().when("pricingType", {
      is: "totalAmount",
      then: yup.number().required("Required"),
    }),
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
      minGuests: undefined,
      maxGuests: undefined,
      name: "",
      description: "",
      pricingType: "perPerson",
      pricePerPerson: undefined,
      priceTotalAmount: undefined,
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

  const pricingTypes = [
    { type: "perPerson", title: "Per person" },
    { type: "totalAmount", title: "Total amount" },
  ];

  return (
    <Stack spacing={4} component="form" onSubmit={formik.handleSubmit}>
      <Card title="General">
        <Stack spacing={2}>
          <Box>
            <TextField
              label="Name"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2">Description</Typography>
            <Editor />
          </Box>
        </Stack>
      </Card>
      <Card title="Capacity">
        <Stack spacing={2}>
          <Box>
            <TextField
              type="number"
              label="Max guests"
              id="maxGuests"
              value={formik.values.maxGuests}
              onChange={formik.handleChange}
              error={
                formik.touched.maxGuests && Boolean(formik.errors.maxGuests)
              }
              helperText={formik.touched.maxGuests && formik.errors.maxGuests}
            />
          </Box>
          <Box>
            <TextField
              type="number"
              label="Min guests"
              id="minGuests"
              value={formik.values.minGuests}
              onChange={formik.handleChange}
              error={
                formik.touched.minGuests && Boolean(formik.errors.minGuests)
              }
              helperText={formik.touched.minGuests && formik.errors.minGuests}
            />
          </Box>
        </Stack>
      </Card>
      <Card title="Media">
        <Dropzone />
      </Card>
      <Card title="Pricing">
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
                  formik.touched.priceTotalAmount &&
                  formik.errors.priceTotalAmount
                }
              />
            )}
          </Box>
        </Stack>
      </Card>
      <Card title="Payment and Deposit">
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
                      formik.touched.depositPercent &&
                      formik.errors.depositPercent
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
      </Card>
      <Button type="submit" variant="contained">
        Save
      </Button>
    </Stack>
  );
};

export default CreateExperienceForm;
