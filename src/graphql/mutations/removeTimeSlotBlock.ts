import { gql } from "@apollo/client";

const REMOVE_TIME_SLOT_BLOCK = gql`
  mutation removeTimeSlotBlock($input: RemoveTimeSlotBlockInput!) {
    removeTimeSlotBlock(input: $input) {
      id
    }
  }
`;

export default REMOVE_TIME_SLOT_BLOCK;
