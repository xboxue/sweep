import {
  CreditCardOutlined,
  PersonOutline,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Order,
  useRemoveOrderCustomerMutation,
  useUpdateOrderCustomerMutation,
} from "../../generated/graphql";
import FormLayout from "../../layouts/FormLayout/FormLayout";
import CartItemList from "../CartItemList/CartItemList";
import Dialog from "../common/Dialog/Dialog";
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
  const [removeCustomerDialogOpen, setRemoveCustomerDialogOpen] =
    useState(false);

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
          onRemove={() => setRemoveCustomerDialogOpen(true)}
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
    <>
      <Dialog
        open={removeCustomerDialogOpen}
        title="Remove customer"
        onClose={() => setRemoveCustomerDialogOpen(false)}
        actions={[
          {
            children: "Cancel",
            onClick: () => setRemoveCustomerDialogOpen(false),
          },
          {
            children: "Remove customer",
            variant: "contained",
            onClick: async () => {
              try {
                setRemoveCustomerDialogOpen(false);
                await removeOrderCustomer({
                  variables: { input: { orderId: order.id } },
                });
              } catch (error) {
                console.log(error);
              }
            },
          },
        ]}
      >
        {order.customer?.firstName} {order.customer?.lastName} will no longer be
        tied to this order.
      </Dialog>
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
    </>
  );
};

export default OrderForm;
