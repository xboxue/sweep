import {
  AccountCircleOutlined,
  AssignmentOutlined,
  CalendarTodayOutlined,
  CreditCardOutlined,
  ImageOutlined,
  LocalOfferOutlined,
  PeopleOutline,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import Dropzone from "../common/Dropzone/Dropzone";
import CapacityForm from "./CapacityForm";
import GeneralForm from "./GeneralForm";
import PaymentForm from "./PaymentForm";
import PricingForm from "./PricingForm";
import ScheduleForm from "./ScheduleForm";

const Card = ({
  title,
  children,
  Icon,
}: {
  title: string;
  children: React.ReactNode;
  Icon: JSX.Element;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      variant="outlined"
      disableGutters
      sx={{ "&:before": { display: "none" } }}
      expanded={expanded}
      onChange={(_, isExpanded) => setExpanded(isExpanded)}
    >
      <AccordionSummary>
        <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          <Avatar
            variant="rounded"
            sx={{ bgcolor: "rgb(224, 242, 254)", mr: 1 }}
          >
            <Icon sx={{ color: "rgb(2, 132, 199)" }} />
          </Avatar>
          <Typography variant="subtitle1">{title}</Typography>
          {expanded && (
            <>
              <Button size="small" sx={{ ml: "auto" }}>
                Cancel
              </Button>
              <Button size="small" variant="contained">
                Save & Close
              </Button>
            </>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails
        sx={{ borderTop: 1, borderColor: (theme) => theme.palette.divider }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

const CreateExperienceForm = () => {
  const sections = [
    {
      title: "General",
      icon: AssignmentOutlined,
      Component: GeneralForm,
    },

    {
      title: "Capacity",
      icon: PeopleOutline,
      Component: CapacityForm,
    },
    {
      title: "Media",
      icon: ImageOutlined,
      Component: Dropzone,
    },

    {
      title: "Pricing",
      icon: LocalOfferOutlined,
      Component: PricingForm,
    },

    {
      title: "Payment and Deposit",
      icon: CreditCardOutlined,
      Component: PaymentForm,
    },

    {
      title: "Schedule",
      icon: CalendarTodayOutlined,
      Component: ScheduleForm,
    },
  ];

  return (
    <Stack spacing={2}>
      {sections.map(({ title, icon, Component }) => (
        <Card key={title} title={title} Icon={icon}>
          <Component />
        </Card>
      ))}
    </Stack>
  );
};

export default CreateExperienceForm;
