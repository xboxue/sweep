import React from "react";
import { Route, Routes } from "react-router-dom";
import CheckoutWidget from "./CheckoutWidget";
import OfferingsWidget from "./OfferingsWidget";

const WidgetApp = () => {
  return (
    <Routes>
      <Route index element={<OfferingsWidget />} />
      <Route path="/checkout" element={<CheckoutWidget />} />
    </Routes>
  );
};

export default WidgetApp;
