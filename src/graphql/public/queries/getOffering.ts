import { gql } from "@apollo/client";

const GET_OFFERING = gql`
  query getOffering(
    $id: ID!
    $date: DateTime!
    $time: String
    $numGuests: Int
  ) {
    offering(id: $id) {
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

export default GET_OFFERING;
