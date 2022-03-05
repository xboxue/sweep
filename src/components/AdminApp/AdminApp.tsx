import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AppLayout from "../../layouts/AppLayout";
import CalendarPage from "../../pages/CalendarPage";
import CustomersPage from "../../pages/CustomersPage";
import DraftOrdersPage from "../../pages/DraftOrdersPage";
import ExperiencesPage from "../../pages/ExperiencesPage";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import NotFoundPage from "../../pages/NotFoundPage";
import RegisterPage from "../../pages/RegisterPage";
import SignUpPage from "../../pages/SignUpPage";
import CreateOfferingForm from "../CreateOfferingForm/CreateOfferingForm";
import OfferingDetailsForm from "../CreateOfferingForm/OfferingDetailsForm";
import CreateOrderForm from "../CreateOrderForm/CreateOrderForm";
import OrderDetailsForm from "../CreateOrderForm/OrderDetailsForm";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const AdminApp = () => {
  useAuth();

  return (
    <Routes>
      <Route path="signup" element={<SignUpPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="draft-orders" element={<DraftOrdersPage />} />
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
          <Route path="customers" element={<CustomersPage />} />
          <Route path="experiences" element={<ExperiencesPage />} />
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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AdminApp;
