import { gql } from "@apollo/client";

const GET_ORDER = gql`
  query getOrder($id: ID!) {
    order(id: $id) {
      id
      createdAt
      updatedAt
      subtotal
      tax
      total
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
