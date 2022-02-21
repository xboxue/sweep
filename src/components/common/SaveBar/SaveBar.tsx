import { LoadingButton } from "@mui/lab";
import { AppBar, Button, Toolbar } from "@mui/material";

interface Props {
  onDiscard: () => void;
  loading: boolean;
}

const SaveBar = ({ onDiscard, loading }: Props) => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          bgcolor: (theme) => theme.palette.background.paper,
        }}
      >
        <Toolbar>
          <Button onClick={onDiscard} sx={{ ml: "auto" }}>
            Discard
          </Button>
          <LoadingButton loading={loading} variant="contained" type="submit">
            Save
          </LoadingButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default SaveBar;
