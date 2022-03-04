import { gql } from "@apollo/client";

const GET_OFFERINGS = gql`
  query getOfferings {
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
      featuredImage {
        id
        url
        altText
      }
    }
  }
`;

export default GET_OFFERINGS;
