import { gql } from "@apollo/client";

const GET_CUSTOMERS = gql`
  query getCustomers($searchTerm: String) {
    customers(searchTerm: $searchTerm) {
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

export default GET_CUSTOMERS;
