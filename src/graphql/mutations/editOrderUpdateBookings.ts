import { gql } from "@apollo/client";

const EDIT_ORDER_UPDATE_BOOKINGS = gql`
  mutation editOrderUpdateBookings($input: EditOrderUpdateBookingsInput!) {
    editOrderUpdateBookings(input: $input) {
      calculatedOrder {
        id
        subtotal
        tax
        total
        calculatedBookings {
          id
          numGuests
          total
          timeSlot {
            id
            startDateTime
            endDateTime
          }
          offering {
            id
            name
            minGuests
            maxGuests
            featuredImage {
              id
              url
              altText
            }
          }
        }
      }
    }
  }
`;

export default EDIT_ORDER_UPDATE_BOOKINGS;
