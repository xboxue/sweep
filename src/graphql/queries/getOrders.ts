import { gql } from "@apollo/client";

const GET_ORDERS = gql`
  query getOrders {
    orders {
      id
      createdAt
      updatedAt
      total
      totalPaid
      bookings {
        id
        numGuests
        offering {
          id
          name
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

export default GET_ORDERS;
