import { PersonOutline, ShoppingCartOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Booking, Customer, Offering } from "../../generated/graphql";
import FormLayout from "../../layouts/FormLayout/FormLayout";
import OrderCustomerForm from "./OrderCustomerForm";
import ExperiencesForm from "./ExperiencesForm";

interface Props {
  title: string;
  customer?: Customer;
  bookings: Booking[];
}

const OrderForm = ({ title, customer, bookings }: Props) => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Experiences",
      description: "Add experiences to the booking.",
      Icon: ShoppingCartOutlined,
      children: <ExperiencesForm bookings={bookings} />,
    },
    {
      title: "Customer",
      description: "Add information about your customer.",
      Icon: PersonOutline,
      children: <OrderCustomerForm customer={customer} />,
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
