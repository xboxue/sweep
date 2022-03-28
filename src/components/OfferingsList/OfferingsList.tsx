import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { useGetPublicOfferingsQuery } from "../../generated/public/graphql";
import BookingForm from "../BookingForm/BookingForm";
import BookingSummaryCard from "../BookingSummaryCard/BookingSummaryCard";
import Dialog from "../common/Dialog/Dialog";
import OfferingCard from "../OfferingCard/OfferingCard";
import OfferingToolbar from "../OfferingToolbar/OfferingToolbar";

const OfferingsList = () => {
  const [date, setDate] = useState(DateTime.now());
  const [numGuests, setNumGuests] = useState(4);
  const [timeSlot, setTimeSlot] = useState(null);

  const { loading, error, data } = useGetPublicOfferingsQuery({
    variables: { businessId: 1, numGuests, date },
    fetchPolicy: "network-only",
  });

  if (loading) return <Skeleton />;

  return (
    <Box>
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
      <OfferingToolbar
        numGuests={numGuests}
        onNumGuestsChange={setNumGuests}
        date={date}
        onDateChange={setDate}
      />
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
