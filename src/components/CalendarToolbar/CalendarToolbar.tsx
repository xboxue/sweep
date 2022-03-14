import { LocalMallOutlined } from "@mui/icons-material";
import {
  Badge,
  IconButton,
  Typography,
  Box,
  Button,
  ButtonGroup,
  Popover,
} from "@mui/material";
import { useState } from "react";
import { Navigate, ToolbarProps } from "react-big-calendar";
import { useGetMyCartQuery } from "../../generated/graphql";
import CartCard from "../CartCard/CartCard";

const CalendarToolbar = ({
  localizer: { messages },
  view,
  views,
  label,
  onView,
  onNavigate,
}: ToolbarProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { loading, error, data } = useGetMyCartQuery();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        mb: 1,
      }}
    >
      <ButtonGroup variant="contained">
        <Button onClick={() => onNavigate(Navigate.TODAY)}>
          {messages.today}
        </Button>
        <Button onClick={() => onNavigate(Navigate.PREVIOUS)}>
          {messages.previous}
        </Button>
        <Button onClick={() => onNavigate(Navigate.NEXT)}>
          {messages.next}
        </Button>
      </ButtonGroup>
      <Typography variant="subtitle1" sx={{ mx: "auto" }}>
        {label}
      </Typography>

      <IconButton
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{ mr: 2 }}
      >
        <Badge
          badgeContent={data?.myCart?.cartBookings?.length}
          color="primary"
        >
          <LocalMallOutlined />
        </Badge>
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <CartCard />
      </Popover>
      <ButtonGroup variant="contained">
        {views.map((view) => (
          <Button key={view} onClick={() => onView(view)}>
            {messages[view]}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default CalendarToolbar;
