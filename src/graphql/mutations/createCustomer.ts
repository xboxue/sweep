import { gql } from "@apollo/client";

const CREATE_CUSTOMER = gql`
  mutation createCustomer($input: CustomerInput!) {
    createCustomer(input: $input) {
      customer {
        id
        createdAt
        updatedAt
        firstName
        lastName
        email
        phoneNumber
      }
    }
  }
`;

export default CREATE_CUSTOMER;
