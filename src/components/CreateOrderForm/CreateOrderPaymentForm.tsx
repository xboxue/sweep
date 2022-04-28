import { CreditCardOffOutlined, CreditCardOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetOrderLazyQuery } from "../../generated/graphql";
import useStripePayment from "../../hooks/useStripePayment";
import CardSelect from "../common/CardSelect/CardSelect";
import PaymentSummary from "../common/PaymentSummary/PaymentSummary";
import SaveBar from "../common/SaveBar/SaveBar";

const CreateOrderPaymentForm = ({ cart }) => {
  const navigate = useNavigate();
  const [paymentOption, setPaymentOption] = useState("creditCard");
  const [getOrder, { data }] = useGetOrderLazyQuery({
    variables: { cartId: cart.id },
    pollInterval: 500,
  });

  useEffect(() => {
    if (data?.order) {
      navigate(`/orders/${data.order.id}`);
    }
  }, [data, navigate]);

  const [confirmPayment, { loading, error }] = useStripePayment(getOrder);
  const paymentOptions = [
    {
      Icon: CreditCardOutlined,
      value: "creditCard",
      title: "Credit card",
    },
    {
      Icon: CreditCardOffOutlined,
      value: "none",
      title: "No payment",
    },
  ];

  return (
    <Stack spacing={1} sx={{ maxWidth: 400 }}>
      <PaymentSummary
        tax={cart.tax}
        subtotal={cart.subtotal}
        total={cart.total}
      />
      <CardSelect
        value={paymentOption}
        onChange={setPaymentOption}
        options={paymentOptions}
      />
      <PaymentElement />
      <SaveBar
        onDiscard={() => navigate(-1)}
        onSave={confirmPayment}
        loading={loading}
      />
    </Stack>
  );
};

export default CreateOrderPaymentForm;
