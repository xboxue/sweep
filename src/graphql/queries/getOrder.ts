import { gql } from "@apollo/client";

const GET_ORDER = gql`
  query getOrder($id: ID, $cartId: ID) {
    order(id: $id, cartId: $cartId) {
      id
      createdAt
      updatedAt
      subtotal
      tax
      total
      totalPaid
      stripeClientSecret
      bookings {
        id
        numGuests
        total
        timeSlot {
          id
          startDateTime
          endDateTime
        }
        offering {
          id
          name
          minGuests
          maxGuests
          featuredImage {
            id
            url
            altText
          }
        }
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
      customer {
        id
        firstName
        lastName
        email
        phoneNumber
      }
    }
  }
`;

export default GET_ORDER;
