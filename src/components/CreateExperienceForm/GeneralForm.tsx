import { Box, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Editor from "../common/Editor/Editor";
import TextField from "../common/TextField/TextField";

const GeneralForm = () => {
  const validationSchema = yup.object({
    name: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Stack spacing={2}>
      <Box>
        <TextField
          label="Name"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </Box>
      <Box>
        <Typography variant="subtitle2">Description</Typography>
        <Editor />
      </Box>
    </Stack>
  );
};

export default GeneralForm;
