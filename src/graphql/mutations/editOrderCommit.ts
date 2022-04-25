import { gql } from "@apollo/client";

const EDIT_ORDER_COMMIT = gql`
  mutation editOrderCommit($input: EditOrderCommitInput!) {
    editOrderCommit(input: $input) {
      order {
        id
      }
    }
  }
`;

export default EDIT_ORDER_COMMIT;
