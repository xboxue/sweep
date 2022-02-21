import { PersonOutline, ShoppingCartOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Offering } from "../../generated/graphql";
import FormLayout from "../../layouts/FormLayout/FormLayout";
import CustomerForm from "./CustomerForm";
import ExperiencesForm from "./ExperiencesForm";

interface Props {
  title: string;
  offerings: Offering[];
}

const BookingForm = ({ title, offerings }: Props) => {
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
      children: <CustomerForm />,
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

export default BookingForm;
