import {
  CreditCardOutlined,
  PersonOutline,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Order } from "../../generated/graphql";
import FormLayout from "../../layouts/FormLayout/FormLayout";
import ExperiencesForm from "./ExperiencesForm";
import OrderCustomerForm from "./OrderCustomerForm";
import OrderPaymentSummary from "./OrderPaymentSummary";

interface Props {
  title: string;
  order: Order;
}

const OrderForm = ({ title, order }: Props) => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Experiences",
      description: "Add experiences to the booking.",
      Icon: ShoppingCartOutlined,
      children: <ExperiencesForm bookings={order.bookings} />,
    },
    {
      title: "Customer",
      description: "Add information about your customer.",
      Icon: PersonOutline,
      children: <OrderCustomerForm customer={order.customer} />,
    },
    {
      title: "Payment",
      description: "Payment information",
      Icon: CreditCardOutlined,
      children: <OrderPaymentSummary order={order} />,
    },
  ];

  return (
    <FormLayout
      title={title}
      onBack={() => navigate(-1)}
      sections={sections}
      //   error={error}
    />
  );
};

export default OrderForm;
