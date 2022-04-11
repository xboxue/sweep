import { gql } from "@apollo/client";

const GET_MY_CART = gql`
  query getMyCart {
    myCart {
      id
      email
      firstName
      lastName
      phoneNumber
      subtotal
      total
      tax
      stripeClientSecret
      cartBookings {
        id
        total
        timeSlot {
          id
          startDateTime
          endDateTime
        }
        offering {
          id
          name
          featuredImage {
            url
            altText
          }
          paymentType
          minGuests
          maxGuests
        }
        numGuests
      }
    }
  }
`;

export default GET_MY_CART;
