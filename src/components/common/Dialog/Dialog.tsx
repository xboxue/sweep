import { Close } from "@mui/icons-material";
import {
  Button,
  ButtonProps,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
} from "@mui/material";

interface Props {
  title?: string;
  children: React.ReactNode;
  actions?: ButtonProps[];
  titleComponent?: React.ReactNode;
  onClose: () => void;
}

const Dialog = ({
  title,
  children,
  onClose,
  actions,
  open,
  titleComponent,
  ...props
}: Props & DialogProps) => (
  <MuiDialog onClose={onClose} open={open} {...props}>
    {titleComponent || (
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
    )}
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
