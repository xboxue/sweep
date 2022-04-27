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
            totalPaid
            tax
            stripeClientSecret
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
              creditCard {
                id
                lastDigits
                expiryMonth
                expiryYear
                brand
              }
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
