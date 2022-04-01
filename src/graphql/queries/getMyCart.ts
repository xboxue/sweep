import { gql } from "@apollo/client";

const GET_MY_CART = gql`
  query getMyCart {
    myCart {
      id
      email
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
        }
        numGuests
      }
    }
  }
`;

export default GET_MY_CART;
