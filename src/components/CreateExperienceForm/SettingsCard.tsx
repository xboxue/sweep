import { SvgIconComponent } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";

interface Props {
  title: string;
  children: React.ReactNode;
  Icon: SvgIconComponent;
}

const SettingsCard = ({ title, children, Icon }: Props) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Accordion
      variant="outlined"
      disableGutters
      sx={{ "&:before": { display: "none" } }}
      expanded={expanded}
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
          {/* {expanded && (
            <>
              <Button size="small" sx={{ ml: "auto" }}>
                Cancel
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={(event) => {
                  event.stopPropagation();
                  ref.current?.handleSubmit();
                }}
              >
                Save & Close
              </Button>
            </>
          )} */}
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

export default SettingsCard;
