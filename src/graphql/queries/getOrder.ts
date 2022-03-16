import { gql } from "@apollo/client";

const GET_ORDER = gql`
  query getOrder($id: ID!) {
    order(id: $id) {
      id
      createdAt
      updatedAt
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

export default GET_ORDER;
