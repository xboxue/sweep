import { gql } from "@apollo/client";

const GET_OFFERING_SCHEDULES = gql`
  query getOfferingSchedules($date: DateTime!) {
    offerings {
      id
      name
      minGuests
      maxGuests
      featuredImage {
        url
        altText
      }
      timeSlots(date: $date) {
        id
        startDateTime
        endDateTime
        booking {
          id
          numGuests
          total
          order {
            id
            subtotal
            total
            tax
            customer {
              firstName
              lastName
              phoneNumber
              email
            }
            transactions {
              id
              amount
              createdAt
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
