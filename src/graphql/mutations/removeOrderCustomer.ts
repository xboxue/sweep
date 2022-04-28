import { gql } from "@apollo/client";

const REMOVE_ORDER_CUSTOMER = gql`
  mutation removeOrderCustomer($input: RemoveOrderCustomerInput!) {
    removeOrderCustomer(input: $input) {
      order {
        id
        customer {
          id
        }
      }
    }
  }
`;

export default REMOVE_ORDER_CUSTOMER;
