import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { sortBy } from "lodash";
import { DateTime } from "luxon";
import {
  Offering,
  PricingType,
  TimeSlot,
} from "../../generated/public/graphql";

interface Props {
  offering: Offering;
  onTimeSlotClick: (timeSlot: TimeSlot) => void;
  numGuests: number;
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

export default OfferingCard;
