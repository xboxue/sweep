import { gql } from "@apollo/client";

const ADD_CART_BOOKINGS = gql`
  mutation addCartBookings($input: AddCartBookingsInput!) {
    addCartBookings(input: $input) {
      cart {
        id
      }
    }
  }
`;

export default ADD_CART_BOOKINGS;
