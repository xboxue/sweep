import { gql } from "@apollo/client";

const UPDATE_CART_CONTACT_INFO = gql`
  mutation updateCartContactInfo($input: UpdateCartContactInfoInput!) {
    updateCartContactInfo(input: $input) {
      cart {
        id
      }
    }
  }
`;

export default UPDATE_CART_CONTACT_INFO;
