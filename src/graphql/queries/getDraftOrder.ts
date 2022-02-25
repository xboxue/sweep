import { gql } from "@apollo/client";

const GET_DRAFT_ORDER = gql`
  query getDraftOrder($id: ID!) {
    draftOrder(id: $id) {
      id
      createdAt
      updatedAt
      bookings {
        id
        startDateTime
        endDateTime
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

export default GET_DRAFT_ORDER;
