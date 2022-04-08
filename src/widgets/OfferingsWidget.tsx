import { Box } from "@mui/material";
import { useEffect } from "react";
import zoid from "zoid";
import OfferingsList from "../components/OfferingsList/OfferingsList";

zoid.create({
  tag: "offerings-widget",
  url: `${process.env.VERCEL_URL || "http://localhost:3000"}/widget`,
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
    onShowAll: {
      type: "function",
      required: true,
    },
    businessId: {
      type: "number",
      required: true,
    },
  },
});

const OfferingsWidget = () => {
  useEffect(() => {
    if (window.xprops)
      localStorage.setItem("businessId", window.xprops.businessId);
  }, []);

  return (
    <Box sx={{ mx: "auto", py: 3, maxWidth: 900 }}>
      <OfferingsList
        onCheckout={() => window.xprops.onCheckout()}
        onShowAll={window.xprops.onShowAll}
      />
    </Box>
  );
};

export default OfferingsWidget;
