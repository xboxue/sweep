import { LoadingButton } from "@mui/lab";
import { AppBar, Button, Toolbar } from "@mui/material";

interface Props {
  onDiscard: () => void;
  onSave?: () => void;
  loading?: boolean;
}

const SaveBar = ({ onDiscard, loading = false, onSave }: Props) => {
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
          <LoadingButton
            loading={loading}
            variant="contained"
            type="submit"
            onClick={onSave}
          >
            Save
          </LoadingButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default SaveBar;
