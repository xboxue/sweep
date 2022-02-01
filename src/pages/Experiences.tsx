import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Dropzone from "../components/common/Dropzone/Dropzone";
import CreateExperienceForm from "../components/CreateExperienceForm/CreateExperienceForm";

const Experiences = () => {
  const [creating, setCreating] = useState(true);

  if (creating)
    return (
      <Box mx="auto" maxWidth="960px">
        <CreateExperienceForm />
      </Box>
    );

  return (
    <>
      <Typography variant="h6">Experiences</Typography>
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: 400,
        }}
      >
        <Typography variant="subtitle1">
          Add and manage your experiences
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={() => setCreating(true)}
        >
          Add experience
        </Button>
      </Paper>
    </>
  );
};

export default Experiences;
