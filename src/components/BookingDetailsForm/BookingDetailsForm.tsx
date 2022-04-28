import { ArrowBack } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { isEqual, range, sortBy } from "lodash";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalculatedOrder,
  useEditOrderBeginMutation,
  useEditOrderCommitMutation,
  useEditOrderUpdateBookingsMutation,
} from "../../generated/graphql";
import TextField from "../common/TextField/TextField";
import OrderPaymentSummary from "../CreateOrderForm/OrderPaymentSummary";

interface Props {}

const BookingDetailsForm = ({ event, onEdit }: Props) => {
  const navigate = useNavigate();
  const [editable, setEditable] = useState(false);

  const [initialCalculatedOrder, setInitialCalculatedOrder] =
    useState<CalculatedOrder | null>(null);
  const [calculatedOrder, setCalculatedOrder] =
    useState<CalculatedOrder | null>(null);

  const [editOrderBegin] = useEditOrderBeginMutation();
  const [editOrderCommit] = useEditOrderCommitMutation();
  const [editOrderUpdateBookings] = useEditOrderUpdateBookingsMutation();

  useEffect(() => {
    const editOrder = async () => {
      try {
        const { data } = await editOrderBegin({
          variables: { input: { orderId: event.booking.order.id } },
        });

        setInitialCalculatedOrder(data?.editOrderBegin.calculatedOrder);
        setCalculatedOrder(data?.editOrderBegin.calculatedOrder);
      } catch (error) {
        console.log(error);
      }
    };

    if (!calculatedOrder && editable) editOrder();
  }, [calculatedOrder, event, editOrderBegin, editable]);

  if (editable && !calculatedOrder) return <Skeleton />;

  const handleUpdate = async (bookingId: string, numGuests: number) => {
    try {
      const { data } = await editOrderUpdateBookings({
        variables: {
          input: {
            id: calculatedOrder.id,
            calculatedBookings: [{ id: bookingId, numGuests }],
          },
        },
      });
      setCalculatedOrder(data?.editOrderUpdateBookings.calculatedOrder);
    } catch (error) {
      console.log(error);
    }
  };
  const calculatedBooking = calculatedOrder?.calculatedBookings.find(
    (calculatedBooking) => calculatedBooking.bookingId === event.booking.id
  );

  if (editable) {
    return (
      <Stack component="form" spacing={2} divider={<Divider />}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <IconButton size="small" onClick={() => setEditable(false)}>
            <ArrowBack fontSize="small" />
          </IconButton>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Edit booking
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Avatar
            variant="rounded"
            src={event.offering.featuredImage?.url}
            sx={{ width: 56, height: 56 }}
          />
          <Box sx={{ ml: 1 }}>
            <Typography variant="subtitle1">{event.offering.name}</Typography>
            <Typography variant="subtitle2">
              {DateTime.fromJSDate(event.start).toFormat("t")} -{" "}
              {DateTime.fromJSDate(event.end).toFormat("t")}
            </Typography>
            <Typography variant="body2">
              {DateTime.fromJSDate(event.start).toFormat("DDDD")}
            </Typography>
          </Box>
          {/* <IconButton size="small">
            <DeleteOutline fontSize="small" />
          </IconButton> */}
        </Box>
        <Box>
          <Typography variant="subtitle1">Booking</Typography>
          <Box sx={{ display: "flex" }}>
            <Avatar sx={{ fontSize: 16, bgcolor: "#33A5E4" }}>
              {event.booking.order.customer?.firstName[0]}
              {event.booking.order.customer?.lastName[0]}
            </Avatar>
            <Box sx={{ ml: 1 }}>
              <Typography variant="subtitle2">
                {event.booking.order.customer?.firstName}{" "}
                {event.booking.order.customer?.lastName}
              </Typography>

              <TextField
                select
                size="small"
                value={calculatedBooking?.numGuests}
                onChange={(event) =>
                  handleUpdate(calculatedBooking?.id, event.target.value)
                }
              >
                {range(
                  event.offering.minGuests,
                  event.offering.maxGuests + 1
                ).map((value) => (
                  <MenuItem key={value} value={value}>
                    {value} guests
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography variant="subtitle1">Payment</Typography>
          <Typography variant="body2">
            Total due: ${(calculatedOrder.total / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2">
            Total paid: ${(event.booking.order.totalPaid / 100).toFixed(2)}
          </Typography>
        </Box>

        {!isEqual(
          sortBy(initialCalculatedOrder?.calculatedBookings, "id"),
          sortBy(calculatedOrder.calculatedBookings, "id")
        ) && (
          <Button
            variant="contained"
            onClick={async () => {
              try {
                await editOrderCommit({
                  variables: { input: { id: calculatedOrder.id } },
                });
                onEdit();
                setEditable(false);
                setCalculatedOrder(null);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Save
          </Button>
        )}
      </Stack>
    );
  }
  return (
    <Stack spacing={2} divider={<Divider />}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Avatar
          variant="rounded"
          src={event.offering.featuredImage?.url}
          sx={{ width: 56, height: 56 }}
        />
        <Box sx={{ ml: 1 }}>
          <Typography variant="subtitle1">{event.offering.name}</Typography>
          <Typography variant="subtitle2">
            {DateTime.fromJSDate(event.start).toFormat("t")} -{" "}
            {DateTime.fromJSDate(event.end).toFormat("t")}
          </Typography>
          <Typography variant="body2">
            {DateTime.fromJSDate(event.start).toFormat("DDDD")}
          </Typography>
        </Box>
        {/* <IconButton size="small">
            <DeleteOutline fontSize="small" />
          </IconButton> */}
      </Box>
      <Box>
        <Typography variant="subtitle1">Booking</Typography>
        <Box sx={{ display: "flex" }}>
          <Avatar sx={{ fontSize: 16, bgcolor: "#33A5E4" }}>
            {event.booking.order.customer?.firstName[0]}
            {event.booking.order.customer?.lastName[0]}
          </Avatar>
          <Box sx={{ ml: 1 }}>
            <Typography variant="subtitle2">
              {event.booking.order.customer?.firstName}{" "}
              {event.booking.order.customer?.lastName}
            </Typography>

            <Typography variant="body2">
              {event.booking.numGuests} guests
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle1">Payment</Typography>
        <OrderPaymentSummary
          order={event.booking.order}
          onPaymentSuccess={onEdit}
          showTransactions={false}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1">Notes</Typography>
        <TextField multiline minRows={2} />
      </Box>

      <Box>
        <Button fullWidth variant="contained" onClick={() => setEditable(true)}>
          Edit
        </Button>
        <Button
          fullWidth
          onClick={() => navigate(`/orders/${event.booking.order.id}`)}
        >
          Show order
        </Button>
      </Box>
    </Stack>
  );
};

export default BookingDetailsForm;
