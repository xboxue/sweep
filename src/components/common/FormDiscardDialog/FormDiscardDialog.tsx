import Dialog from "../Dialog/Dialog";

interface Props {
  open: boolean;
  onClose: () => void;
  onDiscard: () => void;
}

const FormDiscardDialog = ({ open, onClose, onDiscard }: Props) => {
  return (
    <Dialog
      open={open}
      title="Discard all unsaved changes"
      onClose={onClose}
      actions={[
        {
          children: "Continue editing",
          onClick: onClose,
        },
        {
          children: "Discard changes",
          variant: "contained",
          onClick: onDiscard,
        },
      ]}
    >
      If you discard changes, you’ll delete any edits you made since you last
      saved.
    </Dialog>
  );
};

export default FormDiscardDialog;
