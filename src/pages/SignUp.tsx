import { Box, Button, Stack, Typography } from "@mui/material";
import {
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import FormikTextField from "../components/common/FormikTextField/FormikTextField";
import { useCreateUserMutation } from "../generated/graphql";

const initialValues = {
  email: "",
  password: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const [createUser] = useCreateUserMutation();

  const signUpGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userInfo = getAdditionalUserInfo(result);

      if (userInfo?.isNewUser) {
        const {
          displayName,
          email,
          emailVerified,
          isAnonymous,
          phoneNumber,
          photoURL,
          providerData,
          providerId,
          uid,
        } = result.user;

        await createUser({
          variables: {
            input: {
              displayName,
              email,
              emailVerified,
              isAnonymous,
              phoneNumber,
              photoURL,
              providerData,
              providerId,
              uid,
            },
          },
        });
        navigate("/");
      }
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
      <Box flex={1} maxWidth={400}>
        <Stack spacing={2} component="form">
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            Sign up to Sweep
          </Typography>
          <Button variant="outlined" size="large" onClick={signUpGoogle}>
            Sign up with Google
          </Button>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => console.log(values)}
          >
            <>
              <FormikTextField label="Email" field="email" />
              <FormikTextField label="Password" field="password" />
              <Button variant="contained" size="large">
                Sign up
              </Button>
            </>
          </Formik>
        </Stack>
      </Box>
    </Box>
  );
};

export default SignUp;
