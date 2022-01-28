import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const items = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Bookings",
    to: "/bookings",
  },
  {
    title: "Customers",
    to: "/customers",
  },
];

const Layout = () => (
  <>
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Sweep
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {items.map(({ title, to }) => (
            <ListItem button key={title} component={Link} to={to}>
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
    <Outlet />
  </>
);

export default Layout;
