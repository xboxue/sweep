import { ArrowBack } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { range } from "lodash";
import { DateTime } from "luxon";
import { useState } from "react";
import FormikTextField from "../common/FormikTextField/FormikTextField";
import TextField from "../common/TextField/TextField";

interface Props {
  // booking:
}

const BookingDetailsForm = ({ event }: Props) => {
  const [editable, setEditable] = useState(false);
  const initialValues = { numGuests: event.booking.numGuests };

  if (editable)
    return (
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        enableReinitialize
        onSubmit={async (values) => {}}
      >
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

                <FormikTextField select size="small" field="numGuests">
                  {range(
                    event.offering.minGuests,
                    event.offering.maxGuests + 1
                  ).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value} guests
                    </MenuItem>
                  ))}
                </FormikTextField>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle1">Payment</Typography>
            <Typography variant="body2">
              Total due: ${(event.booking.order.total / 100).toFixed(2)}
            </Typography>
            <Typography variant="body2">
              Total paid: $
              {(
                event.booking.order.transactions.reduce(
                  (acc, transaction) => acc + transaction.amount,
                  0
                ) / 100
              ).toFixed(2)}
            </Typography>
          </Box>
        </Stack>
      </Formik>
    );

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
        <Typography variant="body2">
          Total due: ${(event.booking.order.total / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2">
          Total paid: $
          {(
            event.booking.order.transactions.reduce(
              (acc, transaction) => acc + transaction.amount,
              0
            ) / 100
          ).toFixed(2)}
        </Typography>
      </Box>

      <Box>
        <Typography variant="subtitle1">Notes</Typography>
        <TextField multiline minRows={2} />
      </Box>

      <Button variant="contained" onClick={() => setEditable(true)}>
        Edit
      </Button>
    </Stack>
  );
};

export default BookingDetailsForm;
