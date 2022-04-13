import { CheckCircle } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Grid,
  Link,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { sortBy } from "lodash";
import { DateTime } from "luxon";
import { useState } from "react";
import { Offering, TimeSlot } from "../../generated/public/graphql";

interface Props {
  date: DateTime;
  offering: Offering;
  onTimeSlotClick: (timeSlot: TimeSlot) => Promise<void>;
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
  const [loadingTimeSlot, setLoadingTimeSlot] = useState<string | null>(null);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const NUM_TIME_SLOTS = 4;

  const renderTimeSlot = (timeSlot: TimeSlot) => {
    if (cartTimeSlotIds.includes(timeSlot.id))
      return (
        <Button
          fullWidth
          variant="contained"
          onClick={onCheckout}
          color="success"
          size={isMobile ? "small" : "medium"}
          sx={(theme) => ({
            px: 0.5,
            [theme.breakpoints.up("sm")]: { py: 0.5 },
            height: 1,
          })}
        >
          {isMobile ? (
            <CheckCircle fontSize="small" />
          ) : (
            <>
              <CheckCircle sx={{ height: 16, width: 16, mr: "4px" }} />
              {DateTime.fromISO(timeSlot.startDateTime).toFormat("h:mm a")}
            </>
          )}
        </Button>
      );

    return (
      <LoadingButton
        fullWidth
        variant="contained"
        onClick={async () => {
          setLoadingTimeSlot(timeSlot.id);
          await onTimeSlotClick(timeSlot);
          setLoadingTimeSlot(null);
        }}
        loading={loadingTimeSlot === timeSlot.id}
        size={isMobile ? "small" : "medium"}
        sx={(theme) => ({
          px: 0.5,
          [theme.breakpoints.up("sm")]: {
            py: 0.5,
          },
        })}
      >
        {DateTime.fromISO(timeSlot.startDateTime).toFormat("h:mm a")}
      </LoadingButton>
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
          p: 1,
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
          p: 1,
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

  if (showAll || offering.availableTimeSlots.length <= NUM_TIME_SLOTS) {
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
        .slice(0, NUM_TIME_SLOTS - 1)
        .map((timeSlot) => (
          <Grid item key={timeSlot.id} xs={3}>
            {renderTimeSlot(timeSlot)}
          </Grid>
        ))}
      <Grid item xs={3}>
        <Link
          component="button"
          onClick={() => onShowAll(offering.id, numGuests, date.toISO())}
        >
          +{offering.availableTimeSlots.length - NUM_TIME_SLOTS + 1} more
        </Link>
      </Grid>
    </Grid>
  );
};

export default OfferingTimeSlots;
