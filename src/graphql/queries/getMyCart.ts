import { gql } from "@apollo/client";

const GET_MY_CART = gql`
  query getMyCart {
    myCart {
      id
      cartBookings {
        id
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
        }
        numGuests
      }
    }
  }
`;

export default GET_MY_CART;
