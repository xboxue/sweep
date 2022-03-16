import { Box, Skeleton } from "@mui/material";
import { Formik, FormikConfig } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOrderQuery } from "../../generated/graphql";
import FormDiscardDialog from "../common/FormDiscardDialog/FormDiscardDialog";
import NavigationBlocker from "../common/NavigationBlocker/NavigationBlocker";
import SaveBar from "../common/SaveBar/SaveBar";
import OrderForm from "./OrderForm";

const OrderDetailsForm = () => {
  const { id } = useParams();

  const [discardDialogOpen, setDiscardDialogOpen] = useState(false);
  // const [updateOrder, { loading: updating, error: updateError }] =
  //   useUpdateOrderMutation();

  const { loading, error, data, refetch } = useGetOrderQuery({
    variables: { id },
  });
  // const { loading: loadingOfferings, data: offeringsData } =
  //   useGetOfferingSchedulesQuery();

  if (loading) return <Skeleton />;

  const initialValues = {
    // bookings: data?.order.bookings.map((booking) => ({
    //   id: booking.id,
    //   offeringId: booking.offering.id,
    //   date: DateTime.fromISO(booking.startDateTime).startOf("day"),
    //   time: DateTime.fromISO(booking.startDateTime).toFormat("HH:mm:ss"),
    //   numGuests: booking.numGuests,
    // })),
    customerId: data?.order.customer?.id,
  };

  const handleSubmit: FormikConfig<typeof initialValues>["onSubmit"] = async (
    values
  ) => {
    try {
      // await updateOrder({
      //   variables: {
      //     input: {
      //       id: params.id,
      //       customerId: values.customerId,
      //       bookings: values.bookings?.map((booking) => {
      //         const startTime = DateTime.fromFormat(booking.time, "HH:mm:ss");
      //         const startDateTime = booking.date.set({
      //           hour: startTime.hour,
      //           minute: startTime.minute,
      //         });
      //         return {
      //           id: booking.id,
      //           startDateTime: startDateTime.toISO(),
      //           // TODO: Fix
      //           endDateTime: startDateTime.plus({ hour: 1 }),
      //           offeringId: booking.offeringId,
      //           numGuests: booking.numGuests,
      //         };
      //       }),
      //     },
      //   },
      // });
      // await refetch();
    } catch (error) {}
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      enableReinitialize
      onSubmit={handleSubmit}
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
            title={`Order #${id}`}
            customer={data?.order.customer}
            bookings={data?.order.bookings}
          />

          {formik.dirty && (
            <SaveBar
              onDiscard={() => setDiscardDialogOpen(true)}
              // loading={updating}
            />
          )}
        </Box>
      )}
    </Formik>
  );
};

export default OrderDetailsForm;
