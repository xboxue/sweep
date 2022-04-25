import { Box, Skeleton } from "@mui/material";
import { Formik, FormikConfig } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOrderQuery } from "../../generated/graphql";
import FormDiscardDialog from "../common/FormDiscardDialog/FormDiscardDialog";
import NavigationBlocker from "../common/NavigationBlocker/NavigationBlocker";
import SaveBar from "../common/SaveBar/SaveBar";
import OrderForm from "./OrderForm";

const OrderDetailsForm = () => {
  const { id } = useParams();

  const [discardDialogOpen, setDiscardDialogOpen] = useState(false);

  const { loading, error, data, startPolling, stopPolling, previousData } =
    useGetOrderQuery({
      variables: { id },
      fetchPolicy: "network-only",
    });

  useEffect(() => {
    if (
      previousData &&
      previousData.order.transactions.length + 1 ===
        data?.order.transactions.length
    ) {
      stopPolling();
    }
  });

  if (loading) return <Skeleton />;

  const initialValues = {
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
            order={data?.order}
            onPaymentSuccess={() => {
              startPolling(1000);
            }}
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
