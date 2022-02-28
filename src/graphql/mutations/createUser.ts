import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        uid
      }
    }
  }
`;

export default CREATE_USER;
