import {
  ArrowBackIos,
  ArrowBackIosNew,
  ArrowForwardIos,
  LocalMallOutlined,
} from "@mui/icons-material";
import {
  Badge,
  IconButton,
  Typography,
  Box,
  ButtonGroup,
  Popover,
} from "@mui/material";
import { useState } from "react";
import { Navigate, ToolbarProps } from "react-big-calendar";
import { useNavigate } from "react-router-dom";
import { useGetMyCartQuery } from "../../generated/graphql";
import CartCard from "../CartCard/CartCard";
import Button from "../common/Button/Button";

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
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        mb: 1,
        px: 3,
      }}
    >
      <Button
        variant="contained"
        size="small"
        onClick={() => onNavigate(Navigate.TODAY)}
        sx={{ mr: 1 }}
      >
        {messages.today}
      </Button>
      <IconButton size="small" onClick={() => onNavigate(Navigate.PREVIOUS)}>
        <ArrowBackIosNew sx={{ width: 16, height: 16 }} />
      </IconButton>
      <IconButton size="small" onClick={() => onNavigate(Navigate.NEXT)}>
        <ArrowForwardIos sx={{ width: 16, height: 16 }} />
      </IconButton>
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
        <CartCard onCheckout={() => navigate("/orders/new")} />
      </Popover>
      <ButtonGroup size="small">
        {views.map((view) => (
          <Button variant="contained" key={view} onClick={() => onView(view)}>
            {messages[view]}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default CalendarToolbar;
