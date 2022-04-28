import { gql } from "@apollo/client";

const UPDATE_CART_CUSTOMER = gql`
  mutation updateCartCustomer($input: UpdateCartCustomerInput!) {
    updateCartCustomer(input: $input) {
      cart {
        id
        customer {
          id
        }
      }
    }
  }
`;

export default UPDATE_CART_CUSTOMER;
