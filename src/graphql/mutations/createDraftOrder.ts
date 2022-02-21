import { gql } from "@apollo/client";

const CREATE_DRAFT_ORDER = gql`
  mutation createDraftOrder($input: DraftOrderInput!) {
    createDraftOrder(input: $input) {
      draftOrder {
        id
        createdAt
        updatedAt
        bookings {
          id
          startDateTime
          numGuests
          offering {
            id
          }
        }
      }
    }
  }
`;

export default CREATE_DRAFT_ORDER;
