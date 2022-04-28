import {
  CreditCardOutlined,
  PersonOutline,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Order,
  useRemoveOrderCustomerMutation,
  useUpdateOrderCustomerMutation,
} from "../../generated/graphql";
import FormLayout from "../../layouts/FormLayout/FormLayout";
import CartItemList from "../CartItemList/CartItemList";
import OrderCustomerForm from "./OrderCustomerForm";
import OrderPaymentSummary from "./OrderPaymentSummary";

interface Props {
  title: string;
  order: Order;
  onPaymentSuccess: () => void;
}

const OrderForm = ({ title, order, onPaymentSuccess }: Props) => {
  const navigate = useNavigate();
  const [updateOrderCustomer] = useUpdateOrderCustomerMutation();
  const [removeOrderCustomer] = useRemoveOrderCustomerMutation();

  const sections = [
    {
      title: "Experiences",
      description: "Add experiences to the booking.",
      Icon: ShoppingCartOutlined,
      children: (
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <CartItemList cartBookings={order.bookings} editable={false} />
        </Stack>
      ),
    },
    {
      title: "Customer",
      description: "Add information about your customer.",
      Icon: PersonOutline,
      children: (
        <OrderCustomerForm
          customer={order.customer}
          onAdd={async (customer) => {
            try {
              await updateOrderCustomer({
                variables: {
                  input: { orderId: order.id, customerId: customer.id },
                },
              });
            } catch (error) {
              console.log(error);
            }
          }}
          onRemove={async () => {
            try {
              await removeOrderCustomer({
                variables: { input: { orderId: order.id } },
              });
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
        <OrderPaymentSummary
          order={order}
          onPaymentSuccess={onPaymentSuccess}
        />
      ),
    },
  ];

  return (
    <FormLayout
      title={title}
      onBack={() => navigate("/orders")}
      sections={sections}
      headerComponent={
        <Button sx={{ ml: "auto" }} onClick={() => navigate("edit")}>
          Edit
        </Button>
      }
    />
  );
};

export default OrderForm;
