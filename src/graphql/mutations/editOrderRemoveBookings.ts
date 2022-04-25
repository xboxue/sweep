import { gql } from "@apollo/client";

const EDIT_ORDER_REMOVE_BOOKINGS = gql`
  mutation editOrderRemoveBookings($input: EditOrderRemoveBookingsInput!) {
    editOrderRemoveBookings(input: $input) {
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

export default EDIT_ORDER_REMOVE_BOOKINGS;
