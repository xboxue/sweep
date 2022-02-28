import { gql } from "@apollo/client";

const CREATE_BUSINESS = gql`
  mutation createBusiness($input: CreateBusinessInput!) {
    createBusiness(input: $input) {
      business {
        id
        name
      }
    }
  }
`;

export default CREATE_BUSINESS;
