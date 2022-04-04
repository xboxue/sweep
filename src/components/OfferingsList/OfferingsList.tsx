import { LocalMallOutlined } from "@mui/icons-material";
import { Badge, Box, Grid, IconButton, Popover, Skeleton } from "@mui/material";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import {
  useAddCartBookingsMutation,
  useGetMyCartQuery,
} from "../../generated/graphql";
import { useGetPublicOfferingsQuery } from "../../generated/public/graphql";
import CartCard from "../CartCard/CartCard";
import CheckoutDialog from "../CheckoutDialog/CheckoutDialog";
import OfferingCard from "../OfferingCard/OfferingCard";
import OfferingToolbar from "../OfferingToolbar/OfferingToolbar";

const OfferingsList = () => {
  const [date, setDate] = useState(DateTime.now());
  const [numGuests, setNumGuests] = useState(4);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);

  const [addCartBookings] = useAddCartBookingsMutation();
  const {
    loading: cartLoading,
    error: cartError,
    data: cartData,
    refetch: refetchCart,
  } = useGetMyCartQuery();
  const { loading, error, data, refetch } = useGetPublicOfferingsQuery({
    variables: { businessId: 1, numGuests, date },
    fetchPolicy: "network-only",
  });

  if (loading) return <Skeleton />;

  return (
    <Box>
      <Popover
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <CartCard onCheckout={() => setCheckoutDialogOpen(true)} />
      </Popover>
      <CheckoutDialog
        open={checkoutDialogOpen}
        onClose={() => {
          refetchCart();
          refetch();
          setCheckoutDialogOpen(false);
        }}
        cart={cartData?.myCart}
      />
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
              date={date}
              offering={offering}
              onTimeSlotClick={async (timeSlot) => {
                try {
                  await addCartBookings({
                    variables: {
                      input: {
                        cartBookings: [
                          {
                            timeSlotId: timeSlot.id,
                            numGuests,
                            offeringId: offering.id,
                          },
                        ],
                      },
                    },
                  });
                  await refetchCart();
                  setCheckoutDialogOpen(true);
                } catch (error) {
                  console.log(error);
                }
              }}
              numGuests={numGuests}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OfferingsList;
