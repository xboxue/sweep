import { gql } from "@apollo/client";

const GET_PUBLIC_OFFERINGS = gql`
  query getPublicOfferings($date: DateTime!, $time: String, $numGuests: Int) {
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

export default GET_PUBLIC_OFFERINGS;
