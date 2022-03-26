import { Box, Button, Stack, Typography } from "@mui/material";
import { Formik, FormikConfig } from "formik";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import FormikTextField from "../components/common/FormikTextField/FormikTextField";
import {
  signInWithGoogle,
  signInWithEmailAndPassword,
} from "../services/firebase";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // Support demo login
  // TODO: Remove later
  const [searchParams] = useSearchParams();
  const initialValues = {
    email: searchParams.get("username"),
    password: searchParams.get("password"),
  };

  const handleSubmit: FormikConfig<typeof initialValues>["onSubmit"] = async (
    values
  ) => {
    try {
      await signInWithEmailAndPassword(values.email, values.password);
      navigate(from, { replace: true });
    } catch (error) {}
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Stack
            spacing={2}
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ maxWidth: 400, flex: 1 }}
          >
            <Typography variant="h4" sx={{ fontWeight: 500 }}>
              Log in to Sweep
            </Typography>
            <Button
              variant="outlined"
              size="large"
              onClick={async () => {
                try {
                  await signInWithGoogle();
                  navigate(from, { replace: true });
                } catch (error) {
                  // // Handle Errors here.
                  // const errorCode = error.code;
                  // const errorMessage = error.message;
                  // // The email of the user's account used.
                  // const email = error.email;
                  // // The AuthCredential type that was used.
                  // const credential =
                  //   GoogleAuthProvider.credentialFromError(error);
                  // // ...
                }
              }}
            >
              Sign in with Google
            </Button>
            <FormikTextField label="Email" field="email" />
            <FormikTextField
              label="Password"
              field="password"
              type="password"
            />
            <Button variant="contained" size="large" type="submit">
              Sign in
            </Button>
          </Stack>
        )}
      </Formik>
    </Box>
  );
};

export default LoginPage;
