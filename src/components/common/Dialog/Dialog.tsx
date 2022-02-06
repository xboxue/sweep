import { Close, EditOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  children: React.ReactNode;
}

const BasicDialog = ({
  title,
  children,
  onClose,
  open,
}: Props & DialogProps) => (
  <Dialog maxWidth="lg" onClose={onClose} open={open}>
    <DialogTitle>
      {title}
      <IconButton
        aria-label="close"
        onClick={() => onClose()}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <Close />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers>{children}</DialogContent>
    {/* <DialogActions>
      <Button variant="contained">Save</Button>
    </DialogActions> */}
  </Dialog>
);
