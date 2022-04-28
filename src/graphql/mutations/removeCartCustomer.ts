import { gql } from "@apollo/client";

const REMOVE_CART_CUSTOMER = gql`
  mutation removeCartCustomer {
    removeCartCustomer {
      cart {
        id
        customer {
          id
        }
      }
    }
  }
`;

export default REMOVE_CART_CUSTOMER;
