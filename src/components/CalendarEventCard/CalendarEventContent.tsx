import { Box, Typography } from "@mui/material";
import { EventProps } from "react-big-calendar";

const CalendarEventContent = ({ event }: EventProps) => {
  const renderContent = () => {
    if (event.booking)
      return (
        <>
          <Typography variant="subtitle2">
            {event.booking.order.customer.firstName}{" "}
            {event.booking.order.customer.lastName} {event.booking.numGuests} /{" "}
            {event.offering.maxGuests}
          </Typography>
        </>
      );

    if (event.block)
      return (
        <>
          <Typography variant="subtitle2">Blocked</Typography>
        </>
      );

    if (event.cartBooking)
      return (
        <>
          <Typography variant="subtitle2">In cart</Typography>
        </>
      );

    return (
      <>
        <Typography variant="subtitle2">
          {event.offering.maxGuests} left
        </Typography>
      </>
    );
  };

  return <Box>{renderContent()}</Box>;
};

export default CalendarEventContent;
