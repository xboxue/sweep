import { gql } from "@apollo/client";

const CREATE_TIME_SLOT_BLOCK = gql`
  mutation createTimeSlotBlock($input: CreateTimeSlotBlockInput!) {
    createTimeSlotBlock(input: $input) {
      timeSlotBlock {
        id
      }
    }
  }
`;

export default CREATE_TIME_SLOT_BLOCK;
