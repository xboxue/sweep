import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { selectUser } from "../../features/auth/authSlice";
import useAuth from "../../hooks/useAuth";
import AppLayout from "../../layouts/AppLayout";
import CalendarPage from "../../pages/CalendarPage";
import CustomersPage from "../../pages/CustomersPage";
import ExperiencesPage from "../../pages/ExperiencesPage";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import NotFoundPage from "../../pages/NotFoundPage";
import OrdersPage from "../../pages/OrdersPage";
import RegisterPage from "../../pages/RegisterPage";
import SignUpPage from "../../pages/SignUpPage";
import CreateOfferingForm from "../CreateOfferingForm/CreateOfferingForm";
import OfferingDetailsForm from "../CreateOfferingForm/OfferingDetailsForm";
import CreateOrderForm from "../CreateOrderForm/CreateOrderForm";
import OrderDetailsForm from "../CreateOrderForm/OrderDetailsForm";

const AdminApp = () => {
  useAuth();
  const token = localStorage.getItem("token");
  const user = useSelector(selectUser);

  const renderRoutes = () => {
    if (!user && !token) {
      return (
        <>
          {/* Needed for YC demo */}
          <Route index element={<LoginPage />} />

          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      );
    }

    if (user && !user.businessId) {
      return (
        <>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/register" replace />} />
        </>
      );
    }

    return (
      <>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route
            path="orders/new"
            element={
              <Box mx="auto" maxWidth="960px">
                <CreateOrderForm />
              </Box>
            }
          />
          <Route
            path="orders/:id"
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
        <Route path="*" element={<NotFoundPage />} />
      </>
    );
  };

  return <Routes>{renderRoutes()}</Routes>;
};

export default AdminApp;
