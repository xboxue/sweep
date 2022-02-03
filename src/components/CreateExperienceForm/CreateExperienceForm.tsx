import {
  AssignmentOutlined,
  CalendarTodayOutlined,
  CreditCardOutlined,
  ImageOutlined,
  LocalOfferOutlined,
  PeopleOutline,
} from "@mui/icons-material";
import { AppBar, Box, Button, Divider, Stack, Toolbar } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
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
      title: "Payment and Deposit",
      description: "Manage payments and deposits for your activity.",
      Icon: CreditCardOutlined,
      Component: PaymentForm,
    },

    {
      title: "Schedule",
      description: "Manage your activity schedule.",
      Icon: CalendarTodayOutlined,
      Component: ScheduleForm,
    },
  ];

  return (
    <>
      <Stack spacing={4}>
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
