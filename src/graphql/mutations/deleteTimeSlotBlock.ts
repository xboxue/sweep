import { gql } from "@apollo/client";

const DELETE_TIME_SLOT_BLOCK = gql`
  mutation deleteTimeSlotBlock($input: DeleteTimeSlotBlockInput!) {
    deleteTimeSlotBlock(input: $input) {
      id
    }
  }
`;

export default DELETE_TIME_SLOT_BLOCK;
