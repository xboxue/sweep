import { gql } from "@apollo/client";

const CREATE_TRANSACTION = gql`
  mutation createTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      transaction {
        id
      }
    }
  }
`;

export default CREATE_TRANSACTION;
