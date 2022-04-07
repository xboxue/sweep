import { Close, EditOutlined } from "@mui/icons-material";
import {
  Button,
  ButtonProps,
  Dialog as MuiDialog,
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
  actions?: ButtonProps[];
}

const Dialog = ({
  title,
  children,
  onClose,
  actions,
  open,
  ...props
}: Props & DialogProps) => (
  <MuiDialog onClose={onClose} open={open} {...props}>
    <DialogTitle>
      {title}
      <IconButton
        aria-label="close"
        onClick={onClose}
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
    {actions && (
      <DialogActions>
        {actions.map((action, index) => (
          <Button key={index} {...action} />
        ))}
      </DialogActions>
    )}
  </MuiDialog>
);

export default Dialog;
