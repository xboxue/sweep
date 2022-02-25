import { PersonOutline, ShoppingCartOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Customer, Offering } from "../../generated/graphql";
import FormLayout from "../../layouts/FormLayout/FormLayout";
import OrderCustomerForm from "./OrderCustomerForm";
import ExperiencesForm from "./ExperiencesForm";

interface Props {
  title: string;
  offerings: Offering[];
  customer?: Customer;
}

const OrderForm = ({ title, offerings, customer }: Props) => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Experiences",
      description: "Add experiences to the booking.",
      Icon: ShoppingCartOutlined,
      children: <ExperiencesForm offerings={offerings} />,
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
