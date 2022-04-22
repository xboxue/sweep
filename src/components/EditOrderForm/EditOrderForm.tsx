import { CreditCardOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { Skeleton, Stack } from "@mui/material";
import { isEqual, sortBy } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CalculatedOrder,
  useEditOrderBeginMutation,
  useEditOrderCommitMutation,
  useEditOrderRemoveBookingsMutation,
  useEditOrderUpdateBookingsMutation,
  useGetOrderQuery,
} from "../../generated/graphql";
import FormLayout from "../../layouts/FormLayout/FormLayout";
import CartItem from "../CartItem/CartItem";
import PaymentSummary from "../common/PaymentSummary/PaymentSummary";
import SaveBar from "../common/SaveBar/SaveBar";

const EditOrderForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useGetOrderQuery({
    variables: { id },
  });

  const [editOrderBegin] = useEditOrderBeginMutation();
  const [editOrderCommit] = useEditOrderCommitMutation();
  const [editOrderRemoveBookings] = useEditOrderRemoveBookingsMutation();
  const [editOrderUpdateBookings] = useEditOrderUpdateBookingsMutation();

  const [initialCalculatedOrder, setInitialCalculatedOrder] =
    useState<CalculatedOrder | null>(null);
  const [calculatedOrder, setCalculatedOrder] =
    useState<CalculatedOrder | null>(null);

  useEffect(() => {
    const editOrder = async () => {
      try {
        const { data } = await editOrderBegin({
          variables: { input: { orderId: id } },
        });

        setInitialCalculatedOrder(data?.editOrderBegin.calculatedOrder);
        setCalculatedOrder(data?.editOrderBegin.calculatedOrder);
      } catch (error) {
        console.log(error);
      }
    };

    if (!calculatedOrder) editOrder();
  }, [calculatedOrder, id, editOrderBegin]);

  if (loading || !calculatedOrder) return <Skeleton />;

  const handleRemove = async (bookingId: string) => {
    try {
      const { data } = await editOrderRemoveBookings({
        variables: {
          input: {
            id: calculatedOrder.id,
            calculatedBookingIds: [bookingId],
          },
        },
      });
      setCalculatedOrder(data?.editOrderRemoveBookings.calculatedOrder);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (bookingId, numGuests) => {
    try {
      const { data } = await editOrderUpdateBookings({
        variables: {
          input: {
            id: calculatedOrder.id,
            calculatedBookings: [{ id: bookingId, numGuests }],
          },
        },
      });
      setCalculatedOrder(data?.editOrderUpdateBookings.calculatedOrder);
    } catch (error) {
      console.log(error);
    }
  };

  const sections = [
    {
      title: "Experiences",
      description: "Add experiences to the booking.",
      Icon: ShoppingCartOutlined,
      children: (
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          {sortBy(calculatedOrder.calculatedBookings, "id").map((booking) => (
            <CartItem
              key={booking.id}
              cartBooking={booking}
              editable
              onRemove={() => handleRemove(booking.id)}
              onUpdate={(numGuests) => handleUpdate(booking.id, numGuests)}
            />
          ))}
        </Stack>
      ),
    },
    {
      title: "Summary",
      description: "Payment summary",
      Icon: CreditCardOutlined,
      children: (
        <Stack spacing={1}>
          <PaymentSummary
            tax={calculatedOrder.tax}
            subtotal={calculatedOrder.subtotal}
            total={calculatedOrder.total}
            totalPaid={data?.order.totalPaid}
          />
        </Stack>
      ),
    },
  ];

  return (
    <>
      <FormLayout
        title="Edit order"
        onBack={() => navigate(`/orders/${data?.order.id}`)}
        sections={sections}
      />
      {!isEqual(
        sortBy(initialCalculatedOrder?.calculatedBookings, "id"),
        sortBy(calculatedOrder.calculatedBookings, "id")
      ) && (
        <SaveBar
          onDiscard={() => setCalculatedOrder(initialCalculatedOrder)}
          onSave={async () => {
            try {
              await editOrderCommit({
                variables: { input: { id: calculatedOrder.id } },
              });
              navigate(`/orders/${data?.order.id}`);
            } catch (error) {
              console.log(error);
            }
          }}
        />
      )}
    </>
  );
};

export default EditOrderForm;
