import { gql } from "@apollo/client";

const GET_CUSTOMER = gql`
  query getCustomer($id: ID!) {
    customer(id: $id) {
      id
      createdAt
      updatedAt
      firstName
      phoneNumber
      lastName
      email
    }
  }
`;

export default GET_CUSTOMER;
