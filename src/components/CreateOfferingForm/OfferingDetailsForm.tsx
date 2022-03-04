import { Alert, Box, Skeleton } from "@mui/material";
import { Formik, FormikConfig } from "formik";
import { groupBy, sortBy } from "lodash";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  DurationFormat,
  useGetOfferingQuery,
  useUpdateOfferingMutation,
} from "../../generated/graphql";
import omitDeep, { DeepOmit } from "../../utils/omitDeep/omitDeep";
import FormDiscardDialog from "../common/FormDiscardDialog/FormDiscardDialog";
import NavigationBlocker from "../common/NavigationBlocker/NavigationBlocker";
import SaveBar from "../common/SaveBar/SaveBar";
import { validationSchema as capacityValidationSchema } from "./CapacityForm";
import { validationSchema as generalValidationSchema } from "./GeneralForm";
import { initialValues as mediaInitialValues } from "./MediaForm";
import OfferingForm from "./OfferingForm";
import { validationSchema as paymentValidationSchema } from "./PaymentForm";
import { validationSchema as pricingValidationSchema } from "./PricingForm";
import {
  initialValues as scheduleInitialValues,
  validationSchema as scheduleValidationSchema,
} from "./ScheduleForm";

const OfferingDetailsForm = () => {
  const params = useParams();
  const [discardDialogOpen, setDiscardDialogOpen] = useState(false);

  const { loading, error, data, refetch } = useGetOfferingQuery({
    variables: { id: params.id },
  });

  const [updateOffering, { loading: updating, error: updateError }] =
    useUpdateOfferingMutation();

  const initialValues = useMemo(() => {
    if (!data?.offering) return null;

    const {
      id,
      duration,
      pricePerPerson,
      priceTotalAmount,
      depositFixedAmount,
      depositPerPerson,
      featuredImage,
      schedule,
      ...rest
    } = omitDeep(data.offering, "__typename") as DeepOmit<
      typeof data.offering,
      "__typename"
    >;

    return {
      durationMinutes: duration % 60,
      durationHours: Math.floor(duration / 60),
      durationFormat:
        duration >= 60 ? DurationFormat.Hour : DurationFormat.Minute,
      pricePerPerson: pricePerPerson && pricePerPerson / 100,
      priceTotalAmount: priceTotalAmount && priceTotalAmount / 100,
      depositFixedAmount: depositFixedAmount && depositFixedAmount / 100,
      depositPerPerson: depositPerPerson && depositPerPerson / 100,
      featuredImage: featuredImage || mediaInitialValues.featuredImage,
      schedule: {
        ...scheduleInitialValues.schedule,
        ...Object.fromEntries(
          Object.entries(groupBy(schedule.timeSlots, "day")).map(
            ([day, timeSlots]) => [
              day,
              sortBy(timeSlots, "startTime").map((slot) =>
                DateTime.fromFormat(slot.startTime, "HH:mm:ss").toFormat(
                  "h:mm a"
                )
              ),
            ]
          )
        ),
      },
      ...rest,
    };
  }, [data]);

  if (loading) return <Skeleton />;

  const handleSubmit: FormikConfig<typeof initialValues>["onSubmit"] = async (
    values
  ) => {
    const {
      durationMinutes,
      durationHours,
      durationFormat,
      pricePerPerson,
      priceTotalAmount,
      depositFixedAmount,
      depositPerPerson,
      featuredImage,
      schedule,
      ...rest
    } = values!;

    try {
      const scheduleInput = {
        timeSlots: Object.entries(schedule)
          .map(([day, times]) =>
            times.map((time) => ({
              startTime: DateTime.fromFormat(time, "h:mm a").toFormat(
                "HH:mm:ss"
              ),
              day: parseInt(day, 10),
            }))
          )
          .flat(),
      };
      await updateOffering({
        variables: {
          input: {
            id: data?.offering.id,
            duration:
              durationFormat === DurationFormat.Minute
                ? durationMinutes
                : durationHours * 60 + durationMinutes,
            pricePerPerson: pricePerPerson && pricePerPerson * 100,
            priceTotalAmount: priceTotalAmount && priceTotalAmount * 100,
            depositFixedAmount: depositFixedAmount && depositFixedAmount * 100,
            depositPerPerson: depositPerPerson && depositPerPerson * 100,
            featuredImage: featuredImage?.url ? featuredImage : null,
            schedule: scheduleInput,
            ...rest,
          } as any,
        },
      });
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = capacityValidationSchema
    .concat(generalValidationSchema)
    .concat(paymentValidationSchema)
    .concat(pricingValidationSchema)
    .concat(scheduleValidationSchema);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
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

          <OfferingForm
            title={data.offering.name}
            error={
              error ? (
                <Alert severity="error" sx={{ mb: 3 }}>
                  Oops, something went wrong. Please try again.
                </Alert>
              ) : undefined
            }
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

export default OfferingDetailsForm;
