import { Box, Skeleton } from "@mui/material";
import { Formik, FormikConfig } from "formik";
import { DateTime } from "luxon";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useCreateDraftOrderMutation,
  useGetOfferingSchedulesQuery,
} from "../../generated/graphql";
import { usePrompt } from "../../hooks/usePrompt";
import NavigationBlocker from "../common/NavigationBlocker/NavigationBlocker";
import SaveBar from "../common/SaveBar/SaveBar";
import OrderForm from "./OrderForm";

const CreateOrderForm = () => {
  const { loading, error, data } = useGetOfferingSchedulesQuery({
    variables: { businessId: "1" },
  });

  const [createDraftOrder] = useCreateDraftOrderMutation();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { startDateTime, offeringId } = Object.fromEntries(
    new URLSearchParams(searchParams)
  );

  if (loading) return <Skeleton />;

  const initialValues = {
    bookings:
      startDateTime && offeringId
        ? [
            {
              // TODO: fix
              id: offeringId,
              date: DateTime.fromISO(startDateTime).startOf("day"),
              time: DateTime.fromISO(startDateTime).toFormat("HH:mm:ss"),
              offeringId,
              numGuests: 2,
            },
          ]
        : [],
    customerId: undefined,
  };

  const handleSubmit: FormikConfig<typeof initialValues>["onSubmit"] = async (
    values
  ) => {
    try {
      const { data } = await createDraftOrder({
        variables: {
          input: {
            customerId: values.customerId,
            bookings: values.bookings.map((booking) => {
              const startTime = DateTime.fromFormat(booking.time, "HH:mm:ss");
              const startDateTime = booking.date.set({
                hour: startTime.hour,
                minute: startTime.minute,
              });

              return {
                offeringId: booking.offeringId,
                numGuests: booking.numGuests,
                startDateTime: startDateTime.toISO(),
                // TODO: fix
                endDateTime: startDateTime.plus({ hour: 1 }).toISO(),
              };
            }),
          },
        },
      });
      navigate(`/draft-orders/${data?.createDraftOrder.draftOrder.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Box component="form" onSubmit={formik.handleSubmit}>
          <NavigationBlocker
            message="If you leave this page, any unsaved changes will be lost."
            when={formik.dirty && !formik.isSubmitting}
          />
          <OrderForm title="Add booking" offerings={data?.business.offerings} />
          <SaveBar onDiscard={() => navigate(-1)} loading={false} />
        </Box>
      )}
    </Formik>
  );
};

export default CreateOrderForm;
