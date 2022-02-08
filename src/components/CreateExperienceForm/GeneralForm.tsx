import { Box, Stack, Typography } from "@mui/material";
import * as yup from "yup";
import Editor from "../common/Editor/Editor";
import FormikTextField from "../common/FormikTextField/FormikTextField";

interface Props {
  formik: any;
}

export const validationSchema = yup.object({
  name: yup.string().trim().required("Required"),
});

export const initialValues = {
  name: "",
  description: "",
};

const GeneralForm = ({ formik }: Props) => {
  return (
    <Stack spacing={2}>
      <Box>
        <FormikTextField label="Name" field="name" formik={formik} />
      </Box>
      <Box>
        <Typography variant="subtitle2">Description</Typography>
        <Editor
          value={formik.values.description}
          onChange={(content) => formik.setFieldValue("description", content)}
        />
      </Box>
    </Stack>
  );
};

export default GeneralForm;
