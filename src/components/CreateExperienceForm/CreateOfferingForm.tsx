import { LoadingButton } from "@mui/lab";
import { Alert, AppBar, Box, Button, Toolbar } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DurationFormat,
  OfferingStatus,
  useCreateOfferingMutation,
} from "../../generated/graphql";
import Dialog from "../common/Dialog/Dialog";
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

  const formik = useFormik({
    initialValues: {
      status: OfferingStatus.Draft,
      ...capacityInitialValues,
      ...generalInitialValues,
      ...paymentInitialValues,
      ...pricingInitialValues,
      ...scheduleInitialValues,
    },
    validationSchema: capacityValidationSchema
      .concat(generalValidationSchema)
      .concat(paymentValidationSchema)
      .concat(pricingValidationSchema)
      .concat(scheduleValidationSchema),
    validateOnChange: false,
    onSubmit: async ({
      durationMinutes,
      durationHours,
      durationFormat,
      pricePerPerson,
      priceTotalAmount,
      depositFixedAmount,
      depositPerPerson,
      ...rest
    }) => {
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
              depositFixedAmount:
                depositFixedAmount && depositFixedAmount * 100,
              depositPerPerson: depositPerPerson && depositPerPerson * 100,
              ...rest,
            } as any,
          },
        });
        navigate(`/experiences/${data?.createOffering.offering?.id}`);
      } catch (error) {}
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
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
        If you discard changes, you’ll delete any edits you made since you last
        saved.
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
        formik={formik}
      />
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          bgcolor: (theme) => theme.palette.background.paper,
        }}
      >
        <Toolbar>
          <Button sx={{ ml: "auto" }} onClick={() => navigate("/experiences")}>
            Discard
          </Button>
          <LoadingButton loading={loading} variant="contained" type="submit">
            Save
          </LoadingButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};

export default CreateOfferingForm;
