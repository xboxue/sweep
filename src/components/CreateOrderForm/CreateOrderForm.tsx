import { Box, Skeleton } from "@mui/material";
import { Formik, FormikConfig } from "formik";
import { useNavigate } from "react-router-dom";
import {
  useCreateOrderMutation,
  useGetMyCartQuery,
} from "../../generated/graphql";
import NavigationBlocker from "../common/NavigationBlocker/NavigationBlocker";
import SaveBar from "../common/SaveBar/SaveBar";
import OrderForm from "./OrderForm";

const CreateOrderForm = () => {
  const [createOrder] = useCreateOrderMutation();
  const { loading, error, data } = useGetMyCartQuery();

  const navigate = useNavigate();

  if (loading) return <Skeleton />;

  const initialValues = {
    customerId: undefined,
  };

  const handleSubmit: FormikConfig<typeof initialValues>["onSubmit"] = async (
    values
  ) => {
    try {
      const { data } = await createOrder({
        variables: { input: { customerId: values.customerId } },
      });
      navigate(`/orders/${data?.createOrder?.order?.id}`);
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
          <OrderForm title="Add order" bookings={data?.myCart?.cartBookings} />
          <SaveBar onDiscard={() => navigate(-1)} loading={false} />
        </Box>
      )}
    </Formik>
  );
};

export default CreateOrderForm;
