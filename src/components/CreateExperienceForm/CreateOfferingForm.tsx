import {
  AssignmentOutlined,
  CalendarTodayOutlined,
  CreditCardOutlined,
  ImageOutlined,
  LocalOfferOutlined,
  PeopleOutline,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Divider,
  Stack,
  Toolbar,
} from "@mui/material";
import { useFormik } from "formik";
import {
  DurationFormat,
  useCreateOfferingMutation,
} from "../../generated/graphql";
import Dropzone from "../common/Dropzone/Dropzone";
import CapacityForm, {
  initialValues as capacityInitialValues,
  validationSchema as capacityValidationSchema,
} from "./CapacityForm";
import GeneralForm, {
  initialValues as generalInitialValues,
  validationSchema as generalValidationSchema,
} from "./GeneralForm";
import PaymentForm, {
  initialValues as paymentInitialValues,
  validationSchema as paymentValidationSchema,
} from "./PaymentForm";
import PricingForm, {
  initialValues as pricingInitialValues,
  validationSchema as pricingValidationSchema,
} from "./PricingForm";
import ScheduleForm, {
  initialValues as scheduleInitialValues,
  validationSchema as scheduleValidationSchema,
} from "./ScheduleForm";
import SettingsSection from "./SettingsSection";

const CreateOfferingForm = () => {
  const [createOffering, { loading, error }] = useCreateOfferingMutation();

  const formik = useFormik({
    initialValues: {
      ...capacityInitialValues,
      ...generalInitialValues,
      ...paymentInitialValues,
      ...pricingInitialValues,
      ...scheduleInitialValues,
    },
    validationSchema: capacityValidationSchema
      .concat(generalValidationSchema)
      .concat(paymentValidationSchema)
      .concat(pricingValidationSchema)
      .concat(scheduleValidationSchema),
    validateOnChange: false,
    onSubmit: async ({
      durationMinutes,
      durationHours,
      durationFormat,
      pricePerPerson,
      priceTotalAmount,
      depositFixedAmount,
      depositPerPerson,
      ...rest
    }) => {
      try {
        await createOffering({
          variables: {
            input: {
              duration:
                durationFormat === DurationFormat.Minute
                  ? durationMinutes
                  : durationHours * 60 + durationMinutes,
              pricePerPerson: pricePerPerson && pricePerPerson * 100,
              priceTotalAmount: priceTotalAmount && priceTotalAmount * 100,
              depositFixedAmount:
                depositFixedAmount && depositFixedAmount * 100,
              depositPerPerson: depositPerPerson && depositPerPerson * 100,
              ...rest,
            } as any,
          },
        });
      } catch (error) {}
    },
  });

  const sections = [
    {
      title: "General",
      description: "Basic information about your activity.",
      Icon: AssignmentOutlined,
      Component: GeneralForm,
    },

    {
      title: "Capacity",
      description: "Manage how people can participate in your activity.",
      Icon: PeopleOutline,
      Component: CapacityForm,
    },
    {
      title: "Media",
      description: "Upload images to show off your activity.",
      Icon: ImageOutlined,
      Component: Dropzone,
    },

    {
      title: "Pricing",
      description: "Manage pricing of your activity.",
      Icon: LocalOfferOutlined,
      Component: PricingForm,
    },

    {
      title: "Schedule",
      description: "Manage your activity schedule.",
      Icon: CalendarTodayOutlined,
      Component: ScheduleForm,
    },

    {
      title: "Payment and Deposit",
      description: "Manage payments and deposits for your activity.",
      Icon: CreditCardOutlined,
      Component: PaymentForm,
    },
  ];

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Oops, something went wrong. Please try again.
        </Alert>
      )}
      <Stack spacing={4} sx={{ pb: 5 }}>
        {sections.map(({ title, Icon, Component, description }, index) => (
          <Box key={title}>
            {index > 0 && <Divider sx={{ mb: 4 }} />}
            <SettingsSection
              title={title}
              Icon={Icon}
              description={description}
            >
              <Component formik={formik} />
            </SettingsSection>
          </Box>
        ))}
      </Stack>

      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          bgcolor: (theme) => theme.palette.background.paper,
        }}
      >
        <Toolbar>
          <Button sx={{ ml: "auto" }}>Discard</Button>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            variant="contained"
            onClick={() => formik.handleSubmit()}
          >
            Save
          </LoadingButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default CreateOfferingForm;
