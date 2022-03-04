import { gql } from "@apollo/client";

const GET_OFFERING = gql`
  query getOffering($id: ID!) {
    offering(id: $id) {
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
      schedule {
        timeSlots {
          startTime
          day
        }
      }
    }
  }
`;

export default GET_OFFERING;
