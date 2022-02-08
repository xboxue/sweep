import { gql } from "@apollo/client";

const GET_OFFERINGS = gql`
  query getOfferings($businessId: ID!) {
    business(id: $businessId) {
      id
      name
      description
      email
      phoneNumber
      address
      photoUrls
      offerings {
        id
        name
        status
        minGuests
        maxGuests
        description
        pricingType
        pricePerPerson
        priceTotalAmount
        paymentType
        depositType
        depositPerPerson
        depositFixedAmount
        depositPercent
        duration
        maxAdvance
        maxAdvanceFormat
        minAdvance
        minAdvanceFormat
      }
    }
  }
`;

export default GET_OFFERINGS;
