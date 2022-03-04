import { gql } from "@apollo/client";

const CREATE_FILE_UPLOAD_URLS = gql`
  mutation createFileUploadUrls($input: [CreateFileUploadUrlsInput!]!) {
    createFileUploadUrls(input: $input) {
      urls {
        url
        fields
        resourceUrl
      }
    }
  }
`;

export default CREATE_FILE_UPLOAD_URLS;
