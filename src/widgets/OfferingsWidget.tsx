import { Box } from "@mui/material";
import zoid from "zoid";
import OfferingsList from "../components/OfferingsList/OfferingsList";

zoid.create({
  tag: "offerings-widget",
  url: "http://localhost:3000/",
  dimensions: {
    width: "100%",
    height: "100%",
  },
  autoResize: {
    height: true,
    width: false,
  },
  props: {
    onCheckout: {
      type: "function",
      required: true,
    },
  },
});

const OfferingsWidget = () => {
  return (
    <Box sx={{ mx: "auto", py: 3, maxWidth: 900 }}>
      <OfferingsList onCheckout={() => window.xprops?.onCheckout()} />
    </Box>
  );
};

export default OfferingsWidget;
