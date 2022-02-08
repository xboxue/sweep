import { gql } from "@apollo/client";

const UPDATE_OFFERING = gql`
  mutation updateOffering($input: OfferingInput!) {
    updateOffering(input: $input) {
      offering {
        id
      }
    }
  }
`;

export default UPDATE_OFFERING;
