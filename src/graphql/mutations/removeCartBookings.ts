import { gql } from "@apollo/client";

const REMOVE_CART_BOOKINGS = gql`
  mutation removeCartBookings($input: RemoveCartBookingsInput!) {
    removeCartBookings(input: $input) {
      cart {
        id
      }
    }
  }
`;

export default REMOVE_CART_BOOKINGS;
