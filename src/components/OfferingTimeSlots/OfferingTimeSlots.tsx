import { CheckCircle } from "@mui/icons-material";
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { sortBy } from "lodash";
import { DateTime } from "luxon";
import { Offering, TimeSlot } from "../../generated/public/graphql";

interface Props {
  date: DateTime;
  offering: Offering;
  onTimeSlotClick: (timeSlot: TimeSlot) => void;
  numGuests: number;
  showAll?: boolean;
  onShowAll: (offeringId: string, numGuests: number, date: string) => void;
  cartTimeSlotIds?: string[];
  onCheckout: () => void;
}

const OfferingTimeSlots = ({
  date,
  offering,
  onTimeSlotClick,
  numGuests,
  showAll = false,
  onShowAll,
  onCheckout,
  cartTimeSlotIds = [],
}: Props) => {
  const renderTimeSlot = (timeSlot: TimeSlot) => {
    if (cartTimeSlotIds.includes(timeSlot.id))
      return (
        <Button
          fullWidth
          variant="contained"
          onClick={onCheckout}
          color="success"
          sx={{ px: 1 }}
        >
          <CheckCircle fontSize="small" sx={{ mr: "4px" }} />
          {DateTime.fromISO(timeSlot.startDateTime).toFormat("h:mm a")}
        </Button>
      );

    return (
      <Button
        fullWidth
        variant="contained"
        onClick={() => onTimeSlotClick(timeSlot)}
      >
        {DateTime.fromISO(timeSlot.startDateTime).toFormat("h:mm a")}
      </Button>
    );
  };

  if (
    (numGuests < offering.minGuests || numGuests > offering.maxGuests) &&
    !offering.availableTimeSlots.length
  ) {
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
          {numGuests < offering.minGuests
            ? `Minimum of ${offering.minGuests} players`
            : `Maximum of ${offering.maxGuests} players`}
        </Typography>
      </Box>
    );
  }

  if (!offering.availableTimeSlots.length) {
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
          Sold out on {date.toFormat("MMM d")}
        </Typography>
      </Box>
    );
  }

  if (showAll) {
    return (
      <Grid container spacing={1}>
        {sortBy(offering.availableTimeSlots, "startDateTime").map(
          (timeSlot) => (
            <Grid item key={timeSlot.id} xs={3}>
              {renderTimeSlot(timeSlot)}
            </Grid>
          )
        )}
      </Grid>
    );
  }

  return (
    <Grid container spacing={1}>
      {sortBy(offering.availableTimeSlots, "startDateTime")
        .slice(0, 7)
        .map((timeSlot) => (
          <Grid item key={timeSlot.id} xs={3}>
            {renderTimeSlot(timeSlot)}
          </Grid>
        ))}
      {offering.availableTimeSlots.length > 7 && (
        <Grid item xs={3}>
          <Link
            component="button"
            onClick={() => onShowAll(offering.id, numGuests, date.toISO())}
          >
            +{offering.availableTimeSlots.length - 7} more
          </Link>
        </Grid>
      )}
    </Grid>
  );
};

export default OfferingTimeSlots;
