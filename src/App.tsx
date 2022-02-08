import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateOfferingForm from "./components/CreateExperienceForm/CreateOfferingForm";
import OfferingDetailsForm from "./components/CreateExperienceForm/OfferingDetailsForm";
import Layout from "./components/Layout";
import Bookings from "./pages/Bookings";
import Calendar from "./pages/Calendar";
import Customers from "./pages/Customers";
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="bookings" element={<Bookings />} />
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
      </ThemeProvider>
    </ApolloProvider>
  </>
);

export default App;
