import { LocalMallOutlined } from "@mui/icons-material";
import {
  Badge,
  Box,
  Grid,
  IconButton,
  Popover,
  Skeleton,
  Typography,
} from "@mui/material";
import { range } from "lodash";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import {
  useAddCartBookingsMutation,
  useGetMyCartQuery,
} from "../../generated/graphql";
import { TimeSlot, useGetOfferingsQuery } from "../../generated/public/graphql";
import usePrevious from "../../hooks/usePrevious";
import CartCard from "../CartCard/CartCard";
import OfferingCard from "../OfferingCard/OfferingCard";
import OfferingTimeSlots from "../OfferingTimeSlots/OfferingTimeSlots";
import OfferingToolbar from "../OfferingToolbar/OfferingToolbar";

interface Props {
  onCheckout: () => void;
  onShowAll: (offeringId: string, numGuests: number, date: string) => void;
  dialogOpen: boolean;
}

const OfferingsList = ({ onCheckout, onShowAll, dialogOpen }: Props) => {
  const [date, setDate] = useState(DateTime.now());
  const [numGuests, setNumGuests] = useState(4);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const prevDialogOpen = usePrevious(dialogOpen);

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

  useEffect(() => {
    if (prevDialogOpen && !dialogOpen) {
      refetch();
      refetchCart();
    }
  }, [dialogOpen, prevDialogOpen, refetch, refetchCart]);

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

  const renderContent = () => {
    if (loading || cartLoading)
      return (
        <Grid container spacing={3} sx={{ mt: [-1, 0] }}>
          {range(0, 2).map((value) => (
            <Grid item xs={12} sm={6} key={value}>
              <Skeleton
                variant="rectangular"
                sx={{ borderRadius: 1, height: [144, 200] }}
              />
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                <Skeleton />
              </Typography>
            </Grid>
          ))}
        </Grid>
      );

    return (
      <Grid container spacing={3} sx={{ mt: [-1, 0] }}>
        {data?.offerings.map((offering) => (
          <Grid item xs={12} sm={6} key={offering.id}>
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
                  cartTimeSlotIds={cartData?.myCart?.cartBookings.map(
                    (cartBooking) => cartBooking.timeSlot.id
                  )}
                  onCheckout={onCheckout}
                />
              }
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ width: 1 }}>
      <Popover
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            width: 350,
            maxHeight: 500,
            p: 2,
            display: "flex",
            flexDirection: "column",
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <CartCard
          onCheckout={() => {
            setAnchorEl(null);
            onCheckout();
          }}
          onUpdate={refetchCart}
          cartBookings={cartData?.myCart?.cartBookings}
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
            size="small"
          >
            <Badge
              badgeContent={cartData?.myCart?.cartBookings?.length}
              color="primary"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              sx={{
                "& .MuiBadge-badge": {
                  height: 16,
                  width: 16,
                  minWidth: 16,
                  bottom: 4,
                  right: 4,
                  fontSize: 12,
                },
              }}
            >
              <LocalMallOutlined
                sx={(theme) => ({
                  height: 22,
                  width: 22,
                  [theme.breakpoints.down("sm")]: {
                    height: 20,
                    width: 20,
                  },
                })}
              />
            </Badge>
          </IconButton>
        }
      />
      {renderContent()}
    </Box>
  );
};

export default OfferingsList;
