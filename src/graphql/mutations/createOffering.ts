import { gql } from "@apollo/client";

const CREATE_OFFERING = gql`
  mutation createOffering($input: CreateOfferingInput!) {
    createOffering(input: $input) {
      offering {
        id
      }
    }
  }
`;

export default CREATE_OFFERING;
