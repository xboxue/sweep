import {
  AssignmentOutlined,
  CalendarTodayOutlined,
  CreditCardOutlined,
  ImageOutlined,
  LocalOfferOutlined,
  PeopleOutline,
} from "@mui/icons-material";
import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import { useFormik } from "formik";
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
import SettingsCard from "./SettingsCard";

const CreateExperienceForm = () => {
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
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const sections = [
    {
      title: "General",
      Icon: AssignmentOutlined,
      Component: GeneralForm,
    },

    {
      title: "Capacity",
      Icon: PeopleOutline,
      Component: CapacityForm,
    },
    {
      title: "Media",
      Icon: ImageOutlined,
      Component: Dropzone,
    },

    {
      title: "Pricing",
      Icon: LocalOfferOutlined,
      Component: PricingForm,
    },

    {
      title: "Payment and Deposit",
      Icon: CreditCardOutlined,
      Component: PaymentForm,
    },

    {
      title: "Schedule",
      Icon: CalendarTodayOutlined,
      Component: ScheduleForm,
    },
  ];

  return (
    <>
      <Stack spacing={2}>
        {sections.map(({ title, Icon, Component }) => (
          <SettingsCard key={title} title={title} Icon={Icon}>
            <Component formik={formik} />
          </SettingsCard>
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
          <Button sx={{ ml: "auto" }}>Cancel</Button>
          <Button variant="contained" onClick={() => formik.handleSubmit()}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default CreateExperienceForm;
