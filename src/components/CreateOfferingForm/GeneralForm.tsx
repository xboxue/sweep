import { Box, Stack, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import * as yup from "yup";
import Editor from "../common/Editor/Editor";
import FormikTextField from "../common/FormikTextField/FormikTextField";

export const validationSchema = yup.object({
  name: yup.string().trim().required("Required"),
});

export const initialValues = {
  name: "",
  description: "",
};

const GeneralForm = () => {
  const formik = useFormikContext<typeof initialValues>();
  return (
    <Stack spacing={2}>
      <Box>
        <FormikTextField label="Name" field="name" />
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
