import { CssBaseline, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Bookings from "./pages/Bookings";
import Calendar from "./pages/Calendar";
import Customers from "./pages/Customers";
import Home from "./pages/Home";

const NotFound = () => <Typography>Not found</Typography>;

const App = () => (
  <>
    <CssBaseline />
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="customers" element={<Customers />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default App;
