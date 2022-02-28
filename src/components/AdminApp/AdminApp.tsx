import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AppLayout from "../../layouts/AppLayout";
import Calendar from "../../pages/Calendar";
import Customers from "../../pages/Customers";
import DraftOrders from "../../pages/DraftOrders";
import Experiences from "../../pages/Experiences";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import NotFound from "../../pages/NotFound";
import Register from "../../pages/Register";
import SignUp from "../../pages/SignUp";
import CreateOfferingForm from "../CreateOfferingForm/CreateOfferingForm";
import OfferingDetailsForm from "../CreateOfferingForm/OfferingDetailsForm";
import CreateOrderForm from "../CreateOrderForm/CreateOrderForm";
import OrderDetailsForm from "../CreateOrderForm/OrderDetailsForm";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const AdminApp = () => {
  useAuth();

  return (
    <Routes>
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="draft-orders" element={<DraftOrders />} />
          <Route
            path="draft-orders/new"
            element={
              <Box mx="auto" maxWidth="960px">
                <CreateOrderForm />
              </Box>
            }
          />
          <Route
            path="draft-orders/:id"
            element={
              <Box mx="auto" maxWidth="960px">
                <OrderDetailsForm />
              </Box>
            }
          />
          <Route path="customers" element={<Customers />} />
          <Route path="experiences" element={<Experiences />} />
          <Route
            path="experiences/new"
            element={
              <Box mx="auto" maxWidth="960px">
                <CreateOfferingForm />
              </Box>
            }
          />
          <Route
            path="experiences/:id"
            element={
              <Box mx="auto" maxWidth="960px">
                <OfferingDetailsForm />
              </Box>
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminApp;
