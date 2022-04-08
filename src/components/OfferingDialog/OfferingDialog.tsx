import { Box, Link, Skeleton } from "@mui/material";
import { DateTime } from "luxon";
import { useCallback, useEffect, useState } from "react";
import { useAddCartBookingsMutation } from "../../generated/graphql";
import { TimeSlot, useGetOfferingQuery } from "../../generated/public/graphql";
import Dialog from "../common/Dialog/Dialog";
import OfferingTimeSlots from "../OfferingTimeSlots/OfferingTimeSlots";
import OfferingToolbar from "../OfferingToolbar/OfferingToolbar";

interface Props {
  open: boolean;
  onClose: () => void;
  offeringId: string;
  initialDate: DateTime;
  initialNumGuests: number;
  onCheckout: () => void;
}

const OfferingDialog = ({
  open,
  onClose,
  offeringId,
  initialDate,
  initialNumGuests,
  onCheckout,
}: Props) => {
  const [date, setDate] = useState(initialDate);
  const [numGuests, setNumGuests] = useState(initialNumGuests);
  const [addCartBookings] = useAddCartBookingsMutation();

  const onTimeSlotClick = async (timeSlot: TimeSlot) => {
    try {
      await addCartBookings({
        variables: {
          input: {
            cartBookings: [{ timeSlotId: timeSlot.id, numGuests, offeringId }],
          },
        },
      });
      onCheckout();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDate(initialDate);
  }, [initialDate]);

  useEffect(() => {
    setNumGuests(initialNumGuests);
  }, [initialNumGuests]);

  const [hasOverflow, setHasOverflow] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const { data, loading, error } = useGetOfferingQuery({
    variables: { id: offeringId, date, numGuests },
    fetchPolicy: "network-only",
  });

  const ref = useCallback((node) => {
    if (node !== null) setHasOverflow(node.clientHeight < node.scrollHeight);
  }, []);

  const renderContent = () => {
    if (loading) return <Skeleton />;

    return (
      <>
        {data?.offering.description && (
          <Box sx={{ mb: 3 }}>
            <Box
              ref={ref}
              sx={{
                ...(!expanded && {
                  display: "-webkit-box",
                  WebkitLineClamp: "3",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }),
                "& p, & h4": {
                  margin: 0,
                },
              }}
              dangerouslySetInnerHTML={{ __html: data.offering.description }}
            />
            {hasOverflow && expanded && (
              <Link onClick={() => setExpanded(false)} variant="body2">
                Read less
              </Link>
            )}
            {hasOverflow && !expanded && (
              <Link onClick={() => setExpanded(true)} variant="body2">
                Read more
              </Link>
            )}
          </Box>
        )}
        <OfferingToolbar
          numGuests={numGuests}
          onNumGuestsChange={setNumGuests}
          date={date}
          onDateChange={setDate}
        />
        <Box sx={{ my: 3 }}>
          <OfferingTimeSlots
            showAll
            date={date}
            numGuests={numGuests}
            onTimeSlotClick={onTimeSlotClick}
            offering={data?.offering}
          />
        </Box>
        {/* <Box
          component="img"
          src={data?.offering.featuredImage.url}
          alt={data?.offering.featuredImage.altText}
          sx={{ borderRadius: 1, width: 150 }}
        /> */}
      </>
    );
  };

  return (
    <Dialog
      disablePortal
      title={data?.offering.name}
      open={open}
      onClose={onClose}
      fullWidth
      PaperProps={{ sx: { maxWidth: 700 } }}
    >
      {renderContent()}
    </Dialog>
  );
};

export default OfferingDialog;
