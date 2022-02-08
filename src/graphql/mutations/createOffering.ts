import { gql } from "@apollo/client";

const CREATE_OFFERING = gql`
  mutation createOffering($input: OfferingInput!) {
    createOffering(input: $input) {
      offering {
        id
      }
    }
  }
`;

export default CREATE_OFFERING;
