import { Box, Skeleton } from "@mui/material";
import { Formik } from "formik";
import { DateTime } from "luxon";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetDraftOrderQuery,
  useGetOfferingSchedulesQuery,
  useUpdateDraftOrderMutation,
} from "../../generated/graphql";
import FormDiscardDialog from "../common/FormDiscardDialog/FormDiscardDialog";
import NavigationBlocker from "../common/NavigationBlocker/NavigationBlocker";
import SaveBar from "../common/SaveBar/SaveBar";
import OrderForm from "./OrderForm";

const OrderDetailsForm = () => {
  const params = useParams();

  const [discardDialogOpen, setDiscardDialogOpen] = useState(false);
  const [updateDraftOrder, { loading: updating, error: updateError }] =
    useUpdateDraftOrderMutation();

  const { loading, error, data, refetch } = useGetDraftOrderQuery({
    variables: { id: params.id },
  });
  const { loading: loadingOfferings, data: offeringsData } =
    useGetOfferingSchedulesQuery({
      variables: { businessId: "1" },
    });

  if (loading || loadingOfferings) return <Skeleton />;

  const initialValues = {
    bookings: data?.draftOrder.bookings.map((booking) => ({
      id: booking.id,
      offeringId: booking.offering.id,
      date: DateTime.fromISO(booking.startDateTime).startOf("day"),
      time: DateTime.fromISO(booking.startDateTime).toFormat("HH:mm:ss"),
      numGuests: booking.numGuests,
    })),
    customerId: data?.draftOrder.customer?.id,
  };
  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      enableReinitialize
      onSubmit={async (values) => {
        try {
          await updateDraftOrder({
            variables: {
              input: {
                id: params.id,
                customerId: values.customerId,
                bookings: values.bookings?.map((booking) => {
                  const startTime = DateTime.fromFormat(
                    booking.time,
                    "HH:mm:ss"
                  );
                  const startDateTime = booking.date.set({
                    hour: startTime.hour,
                    minute: startTime.minute,
                  });
                  return {
                    id: booking.id,
                    startDateTime: startDateTime.toISO(),
                    // TODO: Fix
                    endDateTime: startDateTime.plus({ hour: 1 }),
                    offeringId: booking.offeringId,
                    numGuests: booking.numGuests,
                  };
                }),
              },
            },
          });
          await refetch();
        } catch (error) {}
      }}
    >
      {(formik) => (
        <Box component="form" onSubmit={formik.handleSubmit}>
          <NavigationBlocker
            message="If you leave this page, any unsaved changes will be lost."
            when={formik.dirty}
          />
          <FormDiscardDialog
            open={discardDialogOpen}
            onClose={() => setDiscardDialogOpen(false)}
            onDiscard={() => {
              formik.resetForm();
              setDiscardDialogOpen(false);
            }}
          />
          <OrderForm
            title={`Draft Order #D${params.id}`}
            offerings={offeringsData?.business.offerings}
            customer={data?.draftOrder.customer}
          />

          {formik.dirty && (
            <SaveBar
              onDiscard={() => setDiscardDialogOpen(true)}
              loading={updating}
            />
          )}
        </Box>
      )}
    </Formik>
  );
};

export default OrderDetailsForm;
