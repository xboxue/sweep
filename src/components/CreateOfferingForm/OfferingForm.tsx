import {
  AssignmentOutlined,
  CalendarTodayOutlined,
  CreditCardOutlined,
  ImageOutlined,
  LocalOfferOutlined,
  PeopleOutline,
} from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { OfferingStatus } from "../../generated/graphql";
import { usePrompt } from "../../hooks/usePrompt";
import FormLayout from "../../layouts/FormLayout/FormLayout";
import Dropzone from "../common/Dropzone/Dropzone";
import FormikTextField from "../common/FormikTextField/FormikTextField";
import CapacityForm from "./CapacityForm";
import GeneralForm from "./GeneralForm";
import PaymentForm from "./PaymentForm";
import PricingForm from "./PricingForm";
import ScheduleForm from "./ScheduleForm";

interface Props {
  title: string;
  error: React.ReactNode;
}

const OfferingForm = ({ title, error }: Props) => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "General",
      description: "Basic information about your activity.",
      Icon: AssignmentOutlined,
      children: <GeneralForm />,
    },

    {
      title: "Capacity",
      description: "Manage how people can participate in your activity.",
      Icon: PeopleOutline,
      children: <CapacityForm />,
    },
    {
      title: "Media",
      description: "Upload images to show off your activity.",
      Icon: ImageOutlined,
      children: <Dropzone />,
    },

    {
      title: "Pricing",
      description: "Manage pricing of your activity.",
      Icon: LocalOfferOutlined,
      children: <PricingForm />,
    },

    {
      title: "Schedule",
      description: "Manage your activity schedule.",
      Icon: CalendarTodayOutlined,
      children: <ScheduleForm />,
    },

    {
      title: "Payment and Deposit",
      description: "Manage payments and deposits for your activity.",
      Icon: CreditCardOutlined,
      children: <PaymentForm />,
    },
  ];

  const statusOptions = [
    { value: OfferingStatus.Draft, title: "Draft" },
    { value: OfferingStatus.Active, title: "Active" },
    { value: OfferingStatus.Archived, title: "Archived" },
  ];

  return (
    <FormLayout
      title={title}
      onBack={() => navigate("/experiences")}
      sections={sections}
      error={error}
      headerComponent={
        <FormikTextField select field="status" sx={{ ml: "auto" }}>
          {statusOptions.map(({ value, title }) => (
            <MenuItem key={value} value={value}>
              {title}
            </MenuItem>
          ))}
        </FormikTextField>
      }
    />
  );
};

export default OfferingForm;
