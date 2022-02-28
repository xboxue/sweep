import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import UserAvatar from "../components/common/UserAvatar/UserAvatar";
import { selectUser } from "../features/auth/authSlice";
import { signOut } from "../services/firebase";

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

const AppLayout = () => {
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Box sx={{ display: "flex" }}>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={async () => {
            try {
              await signOut();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Log out
        </MenuItem>
      </Menu>
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          bgcolor: (theme) => theme.palette.background.paper,
          color: "inherit",
          borderBottom: 1,
          borderColor: (theme) => theme.palette.divider,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ mr: "auto" }}>
            Sweep
          </Typography>
          <ListItemButton
            sx={{ flex: 0 }}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <UserAvatar sx={{ width: 32, height: 32 }} />
            <Typography sx={{ ml: 1 }} noWrap>
              {user?.displayName}
            </Typography>
          </ListItemButton>
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
};

export default AppLayout;
