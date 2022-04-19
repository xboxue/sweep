import {
  Equalizer,
  Home,
  Inbox,
  Person,
  Search,
  Sell,
  Settings,
  Store,
  Today,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Drawer,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import TextField from "../components/common/TextField/TextField";
import UserAvatar from "../components/common/UserAvatar/UserAvatar";
import { selectUser } from "../features/auth/authSlice";
import { signOut } from "../services/firebase";

const items = [
  {
    title: "Home",
    to: "/",
    Icon: Home,
  },
  {
    title: "Calendar",
    to: "/calendar",
    Icon: Today,
  },
  {
    title: "Orders",
    to: "/orders",
    Icon: Inbox,
  },
  {
    title: "Customers",
    to: "/customers",
    Icon: Person,
  },
  {
    title: "Experiences",
    to: "/experiences",
    Icon: Sell,
  },
  {
    title: "Analytics",
    to: "/analytics",
    Icon: Equalizer,
  },
  {
    title: "Settings",
    to: "/settings",
    Icon: Settings,
  },
];

const AppLayout = () => {
  const user = useSelector(selectUser);
  const location = useLocation();
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
          <Typography
            variant="subtitle1"
            noWrap
            component="div"
            sx={{ mr: "auto" }}
          >
            Sweep
          </Typography>
          <TextField
            placeholder="Search"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ mr: 2 }}
          />
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
          <List dense sx={{ px: 1 }}>
            {items.map(({ title, to, Icon }) => (
              <ListItemButton
                key={title}
                component={Link}
                to={to}
                selected={location.pathname === to}
                sx={{ borderRadius: 1, my: "2px" }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            ))}
          </List>
          <List
            dense
            sx={{ px: 1 }}
            subheader={<ListSubheader>Sales channels</ListSubheader>}
          >
            <ListItemButton
              component="a"
              href="https://captivetoronto.com/?redirect"
              target="_blank"
              sx={{ borderRadius: 1, my: "2px" }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                <Store fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Online Store" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
