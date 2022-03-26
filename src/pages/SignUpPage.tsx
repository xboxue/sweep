import { Box, Button, Stack, Typography } from "@mui/material";
import { getAdditionalUserInfo } from "firebase/auth";
import { Formik, FormikConfig } from "formik";
import { useNavigate } from "react-router-dom";
import FormikTextField from "../components/common/FormikTextField/FormikTextField";
import { useCreateUserMutation } from "../generated/graphql";
import {
  createUserWithEmailAndPassword,
  signInWithGoogle,
} from "../services/firebase";

const initialValues = {
  email: "",
  password: "",
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();

  const handleSubmit: FormikConfig<typeof initialValues>["onSubmit"] = async (
    values
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        values.email,
        values.password
      );
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
      } = user;

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
    } catch (error) {}
  };

  const signUpGoogle = async () => {
    try {
      const userCredential = await signInWithGoogle();
      const userInfo = getAdditionalUserInfo(userCredential);

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
        } = userCredential.user;

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
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Stack
            spacing={2}
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ maxWidth: 400, flex: 1 }}
          >
            <Typography variant="h4" sx={{ fontWeight: 500 }}>
              Sign up to Sweep
            </Typography>
            <Button variant="outlined" size="large" onClick={signUpGoogle}>
              Sign up with Google
            </Button>
            <FormikTextField label="Email" field="email" />
            <FormikTextField
              label="Password"
              field="password"
              type="password"
            />
            <Button variant="contained" size="large" type="submit">
              Sign up
            </Button>
          </Stack>
        )}
      </Formik>
    </Box>
  );
};

export default SignUpPage;
