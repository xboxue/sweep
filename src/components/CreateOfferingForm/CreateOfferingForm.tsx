import { Alert, Box } from "@mui/material";
import { Formik, FormikConfig } from "formik";
import { DateTime } from "luxon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DurationFormat,
  OfferingStatus,
  useCreateOfferingMutation,
} from "../../generated/graphql";
import NavigationBlocker from "../common/NavigationBlocker/NavigationBlocker";
import SaveBar from "../common/SaveBar/SaveBar";
import {
  initialValues as capacityInitialValues,
  validationSchema as capacityValidationSchema,
} from "./CapacityForm";
import {
  initialValues as generalInitialValues,
  validationSchema as generalValidationSchema,
} from "./GeneralForm";
import OfferingForm from "./OfferingForm";
import {
  initialValues as paymentInitialValues,
  validationSchema as paymentValidationSchema,
} from "./PaymentForm";
import {
  initialValues as pricingInitialValues,
  validationSchema as pricingValidationSchema,
} from "./PricingForm";
import {
  initialValues as scheduleInitialValues,
  validationSchema as scheduleValidationSchema,
} from "./ScheduleForm";

const CreateOfferingForm = () => {
  const [createOffering, { loading, error }] = useCreateOfferingMutation();
  const [discardDialogOpen, setDiscardDialogOpen] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    status: OfferingStatus.Draft,
    ...capacityInitialValues,
    ...generalInitialValues,
    ...paymentInitialValues,
    ...pricingInitialValues,
    ...scheduleInitialValues,
  };

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
      schedule,
      ...rest
    } = values;

    const scheduleInput = {
      timeSlots: Object.entries(schedule)
        .map(([day, times]) =>
          times.map((time) => ({
            startTime: DateTime.fromFormat(time, "h:mm a").toFormat("HH:mm:ss"),
            day: parseInt(day, 10),
          }))
        )
        .flat(),
    };
    try {
      const { data } = await createOffering({
        variables: {
          input: {
            duration:
              durationFormat === DurationFormat.Minute
                ? durationMinutes
                : durationHours * 60 + durationMinutes,
            pricePerPerson: pricePerPerson && pricePerPerson * 100,
            priceTotalAmount: priceTotalAmount && priceTotalAmount * 100,
            depositFixedAmount: depositFixedAmount && depositFixedAmount * 100,
            depositPerPerson: depositPerPerson && depositPerPerson * 100,
            schedule: scheduleInput,
            ...rest,
          } as any,
        },
      });
      navigate(`/experiences/${data?.createOffering.offering?.id}`, {
        replace: true,
      });
    } catch (error) {}
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={capacityValidationSchema
        .concat(generalValidationSchema)
        .concat(paymentValidationSchema)
        .concat(pricingValidationSchema)
        .concat(scheduleValidationSchema)}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Box component="form" onSubmit={formik.handleSubmit}>
          <NavigationBlocker
            when={formik.dirty && !formik.isSubmitting}
            message="If you leave this page, any unsaved changes will be lost."
          />
          {/* <Dialog
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
                  navigate("/experiences");
                  setDiscardDialogOpen(false);
                },
              },
            ]}
          >
            If you discard changes, you’ll delete any edits you made since you
            last saved.
          </Dialog> */}
          <OfferingForm
            title="Add experience"
            error={
              error ? (
                <Alert severity="error" sx={{ mb: 3 }}>
                  Oops, something went wrong. Please try again.
                </Alert>
              ) : undefined
            }
          />
          <SaveBar
            onDiscard={() => navigate("/experiences")}
            loading={loading}
          />
        </Box>
      )}
    </Formik>
  );
};

export default CreateOfferingForm;
