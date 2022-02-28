import { Box, Button, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import FormikTextField from "../components/common/FormikTextField/FormikTextField";
import { signInWithGoogle } from "../services/firebase";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

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
        <Stack spacing={2} component="form">
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
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => console.log(values)}
          >
            <>
              <FormikTextField label="Email" field="email" />
              <FormikTextField label="Password" field="password" />
              <Button variant="contained" size="large">
                Sign in
              </Button>
            </>
          </Formik>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
