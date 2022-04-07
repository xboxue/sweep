import { Route, Routes } from "react-router-dom";
import CheckoutWidget from "./CheckoutWidget";
import OfferingsWidget from "./OfferingsWidget";

const WidgetApp = () => {
  return (
    <Routes>
      <Route path="widget" element={<OfferingsWidget />} />
      <Route path="widget/checkout" element={<CheckoutWidget />} />
    </Routes>
  );
};

export default WidgetApp;
