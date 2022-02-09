import { LoadingButton } from "@mui/lab";
import { Alert, AppBar, Box, Button, Skeleton, Toolbar } from "@mui/material";
import { Formik } from "formik";
import { sortBy, groupBy } from "lodash";
import { DateTime } from "luxon";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  DurationFormat,
  useGetOfferingQuery,
  useUpdateOfferingMutation,
} from "../../generated/graphql";
import Dialog from "../common/Dialog/Dialog";
import { validationSchema as capacityValidationSchema } from "./CapacityForm";
import { validationSchema as generalValidationSchema } from "./GeneralForm";
import OfferingForm from "./OfferingForm";
import { validationSchema as paymentValidationSchema } from "./PaymentForm";
import { validationSchema as pricingValidationSchema } from "./PricingForm";
import {
  validationSchema as scheduleValidationSchema,
  initialValues as scheduleInitialValues,
} from "./ScheduleForm";

const OfferingDetailsForm = () => {
  const params = useParams();
  const [discardDialogOpen, setDiscardDialogOpen] = useState(false);

  const { loading, error, data, refetch } = useGetOfferingQuery({
    variables: { id: params.id },
  });

  const [updateOffering, { loading: updating, error: updateError }] =
    useUpdateOfferingMutation();

  if (loading) return <Skeleton />;

  const {
    __typename,
    id,
    duration,
    pricePerPerson,
    priceTotalAmount,
    depositFixedAmount,
    depositPerPerson,
    schedule,
    ...rest
  } = data.offering;

  const initialValues = {
    durationMinutes: duration % 60,
    durationHours: Math.floor(duration / 60),
    durationFormat:
      duration >= 60 ? DurationFormat.Hour : DurationFormat.Minute,
    pricePerPerson: pricePerPerson && pricePerPerson / 100,
    priceTotalAmount: priceTotalAmount && priceTotalAmount / 100,
    depositFixedAmount: depositFixedAmount && depositFixedAmount / 100,
    depositPerPerson: depositPerPerson && depositPerPerson / 100,
    schedule: {
      ...scheduleInitialValues.schedule,
      ...Object.fromEntries(
        Object.entries(groupBy(schedule.timeSlots, "day")).map(
          ([day, timeSlots]) => [
            day,
            sortBy(timeSlots, "startTime").map((slot) =>
              DateTime.fromFormat(slot.startTime, "HH:mm:ss").toFormat("h:mm a")
            ),
          ]
        )
      ),
    },
    ...rest,
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
      onSubmit={async ({
        durationMinutes,
        durationHours,
        durationFormat,
        pricePerPerson,
        priceTotalAmount,
        depositFixedAmount,
        depositPerPerson,
        schedule,
        ...rest
      }) => {
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
                id,
                duration:
                  durationFormat === DurationFormat.Minute
                    ? durationMinutes
                    : durationHours * 60 + durationMinutes,
                pricePerPerson: pricePerPerson && pricePerPerson * 100,
                priceTotalAmount: priceTotalAmount && priceTotalAmount * 100,
                depositFixedAmount:
                  depositFixedAmount && depositFixedAmount * 100,
                depositPerPerson: depositPerPerson && depositPerPerson * 100,
                schedule: scheduleInput,
                ...rest,
              } as any,
            },
          });
          await refetch();
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {(formik) => (
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Dialog
            open={discardDialogOpen}
            title="Discard all unsaved changes"
            onClose={() => setDiscardDialogOpen(false)}
            actions={[
              {
                children: "Continue editing",
                onClick: () => setDiscardDialogOpen(false),
              },
              {
                children: "Discard changes",
                variant: "contained",
                onClick: () => {
                  formik.resetForm();
                  setDiscardDialogOpen(false);
                },
              },
            ]}
          >
            If you discard changes, you’ll delete any edits you made since you
            last saved.
          </Dialog>

          <OfferingForm
            title={data.offering.name}
            error={
              error ? (
                <Alert severity="error" sx={{ mb: 3 }}>
                  Oops, something went wrong. Please try again.
                </Alert>
              ) : undefined
            }
            formik={formik}
          />
          {formik.dirty && (
            <>
              <AppBar
                position="fixed"
                sx={{
                  top: "auto",
                  bottom: 0,
                  bgcolor: (theme) => theme.palette.background.paper,
                }}
              >
                <Toolbar>
                  <Button
                    onClick={() => setDiscardDialogOpen(true)}
                    sx={{ ml: "auto" }}
                  >
                    Discard
                  </Button>
                  <LoadingButton
                    loading={updating}
                    variant="contained"
                    type="submit"
                  >
                    Save
                  </LoadingButton>
                </Toolbar>
              </AppBar>
              <Toolbar />
            </>
          )}
        </Box>
      )}
    </Formik>
  );
};

export default OfferingDetailsForm;
