import { gql } from "@apollo/client";

const UPDATE_CART_EMAIL = gql`
  mutation updateCartEmail($input: UpdateCartEmailInput!) {
    updateCartEmail(input: $input) {
      cart {
        id
      }
    }
  }
`;

export default UPDATE_CART_EMAIL;
