import { gql } from "@apollo/client";

const UPDATE_DRAFT_ORDER = gql`
  mutation updateDraftOrder($input: DraftOrderInput!) {
    updateDraftOrder(input: $input) {
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

export default UPDATE_DRAFT_ORDER;
