import { gql } from "@apollo/client";

const GET_OFFERING_SCHEDULES = gql`
  query getOfferingSchedules {
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
      schedule {
        name
        timeSlots {
          day
          startTime
        }
      }
    }
  }
`;

export default GET_OFFERING_SCHEDULES;
