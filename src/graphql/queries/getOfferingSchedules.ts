import { gql } from "@apollo/client";

const GET_OFFERING_SCHEDULES = gql`
  query getOfferingSchedules($date: DateTime!) {
    offerings {
      id
      name
      maxGuests
      timeSlots(date: $date) {
        id
        startDateTime
        endDateTime
        booking {
          id
          numGuests
          order {
            id
            customer {
              firstName
              lastName
              phoneNumber
              email
            }
          }
        }
        block {
          id
        }
      }
    }
  }
`;

export default GET_OFFERING_SCHEDULES;
