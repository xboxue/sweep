import { gql } from "@apollo/client";

const GET_OFFERING_SCHEDULES = gql`
  query getOfferingSchedules($date: DateTime!) {
    offerings {
      id
      name
      timeSlots(date: $date) {
        id
        startDateTime
        endDateTime
      }
    }
  }
`;

export default GET_OFFERING_SCHEDULES;
