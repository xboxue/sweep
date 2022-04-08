import { LocalMallOutlined } from "@mui/icons-material";
import { Badge, Box, Grid, IconButton, Popover, Skeleton } from "@mui/material";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import {
  useAddCartBookingsMutation,
  useGetMyCartQuery,
} from "../../generated/graphql";
import { TimeSlot, useGetOfferingsQuery } from "../../generated/public/graphql";
import CartCard from "../CartCard/CartCard";
import OfferingCard from "../OfferingCard/OfferingCard";
import OfferingTimeSlots from "../OfferingTimeSlots/OfferingTimeSlots";
import OfferingToolbar from "../OfferingToolbar/OfferingToolbar";

interface Props {
  onCheckout: () => void;
  onShowAll: (offeringId: string, numGuests: number, date: string) => void;
}

const OfferingsList = ({ onCheckout, onShowAll }: Props) => {
  const [date, setDate] = useState(DateTime.now());
  const [numGuests, setNumGuests] = useState(4);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [addCartBookings] = useAddCartBookingsMutation();
  const {
    loading: cartLoading,
    error: cartError,
    data: cartData,
    refetch: refetchCart,
  } = useGetMyCartQuery();
  const { loading, error, data, refetch } = useGetOfferingsQuery({
    variables: { numGuests, date },
    fetchPolicy: "network-only",
  });

  const onTimeSlotClick = async (timeSlot: TimeSlot, offeringId: string) => {
    try {
      await addCartBookings({
        variables: {
          input: {
            cartBookings: [{ timeSlotId: timeSlot.id, numGuests, offeringId }],
          },
        },
      });
      await refetchCart();
      onCheckout();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Skeleton />;

  return (
    <Box>
      <Popover
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <CartCard
          onCheckout={() => {
            setAnchorEl(null);
            onCheckout();
          }}
        />
      </Popover>
      <OfferingToolbar
        numGuests={numGuests}
        onNumGuestsChange={setNumGuests}
        date={date}
        onDateChange={setDate}
        cartIcon={
          <IconButton
            onClick={(event) => setAnchorEl(event.currentTarget)}
            sx={{ mr: 2 }}
          >
            <Badge
              badgeContent={cartData?.myCart?.cartBookings?.length}
              color="primary"
            >
              <LocalMallOutlined />
            </Badge>
          </IconButton>
        }
      />
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {data?.offerings.map((offering) => (
          <Grid item sm={6} key={offering.id}>
            <OfferingCard
              offering={offering}
              timeSlotsComponent={
                <OfferingTimeSlots
                  date={date}
                  numGuests={numGuests}
                  onTimeSlotClick={(timeSlot: TimeSlot) =>
                    onTimeSlotClick(timeSlot, offering.id)
                  }
                  offering={offering}
                  onShowAll={onShowAll}
                />
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OfferingsList;
