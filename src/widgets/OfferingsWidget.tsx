import { Box } from "@mui/material";
import OfferingsList from "../components/OfferingsList/OfferingsList";

const OfferingsWidget = () => {
  return (
    <Box sx={{ mx: "auto", mt: 3, maxWidth: 900 }}>
      <OfferingsList />
    </Box>
  );
};

export default OfferingsWidget;
