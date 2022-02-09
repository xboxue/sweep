import {
  ArrowBack,
  AssignmentOutlined,
  CalendarTodayOutlined,
  CreditCardOutlined,
  ImageOutlined,
  LocalOfferOutlined,
  PeopleOutline,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OfferingStatus } from "../../generated/graphql";
import { usePrompt } from "../../hooks/usePrompt";
import Dropzone from "../common/Dropzone/Dropzone";
import FormikTextField from "../common/FormikTextField/FormikTextField";
import CapacityForm from "./CapacityForm";
import GeneralForm from "./GeneralForm";
import PaymentForm from "./PaymentForm";
import PricingForm from "./PricingForm";
import ScheduleForm from "./ScheduleForm";
import SettingsSection from "./SettingsSection";

interface Props {
  title: string;
  formik: any;
  error: React.ReactNode;
}

const OfferingForm = ({ title, formik, error }: Props) => {
  const navigate = useNavigate();
  usePrompt(
    "If you leave this page, any unsaved changes will be lost.",
    formik.dirty
  );

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

  const statusOptions = [
    { value: OfferingStatus.Draft, title: "Draft" },
    { value: OfferingStatus.Active, title: "Active" },
    { value: OfferingStatus.Archived, title: "Archived" },
  ];

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <IconButton onClick={() => navigate("/experiences")}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 3 }}>
          {title}
        </Typography>
        <FormikTextField
          select
          field="status"
          formik={formik}
          sx={{ ml: "auto" }}
        >
          {statusOptions.map(({ value, title }) => (
            <MenuItem key={value} value={value}>
              {title}
            </MenuItem>
          ))}
        </FormikTextField>
      </Box>
      <Divider sx={{ mb: 3 }} />
      {error}
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
    </>
  );
};

export default OfferingForm;
