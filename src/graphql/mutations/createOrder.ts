import { gql } from "@apollo/client";

const CREATE_ORDER = gql`
  mutation createOrder($input: OrderInput!) {
    createOrder(input: $input) {
      order {
        id
      }
    }
  }
`;

export default CREATE_ORDER;
