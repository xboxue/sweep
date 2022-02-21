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
    title: "Calendar",
    to: "/calendar",
  },
  {
    title: "Draft Orders",
    to: "/draft-orders",
  },
  {
    title: "Customers",
    to: "/customers",
  },
  {
    title: "Experiences",
    to: "/experiences",
  },
];

const AppLayout = () => (
  <Box sx={{ display: "flex" }}>
    <AppBar
      position="fixed"
      // sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
        zIndex: (theme) => theme.zIndex.appBar - 1,
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
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Outlet />
    </Box>
  </Box>
);

export default AppLayout;
