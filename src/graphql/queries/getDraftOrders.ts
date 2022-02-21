import { gql } from "@apollo/client";

const GET_DRAFT_ORDERS = gql`
  query getDraftOrders {
    draftOrders {
      id
      createdAt
      #   status
      #   total
    }
  }
`;

export default GET_DRAFT_ORDERS;
