import { gql } from "@apollo/client";

const UPDATE_CART_BOOKINGS = gql`
  mutation updateCartBookings($input: UpdateCartBookingsInput!) {
    updateCartBookings(input: $input) {
      cart {
        id
      }
    }
  }
`;

export default UPDATE_CART_BOOKINGS;
