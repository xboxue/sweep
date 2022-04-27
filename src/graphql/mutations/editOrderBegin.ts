import { gql } from "@apollo/client";

const EDIT_ORDER_BEGIN = gql`
  mutation editOrderBegin($input: EditOrderBeginInput!) {
    editOrderBegin(input: $input) {
      calculatedOrder {
        id
        subtotal
        tax
        total
        calculatedBookings {
          id
          numGuests
          total
          bookingId
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

export default EDIT_ORDER_BEGIN;
