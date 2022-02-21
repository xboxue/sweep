import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { LocalizationProvider } from "@mui/lab";
import AdapterLuxon from "@mui/lab/AdapterLuxon";
import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateOfferingForm from "./components/CreateOfferingForm/CreateOfferingForm";
import OfferingDetailsForm from "./components/CreateOfferingForm/OfferingDetailsForm";
import CreateOrderForm from "./components/CreateOrderForm/CreateOrderForm";
import OrderDetailsForm from "./components/CreateOrderForm/OrderDetailsForm";
import AppLayout from "./layouts/AppLayout";
import Calendar from "./pages/Calendar";
import Customers from "./pages/Customers";
import DraftOrders from "./pages/DraftOrders";
import Experiences from "./pages/Experiences";
import Home from "./pages/Home";
import theme from "./styles/theme";

const NotFound = () => <Typography>Not found</Typography>;

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

const App = () => (
  <>
    <CssBaseline />

    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <BrowserRouter>
            <Routes>
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </ApolloProvider>
  </>
);

export default App;
