import { gql } from "@apollo/client";

const GET_OFFERINGS = gql`
  query getOfferings($date: DateTime!, $time: String, $numGuests: Int) {
    offerings {
      id
      name
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
      difficulty
      availableTimeSlots(date: $date, time: $time, numGuests: $numGuests) {
        id
        startDateTime
      }
      featuredImage {
        id
        url
        altText
      }
    }
  }
`;

export default GET_OFFERINGS;
