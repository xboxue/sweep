import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import * as yup from "yup";
import Editor from "../common/Editor/Editor";
import TextField from "../common/TextField/TextField";

interface Props {
  formik: any;
}

export const validationSchema = yup.object({
  name: yup.string().required("Required"),
});

export const initialValues = {
  name: "",
  description: "",
};

const GeneralForm = ({ formik }: Props) => {
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
