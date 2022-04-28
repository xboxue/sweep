import {
  CreditCardOutlined,
  PersonOutline,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Box, Skeleton, Stack } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { Formik, FormikConfig } from "formik";
import { useNavigate } from "react-router-dom";
import {
  useCreateOrderMutation,
  useGetMyCartQuery,
  useRemoveCartCustomerMutation,
  useUpdateCartCustomerMutation,
} from "../../generated/graphql";
import FormLayout from "../../layouts/FormLayout/FormLayout";
import stripeTheme from "../../styles/stripeTheme";
import getStripe from "../../utils/getStripe";
import CartItemList from "../CartItemList/CartItemList";
import NavigationBlocker from "../common/NavigationBlocker/NavigationBlocker";
import CreateOrderPaymentForm from "./CreateOrderPaymentForm";
import OrderCustomerForm from "./OrderCustomerForm";

const CreateOrderForm = () => {
  const [createOrder] = useCreateOrderMutation();
  const [updateCartCustomer] = useUpdateCartCustomerMutation();
  const [removeCartCustomer] = useRemoveCartCustomerMutation();

  const { loading, error, data, refetch } = useGetMyCartQuery();

  const navigate = useNavigate();

  if (loading) return <Skeleton />;

  const initialValues = {
    customerId: undefined,
  };

  const sections = [
    {
      title: "Experiences",
      description: "Add experiences to the booking.",
      Icon: ShoppingCartOutlined,
      children: (
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <CartItemList
            cartBookings={data?.myCart?.cartBookings}
            editable
            onUpdate={refetch}
          />
        </Stack>
      ),
    },
    {
      title: "Customer",
      description: "Add information about your customer.",
      Icon: PersonOutline,
      children: (
        <OrderCustomerForm
          customerId={data?.myCart?.customer?.id}
          onAdd={async (customer) => {
            try {
              await updateCartCustomer({
                variables: { input: { customerId: customer.id } },
              });
            } catch (error) {
              console.log(error);
            }
          }}
          onRemove={async () => {
            try {
              await removeCartCustomer();
            } catch (error) {
              console.log(error);
            }
          }}
        />
      ),
    },
    {
      title: "Payment",
      description: "Payment information",
      Icon: CreditCardOutlined,
      children: (
        <Elements
          stripe={getStripe()}
          options={{
            ...stripeTheme,
            clientSecret: data?.myCart.stripeClientSecret,
          }}
        >
          <CreateOrderPaymentForm cart={data?.myCart} />
        </Elements>
      ),
    },
  ];

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
          <FormLayout
            title="Add order"
            onBack={() => navigate("/orders")}
            sections={sections}
          />
        </Box>
      )}
    </Formik>
  );
};

export default CreateOrderForm;
