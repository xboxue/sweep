import { AccessTime, CalendarToday, PersonOutline } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterLuxon from "@mui/lab/AdapterLuxon";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Link,
  MenuItem,
  Skeleton,
  Typography,
} from "@mui/material";
import { range, sortBy } from "lodash";
import { DateTime } from "luxon";
import { useState } from "react";
import {
  Offering,
  PricingType,
  TimeSlot,
  useGetPublicOfferingsQuery,
} from "../../generated/public/graphql";
import BookingForm from "../BookingForm/BookingForm";
import BookingSummaryCard from "../BookingSummaryCard/BookingSummaryCard";
import Dialog from "../common/Dialog/Dialog";
import TextField from "../common/TextField/TextField";

interface Props {
  offering: Offering;
  onTimeSlotClick: (timeSlot: TimeSlot) => void;
}

const OfferingCard = ({ offering, onTimeSlotClick, numGuests }: Props) => {
  const renderContent = () => {
    if (numGuests < offering.minGuests && !offering.availableTimeSlots.length) {
      return (
        <Box
          sx={{
            borderRadius: 1,
            bgcolor: "#F6F6F7",
            p: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2">
            Minimum of {offering.minGuests} players
          </Typography>
        </Box>
      );
    }

    if (numGuests > offering.maxGuests && !offering.availableTimeSlots.length) {
      return (
        <Box
          sx={{
            borderRadius: 1,
            bgcolor: "#F6F6F7",
            p: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2">
            Maximum of {offering.maxGuests} players
          </Typography>
        </Box>
      );
    }

    return (
      <Grid container spacing={1} sx={{ mt: 1 }}>
        {sortBy(offering.availableTimeSlots, "startDateTime")
          .slice(0, 7)
          .map((timeSlot) => (
            <Grid item key={timeSlot.id} xs={3}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => onTimeSlotClick({ ...timeSlot, offering })}
                sx={{ bgcolor: "#4E6ED9" }}
              >
                {DateTime.fromISO(timeSlot.startDateTime).toFormat("h:mm a")}
              </Button>
            </Grid>
          ))}
        {offering.availableTimeSlots.length > 7 && (
          <Grid item xs={3}>
            <Link component="button">
              +{offering.availableTimeSlots.length - 7} more
            </Link>{" "}
          </Grid>
        )}
      </Grid>
    );
  };

  return (
    <Box>
      <Box
        component="img"
        src={offering.featuredImage?.url}
        alt={offering.featuredImage?.altText}
        sx={{ borderRadius: 2, width: "100%" }}
      />
      <Typography variant="h6">{offering.name}</Typography>
      <Typography>
        {offering.pricingType === PricingType.PerPerson ? (
          <>
            <strong>${offering.pricePerPerson / 100}</strong> per person
          </>
        ) : (
          `$${offering.priceTotalAmount}`
        )}{" "}
        |{" "}
        <strong>
          {offering.minGuests} to {offering.maxGuests}
        </strong>{" "}
        players | <strong>7/10</strong> difficulty
      </Typography>
      {renderContent()}
    </Box>
  );
};

const OfferingsList = () => {
  const [date, setDate] = useState(new Date());
  const [numGuests, setNumGuests] = useState(4);
  const [timeSlot, setTimeSlot] = useState(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const { loading, error, data } = useGetPublicOfferingsQuery({
    variables: { businessId: 1, numGuests, date },
  });

  if (loading) return <Skeleton />;

  return (
    <Box>
      <TextField
        select
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutline />
            </InputAdornment>
          ),
        }}
        value={numGuests}
        onChange={(event) => setNumGuests(event.target.value)}
        sx={{ mr: 2 }}
      >
        {range(1, 50).map((value) => (
          <MenuItem key={value} value={value}>
            {value} players
          </MenuItem>
        ))}
      </TextField>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <DatePicker
          open={datePickerOpen}
          onClose={() => setDatePickerOpen(false)}
          value={date}
          onChange={setDate}
          disableOpenPicker
          views={["day"]}
          minDate={DateTime.now()}
          maxDate={DateTime.now().plus({ year: 1 })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarToday fontSize="small" />
              </InputAdornment>
            ),
          }}
          inputFormat="EEE, MMM d"
          sx={{ mr: 1 }}
          renderInput={(params) => (
            <TextField {...params} onClick={() => setDatePickerOpen(true)} />
          )}
        />
      </LocalizationProvider>

      {/* <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccessTime />
            </InputAdornment>
          ),
        }}
        sx={{ mr: 2 }}
      /> */}
      {!!timeSlot && (
        <Dialog
          title="Complete Reservation"
          open
          onClose={() => setTimeSlot(null)}
          fullWidth
          PaperProps={{ sx: { maxWidth: 700 } }}
        >
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1">Reservation details</Typography>
              <BookingForm />
            </Box>
            <Box sx={{ ml: 5, width: 300 }}>
              <BookingSummaryCard
                price={timeSlot.offering.pricePerPerson / 100}
                numGuests={2}
                startDateTime={timeSlot.startDateTime}
                offering={timeSlot.offering}
              />
            </Box>
          </Box>
        </Dialog>
      )}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {data?.offerings.map((offering) => (
          <Grid item sm={6} key={offering.id}>
            <OfferingCard
              offering={offering}
              onTimeSlotClick={setTimeSlot}
              numGuests={numGuests}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OfferingsList;
