import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Bookings from "./pages/Bookings";
import Calendar from "./pages/Calendar";
import Customers from "./pages/Customers";
import Experiences from "./pages/Experiences";
import Home from "./pages/Home";
import theme from "./styles/theme";

const NotFound = () => <Typography>Not found</Typography>;

const App = () => (
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="customers" element={<Customers />} />
          <Route path="experiences" element={<Experiences />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  </>
);

export default App;
