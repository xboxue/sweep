import { Box, Button, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import FormikTextField from "../components/common/FormikTextField/FormikTextField";
import { useCreateBusinessMutation } from "../generated/graphql";
import { refreshToken } from "../services/firebase";

const initialValues = {
  name: "",
  // url: "",
};

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [createBusiness] = useCreateBusinessMutation();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box flex={1} maxWidth={400}>
        <Typography variant="h4" sx={{ fontWeight: 500, mb: 2 }}>
          Tell us about your business
        </Typography>

        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            try {
              await createBusiness({ variables: { input: values } });
              await refreshToken();
              navigate("/");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {(formik) => (
            <Stack component="form" onSubmit={formik.handleSubmit} spacing={2}>
              <FormikTextField label="Name" field="name" />
              <Button variant="contained" size="large" type="submit">
                Continue
              </Button>
            </Stack>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Register;
