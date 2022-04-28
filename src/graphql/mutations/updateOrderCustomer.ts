import { gql } from "@apollo/client";

const UPDATE_ORDER_CUSTOMER = gql`
  mutation updateOrderCustomer($input: UpdateOrderCustomerInput!) {
    updateOrderCustomer(input: $input) {
      order {
        id
        customer {
          id
        }
      }
    }
  }
`;

export default UPDATE_ORDER_CUSTOMER;
